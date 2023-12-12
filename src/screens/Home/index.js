import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import axios from "axios";
import Footer from '../../components/Footer';
import { CheckBox } from 'react-native-elements';

export default function Home() {
  const [valor_sitae, setValor_sitae] = useState('');
  const [fotoComprovanteSitae, setFotoComprovanteSitae] = useState('');
  const [valor_sigel, setValor_sigel] = useState('');
  const [fotoComprovanteSigel, setFotoComprovanteSigel] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [bolao, setBolao] = useState('')
  const [nao, setNao] = useState(false)
  const [sim, setSim] = useState(false)


  const navigation = useNavigation();
  const [errorMessages, setErrorMessages] = useState({
    cnpj: '',
    senha_hash: '',
    error: '',
  });


  const pickImage = async (setImageFunction) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
  
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImageFunction(result.assets[0].uri);
      }
    } else {
      console.error('Permissões não concedidas');
    }
  };
  

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();  // Substitua Permissions.askAsync por Camera.requestCameraPermissionsAsync
  
      if (status !== 'granted') {
        Alert.alert('Permissões não concedidas.');
      }
    };
  
    getPermissions();
  }, []);


  const handleEnviar = async () => {
    try {
      const errors = {
        valor_sitae: '',
        valor_sigel: '',
        fotoComprovanteSitae: '',
        fotoComprovanteSigel: '',
        error: '',
      };

      if (!valor_sitae) {
        errors.valor_sitae = 'Valor Sitae é obrigatório';
      }

      if (!valor_sigel) {
        errors.valor_sigel = 'Valor Sigel é obrigatório';
      }

      if (!fotoComprovanteSitae) {
        errors.fotoComprovanteSitae = 'Foto Comprovante Sitae obrigatória';
      }

      if (!fotoComprovanteSigel) {
        errors.fotoComprovanteSigel = 'Foto Comprovante Sigel obrigatória';
      }
     /*  if (!bolao) {
        errors.bolao = 'Valor do Bolão é obrigatório quando Sim ou Não ';
      } */
      setErrorMessages(errors);

      // Verifique se há algum erro nos campos antes de prosseguir
      if (Object.values(errors).some((error) => error)) {
        return;
      }

      const formData = new FormData();
      formData.append('cnpj', cnpj);
      formData.append('email', email);
      formData.append('razao_social', razaoSocial);
      formData.append('valor_sitae', valor_sitae);
      formData.append('valor_sigel', valor_sigel);

      if (sim) {
        formData.append('bolao', bolao);
      } else {
        formData.append('bolao', 'R$0,00');
      }

      formData.append('relatoriositae', {
        uri: fotoComprovanteSitae,
        type: 'image/jpeg',
        name: 'relatoriositae.jpg',
      });
      formData.append('relatoriosigel', {
        uri: fotoComprovanteSigel,
        type: 'image/jpeg',
        name: 'relatoriosigel.jpg',
      });

      console.log('Dados do FormData:', formData);

      const response = await axios.post('http://62.72.9.100:3000/formulario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta do servidor:', response.data);
      navigation.navigate('Sucesso');
      //Alert.alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);

      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
      }

      Alert.alert('Erro ao enviar dados. Tente novamente.');
    }
  };


  const fetchUserData = async () => {
    try {
      // Recupere o ID do usuário do AsyncStorage
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        console.error('ID do usuário não encontrado no AsyncStorage');
        return;
      }

      const response = await axios.get(`http://62.72.9.100:3000/user/${userId}`);
      const userData = response.data;

      // Preencha os estados com os dados do usuário
      setEmail(userData.email || '');
      setRazaoSocial(userData.razao_social || '');
      setCnpj(userData.cnpj || ''); // Substitua 'cpf' pelo nome do campo real na sua API
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])


  
  const handleLogoff = async () => {
    try {
      // Remova o token de autenticação armazenado localmente (usando AsyncStorage, por exemplo)
      await AsyncStorage.removeItem('authToken');
  
      // Navegue de volta para a tela de login ou qualquer outra tela apropriada
      // Substitua 'LoginScreen' pelo nome da tela para onde você deseja navegar
      navigation.navigate('SignIn');
  
      // Exiba uma mensagem de logoff bem-sucedido
      Alert.alert('Logoff', 'Você foi desconectado com sucesso');
    } catch (error) {
      // Lide com erros, como falha na remoção do token de autenticação
      console.error('Erro no logoff:', error);
      Alert.alert('Erro', 'Não foi possível desconectar');
    }
  };

  const handleButtonBack = () => {
    // Redirecionamento para a tela desejada
    navigation.navigate('Inicio');
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
        <Text style={styles.label}>Valor Sitae</Text>
        <TextInputMask
          style={styles.input}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$ ',
            suffixUnit: '',
          }}
          onChangeText={(text) => setValor_sitae(text)}  // Atualizado aqui
          value={valor_sitae}
        />
        {errorMessages.valor_sitae && (
          <Text style={styles.errorMessage}>{errorMessages.valor_sitae}</Text>
        )}
        <Text style={styles.labelText}>Clique no botão abaixo para enviar uma foto do comprovante SITAE:</Text>
        <Text style={styles.label}>Foto do comprovante</Text>
        {fotoComprovanteSitae ? (
          <Image source={{ uri: fotoComprovanteSitae }} style={{ width: 200, height: 200 }} />
        ) : (
          <TouchableOpacity
            style={styles.input}
            onPress={() => pickImage(setFotoComprovanteSitae)}
          >
            <Text style={{ color: 'blue' }}>Anexar Foto</Text>
          </TouchableOpacity>
        )}
        {errorMessages.fotoComprovanteSitae && (
          <Text style={styles.errorMessage}>{errorMessages.fotoComprovanteSitae}</Text>
        )}
        <Text style={styles.label}>Valor Sigel</Text>
        <TextInputMask
          style={styles.input}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$ ',
            suffixUnit: '',
          }}
          onChangeText={(text) => setValor_sigel(text)}  // Atualizado aqui
          value={valor_sigel}
        />

        {errorMessages.valor_sigel && (
          <Text style={styles.errorMessage}>{errorMessages.valor_sigel}</Text>
        )}
        <Text style={styles.labelText}>Clique no botão abaixo para enviar uma foto do comprovante SITAE:</Text>
        <Text style={styles.label}>Foto do comprovante</Text>
        {fotoComprovanteSigel ? (
          <Image source={{ uri: fotoComprovanteSigel }} style={{ width: 200, height: 200 }} />
        ) : (
          <TouchableOpacity
            style={styles.input}
            onPress={() => pickImage(setFotoComprovanteSigel)}
          >
            <Text style={{ color: 'blue' }}>Anexar Foto</Text>
          </TouchableOpacity>
        )}
       
        <Text style={styles.label}>Bolão</Text>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={sim}
              onPress={() => {
                setSim(!sim);
                setNao(false);
              }}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="blue"
            />
            <Text style={styles.checkboxLabel}>Sim</Text>
            <CheckBox
              checked={nao}
              onPress={() => {
                setNao(!nao);
                setSim(false);
              }}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="blue"
            />
            <Text style={styles.checkboxLabel}>Não</Text>
          </View>
        </View>
         
        {sim ? (
          <>
            <Text style={styles.label}>Valor Bolão</Text>
            <TextInputMask
              style={styles.input}
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: '',
              }}
              onChangeText={(text) => setBolao(text)}
              value={bolao}
            />
           
          </>
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>ENVIAR RELATÓRIO</Text>
          </TouchableOpacity>
        </View>

        
          <TouchableOpacity  onPress={handleLogoff}>
            <Text  style={styles.buttonTextLog} >Sair do Aplicativo</Text>
          </TouchableOpacity>
     

        <TouchableOpacity  onPress={handleButtonBack}>
                <Text style={styles.buttonBack}>Voltar ao inicio</Text>
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
    position: 'relative',
    marginTop: 30,
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
  label: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'left',
    width: '80%',
    color: '#005ca8',
    textTransform: 'uppercase',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 10,
    textAlign: 'left',
    width: '80%',
    color: '#005ca8',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#4c82bd',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#2be0aa',
    borderRadius: 15,
    margin: 5,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#005da9',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
  },
  buttonTextLog: {
    color: '#555555',
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 20,
    fontWeight: '400',
  },
  buttonBack: {
    color: '#555555',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '45%',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 3,
  },
});
