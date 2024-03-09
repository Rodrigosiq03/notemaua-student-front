import Toast from "react-native-toast-message";
import { Header } from "../../components/Header";
import { Container, Content, Form, Input, InputContainer, InputLabel, TextButton, Title, Button, ContainerLinks, LinkText } from "./styles";
import { Footer } from "../../components/Footer";
import { Link, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { IconGuideButton } from "../ForgotPassword/styles";

export function ChangePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [showGuide, setShowGuide] = useState(false)

    const { updatePassword, error } = useContext(UserContext)
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

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Container>
            <Header/>
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
                    <TouchableOpacity onPress={()=>navigate.navigate('login')}>
                        <LinkText>Voltar<Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                    </TouchableOpacity>
                </ContainerLinks>
            </Content>

            <Footer/>
        </Container>
        </TouchableWithoutFeedback>
    )
}