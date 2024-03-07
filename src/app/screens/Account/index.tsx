import { View } from "react-native";
import { Container, ContentInfo, ImageView, TextInfo, TitleInfo } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user_context";

export function Account() {
    const { getUserFromToken } = useContext(UserContext)

    const [name, setName] = useState('')
    const [ra, setRa] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        getUserFromToken().then((user) => {
            if (!user) return
            setName(user?.name)
            setRa(user?.ra)
            setEmail(user?.email)
        })
    }, [name, ra, email])
    
    return (
        <Container>
            <ImageView>
                <Icon name="user" size={64} color={'#1669B6'} />
            </ImageView>

            <View style={{width:300 , height:1, marginVertical:16, backgroundColor: "#1669B6"}}/>

            <ContentInfo>
                <TextInfo><TitleInfo>Nome:</TitleInfo>{' '+ name}</TextInfo>
                <TextInfo><TitleInfo>RA:</TitleInfo>{' ' + ra}</TextInfo>
                <TextInfo><TitleInfo>Email:</TitleInfo>{' ' + email}</TextInfo>
            </ContentInfo>

            {/* <Button><TextButton>Deletar Usuário</TextButton></Button> */}
        </Container>
    )
}