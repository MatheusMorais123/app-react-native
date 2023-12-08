import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
export default function DepartamentoFiscal() {

  const navigation = useNavigation();

  const handle = () => {
    // Redirecionamento para a tela desejada
    navigation.navigate('Home');
  };


  const [nfOptions, setNfOptions] = useState([]);
  const [cnpj, setCnpj] = useState('');

  /* useEffect(() => {
    const fetchCnpj = async () => {
      try {
        // Recupera o CNPJ armazenado no AsyncStorage
        const storedCnpj = await AsyncStorage.getItem('cnpj');

        if (storedCnpj) {
          // Se o CNPJ foi encontrado, atualiza o estado
          setCnpj(storedCnpj);

          // Faz a requisição para o endpoint que retorna as opções de NF para o CNPJ específico
          axios.get(`62.72.9.100:3000/envio/${storedCnpj}`)
            .then(response => {
              // Preenche as opções com os dados da resposta
              setNfOptions(response.data);
            })
            .catch(error => {
              console.error('Erro ao obter opções de NF:', error);
            });
        }
      } catch (error) {
        console.error('Erro ao recuperar CNPJ do AsyncStorage:', error);
      }
    };

    fetchCnpj();
  }, []); */

  const handleSelectChange = (value) => {
    console.log("testee", value);
    // Faça algo com o valor selecionado, se necessário
  };

  /* useEffect(() => {
    const fetchCnpj = async () => {
      try {
        // Recupera o CNPJ armazenado no AsyncStorage
        const storedCnpj = await AsyncStorage.getItem('cnpj');
  
        if (storedCnpj) {
          // Se o CNPJ foi encontrado, atualiza o estado
          setCnpj(storedCnpj);
  
          // Faz a requisição para o endpoint que retorna as opções de NF para o CNPJ específico
          axios.get(`http://62.72.9.100:3000/envio/37.121.797/0001-95`)

            .then(response => {
              console.log('Dados recebidos da API:', response.data);
              console.log(storedCnpj)
              // Mapeia as opções para incluir a data de criação no rótulo
              const formattedOptions = response.data.map(option => ({
                label: `${option.label} - ${formatDate(option.created_at)}`,
                value: option.value,
              }));
  
              // Preenche as opções com os dados formatados
              setNfOptions(formattedOptions);
            })
            .catch(error => {
              console.error('Erro ao obter opções de NF:', error);
            });
        }
      } catch (error) {
        console.error('Erro ao recuperar CNPJ do AsyncStorage:', error);
      }
    };
  
    fetchCnpj();
  }, []); */


  /* useEffect( async ()  => {
    const storedCnpj = await AsyncStorage.getItem('cnpj');
    console.log('CNPJ recuperado do AsyncStorage:', storedCnpj);
    fetch('http://62.72.9.100:3000/envio/37.121.797/0001-95?sort=createdAt')
      .then((response) => response.json())
      .then((data) => {
        const formattedItems = data.nf.map((item) => {
          const date = new Date(item.createdAt);
          const options = { month: 'long' };
          const month = new Intl.DateTimeFormat('pt-BR', options).format(date);
  
          return {
            label: `${month}`,  // Adapte conforme necessário
            value: item.sigla,
          };
        });
  
        setItems(formattedItems);
      });
  }, []); */

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Recupera o CNPJ armazenado no AsyncStorage
        const storedCnpj = await AsyncStorage.getItem('cnpj');
        console.log('CNPJ recuperado do AsyncStorage:', storedCnpj);

        if (storedCnpj) {
          const apiUrl = `http://62.72.9.100:3000/envio/${encodeURIComponent(storedCnpj)}?sort=createdAt`;
          console.log('API URL:', apiUrl);

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              const formattedItems = data.nf.map((item) => {
                const date = new Date(item.createdAt);
                const options = { month: 'long' };
                const month = new Intl.DateTimeFormat('pt-BR', options).format(date);

                return {
                  label: `${month}`,  // Adapte conforme necessário
                  value: item.sigla,
                };
              });

              setItems(formattedItems);
            })
            .catch((error) => {
              console.error('Erro ao obter dados da API:', error);
              // Trate o erro conforme necessário
            });
        }
      } catch (error) {
        console.error('Erro ao recuperar CNPJ do AsyncStorage:', error);
        // Trate o erro conforme necessário
      }
    };

    fetchItems();
  }, []);

  /* useEffect(() => {
    const fetchCnpj = async () => {
      try {
        // Recupera o CNPJ armazenado no AsyncStorage
        const storedCnpj = await AsyncStorage.getItem('cnpj');
  
        if (storedCnpj) {
          fetch(`http://62.72.9.100:3000/envio/${storedCnpj}?sort=createdAt`)
            .then((response) => response.json())
            .then((data) => {
              const formattedItems = data.nf.map((item) => {
                const date = new Date(item.createdAt);
                const options = { month: 'long' };
                const month = new Intl.DateTimeFormat('pt-BR', options).format(date);
  
                return {
                  label: `${month}`,  // Adapte conforme necessário
                  value: item.sigla,
                };
              });
  
              setItems(formattedItems);
            })
            .catch((error) => {
              console.error('Erro ao obter dados da API:', error);
            });
        }
      } catch (error) {
        console.error('Erro ao recuperar CNPJ do AsyncStorage:', error);
      }
    };
  
    fetchCnpj();
  }, []);
   */

  const [estado, setEstado] = useState('')

  const [items, setItems] = useState([]);
  const [itemsCity, setItemsCity] = useState([]);
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

        <TouchableOpacity style={styles.button}>
          {/*  <Text style={styles.buttonText1}>Acessar notas fiscais</Text> */}
          {/* <RNPickerSelect
            onValueChange={(value) => setEstado(value)}
            items={items}
            value={estado}
            placeholder={{ label: 'Acessar notas fiscais', value: null }}
            style={styles.buttonText1}
        /> */}
          <RNPickerSelect
            onValueChange={(value) => setEstado(value)}
            items={items}
            value={estado}
            placeholder={{ label: 'Acessar Notas Fiscais', value: null }}
            style={{
              placeholder: {
                color: '#005ca7',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center'
              },
            }}
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
    margin: 30,
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
  buttonText1: {
    color: '#005ca7',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  placeholder: {
    color: '#005ca7',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
