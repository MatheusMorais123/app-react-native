import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import RNPickerSelect from 'react-native-picker-select';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha_hash, setSenhaHash] = useState('');
  const [celular, setCelular] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [novidades, setNovidades] = useState(false)

  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const [items, setItems] = useState([]);
  const [itemsCity, setItemsCity] = useState([]);


  const [errorMessages, setErrorMessages] = useState({
    nome: '',
    email: '',
    senha_hash: '',
    celular: '',
    cidade: '',
    estado: '',
    novidades: '',

  })


  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => {
        const formattedItems = data.map((item) => ({
          label: item.nome,
          value: item.sigla,
        }));
        setItems(formattedItems);
      });
  }, []);

  useEffect(() => {
    if (estado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then((response) => response.json())
        .then((data) => {
          const formattedCities = data.map((city) => ({
            label: city.nome,
            value: city.nome,
          }));
          setItemsCity(formattedCities);
        });
    }
  }, [estado]);

  const renderProductList = () => {
    return items.map((e) => (
      <RNPickerSelect.Item key={e.value} label={e.label} value={e.value} />
    ));
  };

  const renderCity = () => {
    return itemsCity.map((e) => (
      <RNPickerSelect.Item key={e.value} label={e.label} value={e.value} />
    ));
  };

  function handleLogin() {
    navigation.navigate('SignIn');
  }

  const handleSubmit = async () => {

    const errors = {
      nome: '',
      email: '',
      senha_hash: '',
      celular: '',
      cidade: '',
      estado: '',
    }

    if (!nome) {
      errors.nome = 'Nome é obrigatório'

    }

    if (!email) {
      errors.email = 'E-mail é obrigatório'

    }

    if (!senha_hash) {
      errors.senha_hash = 'Senha  é obrigatório'

    }

    if (!celular) {
      errors.celular = 'Celular é obrigatório'

    }

    if (!cidade) {
      errors.cidade = 'Cidade é obrigatório'

    }

    if (!estado) {
      errors.estado = 'Estado é obrigatório'

    }

    setErrorMessages(errors);

    try {
      const formData = {
        nome,
        email,
        senha_hash,
        celular,
        cidade,
        estado,
        novidades: novidades ? 1 : 0,
      };

      const response = await axios.post('http://192.168.15.26:3000/user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      Alert.alert('Cadastro realizado com sucesso')

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      if (error.response) {
        if (error.response.status == 400) {
          setErrorMessages({ ...errors, email: 'E-mail já cadastrado' });
        }
        if (error.response.status == 402) {
          setErrorMessages({ ...errors, email: 'Campos ausentes' });
        }
      }
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
       {/*  <Header /> */}

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        {errorMessages.nome && (
          <Text style={styles.errorMessage}>{errorMessages.nome}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {errorMessages.email && (
          <Text style={styles.errorMessage}>{errorMessages.email}</Text>
        )}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSenhaHash(text)}
          value={senha_hash}
        />
        {errorMessages.senha_hash && (
          <Text style={styles.errorMessage}>{errorMessages.senha_hash}</Text>
        )}

        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCelular(text)}
          value={celular}
        />

        {errorMessages.celular && (
          <Text style={styles.errorMessage}>{errorMessages.celular}</Text>
        )}

        {/* <Text style={styles.label}>Estado</Text>
        <Picker
          selectedValue={estado}
          style={styles.inputs} 
          onValueChange={(itemValue) => {
            setEstado(itemValue);
          }}
        >
          {renderProductList()}
        </Picker>

        {errorMessages.estado && (
          <Text style={styles.errorMessage}>{errorMessages.estado}</Text>
        )} */}

        {/*  <Text style={styles.label}>Cidade</Text>
        <Picker
          selectedValue={cidade}
          style={styles.inputs} 
          onValueChange={(itemValue) => {
            setCidade(itemValue);
          }}
        >
          {renderCity()}
        </Picker>
        
        {errorMessages.cidade && (
          <Text style={styles.errorMessage}>{errorMessages.cidade}</Text>
        )} */}

        
          <Text style={styles.label}>Estado</Text>
          <RNPickerSelect
            onValueChange={(value) => setEstado(value)}
            items={items}
            value={estado}
            placeholder={{ label: 'Selecione um estado', value: null }}
            style={pickerSelectStyles}
          />
          {errorMessages.estado && (
            <Text style={styles.errorMessage}>{errorMessages.estado}</Text>
          )}

          <Text style={styles.label}>Cidade</Text>
          <RNPickerSelect
            onValueChange={(value) => setCidade(value)}
            items={itemsCity}
            value={cidade}
            placeholder={{ label: 'Selecione uma cidade', value: null }}
            style={pickerSelectStyles}
          />
          {errorMessages.cidade && (
            <Text style={styles.errorMessage}>{errorMessages.cidade}</Text>
          )}
        

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={novidades}
              onPress={() => setNovidades(!novidades)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="purple"
            />


            <Text style={styles.checkboxLabel}>Marque para receber avisos de promoções e novidades</Text>

          </View>
        </View>

       

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Gravar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleLogin}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 5,
    textAlign: 'left',
    width: '80%',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#4b9d4a',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 1,
    marginBottom: 25,
  },
  inputs: {
    height: 40,
    width: '80%',
    position: 'relative',
    borderColor: '#4b9d4a',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 1,
    marginLeft: '20%'
  },
  checkboxContainer: {
    width: '70%',
    marginRight: 80,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#4b9d4a',
    borderRadius: 40,
    margin: 5,
    fontSize: 14,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 3,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: '80%',
    borderColor: 'rgb(160, 15, 255)',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 1,
    marginBottom: 25,
    marginLeft: '10%'
  },
  inputAndroid: {
    height: 40,
    width: '80%',
    borderColor: 'rgb(160, 15, 255)',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 1,
    marginBottom: 25,
    marginLeft: '10%'
  }
});