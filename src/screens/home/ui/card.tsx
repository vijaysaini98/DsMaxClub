import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Modal,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BOLD,
  FOURTEEN,
  MEDIUM,
  TWELVE,
  WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import {
  addToCardIcon,
  defaultBookletImage,
  filledCartIcon,
  locationIcon,
  helpLineIcon,
  nearByIcon,
  downArrowIcon,
  termsCondIcon,
  refundIcon,
} from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { openPhoneDialer, width } from '@utils/index';
import moment from 'moment';
import MultiLocationSheet from '@screens/detail/ui/multiLoctionSheet';
import RenderHTML from 'react-native-render-html';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getRefundPolicy } from '@actions/auth/authAction';

export interface CardProps {
  item: any;
  handleCardOnPress: (item: any) => void;
  cardContainerStyle?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle | ImageStyle[];
  imageUrl?: ImageSourcePropType;
  name?: string;
  price?: string | number;
  address?: string;
  status?: string;
  cardDisabled?: boolean;
  isCompleteLocation?: boolean;

  type?: 'booklet' | 'request' | 'combo';
  startDate?: string;
  purchaseDate?: string;
  validityMonths?: number;

  handleAddToCardOnPress?: () => void;
  isAddedToCart?: boolean;
  addtoCart?: boolean;
  location?: Array<{ location: string; location_url: string }> | any;
  showArrow?: boolean;
  data?: any;
  showDateSection?: boolean;
}

