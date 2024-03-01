import { Link } from "@react-navigation/native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button, Container, ContainerLinks, Content, FirstAccessText, Form, Input, InputContainer, InputLabel, TextButton, Title } from "./styles";
import Toast from "react-native-toast-message";
import { useContext, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from "../../contexts/user_context";
import MaskInput from 'react-native-mask-input';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function FirstAccess({ navigation }: any) {
    const [ra, setRa] = useState('')

    const { firstAccess } = useContext(UserContext)

    async function PostFirstAccess() {
        if(ra === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar primeiro acesso',
                text2: 'Preencha todos os campos',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }

        if(!await firstAccess(ra)){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar primeiro acesso',
                text2: 'RA não encontrado',
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }else{
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Primeiro acesso efetuado',
                text2: 'Redirecionando...',
                visibilityTime: 2000,
                autoHide: true,
            });
            await AsyncStorage.setItem('ra', ra)
            setTimeout(() => {
                navigation.navigate('changePassword')
            }, 2000);
        }
    }
    
    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Primeiro Acesso</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>Ra do Aluno:</InputLabel>
                        <MaskInput
                            style={{backgroundColor: '#D6D6D6', width: 300, padding: 8, borderRadius: 10, fontSize: 16, textAlign: 'center'}}
                            value={ra}
                            onChangeText={(masked, unmasked) => {
                            setRa(masked);}}
                            mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                        />    
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