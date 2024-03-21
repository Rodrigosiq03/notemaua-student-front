import { Link, useNavigation } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Container, Content, InputLabel, Title, InputContainer, Form, Input, Button, TextButton, LinkText, ContainerLinks } from './styles';
import Toast from 'react-native-toast-message';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import MaskInput from 'react-native-mask-input';


export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const { login, setIsLogged } = useContext(UserContext)
    const navigate = useNavigation()

    async function getLogin() {
        setLoading(true)
        if(email === '' || password === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar login',
                text2: 'Preencha todos os campos',
                visibilityTime: 3000,
                autoHide: true,
            });
            setLoading(false)
            return;
        }
        await login(`${email}@maua.br`, password)
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
                setLoading(false)
                navigate.navigate('withdraw')
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
            setLoading(false)
        }
    }

    useEffect(() => {
        async function verify() {
            if(await AsyncStorage.getItem('token')) {
                navigate.navigate('withdraw')
            }
        }
        setInterval(() => verify(), 5000)
        verify()
    }, [])

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>LOGIN</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>Ra do aluno</InputLabel>
                        <MaskInput
                            style={{backgroundColor: '#D6D6D6', width: 300, padding: 8, borderRadius: 10, fontSize: 16, textAlign: 'center'}}
                            value={email}
                            onChangeText={(masked, unmasked) => {
                                setEmail(masked);}}
                                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>Senha</InputLabel>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Input onChangeText={setPassword} secureTextEntry={showPassword}/>
                            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} style={{position: 'absolute', right: 10}} onPress={()=>setShowPassword(!showPassword)}/>
                        </View>
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>getLogin()}>
                    {loading ?
                        <ActivityIndicator size="large" color="#fff" />
                        :
                        <TextButton>Entrar</TextButton>
                    }
                </Button>

                <ContainerLinks>
                    <LinkText>Primeiro acesso? <Link style={{color:"#1669B6", fontWeight:"bold"}} to={{screen: 'firstAccess'}}>Clique Aqui</Link></LinkText>
                    <LinkText><Link style={{color:"#1669B6", fontWeight:"bold"}} to={{screen: 'forgotPassword'}}>Esqueci minha senha</Link></LinkText>
                </ContainerLinks>

            </Content>

            <Footer/>
        </Container>
        </TouchableWithoutFeedback>
    )
}