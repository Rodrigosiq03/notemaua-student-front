import { Text, View, Alert } from "react-native";
import { CardContainer, CardContent, Cards, Container, Division, Title } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { UserContext } from "../../contexts/user_context";

export function ConfigScreen({ navigation }:any) {
    const { deleteUser } = useContext(UserContext)

    function handleChangePassword() {
        navigation.navigate('changePassword');
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
                    onPress: () => {
                        AsyncStorage.removeItem('token')
                        // await deleteUser()
                        navigation.navigate('login')
                    }
                }
            ]
        )
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

                    <CardContainer onPress={handleDeleteUser}>
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