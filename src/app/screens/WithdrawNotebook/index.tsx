import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button, ButtonConfirm, CheckBox, CheckBoxContainer, CheckBoxLabel, Container, Content, Input, InputContainer, InputLabel, Title } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { ContainerLinks, LinkText } from "../Login/styles";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithdrawContext } from "../../contexts/withdraw_context";

export function WithdrawNotebook({ route, navigation }: any) {
    const [isChecked, setIsChecked] = useState(false)
    const [serialNumber, setSerialNumber] = useState('')

    const { createWithdraw } = useContext(WithdrawContext)
    const { serial } = route.params !== undefined ? route.params : '';
    
    async function PostWithdraw() {
        if(serialNumber === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar retirada',
                text2: 'Preencha o campo de número de série',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }
        if(!isChecked) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar retirada',
                text2: 'Você deve concordar com os termos de uso',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }

        const withdraw = await createWithdraw(serialNumber)
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Retirada efetuada com sucesso!',
            visibilityTime: 3000,
            autoHide: true,
        });
        setTimeout(() => {
            navigation.navigate('withdrawConfirm')
        }, 3000);
    }

    async function Logout() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('login')
    }

    function Verify(){
        if(AsyncStorage.getItem('token') === null) navigation.navigate('login')
    }

    useEffect(() => {
        setInterval(()=>{
            Verify()
        }, 5000)
    }, [])

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Retirada de Notebook</Title>

                <InputContainer>
                    <InputLabel>Digite/Escaneie o número de série:</InputLabel>
                    <Input value={serial} onChangeText={setSerialNumber}/>
                    
                </InputContainer>

                <Text style={{ marginTop:16, marginBottom:8 }}>Ou</Text>
                
                <Button onPress={()=>navigation.navigate('cameraScreen')}><Icon name="barcode" size={32} color="#fff"/></Button>

                <CheckBoxContainer>
                    <CheckBox onPress={()=>setIsChecked(!isChecked)}>
                        {isChecked ? <Icon name="check" size={16}/> : <Icon name="check" size={16} color="#fff"/>}
                    </CheckBox>
                    <Text>Concordo com os <CheckBoxLabel>termos de uso</CheckBoxLabel></Text>
                </CheckBoxContainer>

                <ButtonConfirm onPress={()=>PostWithdraw()}><Text style={{fontWeight:'bold', color:"#fff", fontSize:16}}>Confirmar</Text></ButtonConfirm>

                <ContainerLinks>
                <TouchableOpacity onPress={()=>Logout()}>
                    <LinkText>Sair <Icon name="sign-out-alt" size={20} color={'#545454'} /></LinkText>
                </TouchableOpacity>
                </ContainerLinks>
            </Content>

            <Footer/>
        </Container>
        </TouchableWithoutFeedback>
    )
}