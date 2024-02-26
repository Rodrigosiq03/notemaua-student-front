import { Text } from "react-native";
import { CircleCheck, Container, ContainerText, Content, Title } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ContainerLinks, LinkText } from "../Login/styles";
import { Link } from "@react-navigation/native";

export function WithdrawConfirm() {
    return (
        <Container>
            <Header/>
            
            <Content>
                <Title>Retirada Confirmada</Title>

                <CircleCheck>
                    <Icon name="check" size={64} color='#fff'/>
                </CircleCheck>

                <ContainerText>
                    <Text>Horário da Retirada: <Text style={{fontWeight: 'bold'}}>07:40</Text></Text>
                    <Text>Luigi Guimarães Trevisan</Text>
                    <Text>22.01102-0@maua.br</Text>
                    <Text>RA: <Text style={{fontWeight: 'bold'}}>22.01102</Text></Text>
                </ContainerText>

                <ContainerLinks>
                    <LinkText><Link style={{color:"#545454", fontWeight:"500"}} to={{screen: 'withdrawNotebook'}}>Sair </Link><Icon name="sign-out-alt" size={20} color={'#545454'} /></LinkText>
                </ContainerLinks>
            </Content>


            <Footer/>
        </Container>
    )
}