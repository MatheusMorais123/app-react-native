import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import axios from 'axios';
import { encode } from 'base-64';
import Header from '../../components/Header'
import * as DocumentPicker from 'expo-document-picker';

export default function Admin() {

    /* const handleDownloadPlanilhaGeral = async () => {
        try {
          const { uri } = await DocumentPicker.getDocumentAsync({
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
    
          if (uri) {
            const response = await axios.get('http://192.168.15.26:3000/loterias/download', {
              responseType: 'arraybuffer',
            });
    
            if (response.status === 200) {
              const planilhaGeralBuffer = response.data;
              const base64String = encode(new Uint8Array(planilhaGeralBuffer));
    
              await FileSystem.writeAsStringAsync(uri, base64String, {
                encoding: FileSystem.EncodingType.Base64,
              });
    
              Alert.alert(
                'Download Concluído',
                `A planilha geral foi baixada com sucesso!\nCaminho do arquivo: ${uri}`
              );
            } else {
              Alert.alert('Erro', 'Erro ao fazer o download da planilha geral.');
            }
          }
        } catch (error) {
          console.error('Erro ao fazer o download da planilha geral:', error);
          Alert.alert('Erro', `Erro ao fazer o download da planilha geral. Detalhes: ${error.message}`);
        }
      };
     */
      
    
    const handleDownloadPlanilhaGeral = async () => {
        try {
            const response = await axios.get('http://62.72.9.100:3000/loterias/download', {
                responseType: 'arraybuffer',
            });
    
            if (response.status === 200) {
                const planilhaGeralBuffer = response.data;
    
                const base64String = encode(new Uint8Array(planilhaGeralBuffer));
    
                const downloadsDirectory = `${FileSystem.documentDirectory}Download/`;
                const path = `${downloadsDirectory}planilha_geral.xlsx`;
    
                // Certifique-se de que o diretório de downloads exista
                await FileSystem.makeDirectoryAsync(downloadsDirectory, { intermediates: true });
    
                await FileSystem.writeAsStringAsync(path, base64String, {
                    encoding: FileSystem.EncodingType.Base64,
                });
    
                Alert.alert(
                    'Download Concluído',
                    `A planilha geral foi baixada com sucesso!\nCaminho do arquivo: ${path}`
                );
    
                // Abrir a planilha após o download
               /*  abrirPlanilhaLocal(path); */
            } else {
                Alert.alert('Erro', 'Erro ao fazer o download da planilha geral.');
            }
        } catch (error) {
            console.error('Erro ao fazer o download da planilha geral:', error);
            Alert.alert('Erro', 'Erro ao fazer o download da planilha geral. Tente novamente.');
        }
    };
    
    /* const abrirPlanilhaLocal = async (path) => {
        try {
            const localFilePath = `file://${path}`;
    
            if (Platform.OS === 'android') {
                // Adapte o código para Android, se necessário
            } else if (Platform.OS === 'ios') {
                // Abrir o aplicativo associado para arquivos .xlsx
                await Linking.openURL(localFilePath);
            }
        } catch (error) {
            console.error('Erro ao abrir a planilha:', error);
            Alert.alert('Erro', 'Erro ao abrir a planilha. Tente novamente.');
        }
    };  */
    
       
   /* const handleDownloadPlanilhaGeral = async () => {
        try {
            const response = await axios.get('http://192.168.15.26:3000/loterias/download', {
                responseType: 'arraybuffer',
            });
    
            if (response.status === 200) {
                const planilhaGeralBuffer = response.data;
    
                const base64String = encode(new Uint8Array(planilhaGeralBuffer));
    
                // Salvar o arquivo na pasta de cache
                const path = `${FileSystem.cacheDirectory}planilha_geral.xlsx`;
                await FileSystem.writeAsStringAsync(path, base64String, {
                    encoding: FileSystem.EncodingType.Base64,
                });
    
                // Salvar o arquivo na galeria
                const asset = await MediaLibrary.createAssetAsync(path);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
    
                Alert.alert(
                    'Download Concluído',
                    'A planilha geral foi baixada com sucesso e salva na galeria!'
                );
            } else {
                Alert.alert('Erro', 'Erro ao fazer o download da planilha geral.');
            }
        } catch (error) {
            console.error('Erro ao fazer o download da planilha geral:', error);
            Alert.alert('Erro', 'Erro ao fazer o download da planilha geral. Tente novamente.');
        }
    }; */
    return (
        <ScrollView>
            <View style={styles.containerHeader}>
                <Header />
            </View>
            <View style={styles.container}>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Admin</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.rows}>Planilha Individual</Text>
                    {/* <Text style={styles.rows}>Planilha Geral</Text> */}
                    <TouchableOpacity style={styles.rowsButton} onPress={handleDownloadPlanilhaGeral}>
                        <Text style={styles.rows}>Planilha Geral</Text>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 20,
    },
    rows: {
        marginLeft: 10,
        fontSize: 20,
    }
});
