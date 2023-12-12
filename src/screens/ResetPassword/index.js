import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function ResetPassword() {

    const [email, setEmail] = useState('');
    const [senha_hash, setSenha_hash] = useState('')

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        senha_hash: '',
    });


    const navigation = useNavigation();



    const handleResetPassword = async () => {
        const errors = {
            email: '',
            senha_hash: '',
            error: '',
        };

        if (!email) {
            errors.email = 'Email é obrigatório';
        }

        if (!senha_hash) {
            errors.senha_hash = 'Senha é obrigatória';
        }

        setErrorMessages(errors);

        if (errors.email || errors.senha_hash) {
            return;
        }

        try {
            const formData = {
                email,
                senha_hash,
            };

            // Envia a solicitação para redefinir a senha para o servidor
            const response = await axios.put('http://192.168.15.26:3000/resetPassword', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Resposta do servidor:', response.data);

            // Verifique se a redefinição de senha foi bem-sucedida no lado do servidor
            if (response.status === 200) {
                // Redirecione o usuário para a tela de login ou outra tela apropriada
                //navigation.navigate('Login');
                Alert.alert('Senha alterada com sucesso');
            } else {
                // Trate qualquer erro de redefinição de senha que possa ocorrer
                // Por exemplo, exiba uma mensagem de erro para o usuário
                setErrorMessages({ ...errors, error: 'Erro ao redefinir a senha' });
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            if (error.response) {
                if (error.response.status === 422) {
                    setErrorMessages({ ...errors, senha_hash: 'Senha inválida' });
                } else {
                    setErrorMessages({ ...errors, email: 'Erro de validação no email' });
                }
            }
        }
    };


    function handleReset() {
        navigation.navigate('SignIn')
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            {errorMessages.email && (
                <Text style={styles.errorMessage}>{errorMessages.email}</Text>
            )}
            <Text style={styles.label}>Nova senha</Text>
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
                <Text style={styles.label}>Voltar para login</Text>
            </TouchableOpacity>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Alterar senha</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
            {/* <Footer /> */}
        </View>




    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
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
        borderColor: 'rgb(160, 15, 255)',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 1,
        marginBottom: 25,
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
        backgroundColor: 'rgb(160, 15, 255)',
        borderRadius: 40,
        margin: 5,
        fontSize: 14,
        paddingVertical: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginBottom: 3,
    },
});
