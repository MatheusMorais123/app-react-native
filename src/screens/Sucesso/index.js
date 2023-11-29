import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../../components/Header';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';

export default function DepartamentoFiscal() {
    
    const navigation = useNavigation();

    const handleButtonClick = () => {
        // Redirecionamento para a tela desejada
        navigation.navigate('Inicio');
      };

  return (
    <ScrollView>
      <View style={styles.containerHeader}>
        <Header />
      </View>
      <View style={styles.container}>
        
            <Image   source={require('../../assets/images/sucesso.png')} style={styles.Sucesso} />
            <TouchableOpacity  onPress={handleButtonClick}>
                <Text style={styles.buttonText}>Voltar ao inicio</Text>
            </TouchableOpacity>
        <Footer />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    margin: 120,
    backgroundColor: '#fbfcfc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#5e94c0'
  },
  buttonText: {
    color: '#005ca7',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  Sucesso:{
    width: 300, 
    height: 240,
    marginTop: 40,
  }
});
