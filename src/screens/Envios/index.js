import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import RNPickerSelect from 'react-native-picker-select';
export default function DepartamentoFiscal() {

  const navigation = useNavigation();

  const handle = () => {
    // Redirecionamento para a tela desejada
    navigation.navigate('Home');
  };

  return (
    <ScrollView>
      
      <View style={styles.containerHeader}>
        <Image
          resizeMode="cover"
          source={require('../../assets/images/logo_pequeno.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.container}>

        <TouchableOpacity style={styles.button} onPress={handle}>
          <Text style={styles.buttonText}>Enviar relatórios SITAE E SIGEL</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handle}>
          <Text style={styles.buttonText}>Acessar Notas Fiscais</Text>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
            
        />
        </TouchableOpacity>
      </View>

      

      <Footer />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  containerHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: -40, 
    marginTop: 20, 
  },
  logo: {
    width: 300, 
    height: 125, 
  },
  button: {
    margin: 50,
    backgroundColor: '#fbfcfc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 60,
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
  },
});
