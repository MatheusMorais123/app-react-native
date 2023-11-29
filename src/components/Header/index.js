import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerText} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingBottom: 30,
    marginTop: 50,
  },
  headerText: {
    width: 400,
    height: 150,
  },
});
