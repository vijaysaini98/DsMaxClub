import { StyleProp, TextStyle } from "react-native";

export interface CardProps {
  key?:string,
  data?:any;
  showRedeemBtn?: boolean;
  onViewPress: () => void;
  onRedeemPress?: () => void;
  cardStyle?:()=>StyleProp<TextStyle>;
  showRedeemedBtn?:boolean
}

export interface DetailFieldProps {
  title: string;
  containerStyle: StyleProp<TextStyle>;
  value: any;
  titleStyle: StyleProp<TextStyle>;
  valueStyle: StyleProp<TextStyle>;
}


