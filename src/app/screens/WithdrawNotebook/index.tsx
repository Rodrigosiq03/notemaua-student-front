import { Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button, ButtonConfirm, CheckBox, CheckBoxContainer, CheckBoxLabel, Container, Content, Input, InputContainer, InputLabel, Title } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useState } from "react";
import { ContainerLinks, LinkText } from "../Login/styles";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithdrawContext } from "../../contexts/withdraw_context";
import { useFocusEffect } from "@react-navigation/native";
import { Withdraw } from "../../../@clean/shared/domain/entities/withdraw";

export function WithdrawNotebook({ route, navigation }: any) {
    const [isChecked, setIsChecked] = useState(false)
    const [serialNumber, setSerialNumber] = useState('')
    const [modal, setModal] = useState(false)

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
        if(withdraw) {
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
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao efetuar retirada',
                text2: 'Tente novamente',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    }

    async function Logout() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('login')
    }

    function Verify(){
        if(AsyncStorage.getItem('token') === null) navigation.navigate('login')
    }

    useFocusEffect(() => {
        setTimeout(()=>{
            Verify()
        }, 5000)
    })

    return (
        <>
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
                    <Text>Concordo com os <CheckBoxLabel onPress={()=>setModal(true)}><Text style={{color: '#1669B6'}}>termos de uso</Text></CheckBoxLabel></Text>
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
        {modal ?
            <Modal>
                <View style={{padding: 16}}>
                    <View>
                        <TouchableOpacity onPress={()=>setModal(false)}><Text style={{fontSize:24}}>X</Text></TouchableOpacity>
                    </View>
                    <View style={{marginTop:16}}>
                        <Text style={{fontWeight:'700', marginBottom:16, textAlign:"center"}}>Termos de uso do MauaNote</Text>
                    </View>
                    <Text style={{marginBottom:16, marginTop:16}}>
                        Declaro que estou ciente de que Centro Universitário do Instituto Mauá
                        de Tecnologia (IMT) cederá um kit notebook para o meu uso nas aulas
                        práticas de computação quando ocorrerem em que não sejam laboratórios
                        de informática equipados com desktops. Conforme horário de aulas e
                        indicação de uso, poderei retirar com um funcionário do corpo técnico
                        do IMT um kit notebook, composto: de 1 (um) notebook, 1 (uma) fonte e
                        1 (um) mouse.
                    </Text>
                    <Text style={{fontWeight:'700', marginBottom:16}}>
                        Para esse uso, assumo as responsabilidades abaixo e estou ciente de
                        que:
                    </Text>

                    <Text style={{marginBottom:16}}>
                        A retirada do kit notebook se dará pela minha presença nas salas U20
                        ou H207, conforme o prédio onde se dará as aulas, onde haverá um
                        mecanismo de identificação e de controle de retirada; o controle de
                        retirada e uso se dará pelo número de série do notebook, horário de
                        retirada e pela minha assinatura ou outra forma de autenticação;
                        Ao final de cada aula prática, me comprometo a devolver o kit
                        notebook no mesmo local onde foi retirado, e assinarei um protocolo de 
                        entrega, com o horário da devolução;
                    </Text>
                    <Text>
                        Estou ciente de que poderei ficar com o kit notebook retirado, caso
                        a aula seguinte também seja uma aula prática e não for ser ministrada
                        em sala onde já haja desktops;
                        Não devo circular com o kit notebook nas dependências da Mauá;
                        Não devo sair em hipótese alguma do campus da Mauá com o kit
                        notebook;
                        É de minha responsabilidade zelar pela guarda e conservação do kit
                        notebook que me foi cedido para uso;- Caso ocorra algo com o kit notebook ou algum problema de
                        funcionamento, comunicarei ao técnico responsável na sala em que
                        retirei o kit notebook;
                    </Text>
                </View>
            </Modal>
            :
            <></>
        }
        </>
    )
}