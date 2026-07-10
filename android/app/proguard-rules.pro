####################################################
# React Native
####################################################

-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

####################################################
# Hermes
####################################################

-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

####################################################
# Reanimated
####################################################

-keep class com.swmansion.reanimated.** { *; }

####################################################
# Vision Camera
####################################################

-keep class com.mrousavy.camera.** { *; }

####################################################
# FastImage
####################################################

-keep class com.dylanvann.fastimage.** { *; }

####################################################
# SVG
####################################################

-keep class com.horcrux.svg.** { *; }

####################################################
# Lottie
####################################################

-keep class com.airbnb.lottie.** { *; }

####################################################
# Keep annotations
####################################################

-keepattributes Signature
-keepattributes *Annotation*
-keepattributes Exceptions
-keepattributes InnerClasses

####################################################
# Debugging
####################################################

-keepattributes SourceFile,LineNumberTable

####################################################
# Ignore optional JP2 dependency
####################################################

-dontwarn com.gemalto.jp2.**
-dontwarn javax.annotation.**
-dontwarn org.jetbrains.annotations.**