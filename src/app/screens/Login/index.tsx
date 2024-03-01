import { Link } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Container, Content, InputLabel, Title, InputContainer, Form, Input, Button, TextButton, LinkText, ContainerLinks } from './styles';
import Toast from 'react-native-toast-message';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskInput from 'react-native-mask-input';


export function Login({ navigation }: any){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { login, setIsLogged } = useContext(UserContext)

    async function getLogin() {
        if(email === '' || password === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar login',
                text2: 'Preencha todos os campos',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        await login(email, password)
        if (await AsyncStorage.getItem('token')) {
            setIsLogged(true)

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login efetuado com sucesso!',
                visibilityTime: 2000,
                autoHide: true,
            });
            setTimeout(() => {
                navigation.navigate('withdraw')
            }, 2000);
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar login',
                text2: 'Usuário ou senha inválidos',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    }

    async function verify() {
        if(await AsyncStorage.getItem('token')) {
            navigation.navigate('withdraw')
        }
    }
    
    useEffect(() => {
        verify()
    })

    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>LOGIN</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>E-mail (@maua.br)</InputLabel>
                        <MaskInput
                            style={{backgroundColor: '#D6D6D6', width: 300, padding: 8, borderRadius: 10, fontSize: 16}}
                            value={email}
                            onChangeText={(masked, unmasked) => {
                            setEmail(masked);}}
                            mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, '@maua.br']}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>Senha</InputLabel>
                        <Input onChangeText={setPassword} secureTextEntry={true}/>
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>getLogin()}>
                    <TextButton>Entrar</TextButton>
                </Button>

                <ContainerLinks>
                    <LinkText>Primeiro acesso? <Link style={{color:"#1669B6", fontWeight:"bold"}} to={{screen: 'firstAccess'}}>Clique Aqui</Link></LinkText>
                    <LinkText><Link style={{color:"#1669B6", fontWeight:"bold"}} to={{screen: 'forgotPassword'}}>Esqueci minha senha</Link></LinkText>
                </ContainerLinks>

            </Content>

            <Footer/>
        </Container>
    )
}