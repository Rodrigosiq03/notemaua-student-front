import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Content, Button, TextButton } from './styles';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { generateCodeChallenge, generateCodeVerifier } from '@/utils/generate_code_challenge';
import { UserContext } from '@/contexts/user_context';
import { Header } from '@/components/Header';
import { Microsoft } from '@/components/Microsoft';
import { Footer } from '@/components/Footer';

WebBrowser.maybeCompleteAuthSession(); // Finalizar sessões incompletas

const authorizationEndpoint = `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize`;

export default function Index() {
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const { oauthLogin } = useContext(UserContext);

    useEffect(() => {
        async function checkAuth() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigate.push('/(tabs)/withdraw');
            }
        }
        checkAuth();
    }, []);

    const handleAuth = async () => {
        setLoading(true);
        try {
            // Gera o codeVerifier e o codeChallenge
            const codeVerifier = generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);

            console.log('Code Verifier:', codeVerifier);
            console.log('Code Challenge:', codeChallenge);

            // Salva o codeVerifier no AsyncStorage para uso posterior no backend
            await AsyncStorage.setItem('codeVerifier', codeVerifier);

            // Cria a URL de autorização manualmente
            const authUrl = `${authorizationEndpoint}?client_id=${process.env.EXPO_PUBLIC_AZURE_CLIENT_ID}&response_type=code&redirect_uri=${
                Platform.OS === 'ios'
                    ? process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI!
                    : process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI_ANDROID!
            }&response_mode=query&scope=openid profile email offline_access User.Read&code_challenge=${codeChallenge}&code_challenge_method=S256`;

            console.log('Authorization URL:', authUrl);

            // Abre o navegador para o login
            const result = await WebBrowser.openAuthSessionAsync(authUrl, Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI! : process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI_ANDROID!);

            if (result.type === 'success' && result.url) {
                // Processa o código de autorização da URL de resposta
                const urlParams = new URLSearchParams(result.url.split('?')[1]);
                const code = urlParams.get('code');

                if (!code) {
                    throw new Error('Código de autorização não encontrado na resposta.');
                }

                console.log('Authorization Code:', code);

                // Recupera o codeVerifier e envia o code para o backend
                const storedCodeVerifier = await AsyncStorage.getItem('codeVerifier');
                if (!storedCodeVerifier) {
                    throw new Error('Code verifier não encontrado.');
                }

                const token = await oauthLogin(code, storedCodeVerifier);
                console.log('Token:', token);
                const ra = await AsyncStorage.getItem('studentRA');

                Toast.show({ type: 'success', text1: ra === null ? 'Login bem-sucedido!' : `Bem vindo, ${ra}` });
                setTimeout(() => navigate.push('/(tabs)/withdraw'), 1200);
            } else {
                console.log('Login cancelado ou não concluído.');
            }
        } catch (error: any) {
            console.error(error);
            Toast.show({ type: 'error', text1: 'Erro no Login', text2: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <Header />
                <Toast />
                <Content>
                    <Microsoft />
                    <Button onPress={handleAuth}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <TextButton>Entrar com Microsoft</TextButton>
                        )}
                    </Button>
                </Content>
                <Footer />
            </Container>
        </TouchableWithoutFeedback>
    );
}
