import { Header } from "../../components/Header";
import { Button, Container, ContainerLinks, Content, Form, Input, InputContainer, InputLabel, LinkText, Paragraph, TextButton, Title } from "./styles";
import { Link } from "@react-navigation/native";
import { Footer } from "../../components/Footer";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome5';

export function ForgotPassword() {
    const [email, setEmail] = useState('')

    function sendEmail() {
        if(email === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao enviar e-mail',
                text2: 'Preencha o campo de e-mail',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'E-mail enviado com sucesso!',
            visibilityTime: 3000,
            autoHide: true,
        });
    }

    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Esqueci a senha</Title>
                
                <Paragraph>
                    Você receberá um e-mail para redefinir sua senha.
                </Paragraph>

                <Form>
                    <InputContainer>
                        <InputLabel>E-mail (@maua.br)</InputLabel>
                        <Input onChangeText={setEmail}/>
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>sendEmail()}>
                    <TextButton>Enviar</TextButton>
                </Button>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'login'}}>Voltar </Link><Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>

            </Content>

            <Footer/>
        </Container>
    )
}