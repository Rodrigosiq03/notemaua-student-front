import { Text } from "react-native";
import { CircleCheck, Container, ContainerText, Content, Title } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ContainerLinks, LinkText } from "../Login/styles";
import { Link, useFocusEffect } from "@react-navigation/native";
import { useContext, useState } from "react";
import { WithdrawContext } from "../../contexts/withdraw_context";

export function WithdrawConfirm() {
    const [initTime, setInitTime] = useState('')
    const [name, setName] = useState('')
    const [ra, setRa] = useState('')

    const { withdrawCreated } = useContext(WithdrawContext)

    useFocusEffect(() => {
        if(withdrawCreated !== undefined) {
            if (withdrawCreated.initTime !== undefined) {
                const dataFormat = new Date(withdrawCreated.initTime).getHours() + ':' + new Date(withdrawCreated.initTime).getMinutes();
                setInitTime(dataFormat);
            }
            if (withdrawCreated.name !== undefined) {
                setName(withdrawCreated.name);
            }
            if (withdrawCreated.studentRA !== undefined) {
                setRa(withdrawCreated.studentRA);
            }
        }
    })
    return (
        <Container>
            <Header/>
            
            <Content>
                <Title>Retirada Confirmada</Title>

                <CircleCheck>
                    <Icon name="check" size={64} color='#fff'/>
                </CircleCheck>

                <ContainerText>
                    <Text>Horário da Retirada: <Text style={{fontWeight: 'bold'}}>{initTime}</Text></Text>
                    <Text>{name}</Text>
                    <Text>RA: <Text style={{fontWeight: 'bold'}}>{ra}</Text></Text>
                </ContainerText>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'withdrawNotebook'}}>Sair </Link><Icon name="sign-out-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>
            </Content>


            <Footer/>
        </Container>
    )
}