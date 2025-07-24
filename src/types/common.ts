import { StyleProp, TextStyle, ViewStyle } from 'react-native';

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
}

export interface DetailFieldProps {
  title: string;
  containerStyle: StyleProp<TextStyle>;
  value: any;
  titleStyle: StyleProp<TextStyle>;
  valueStyle: StyleProp<TextStyle>;
}
