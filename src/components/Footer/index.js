import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Loto 3 contabilidade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginTop: 30,
  },
  footerText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#015da9',
  }
});
