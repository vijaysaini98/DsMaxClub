import store from '@redux/store';

const getImage = (name: string) => {
  const images: any = store.getState().imagesSlice.images;

  return images?.[name] ?  images[name]  : undefined;
};

// export const getStartBg1 = () => getImage('getStartBg1.png');
// console.log(getStartBg1(),'getStartBg1==>');


// export const getStartBg2 = () => getImage('getStartBg2.png');
// export const getStartBg3 = () => getImage('getStartBg3.png');
// export const getStartBg4 = () => getImage('getStartBg4.png');
export const getStartBg1 = require('@assets/images/getStartBg1.png')
export const getStartBg2 = require('@assets/images/getStartBg2.png')
export const getStartBg3 = require('@assets/images/getStartBg3.png')
export const getStartBg4 = require('@assets/images/getStartBg4.png')



export const backIcon = require('@assets/images/back.png');
export const eyeOpenIcon = require('@assets/images/eyeOpenIcon.png');
export const eyeCloseIcon = require('@assets/images/eyeCloseIcon.png');
export const emailIcon = require('@assets/images/emailIcon.png');
export const authBg = require('@assets/images/authBg.png');
export const userIcon = require('@assets/images/userIcon.png');
export const phoneIcon = require('@assets/images/phoneIcon.png');
export const homeIcon = require('@assets/images/homeIcon.png');
export const helpLineIcon = require('@assets/images/helpLineIcon.png');
export const nearByIcon = require('@assets/images/nearByIcon.png');
export const proflieIcon = require('@assets/images/profileIcon.png');
export const locationIcon = require('@assets/images/locationIcon.png');
export const downArrowIcon = require('@assets/images/downIcon.png');
export const searchIcon = require('@assets/images/searchIcon.png');
export const starIcon = require('@assets/images/starIcon.png');
export const checkReedemIcon = require('@assets/images/checkRedeemIcon.png');
export const dealIcon = require('@assets/images/dealIcon.png');
export const scanIcon = require('@assets/images/scanIcon.png');
export const historyIcon = require('@assets/images/historyIcon.png');
export const directionIcon = require('@assets/images/directionsIcon.png');

export const logoImage = require('@assets/images/appIconNew.png');

export const executiveIcon = require('@assets/images/executiveLogo.png');
export const vendorIcon = require('@assets/images/vendorLogo.png');
export const userLogoIcon = require('@assets/images/userLogo.png');

//profile Icon
export const forwardIcon = require('@assets/images/forwardIcon.png');
export const logOutIcon = require('@assets/images/logoutIcon.png');
export const myCardIcon = require('@assets/images/myCardIcon.png');
export const myRequestIcon = require('@assets/images/myRequestIcon.png');
export const privacyIcon = require('@assets/images/privacyIcon.png');
export const shareIcon = require('@assets/images/shareIcon.png');
export const termsCondIcon = require('@assets/images/terms&ConditionIcon.png');
export const cameraIcon = require('@assets/images/cameraIcon.png');
export const galleryIcon = require('@assets/images/galleryIcon.png');
export const deleteAccountIcon = require('@assets/images/delete.png');

export const rightArrowIcon = require('@assets/images/rightarrowIcon.png');

//categaories Image
export const automobile = require('@assets/images/automobile.png');
export const gameZone = require('@assets/images/gameZone.png');
export const cinemahall = require('@assets/images/cinemahall.png');
export const healthCare = require('@assets/images/healthcare.png');
export const resort = require('@assets/images/resort.png');
export const restaurant = require('@assets/images/restaurant.png');
export const salon = require('@assets/images/salon.png');
export const waterPark = require('@assets/images/waterpark.png');
export const hotelsDeals = require('@assets/images/hotel.png');



// trending images

//banerImages
// export const banerImages = require('@assets/images/banerImage.png');
export const defaultBanner = require('@assets/images/defaultBanner.png')

export const giftIcon = require('@assets/images/giftImage.png');

export const mapImagge = require('@assets/images/mapImage.png');
export const emailIcon2 = require('@assets/images/emailIcon2.png');
export const closeIcon = require('@assets/images/closeIcon.png');

export const defaultBookletImage= require('@assets/images/default.png')

// export const defaultBookletImage = () => getImage('default.png');
// console.log(defaultBookletImage(), 'defaultBookletImage');

export const torchOfIcon = require('@assets/images/flashlightOff.png');
export const torchOnIcon = require('@assets/images/flashlightOn.png');

export const unCheckIcon = require('@assets/images/uncheck.png');
export const checkIcon = require('@assets/images/checkBox.png');
export const noInternetIcon = require('@assets/images/noInternet.png');

export const travelBookingIcon = require('@assets/images/travelBookingIcon.png');
export const hotelBookingIcon = require('@assets/images/hotelBookingIcon.png');

export const newUpdate = require('@assets/images/NewUpdate.png');
export const underMaintenance = require('@assets/images/underMaintenance.png');


export const addToCardIcon = require('@assets/images/addToCart.png');
export const filledCartIcon = require('@assets/images/fillAddToCart.png');

export const deleteIcon = require('@assets/images/delete.png');
export const leftArrowIcon = require('@assets/images/left-arrow.png');
export const filterIcon = require('@assets/images/filter.png');
export const reportIcon = require('@assets/images/report.png');

export const contactIcon = require('@assets/images/phone.png');
export const pdfIcon = require('@assets/images/pdf.png');
export const resetIcon = require('@assets/images/undo.png');
export const appIconNew = require('@assets/images/appIconNew.png');
export const termsIcon = require('@assets/images/checkmark.png');
export const EmptyCartImage = require('@assets/images/emptyCart.png');
export const rightArrow = require('@assets/images/right-arrow.png');
export const upArrow = require('@assets/images/up-arrow.png');
export const blackDownArrow = require('@assets/images/downBlack.png');
export const refundIcon = require('@assets/images/refund.png');
