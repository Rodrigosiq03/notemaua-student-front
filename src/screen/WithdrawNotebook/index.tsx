import { Text } from "react-native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button, ButtonConfirm, CheckBox, CheckBoxContainer, CheckBoxLabel, Container, Content, Input, InputContainer, InputLabel, Title } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import { ContainerLinks, LinkText } from "../Login/styles";
import { Link } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export function WithdrawNotebook({ navigation }: any) {
    const [isChecked, setIsChecked] = useState(false)
    const [serialNumber, setSerialNumber] = useState('')

    function PostWithdraw() {
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

    return (
        <Container>
            <Header/>
            <Toast/>

            <Content>
                <Title>Retirada de Notebook</Title>

                <InputContainer>
                    <InputLabel>Digite/Escaneie o número de série:</InputLabel>
                    <Input onChangeText={setSerialNumber}/>
                </InputContainer>

                <Text style={{ marginTop:16, marginBottom:8 }}>Ou</Text>

                <Button><Icon name="barcode" size={32} color="#fff"/></Button>

                <CheckBoxContainer>
                    <CheckBox onPress={()=>setIsChecked(!isChecked)}>
                        {isChecked ? <Icon name="check" size={16}/> : <Icon name="check" size={16} color="#fff"/>}
                    </CheckBox>
                    <Text>Concordo com os <CheckBoxLabel>termos de uso</CheckBoxLabel></Text>
                </CheckBoxContainer>

                <ButtonConfirm onPress={()=>PostWithdraw()}><Text style={{fontWeight:'bold', color:"#fff", fontSize:16}}>Confirmar</Text></ButtonConfirm>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'login'}}>Sair </Link><Icon name="sign-out-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>
            </Content>

            <Footer/>
        </Container>
    )
}