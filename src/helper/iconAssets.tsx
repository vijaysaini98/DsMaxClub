// components/SvgIcon.tsx

import React from 'react';
import { SvgProps } from 'react-native-svg';

// Import all your SVGs
import BackIcon from '@assets/icons/backIcon.svg';
import DownArrowIcon from '@assets/icons/downArrowIcon.svg';
import EmailIcon from '@assets/icons/emailIcon.svg';
import FavouriteIcon from '@assets/icons/favouriteIcon.svg';
import GiftCardIcon from '@assets/icons/GiftCardIcon.svg';
import HelpIcon from '@assets/icons/helpIcon.svg';
import HomeIcon from '@assets/icons/homeIcon.svg';
import LocationIcon from '@assets/icons/LocationIcon.svg';
import PasswordHideIcon from '@assets/icons/Password-hidecon.svg';
import PasswordVisibleIcon from '@assets/icons/Password-visibleIcon.svg';
import PhoneNumberIcon from '@assets/icons/Phone-NumberIcon.svg';
import ShareIcon from '@assets/icons/shareIcon.svg';
import UserIcon from '@assets/icons/userIcon.svg';

// Create a type-safe map of icon names to components
const iconsMap = {
  back: BackIcon,
  downArrow: DownArrowIcon,
  email: EmailIcon,
  favourite: FavouriteIcon,
  giftCard: GiftCardIcon,
  help: HelpIcon,
  home: HomeIcon,
  location: LocationIcon,
  passwordHide: PasswordHideIcon,
  passwordVisible: PasswordVisibleIcon,
  phoneNumber: PhoneNumberIcon,
  share: ShareIcon,
  user: UserIcon,
};

export type IconName = keyof typeof iconsMap;

interface SvgIconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, size = 24, color = 'black', ...rest }) => {
  const IconComponent = iconsMap[name]
  return <IconComponent width={size} height={size} fill={color} {...rest} />
};

export default SvgIcon;
