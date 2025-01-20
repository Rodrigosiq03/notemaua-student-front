import React from "react";
import { Text, View, Alert, Modal, TouchableOpacity } from "react-native";
import { CardContainer, CardContent, Cards, Container, Division, ModalContainer, Title } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ConfigScreen() {
    const { deleteUser } = useContext(UserContext)

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
                        const token = await AsyncStorage.getItem('token')
                        if (!token) {
                            console.log('Erro ao deletar conta TOKEN')
                            Alert.alert('Erro', 'Não foi possível deletar a conta')
                            return
                        }
                        const message = await deleteUser()
                        if(message){
                            AsyncStorage.removeItem('token')
                            console.log('Conta deletada')


                            Toast.show({
                                type: 'success',
                                text1: 'Conta deletada com sucesso',
                                visibilityTime: 2000,
                                autoHide: true
                            })

                            console.log('passou do toast')
                            
                            setTimeout(async () => {
                                await AsyncStorage.clear()
                                router.navigate('/')
                            }, 1000)
                        }else{
                            console.log('Erro ao deletar conta REQUEST')
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
                <Toast />

                <Division />

                <Cards>
                    <CardContainer onPress={handleDeleteUser}>
                            <CardContent>
                                <Icon name="user" size={24}/>
                                <Text>Deletar Conta</Text>
                            </CardContent>

                            <Icon name="chevron-right" size={24}/>
                    </CardContainer>
                </Cards>
        </Container>
        </>
    );
}