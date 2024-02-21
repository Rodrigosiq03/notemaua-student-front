import Toast from "react-native-toast-message";
import { Header } from "../../components/Header";
import { Container, Content, Form, Input, InputContainer, InputLabel, TextButton, Title, Button, ContainerLinks, LinkText } from "./styles";
import { Footer } from "../../components/Footer";
import { Link } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export function ChangePassword() {
    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Alterar Senha</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>Nova Senha</InputLabel>
                        <Input secureTextEntry={true}/>
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>Confirmar Senha</InputLabel>
                        <Input secureTextEntry={true}/>
                    </InputContainer>
                </Form>
                
                <Button>
                    <TextButton>Confirmar</TextButton>
                </Button>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'firstAccess'}}>Voltar </Link><Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>
            </Content>

            <Footer/>
        </Container>
    )
}