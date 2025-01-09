import React from "react";
import { Text, View, Alert, Modal, TouchableOpacity } from "react-native";
import { CardContainer, CardContent, Cards, Container, Division, ModalContainer, Title } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, ContainerLinks, Content, Form, Input, InputContainer, InputLabel, LinkText, TextButton } from "../../change_password/styles";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconGuideButton } from "../../forgot_password/styles";

export default function ConfigScreen() {
    const [openModal, setOpenModal] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [showGuide, setShowGuide] = useState(false)

    const { deleteUser } = useContext(UserContext)
    const { updatePassword } = useContext(UserContext)

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
                router.back()
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
                            router.navigate('/')
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

        {openModal &&
        <Modal>
            <ModalContainer>
                <Header />
                <Toast/>
                <Content>
                    <Title>Alterar Senha</Title>
                    
                    <Form>
                        <InputContainer>
                            <View style={{flexDirection:'row'}}>
                                <InputLabel>Nova senha</InputLabel>
                                <IconGuideButton onPress={()=>setShowGuide(!showGuide)}>
                                    {showGuide ?
                                    <Icon name="times-circle" size={20} color={'#545454'} />
                                    :
                                    <Icon name="question-circle" size={20} color={'#545454'} />
                                }
                                </IconGuideButton>
                            </View>
                            <View style={{display:`${showGuide ? 'flex' : 'none'}`, backgroundColor:'#1669B6', padding:8, borderRadius:15}}>
                                <Text style={{fontSize: 16, color: '#fff'}}>Deve conter no mínimo 8 caracteres.</Text>
                                <Text style={{fontSize: 16, color: '#fff'}}>Deve conter caracter especial.</Text>
                                <Text style={{fontSize: 16, color: '#fff'}}>Deve conter letra maiúscula.</Text>
                                <Text style={{fontSize: 16, color: '#fff'}}>Deve conter número.</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Input onChangeText={setPassword} secureTextEntry={showPassword}/>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} style={{position: 'absolute', right: 10}} onPress={()=>setShowPassword(!showPassword)}/>
                            </View>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Confirmar Senha</InputLabel>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Input onChangeText={setConfirmPassword} secureTextEntry={showConfirmPassword}/>
                                <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} style={{position: 'absolute', right: 10}} onPress={()=>setShowConfirmPassword(!showConfirmPassword)}/>
                            </View>
                        </InputContainer>
                    </Form>
                    
                    <Button onPress={()=>PutPassword()}>
                        <TextButton>Confirmar</TextButton>
                    </Button>
                    <ContainerLinks>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', gap:8}} onPress={()=>setOpenModal(false)}>
                            <LinkText>Voltar</LinkText>
                            <Icon name="sign-in-alt" size={20} color={'#545454'} />
                        </TouchableOpacity>
                    </ContainerLinks>
                </Content>
                <Footer />
            </ModalContainer>
        </Modal>
        }
        </>
    );
}