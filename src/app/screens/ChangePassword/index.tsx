import Toast from "react-native-toast-message";
import { Header } from "../../components/Header";
import { Container, Content, Form, Input, InputContainer, InputLabel, TextButton, Title, Button, ContainerLinks, LinkText } from "./styles";
import { Footer } from "../../components/Footer";
import { Link } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export function ChangePassword({ route, navigation }: any) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { updatePassword, error } = useContext(UserContext)

    async function PutPassword() {
        if(password === '' || confirmPassword === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao alterar senha',
                text2: 'Preencha todos os campos',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        if(password !== confirmPassword) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao alterar senha',
                text2: 'As senhas não coincidem',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }

        const ra = route.params.ra
        const success = await updatePassword(ra, password);
        if(!success){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao alterar senha',
                text2: 'Tente novamente mais tarde',
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }else{
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Senha alterada com sucesso!',
                visibilityTime: 2000,
                autoHide: true,
            });
            setTimeout(() => {
                navigation.navigate('login')
            }, 2000);
            return;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Alterar Senha</Title>
                
                <Form>
                    <InputContainer>
                        <InputLabel>Nova Senha</InputLabel>
                        <Input secureTextEntry={true} onChangeText={setPassword}/>
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>Confirmar Senha</InputLabel>
                        <Input secureTextEntry={true} onChangeText={setConfirmPassword}/>
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>PutPassword()}>
                    <TextButton>Confirmar</TextButton>
                </Button>

                <ContainerLinks>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <LinkText>Voltar<Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                    </TouchableOpacity>
                </ContainerLinks>
            </Content>

            <Footer/>
        </Container>
        </TouchableWithoutFeedback>
    )
}