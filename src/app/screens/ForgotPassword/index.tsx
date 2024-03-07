import { Header } from "../../components/Header";
import { Button, Container, ContainerLinks, Content, Form, Input, InputContainer, InputLabel, LinkText, Paragraph, TextButton, Title } from "./styles";
import { Link } from "@react-navigation/native";
import { Footer } from "../../components/Footer";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from "../../contexts/user_context";
import MaskInput from "react-native-mask-input";
import { Keyboard, Modal, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const { forgotPassword } = useContext(UserContext)
    const [alterText, setAlterText] = useState(false)
    const [modal, setModal] = useState(false)
    const [code, setCode] = useState('')

    async function sendEmail() {
        if(email === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao enviar e-mail',
                text2: 'Preencha o campo de e-mail',
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }
        const msg = await forgotPassword(email)
        if(msg === undefined) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao enviar e-mail',
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }else{
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'E-mail enviado com sucesso!',
                visibilityTime: 2000,
                autoHide: true,
            });
            setAlterText(true)
            setTimeout(()=> {
                setModal(true)
            }, 2000)
        }
    }

    async function verifyCode() {
        if(code === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao verificar código',
                text2: 'Preencha o campo de código',
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
                        <MaskInput
                            style={{backgroundColor: '#D6D6D6', width: 300, padding: 8, borderRadius: 10, fontSize: 16}}
                            value={email}
                            onChangeText={(masked, unmasked) => {
                                setEmail(masked);}}
                                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, '@maua.br']}
                        />
                    </InputContainer>
                </Form>
                
                <Button onPress={()=>sendEmail()}>
                    <TextButton>{alterText ? "Reenviar" : "Enviar"}</TextButton>
                </Button>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'login'}}>Voltar </Link><Icon name="sign-in-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>

            </Content>

            <Footer/>
            {modal ? 
                <Modal>
                    <View style={{padding: 24, flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={()=>setModal(false)}>
                            <Icon name="times" size={20} color={'#545454'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'center', marginTop:16, alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, fontWeight: 'bold'}}>Código de Verificação</Text>
                        <Text style={{textAlign: 'center', fontSize: 20, color: '#545454'}}>E-mail enviado com sucesso!</Text>
                        <Text style={{textAlign: 'center', fontSize: 16, color: '#545454'}}>Verifique sua caixa de entrada.</Text>

                        <InputContainer style={{marginTop: 16}}>
                            <InputLabel>Código de Verificação</InputLabel>
                            <Input onChangeText={setCode} style={{backgroundColor: '#D6D6D6', width: 300, padding: 8, borderRadius: 10, fontSize: 16}}/>
                        </InputContainer>

                        <Button onPress={()=>verifyCode()}>
                            <TextButton>Verificar</TextButton>
                        </Button>
                    </View>
                </Modal>
                :
                <></>
            }
        </Container>
        </TouchableWithoutFeedback>
    )
}