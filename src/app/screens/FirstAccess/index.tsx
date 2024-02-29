import { Link } from "@react-navigation/native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button, Container, ContainerLinks, Content, FirstAccessText, Form, Input, InputContainer, InputLabel, TextButton, Title } from "./styles";
import Toast from "react-native-toast-message";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';

export function FirstAccess({ navigation }: any) {
    const [email, setEmail] = useState('')

    function PostFirstAccess() {
        if(email === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar primeiro acesso',
                text2: 'Preencha o campo de e-mail',
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
            navigation.navigate('changePassword')
        }, 3000);
    }
    
    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Primeiro Acesso</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>E-mail (@maua.br)</InputLabel>
                        <Input onChangeText={setEmail}/>
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>PostFirstAccess()}>
                    <TextButton>Entrar</TextButton>
                </Button>

                <ContainerLinks>
                    <FirstAccessText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'login'}}>Voltar </Link><Icon name="sign-in-alt" size={20} color={'#545454'} /> </FirstAccessText>
                </ContainerLinks>

            </Content>

            <Footer/>
        </Container>
    )
}