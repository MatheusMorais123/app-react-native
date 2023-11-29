import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Header from '../../components/Header'; // Certifique-se de que o caminho está correto
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
export default function Perfil() {
  const navigation = useNavigation();

  const [senha_hash, setSenha_hash] = useState('');
  const [email, setEmail] = useState('');
  const [codigo_loterico, setCodigo_loterico] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    senha_hash: '',
    codigo_loterico: '',
    error: '',
  });

  const atualizarDados = async () => {
    const errors = {
      email: '',
      senha_hash: '',
      codigo_loterico: '',
      error: '',
    };

    if (!email) {
      errors.email = 'E-mail é obrigatório';
    }

    if (!senha_hash) {
      errors.senha_hash = 'Senha é obrigatória';
    }

    if (!codigo_loterico) {
      errors.codigo_loterico = 'Codigo loterico é obrigatória';
    }

    setErrorMessages(errors);

    if (errors.email || errors.senha_hash || errors.codigo_loterico) {
      return;
    }

    try {
      // Recupere o ID do usuário do AsyncStorage
      const id = await AsyncStorage.getItem('userId');
      console.log('ID do usuário do AsyncStorage:', id);

      // Crie o objeto formData com os dados a serem atualizados
      const formData = {
        id: id ? id.toString() : null,
        senha_hash,
        email,
        codigo_loterico,
      };

      console.log(formData);

      // Certifique-se de ajustar a URL conforme necessário
      const url = `http://62.72.9.100:3000/update/${id}`;

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Resposta do servidor:', response.data);

      if ('success' in response.data && response.data.success) {
        console.log('Atualização bem-sucedida!');
        Alert.alert('Dados atualizados com sucesso!');
      } else {
        navigation.navigate('Inicio');
        console.log('Falha na atualização:', response.data.message);
        Alert.alert('Dados atualizados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };
  


  return (
    <ScrollView>
       <View style={styles.containerHeader}>
        <Header />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Senha nova</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSenha_hash(text)}
          value={senha_hash}
          secureTextEntry={true}
        />
        {errorMessages.senha_hash && (
          <Text style={styles.errorMessage}>{errorMessages.senha_hash}</Text>
        )}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {errorMessages.email && (
          <Text style={styles.errorMessage}>{errorMessages.email}</Text>
        )}

        <Text style={styles.label}>Código lotérico</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodigo_loterico(text)}
          value={codigo_loterico}
        />
        {errorMessages.codigo_loterico && (
          <Text style={styles.errorMessage}>{errorMessages.codigo_loterico}</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={atualizarDados}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  containerHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
