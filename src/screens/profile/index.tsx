import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@theme/colors'
import Header from '@components/Header'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { forwardIcon, logOutIcon, myCardIcon, myRequestIcon, privacyIcon, proflieIcon, shareIcon, termsCondIcon, userIcon } from '@helper/imagesAssets'
import { AppText, SIXTEEN } from '@components/AppText'
import { useAppDispatch } from '@redux/hooks'
import { logout } from '../../actions/auth/authAction'
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { commonStyles } from '@theme/commonStyles'

const MoreTabButton =({title,leftIcon,handleOnPress})=>{
  return(
    
      <TouchableOpacityView
      onPress={handleOnPress}
      style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between",borderWidth:1,
        paddingHorizontal:25,
        paddingVertical:23,
        borderRadius:100,
        borderColor:colors.borderColor3,
        marginTop:20
      }}>
        <View style={{flexDirection:'row',alignItems:'center',gap:24}}>
<Image
source={leftIcon}
style={{width:20,height:20,tintColor:colors.buttonBg}}
resizeMode='contain'
/>
<AppText type={SIXTEEN}>{title}</AppText>
</View>
<Image
source={forwardIcon}
style={{width:14,height:11}}
resizeMode='contain'
/>
      </TouchableOpacityView>
  )
}



const Profile = () => {

  const dispatch = useAppDispatch();

  // const handleLogout = () =>{
  //   dispatch(logout())
  // }

  const handleLogout = () =>
    Alert.alert("Are you sure you want to Logout", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => dispatch(logout()) },
    ]);

  return (
    <View style={commonStyles.mainContainer}>
      <Header/>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      // style={}
      contentContainerStyle={styles.container}
      >
      <MoreTabButton
      leftIcon={proflieIcon}
      title={"Edit Profile"}
      handleOnPress={()=>{NavigationService.navigate(routes.EDIT_PROFILE_SCREEN)}}
      />
      <MoreTabButton
      leftIcon={myRequestIcon}
      title={"My Request"}
      handleOnPress={()=>{}}
      />
       <MoreTabButton
      leftIcon={myCardIcon}
      title={"My Card"}
      handleOnPress={()=>{}}
      />
        <MoreTabButton
      leftIcon={shareIcon}
      title={"Share App"}
      handleOnPress={()=>{}}
      />
       <MoreTabButton
      leftIcon={termsCondIcon}
      title={"Terms & Conditions"}
      handleOnPress={()=>{}}
      />
       <MoreTabButton
      leftIcon={privacyIcon}
      title={"Privacy Policy"}
      handleOnPress={()=>{}}
      />
       <MoreTabButton
      leftIcon={logOutIcon}
      title={"Logout"}
      handleOnPress={()=>handleLogout()}
      />
    </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
container:{
  paddingHorizontal:16,
  paddingTop:14,
  paddingBottom:50
}
})