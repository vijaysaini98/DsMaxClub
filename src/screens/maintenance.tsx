import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';

const MaintenanceScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F3F3"
      />

      <Text style={styles.headerText}>
        Under Maintenance
      </Text>

      <ImageBackground
        source={require('../assets/images/maintenance_bg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        
        <View style={styles.overlay}>
          <Text style={styles.title}>
            This App is Under Maintenance
          </Text>

          <Text style={styles.description}>
            Please check back soon just putting
            {'\n'}
            little touch up on some pretty
            {'\n'}
            updates.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MaintenanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 18,
    color: '#B8B8B8',
    marginBottom: 20,
    fontWeight: '500',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 90,
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B2239',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 18,
  },

  description: {
    fontSize: 15,
    color: '#4B5B68',
    textAlign: 'center',
    lineHeight: 24,
  },
});