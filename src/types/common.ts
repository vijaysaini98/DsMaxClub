import {
  ImageSourcePropType,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  secureTextEntry?: boolean;
  handleLeftIconPress?: () => void;
  inputStyle?: StyleProp<any>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  leftIcon?: ImageSourcePropType;
  errorText?: string;
  editable?: boolean;
  assignRef?: (ref: TextInput | null) => void;
  label?:string;
  required?:string|boolean
}

export interface CardProps {
  key?: string;
  data?: any;
  showRedeemBtn?: boolean;
  onViewPress: () => void;
  onRedeemPress?: () => void;
  cardStyle?: () => StyleProp<TextStyle>;
  rightIcon?: boolean;
  status?: string;
  btnStyle?: ViewStyle;
  btnTextColor?: string;
  handleRightIcon?: () => void;
  showRedeemedBtn?: boolean;
  heading?: string;
  description?: string;
  price?: string | number;
  actualPrice?: string | number;
  buttonTitle?: string;
  buttonTitle2: string;
  couponCount?: number | string;
  htmlContent?: any;
  viewBtnDisabled?:boolean,
  redeemButtonStyle?:any,
  redeemDisabled?:boolean,
  viewBtnLoader?:boolean,
  statusBg?:string,
  statusTextColor?:string,
  location?:Array<{location:string,location_url:string}> | any;
  vendorName?:string,
  usedCoupon?:number | string;
  shortDesc?:string
  completeShortDesc?:string;
  onContactPress?: () => void;
  hideViewButton?:boolean;
  showContactLocationRow?:boolean;
}

export interface DetailFieldProps {
  title: string;
  containerStyle: StyleProp<TextStyle>;
  value: any;
}

export interface ImageViewModalProps {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  data: string[];
}


 export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

export interface ContactTabButtonProps {
  icon: any;
  containerStyle?: object;
  title: string;
  text: string;
  handleOnPress: () => void;
  textColor?:string;
}
