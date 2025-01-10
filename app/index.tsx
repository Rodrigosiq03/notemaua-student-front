import { Link, router, useFocusEffect, useRouter } from 'expo-router';
import { Footer } from '@/components/Footer';
import { Microsoft } from '@/components/Microsoft';
import { Header } from '@/components/Header';
import { Container, Content, InputLabel, Title, InputContainer, Form, Input, Button, TextButton, LinkText, ContainerLinks } from './styles';
import Toast from 'react-native-toast-message';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

export default function Index() {
    const [loading, setLoading] = useState(false)

    const navigate = useRouter()

    const { login, setIsLogged } = useContext(UserContext)

    async function getLogin() {
        setLoading(true)
        navigate.navigate('/(tabs)/withdraw')
    }

    useFocusEffect(() => {
        async function verify() {
            if (await AsyncStorage.getItem('token')) {
                router.navigate('/(tabs)/withdraw')
            }
        }
        verify()
    })

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <Header />
                <Toast />

                <Content>
                    <Microsoft />
                    <Button onPress={() => getLogin()}>
                        {loading ?
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <TextButton>Entrar</TextButton>
                        }
                    </Button>
                </Content>

                <Footer />
            </Container>
        </TouchableWithoutFeedback>
    )
}
