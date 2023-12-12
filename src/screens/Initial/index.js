import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
//import { TextInputMask } from 'react-native-masked-text';

import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export default function Initial() {

    const navigation = useNavigation();

    const handleButtonClick = () => {
        // Redirecionamento para a tela desejada
        navigation.navigate('SignIn');
    };

    return (
        
            <View style={styles.container}>
                {/* logo e background */}
                <ImageBackground
                    resizeMode="cover"
                    source={require('../../assets/images/Cadastre-se.png')}
                    style={styles.backgroundImage}
                >
                    {/* Adicione a logo */}
                    <View style={styles.containerHeader}>
                        <Image
                            resizeMode="cover"
                            source={require('../../assets/images/logo_pequeno.png')}
                            style={styles.logo}
                        />
                    </View>

                    {/* Adicione uma View para envolver o botão */}
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Contabilidade em suas mãos</Text>
                        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHeader: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        marginLeft: -40, // Ajuste conforme necessário
        marginTop: 20, // Ajuste conforme necessário
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 900,
    },
    logo: {
        width: 300, // Ajuste conforme necessário
        height: 125, // Ajuste conforme necessário
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0, // Posiciona a partir do fundo da tela
        width: '100%', // Faz com que ocupe a largura total
        marginBottom: '30%', // Ajuste conforme necessário
    },
    button: {
        backgroundColor: '#293998',
        padding: 15,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 70,
        shadowColor: '#000',
        marginTop: '10%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 3,
        borderColor: '#2691c5',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});