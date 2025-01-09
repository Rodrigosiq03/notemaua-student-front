import { Alert, Touchable, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { Container, ContentInfo, ImageView, TextInfo, TitleInfo } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { useFocusEffect } from "expo-router";

export default function Account() {
    const { getUser } = useContext(UserContext)

    const [name, setName] = useState('')
    const [ra, setRa] = useState('')
    const [email, setEmail] = useState('')

    const fetchData = async () => {
        try {
            const user: any = await getUser();
            if (user) {
                setName(user?.name);
                setRa(user?.ra);
                setEmail(user?.email);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useFocusEffect(() => {
        setTimeout(() => fetchData(), 1000);
    })
    
    return (
        <Container>
            <ImageView>
                <Icon name="user" size={64} color={'#1669B6'} />
            </ImageView>

            <View style={{width:300 , height:1, marginVertical:16, backgroundColor: "#1669B6"}}/>

            {name === '' && ra === '' && email === '' ?
                <ActivityIndicator size="large" color="#1669B6" />
                :
                <ContentInfo>
                    <TextInfo><TitleInfo>Nome:</TitleInfo>{' '+ name}</TextInfo>
                    <TextInfo><TitleInfo>RA:</TitleInfo>{' ' + ra}</TextInfo>
                    <TextInfo><TitleInfo>Email:</TitleInfo>{' ' + email}</TextInfo>
                </ContentInfo>
            }
        </Container>
    )
}