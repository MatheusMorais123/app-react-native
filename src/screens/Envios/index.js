import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
//import RNFS from 'react-native-fs';

export default function DepartamentoFiscal() {
  const [mes, setMes] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedMesId, setSelectedMesId] = useState(null);
  const [pickerValue, setPickerValue] = useState(null); // Alterado para iniciar com null
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(true);

  const navigation = useNavigation();

  const handle = () => {
    navigation.navigate('Home');
  };

  /* const downloadFile = async () => {
    // Sua lógica de download aqui
    // Certifique-se de usar o selectedMesId para obter o mês correto
    console.log('Baixando arquivo para o mês selecionado:', selectedMesId);
  };
 */

  /* const downloadFile = async () => {
    try {
      if (selectedMesId) {
        // Use o ID selecionado para construir a URL da sua API
        const downloadUrl = `http://62.72.9.100:3000/envio-download/${selectedMesId}`;
  
        // Realize a requisição para baixar o arquivo
        const response = await fetch(downloadUrl);
  
        // Verifique se a resposta foi bem-sucedida (código de status 200)
        if (response.ok) {
          // Converta a resposta para um blob (tipo de dado de arquivo)
          const blob = await response.blob();
  
          // Crie um URL temporário para o blob
          const url = window.URL.createObjectURL(blob);
  
          // Crie um link temporário e clique nele para iniciar o download
          const a = document.createElement('a');
          a.href = url;
          a.download = `arquivo_${selectedMesId}.xlsx`;
          a.click();
  
          // Limpe o URL temporário após o download
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Erro ao baixar o arquivo:', response.statusText);
        }
      } else {
        console.warn('Nenhum mês selecionado para download.');
      }
    } catch (error) {
      console.error('Erro durante o download:', error);
    }
  };
   */

  const downloadFile = async () => {
    if (selectedMesId !== null) {
      // URL do arquivo que você deseja baixar
      const downloadUrl = `http://62.72.9.100:3000/envio-download/${selectedMesId}`;

      // Abre o navegador com a URL do download
      Linking.openURL(downloadUrl)
        .then(() => {
          console.log('Navegador aberto com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao abrir o navegador:', error);
        });
    } else {
      console.warn('Nenhum mês selecionado para download.');
    };
  };
   

  useEffect(() => {
    console.log('useEffect - Executando fetchItems');
    const fetchItems = async () => {
      try {
        const storedCnpj = await AsyncStorage.getItem('cnpj');
        console.log('CNPJ recuperado do AsyncStorage:', storedCnpj);

        if (storedCnpj) {
          const apiUrl = `http://62.72.9.100:3000/envio/${encodeURIComponent(storedCnpj)}?sort=createdAt`;
          console.log('API URL:', apiUrl);

          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log('useEffect - Dados obtidos:', data);

          const formattedItems = data.nf.map((item) => {
            const date = new Date(item.createdAt);
            const options = { month: 'long' };
            const month = new Intl.DateTimeFormat('pt-BR', options).format(date);
            console.log('ID do item:', item.id);
            setSelectedMesId(item.id);
            return {
              label: `${month}`,
              value: item.id,
            };
          });

          setItems(formattedItems);
          if (formattedItems.length > 0) {
            console.log('useEffect - Definindo pickerValue para null para permitir seleção inicial');
            setPickerValue(null); // Defina para null ou undefined para permitir seleção inicial
            setDownloadButtonDisabled(false); // Habilita o botão de download quando há itens disponíveis
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar CNPJ do AsyncStorage:', error);
      }
    };

    fetchItems();
  }, []);

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
          <RNPickerSelect
            onValueChange={(value) => {
              console.log('onValueChange - Valor selecionado:', value);
              setSelectedMesId(value);
              setMes(value);
              setPickerValue(value); // Atualize o valor do picker
            }}
            items={items}
            value={pickerValue} // Atualizado para refletir o estado 'pickerValue'
            placeholder={{ label: 'Acessar Notas Fiscais', value: null }}
            style={{
              placeholder: {
                color: '#005ca7',
                fontWeight: '900',
                fontSize: 18,
                textAlign: 'center'
              },
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: downloadButtonDisabled ? '#d3d3d3' : '#fbfcfc' }]}
          onPress={downloadFile}
          disabled={downloadButtonDisabled}
        >
          <Text style={styles.buttonText}>Baixar Notas Fiscais</Text>
        </TouchableOpacity>
      </View>
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
