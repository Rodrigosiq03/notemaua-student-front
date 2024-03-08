import { Text, View, Alert, Modal, TouchableOpacity } from "react-native";
import { CardContainer, CardContent, Cards, Container, Division, ModalContainer, Title } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user_context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Button, ContainerLinks, Content, Form, Input, InputContainer, InputLabel, LinkText, TextButton } from "../ChangePassword/styles";

export function ConfigScreen() {
    const [openModal, setOpenModal] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { deleteUser } = useContext(UserContext)
    const { updatePassword } = useContext(UserContext)
    const navigate = useNavigation()

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

        const ra = await AsyncStorage.getItem('ra');
        const success = await updatePassword(String(ra), password);
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
                navigate.goBack()
            }, 2000);
            return;
        }
    }

    function handleChangePassword() {
        setOpenModal(true)
    }

    async function handleDeleteUser(){
        Alert.alert(
            'Deletar Conta',
            'Você tem certeza que deseja deletar sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Deletar',
                    onPress: async () => {
                        AsyncStorage.removeItem('token')
                        const message = await deleteUser('')
                        if(message){
                            navigate.navigate('login')
                        }else{
                            Alert.alert('Erro', 'Não foi possível deletar a conta')
                        }
                    }
                }
            ]
        )
    }

    return (
        <>
        <Container>
                <Title>Configurações</Title>

                <Division />

                <Cards>
                    <CardContainer onPress={handleChangePassword}>
                            <CardContent>
                                <Icon name="lock" size={24}/>
                                <Text>Alterar senha</Text>
                            </CardContent>

                            <Icon name="chevron-right" size={24}/>
                    </CardContainer>

                    <CardContainer onPress={handleDeleteUser}>
                            <CardContent>
                                <Icon name="user" size={24}/>
                                <Text>Deletar Conta</Text>
                            </CardContent>

                            <Icon name="chevron-right" size={24}/>
                    </CardContainer>
                </Cards>
        </Container>

        {openModal ?
        <Modal>
            <ModalContainer>
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
                        <TouchableOpacity onPress={()=>setOpenModal(false)}>
                            <LinkText>Voltar<Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                        </TouchableOpacity>
                    </ContainerLinks>
                </Content>
            </ModalContainer>
        </Modal>
        :
        <></>
        }
        </>
    );
}