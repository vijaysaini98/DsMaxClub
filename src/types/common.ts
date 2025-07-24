import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface CardProps {
  key?:string,
  data?:any;
  showRedeemBtn?: boolean;
  onViewPress: () => void;
  onRedeemPress?: () => void;
  cardStyle?:()=>StyleProp<TextStyle>;
  rightIcon?:boolean;
  status?:string;
  btnStyle?:ViewStyle,
  btnTextColor?:string,
  handleRightIcon?:()=>void
}