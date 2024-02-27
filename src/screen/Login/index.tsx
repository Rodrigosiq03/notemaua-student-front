import { Link } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Container, Content, InputLabel, Title, InputContainer, Form, Input, Button, TextButton, LinkText, ContainerLinks } from './styles';
import Toast from 'react-native-toast-message';
import { useState } from 'react';


export function Login({ navigation }: any){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function getLogin() {
        if(email === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar login',
                text2: 'Preencha o campo de e-mail',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        if(password === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar login',
                text2: 'Preencha o campo de senha',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Login efetuado com sucesso!',
            visibilityTime: 3000,
            autoHide: true,
        });
        setTimeout(() => {
            navigation.navigate('withdraw')
        }, 3000);
    }

    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>LOGIN</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>E-mail (@maua.br)</InputLabel>
                        <Input onChangeText={setEmail}/>
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