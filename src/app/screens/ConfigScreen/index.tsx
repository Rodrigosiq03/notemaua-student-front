import { Text, View } from "react-native";
import { CardContainer, CardContent, Cards, Container, Division, Title } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';

export function ConfigScreen({ navigation }:any) {
    
    function handleChangePassword() {
        navigation.navigate('changePassword');
    }

    return (
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

                    <CardContainer onPress={handleChangePassword}>
                            <CardContent>
                                <Icon name="user" size={24}/>
                                <Text>Deletar Conta</Text>
                            </CardContent>

                            <Icon name="chevron-right" size={24}/>
                    </CardContainer>
                </Cards>
        </Container>
    );
}