const Card: React.FC<CardProps> = ({
  handleCardOnPress,
  item,
  cardContainerStyle,
  imageStyle,
  imageUrl,
  name,
  price,
  address,
  status,
  cardDisabled,
  type = 'booklet',
  startDate,
  purchaseDate,
  validityMonths,
  handleAddToCardOnPress,
  isAddedToCart,
  addtoCart,
  isCompleteLocation,
  location,
  showArrow,
  data,
  showDateSection,
}) => {
  const [activeDropdown, setActiveDropdown] = React.useState<
    'location' | 'contact' | 'terms' | 'refund' | null
  >(null);
  const [isRefundLoading, setIsRefundLoading] = React.useState(false);

  const sheetRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { refundPolicy } = useAppSelector(state => state.auth);

  const openDropdown = (type: 'location' | 'contact' | 'terms' | 'refund') => {
    setActiveDropdown(type);
  };

  const hasRefundPolicyContent = Boolean(
    refundPolicy?.description ||
      refundPolicy?.content ||
      refundPolicy?.data?.description ||
      refundPolicy?.url ||
      refundPolicy?.data?.url,
  );

  const handleIconPress = (type: 'location' | 'contact' | 'terms' | 'refund') => async (
    event?: any,
  ) => {
    event?.stopPropagation?.();

    if (type === 'refund') {
      if (hasRefundPolicyContent || isRefundLoading) {
        if (hasRefundPolicyContent) {
          openDropdown(type);
        }
        return;
      }

      openDropdown(type);
      setIsRefundLoading(true);

      try {
        await dispatch(getRefundPolicy());
      } catch (error) {
        console.log('Refund policy fetch failed', error);
      } finally {
        setIsRefundLoading(false);
      }
      return;
    }

    openDropdown(type);
  };

  const [hasError, setHasError] = React.useState(false);

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const source: ImageSourcePropType =
    imageUrl || item?.image || defaultBookletImage;

  const displayName = name ?? item?.name ?? '';
  const displayPrice =
    price !== undefined && price !== null ? `Rs. ${price}` : '';

  const openMap = () => {
    if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`;
      Linking.openURL(url);
    }
  };

  return (
    <>
      <TouchableOpacityView
        onPress={() => {
          if (cardDisabled) return;
          handleCardOnPress(item);
        }}
        disabled={cardDisabled}
        style={[
          styles.cardInner,
          cardContainerStyle,
          // cardDisabled && type === 'booklet' && { opacity: 0.6 }, // 👈 faded UI
          cardDisabled &&
            (type === 'booklet' || type === 'combo') && { opacity: 0.7 },
        ]}
      >
        {/* IMAGE */}
        <FastImage
          source={hasError ? defaultBookletImage : source}
          style={[styles.bannerImage, imageStyle]}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />

        {/* CART */}
        {addtoCart && (
          <TouchableOpacityView
            onPress={handleAddToCardOnPress}
            style={styles.cartBtn}
          >
            <FastImage
              style={styles.cartIcon}
              source={isAddedToCart ? filledCartIcon : addToCardIcon}
            />
          </TouchableOpacityView>
        )}

        {status && (
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  status?.toLowerCase() === 'active'
                    ? colors.lightGreen
                    : colors.buttonBg,
              },
            ]}
          >
            <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>
              {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </AppText>
          </View>
        )}

        {/* CONTENT */}
        <View style={styles.detailContainer}>
          {/* NAME + PRICE */}
          <View style={styles.priceContainer}>
            <AppText type={FOURTEEN} weight={MEDIUM} style={styles.nameText}>
              {displayName}
            </AppText>

            {displayPrice ? (
              <AppText type={TWELVE} weight={BOLD} color={colors.buttonBg}>
                {displayPrice}
              </AppText>
            ) : null}
          </View>

          {/* ================= COMPLETE LOCATION ================= */}
          {isCompleteLocation ? (
            <>
              {showDateSection &&
                (startDate || item?.end_date || validityMonths) && (
                  <View style={styles.rowBetween}>
                    {/* START DATE */}
                    {startDate && (
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Start Date
                        </AppText>
                        <AppText type={TWELVE}>
                          {moment(startDate).format('DD-MMM-YYYY')}
                        </AppText>
                      </View>
                    )}

                    {/* EXPIRY DATE */}
                    {(item?.end_date || validityMonths) && (
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Expiry Date
                        </AppText>

                        <AppText type={TWELVE}>
                          {item?.end_date
                            ? moment(item.end_date).format('DD-MMM-YYYY')
                            : `Upto ${validityMonths} months`}
                        </AppText>
                      </View>
                    )}
                  </View>
                )}

              {/* ✅ ALWAYS SHOW LOCATION */}
              {address && item?.booklet_type !== 2 && (
                <TouchableOpacityView
                  style={styles.locationContainer}
                  onPress={openMap}
                >
                  <FastImage
                    source={nearByIcon}
                    style={styles.locationIconStyle}
                  />
                  <AppText
                    type={TWELVE}
                    weight={MEDIUM}
                    style={styles.locationText}
                    numberOfLines={2}
                  >
                    {address}
                  </AppText>

                  {showArrow && (
                    <TouchableOpacityView
                      onPress={() => sheetRef.current?.present()}
                    >
                      <FastImage
                        source={downArrowIcon}
                        style={styles.arrowIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacityView>
                  )}
                </TouchableOpacityView>
              )}
            </>
          ) : (
            <>
              {/* ================= BOOKLET ================= */}
              {type === 'booklet' && (
                <>
                  <View style={styles.rowBetween}>
                    {startDate && item?.booklet_type === 1 && (
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Start Date
                        </AppText>
                        <AppText type={TWELVE}>
                          {moment(startDate).format('DD MMM YYYY')}
                        </AppText>
                      </View>
                    )}

                    {item?.booklet_type === 1 &&
                      (item?.validity_months || item?.end_date) && (
                        <View>
                          <AppText type={TWELVE} weight={BOLD}>
                            Expiry Date
                          </AppText>

                          <AppText type={TWELVE}>
                            {item?.validity_months
                              ? `Upto ${item.validity_months} Months`
                              : moment(item?.end_date).format('DD MMM YYYY')}
                          </AppText>
                        </View>
                      )}
                  </View>
                  {/* BOOKLET CODE STRIP */}
                  <View style={styles.bookletCodeContainer}>
                    <AppText type={FOURTEEN} weight={BOLD} color={WHITE}>
                      Booklet Code
                    </AppText>

                    <AppText type={FOURTEEN} weight={BOLD} color={WHITE}>
                      {item?.booklet_uniquecode}
                    </AppText>
                  </View>

                  {/* BOTTOM ICONS */}
                  <View style={styles.bottomIconRow}>
                    {/* LEFT */}
                    <View style={styles.leftIcons}>
                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={handleIconPress('terms')}
                      >
                        <FastImage
                          source={termsCondIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                          resizeMode="contain"
                        />
                      </TouchableOpacityView>

                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={handleIconPress('refund')}
                      >
                        <FastImage
                          source={refundIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                          resizeMode="contain"
                        />
                      </TouchableOpacityView>
                    </View>

                    {/* RIGHT */}
                    <View style={styles.rightIcons}>
                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={handleIconPress('location')}
                      >
                        <FastImage
                          source={locationIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                          resizeMode="contain"
                        />
                      </TouchableOpacityView>

                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={handleIconPress('contact')}
                      >
                        <FastImage
                          source={helpLineIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                          resizeMode="contain"
                        />
                      </TouchableOpacityView>
                    </View>
                  </View>
                </>
              )}

              {/* ================= REQUEST ================= */}
              {type === 'request' && (
                <>
                  {/* REQUESTED DATE */}
                  {purchaseDate && (
                    <View
                      style={{
                        marginTop: vs(16),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                     
                      }}
                    >
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Requested Date
                        </AppText>

                        <AppText type={TWELVE}>
  {purchaseDate
    ? moment(
        purchaseDate,
        'DD MMMM YYYY, hh:mm A',
        true,
      ).format('DD MMM YYYY, hh:mm A')
    : '--'}
</AppText>
                      </View>

                      <View style={styles.requestIconContainer}>
                        
 <AppText type={TWELVE} weight={BOLD}>
                          Requested for
                        </AppText>

                        <AppText type={TWELVE}>
                         {item?.username ? item?.username : '--'}
                        </AppText>


                      </View>
                    </View>
                  )}

                  {/* BOOKLET CODE STRIP */}
                  <View style={styles.bookletCodeContainer}>
                    <AppText type={FOURTEEN} weight={BOLD} color={WHITE}>
                      Booklet Code
                    </AppText>

                    <AppText type={FOURTEEN} weight={BOLD} color={WHITE}>
                      {item?.unique_code}
                    </AppText>
                  </View>

                  {/* LOCATION ICON */}
                  <View style={{alignItems:'flex-end'}}>
                  <TouchableOpacityView
                          style={styles.circleBtn}
                          onPress={() => openDropdown('location')}
                        >
                          <FastImage
                            source={locationIcon}
                            style={styles.circleIcon}
                            tintColor={colors.white}
                            resizeMode="contain"
                          />
                        </TouchableOpacityView>
                        </View>
                </>
              )}
              {type === 'combo' && (
                <>
                  {/* ✅ DATE ROW */}
                  {showDateSection &&
                    (startDate || item?.end_date || validityMonths) && (
                      <View style={styles.rowBetween}>
                        {/* START DATE */}
                        {startDate && (
                          <View>
                            <AppText type={TWELVE} weight={BOLD}>
                              Start Date
                            </AppText>
                            <AppText type={TWELVE}>
                              {moment(startDate).format('DD-MMM-YYYY')}
                            </AppText>
                          </View>
                        )}

                        {/* EXPIRY DATE */}
                        {(item?.end_date || validityMonths) && (
                          <View>
                            <AppText type={TWELVE} weight={BOLD}>
                              Expiry Date
                            </AppText>

                            <AppText type={TWELVE}>
                              {item?.end_date
                                ? moment(item.end_date).format('DD-MMM-YYYY')
                                : `Upto ${validityMonths} months`}
                            </AppText>
                          </View>
                        )}
                      </View>
                    )}

                  {/* ✅ ICON ROW (RIGHT SIDE) */}
                  <View style={styles.iconRowRight}>
                    {/* 📍 LOCATION ICON */}
                    <TouchableOpacityView
                      style={styles.circleBtn}
                      onPress={() => sheetRef.current?.present()}
                    >
                      <FastImage
                        source={locationIcon}
                        style={styles.circleIcon}
                        tintColor={colors.white}
                      />
                    </TouchableOpacityView>

                    {/* 📞 CONTACT ICON */}
                    <TouchableOpacityView
                      style={styles.circleBtn}
                      // onPress={openDropdown('contact')}
                      onPress={() => {
                        if (
                          item?.mobile ||
                          item?.short_desc ||
                          item?.short_description
                        ) {
                          openDropdown('contact');
                        } else {
                          console.log('No contact available');
                        }
                      }}
                    >
                      <FastImage
                        source={helpLineIcon}
                        style={styles.circleIcon}
                        tintColor={colors.white}
                      />
                    </TouchableOpacityView>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </TouchableOpacityView>

      {/* ================= DROPDOWN ================= */}
      <Modal transparent visible={!!activeDropdown} animationType="slide">
        <View style={styles.overlay1}>
          {/* CLICK OUTSIDE CLOSE */}
          <TouchableOpacityView style={{ flex: 1 }} onPress={closeDropdown} />

          {/* BOTTOM SHEET */}
          <View style={styles.bottomSheet}>
            {/* HEADER */}
            <View style={styles.sheetHeader}>
              <View style={styles.dragHandle} />
              <AppText type={FOURTEEN} weight={BOLD}>
                {activeDropdown === 'location'
                  ? 'Select Location'
                  : activeDropdown === 'contact'
                  ? 'Contact'
                  : activeDropdown === 'refund'
                  ? 'Refund Policy'
                  : item?.booklet_uniquecode
                  ? `Terms & Conditions (${item.booklet_uniquecode})`
                  : 'Terms & Conditions'}
              </AppText>
            </View>

            {/* LIST */}
            <View style={{ marginTop: vs(10) }}>
              {/* LOCATION */}
              {activeDropdown === 'location' &&
                item?.locations?.map((loc: any, index: number) => (
                  <TouchableOpacityView
                    key={index}
                    style={styles.sheetItem}
                    onPress={() => {
                      closeDropdown();
                      loc?.location_url && Linking.openURL(loc.location_url);
                    }}
                  >
                    <FastImage
                      source={locationIcon}
                      style={styles.sheetIcon}
                      resizeMode="contain"
                    />
                    <AppText style={styles.sheetText}>{loc?.location}</AppText>
                  </TouchableOpacityView>
                ))}

              {activeDropdown === 'contact' &&
                (() => {
                  let contactList: string[] = [];

                  // ✅ Case 1: array (short_description)
                  if (Array.isArray(item?.short_description)) {
                    contactList = item.short_description;
                  }

                  // ✅ Case 2: string (short_desc)
                  else if (typeof item?.short_desc === 'string') {
                    contactList = [item.short_desc];
                  }

                  // ✅ Case 3: mobile field
                  else if (item?.mobile) {
                    contactList = [item.mobile];
                  }

                  return contactList.map((num: string, index: number) => {
                    const cleanNumber = num?.split('-')[0]?.trim();

                    return (
                      <TouchableOpacityView
                        key={index}
                        style={styles.sheetItem}
                        onPress={() => {
                          closeDropdown();
                          openPhoneDialer(cleanNumber);
                        }}
                      >
                        <FastImage
                          source={helpLineIcon}
                          style={styles.sheetIcon}
                        />
                        <AppText style={styles.sheetText}>
                          {cleanNumber}
                        </AppText>
                      </TouchableOpacityView>
                    );
                  });
                })()}
            </View>
            {activeDropdown === 'terms' ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: s(16),
                }}
                style={{
                  maxHeight: vs(350),
                  backgroundColor: colors.white,
                }}
              >
                <RenderHTML
                  contentWidth={width - 30}
                  source={{
                    html:
                      item?.terms_condition ||
                      '<p>No Terms & Conditions Available</p>',
                  }}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: colors.black,
                      marginBottom: 6,
                    },
                    h2: {
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.black,
                      marginBottom: 6,
                    },
                    h3: {
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.black,
                      marginBottom: 6,
                    },
                    p: {
                      fontSize: 14,
                      color: colors.black,
                      marginBottom: 6,
                      lineHeight: 20,
                    },
                    strong: { fontWeight: 'bold' },
                    b: { fontWeight: 'bold' },
                    li: { fontSize: 14, color: colors.black, marginBottom: 4 },
                    a: {
                      color: colors.buttonBg,
                      textDecorationLine: 'underline',
                    },
                  }}
                />
              </ScrollView>
            ) : activeDropdown === 'refund' ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: s(16),
                }}
                style={{
                  maxHeight: vs(350),
                  backgroundColor: colors.white,
                }}
              >
                {isRefundLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.buttonBg} />
                    <AppText style={styles.loadingText}>
                      Loading refund policy...
                    </AppText>
                  </View>
                ) : (
                  <RenderHTML
                    contentWidth={width - 30}
                    source={{
                      html:
                        refundPolicy?.description ||
                        refundPolicy?.content ||
                        refundPolicy?.data?.description ||
                        '<p>No Refund Policy Available</p>',
                    }}
                    tagsStyles={{
                      h1: {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: colors.black,
                        marginBottom: 6,
                      },
                      h2: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors.black,
                        marginBottom: 6,
                      },
                      h3: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.black,
                        marginBottom: 6,
                      },
                      p: {
                        fontSize: 14,
                        color: colors.black,
                        marginBottom: 6,
                        lineHeight: 20,
                      },
                      strong: { fontWeight: 'bold' },
                      b: { fontWeight: 'bold' },
                      li: { fontSize: 14, color: colors.black, marginBottom: 4 },
                      a: {
                        color: colors.buttonBg,
                        textDecorationLine: 'underline',
                      },
                    }}
                  />
                )}
              </ScrollView>
            ) : (
              <View style={{ marginTop: vs(10) }}>
                {/* Location / Contact List */}
              </View>
            )}
          </View>
        </View>
      </Modal>

      <MultiLocationSheet
        sheetRef={sheetRef}
        data={location}
        title={data?.vendor?.name || data?.client_name}
      />
    </>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  cardInner: {
    borderRadius: ms(10),
    backgroundColor: colors.white,
    overflow: 'hidden',
    width: s(280),
  },
  bannerImage: {
    height: vs(150),
    width: '100%',
  },
  detailContainer: {
    padding: s(12),
  },
  loadingContainer: {
    paddingVertical: vs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: vs(8),
    color: colors.buttonBg,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    width: '70%',
  } as TextStyle,

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(20),
  },

  iconRow: {
    flexDirection: 'row',
    gap: s(10),
  },

  statusContainer: {
    position: 'absolute',
    top: vs(10),
    right: s(10),
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(5),
    paddingHorizontal: s(8),
    borderRadius: ms(12),
  },

  cartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 20,
  },

  cartIcon: {
    width: 20,
    height: 20,
  },

  locationContainer: {
    flexDirection: 'row',
    gap: s(5),
    marginTop: vs(20),
    // backgroundColor:colors.red
  },
  locationIconStyle: {
    marginTop: vs(2),
    width: s(15),
    height: s(15),
    tintColor: colors.disTextColor,
  },
  locationText: {
    color: colors.buttonBg,
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  overlay1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  sheetHeader: {
    alignItems: 'center',
    marginBottom: vs(10),
  },

  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: vs(8),
  },

  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(12),
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },

  sheetIcon: {
    width: 20,
    height: 20,
    marginRight: s(10),
    tintColor: colors.buttonBg,
  },

  sheetText: {
    flex: 1,
  },
  arrowIcon: {
    height: vs(15),
    width: s(15),
    marginTop: vs(3),
  },
  iconRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // 👉 right align
    gap: s(10),
    marginTop: vs(12),
  },
  bookletCodeContainer: {
    backgroundColor: colors.buttonBg,
    borderRadius: ms(8),
    marginTop: vs(18),
    paddingVertical: vs(12),
    paddingHorizontal: s(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottomIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(18),
  },

  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.buttonBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(10),
    

  },

  circleIcon: {
    width: 18,
    height: 18,
  },
  leftIcons: {
    flexDirection: 'row',
    gap: s(12),
  },
  rightIcons: {
    flexDirection: 'row',
    gap: s(12),
  },
  requestIconContainer: {
    // marginTop: vs(18),
    alignItems: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: s(15),
    paddingTop: vs(10),

    // remove fixed paddingBottom
    // paddingBottom: vs(20),

    minHeight: vs(120),
  },
});
