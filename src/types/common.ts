import { StyleProp, TextStyle } from "react-native";

export interface CardProps {
  key?:string,
  data?:any;
  showRedeemBtn?: boolean;
  onViewPress: () => void;
  onRedeemPress?: () => void;
  cardStyle?:()=>StyleProp<TextStyle>;
}