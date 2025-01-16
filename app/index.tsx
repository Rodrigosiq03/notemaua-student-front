import { Link, router, useFocusEffect, useRouter } from 'expo-router';
import { Footer } from '@/components/Footer';
import { Microsoft } from '@/components/Microsoft';
import { Header } from '@/components/Header';
import { Container, Content, Button, TextButton } from './styles';
import Toast from 'react-native-toast-message';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // Finalizar sessões incompletas

const discovery = {
    authorizationEndpoint: `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/organizations/oauth2/v2.0/token`,
};

export default function Index() {
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const { login, setIsLogged, oauthLogin } = useContext(UserContext);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_AZURE_CLIENT_ID!,
            scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
            redirectUri: Platform.OS === 'ios' ?  process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI! : process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI_ANDROID!,
            usePKCE: true
        },
        discovery
    );

    useEffect(() => {
        async function handleLogin() {
            if (response?.type === 'success') {
                setLoading(true);
                try {
                    const { code } = response.params;



                    const token = await oauthLogin(code);

                    console.log('Code:', code);

                    // console.log(process.env.EXPO_PUBLIC_AZURE_CLIENT_ID);
                    // console.log(process.env.EXPO_PUBLIC_AZURE_CLIENT_SECRET);

                    // const tokenResponse = await AuthSession.exchangeCodeAsync({
                    //     clientId: process.env.EXPO_PUBLIC_AZURE_CLIENT_ID!,
                    //     clientSecret: process.env.EXPO_PUBLIC_AZURE_CLIENT_SECRET!,
                    //     code,
                    //     redirectUri: process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI!,
                    //     extraParams: {
                    //         client_id: process.env.EXPO_PUBLIC_AZURE_CLIENT_ID!,
                    //         client_secret: process.env.EXPO_PUBLIC_AZURE_CLIENT_SECRET!,
                    //         scope: 'openid profile email offline_access User.Read',
                    //         grant_type: 'authorization_code'
                    //     }
                    // }, discovery)

                    // console.log('Token Response:', tokenResponse);

                    
                    
                    // const { accessToken } = tokenResponse;

                    // const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
                    //     headers: {
                    //         Authorization: `Bearer ${accessToken}`
                    //     }
                    // });

                    // const userData = await userInfoResponse.json();
                    // console.log('User Info:', userData);

                    // await AsyncStorage.setItem('token', accessToken);
                    // await AsyncStorage.setItem('user', JSON.stringify(userData));

                    Toast.show({ type: 'success', text1: 'Login bem-sucedido!' });
                    navigate.push('/(tabs)/withdraw');
                } catch (error: any) {
                    Toast.show({ type: 'error', text1: 'Erro no Login', text2: error.message });
                } finally {
                    setLoading(false);
                }
            }
        }
        if (response) {
            handleLogin();
        }
    }, [response]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <Header />
                <Toast />

                <Content>
                    <Microsoft />
                    <Button onPress={() => promptAsync()}>
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
