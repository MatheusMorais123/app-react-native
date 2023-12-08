import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { TextInputMask } from 'react-native-masked-text';
export default function Login() {

  const [cnpj, setCnpj] = useState('')
  const [senha_hash, setSenha_hash] = useState('')
  const [errorMessages, setErrorMessages] = useState({
    cnpj: '',
    senha_hash: '',
    error: '',
  });




  const navigation = useNavigation();


  const handleLogin = async () => {
    const errors = {
      cnpj: '',
      senha_hash: '',
      error: '',
    };

    if (!cnpj) {
      errors.cnpj = 'CNPJ é obrigatório';
    }

    if (!senha_hash) {
      errors.senha_hash = 'Senha é obrigatória';
    }

    setErrorMessages(errors);

    if (errors.cnpj || errors.senha_hash) {
      return;
    }

    try {
      const formData = {
        cnpj,
        senha_hash,
      };

      const response = await axios.post('http://62.72.9.100:3000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.data.id !== undefined) {
        // Salvar userId e admin no AsyncStorage
        await AsyncStorage.setItem('userId', response.data.id.toString());
        await AsyncStorage.setItem('admin', response.data.admin ? 'true' : 'false');
        await AsyncStorage.setItem('cnpj', cnpj);
        
        if (response.data.admin) {
        
          console.log("Caiu no if - Admin");
          navigation.navigate('Admin');
        } else {
         
          const perfilAtualizado = response.data.perfilAtualizado;
          const userEmail = response.data.email;

          if (!perfilAtualizado && (userEmail !== null && userEmail !== '')) {
           
            navigation.navigate('Inicio');
          } else {
          
            console.log("Caiu no else - Perfil");
            navigation.navigate('Perfil');
          }
        }
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      //Alert(error)
      if (error.response) {
        if (error.response.status === 422) {
          setErrorMessages({ ...errors, senha_hash: 'Senha inválida' });
        } else {
          setErrorMessages({ ...errors, cnpj_cpf: 'Erro de validação no email' });
        }
      }
    }
  };

  function handleReset() {
    navigation.navigate('ResetPassword')
  }

  function handleBack() {
    navigation.navigate('Home')
  }

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
        <Text style={styles.label}>CNPJ</Text>
        <TextInputMask
          style={styles.input}
          type={'cnpj'}
          options={{
            format: '99.999.999/9999-99',
          }}
          value={cnpj}
          onChangeText={(text) => setCnpj(text)}
        />
        {errorMessages.cnpj && (
          <Text style={styles.errorMessage}>{errorMessages.cnpj}</Text>
        )}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSenha_hash(text)}
          value={senha_hash}
          secureTextEntry={true}
        />
        {errorMessages.senha_hash && (
          <Text style={styles.errorMessage}>{errorMessages.senha_hash}</Text>
        )}

        <TouchableOpacity onPress={handleReset} >
          <Text style={styles.label}>Esqueceu a senha ?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>

      </ScrollView>


  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  containerHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: -40, 
    marginTop: 20,
  },
  logo: {
    width: 300, // Ajuste conforme necessário
    height: 125, // Ajuste conforme necessário
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'left',
    width: '80%',
    color: '#005ca8',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#4c82bd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // para Android
  },
  checkboxContainer: {
    width: '80%',
    marginTop: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#2be0aa',
    borderRadius: 4,
    margin: 5,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#005da9',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800'
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 3,
  },
});
