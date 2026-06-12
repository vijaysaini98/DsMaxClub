import React, { useRef, useState, version } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import {
  AppText,
  BOLD,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  PLACEHOLDER,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
  TWENTY_EIGHT,
  WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import {
  authBg,
  emailIcon,
  eyeCloseIcon,
  eyeOpenIcon,
  logoImage,
  phoneIcon,
} from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { buildVersion, emailRegex, phoneRegex } from '@utils/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { login, userLogin, verifyOtp } from '../../actions/auth/authAction';
import KeyBoardAware from '@components/KeyBoardAware';
import FastImage from 'react-native-fast-image';
import CodeVerificationBottomSheet from './codeVerificationBottomSheet';
import { ms, vs, s } from 'react-native-size-matters/extend';
import ToolBar from '@components/ToolBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FCM_TOKEN_KEY } from '@helper/Constants';

const Login = ({ route }) => {
  const { userType } = route?.params || '';
  const dispatch = useAppDispatch();
  const { isLoading,maintenanceInfo } = useAppSelector(state => state.auth);
  const sheetRef = useRef(null);

  const passwordInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    isPasswordVisible: false,
  });

  const handleLoginBtn = () => {
    if (state.email === '') {
      setState({ ...state, emailError: 'Email Or Phone Number is required' });
    } else if (state.password === '') {
      setState({ ...state, passwordError: 'Password is required' });
    } else if (
      emailRegex.test(state.email) === false &&
      phoneRegex.test(state.email) === false
    ) {
      setState({ ...state, emailError: 'Invalid Email or Phone Number' });
    } else {
      let data = {
        email: state?.email,
        password: state?.password,
        role_id: userType,
      };
      dispatch(login(data, handleSucess, () => sheetRef.current?.open()));
    }
  };

  const handleSucess = () => {
    setState({ ...state, emailError: '', passwordError: '' });
  };

  const handleOtpVerify = () => {
    sheetRef.current?.close();
    setState({ ...state, emailError: '', passwordError: '' });
    // setTimeout(() => {
    //     NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
    // }, 200)
  };

  const handleVerify = async (code: string) => {
    let fcm = await AsyncStorage.getItem(FCM_TOKEN_KEY);

    let data = {
      email: state?.email,
      otp: code,
      fcm_token: fcm,
    };
    dispatch(verifyOtp(data, handleOtpVerify));
  };

  const handleUserLogin = () => {
    if (userType == '2') {
      if (isPhoneNumber) {
        if (state?.email === '') {
          setState({ ...state, emailError: 'Phone Number is required' });
        } else if (phoneRegex.test(state.email) === false) {
          setState({ ...state, emailError: 'Invalid Phone Number' });
        } else {
          let data = {
            email: state?.email,
          };
          dispatch(userLogin(data, () => sheetRef.current?.open()));
        }
      } else {
        if (state?.email === '') {
          setState({ ...state, emailError: 'Email is required' });
        } else if (emailRegex.test(state.email) === false) {
          setState({ ...state, emailError: 'Invalid Email' });
        } else {
          let data = {
            email: state?.email,
          };
          dispatch(userLogin(data, () => sheetRef.current?.open()));
        }
      }
    }
  };

  return (
    <AppSafeAreaView isSecond bgImage={authBg} style={styles.mainContainer}>
      <ToolBar
        // title={"Login"}
        isLeftIcon={true}
      />
      <KeyBoardAware style={styles.container}>
        <View style={styles.heading}>
          {/* <FastImage
                        source={logoImage}
                        style={{ height: vs(100), width: ms(100), alignSelf: 'center' }}
                        resizeMode='contain'
                    /> */}
          <View
            style={{
              height: vs(100),
              width: ms(110),
              backgroundColor: colors.white,
              borderRadius: ms(8),
              elevation: 3,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <FastImage
              // source={logoImage}
              source={{uri:maintenanceInfo?.logo}}

              style={{ height: vs(100), width: ms(100), alignSelf: 'center' }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          {/* <AppText type={TWENTY_EIGHT} weight={BOLD}>WELCOME BACK</AppText> */}
          <AppText type={TWENTY_EIGHT} weight={BOLD}>
            Login
          </AppText>
          {userType !== '2' ? (
            <AppText
              type={EIGHTEEN}
              style={{ marginTop: 26, textAlign: 'center' }}
            >
              We're happy to see you again. {'\n'}Enter your email Or phone
              number and password
            </AppText>
          ) : (
            <AppText
              type={EIGHTEEN}
              style={{ marginTop: 26, textAlign: 'center' }}
            >
              {isPhoneNumber
                ? `We're happy to see you again. \n Enter your phone number`
                : `We're happy to see you again. \n Enter your email address`}
            </AppText>
          )}
        </View>

        <View style={styles.inputContainer}>
          {userType !== '2' ? (
            <>
              <Input
                placeholder={'Email or Phone Number'}
                value={state?.email}
                onChangeText={(text: string) =>
                  setState({ ...state, email: text.toLowerCase().trim() })
                }
                leftIcon={emailIcon}
                keyboardType="email-address"
                errorText={state.emailError}
                onFocus={() => setState({ ...state, emailError: '' })}
                onSubmitEditing={() => {
                  passwordInputRef?.current?.focus();
                }}
              />
              <Input
                placeholder={'Password'}
                value={state?.password}
                secureTextEntry={!state.isPasswordVisible}
                onChangeText={(text: string) =>
                  setState({ ...state, password: text.trim() })
                }
                leftIcon={state.isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
                handleLeftIconPress={() =>
                  setState({
                    ...state,
                    isPasswordVisible: !state.isPasswordVisible,
                  })
                }
                errorText={state.passwordError}
                onFocus={() => setState({ ...state, passwordError: '' })}
                assignRef={input => {
                  passwordInputRef.current = input;
                }}
                onSubmitEditing={() => {
                  handleLoginBtn();
                }}
              />
              <View style={styles.forgotWrapper}>
                <TouchableOpacityView
                  onPress={() =>
                    NavigationService.navigate(routes.FORGOT_PASSWORD_SCREEN)
                  }
                >
                  <AppText type={SIXTEEN} weight={MEDIUM}>
                    Forgot Password?
                  </AppText>
                </TouchableOpacityView>
              </View>
            </>
          ) : (
            <>
              <Input
                placeholder={isPhoneNumber ? 'Phone Number' : 'Email'}
                value={state?.email}
                onChangeText={(text: string) =>
                  setState({ ...state, email: text.toLowerCase().trim() })
                }
                leftIcon={isPhoneNumber ? phoneIcon : emailIcon}
                keyboardType={isPhoneNumber ? 'number-pad' : 'email-address'}
                errorText={state.emailError}
                onFocus={() => setState({ ...state, emailError: '' })}
                onSubmitEditing={() => {
                  handleUserLogin();
                }}
              />
            </>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacityView
          onPress={() => {
            if (userType == '2') {
              handleUserLogin();
            } else {
              handleLoginBtn();
            }
          }}
          loader={isLoading}
          style={styles.loginBtn}
        >
          <AppText type={EIGHTEEN} color={WHITE} weight={SEMI_BOLD}>{`${
            userType == '2' ? 'SEND OTP' : 'LOG IN'
          }`}</AppText>
        </TouchableOpacityView>
        {userType == '2' && (
          <TouchableOpacityView
            onPress={() => {
              setIsPhoneNumber(!isPhoneNumber);
              setState({ ...state, email: '', emailError: '' });
            }}
            style={styles.userLoginTypeBtn}
          >
            <AppText type={FOURTEEN} color={PLACEHOLDER} weight={MEDIUM}>{`${
              !isPhoneNumber ? 'LOGIN WITH PHONE' : 'LOGIN WITH EMAIL'
            }`}</AppText>
          </TouchableOpacityView>
        )}

        {/* <View style={styles.bottomRow}>
                    <AppText type={SIXTEEN} >Don’t have an Account? </AppText>
                    <TouchableOpacityView
                        onPress={() => NavigationService.navigate(routes.SIGNUP_SCREEN)}
                    >
                        <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD} >Create Account</AppText>
                    </TouchableOpacityView>
                </View> */}
      </KeyBoardAware>
      <View style={styles.buildVersionContainer}>
        <AppText
          type={THIRTEEN}
          weight={MEDIUM}
          // color={PLACEHOLDER}
          style={{
            color: colors.borderColor,
          }}
        >
          {' '}
          V-{`${version} (${buildVersion})`}
        </AppText>
      </View>
      <CodeVerificationBottomSheet ref={sheetRef} onVerify={handleVerify} />
    </AppSafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: vs(40),
    paddingHorizontal: s(16),
  },
  container: {
    backgroundColor: colors.white,
  },
  heading: {
    marginVertical: vs(10),
    alignItems: 'center',
  },
  inputContainer: {
    gap: s(16),
    marginBottom: vs(30),
  },
  forgotWrapper: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: '#00171F',
    fontSize: ms(13),
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(12),
    alignItems: 'center',
    borderRadius: ms(50),
    marginBottom: vs(10),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buildVersionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabButtonStyle: (isBoolean: boolean) => ({
    backgroundColor: isBoolean ? colors.buttonBg : colors.tabBg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(10),
    borderRadius: ms(8),
    marginRight: ms(8),
    borderWidth: isBoolean ? 0 : 0.5,
    borderColor: colors.borderColor3,
  }),
  userLoginTypeBtn: {
    width: '100%',
    borderRadius: ms(12),
    backgroundColor: colors.tabBg,
    paddingVertical: vs(10),
    alignItems: 'center',
    marginBottom: vs(10),
    borderWidth: 0.5,
    borderColor: colors.borderColor3,
  },
});
