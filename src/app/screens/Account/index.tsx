import { View } from "react-native";
import { Container, ContentInfo, ImageView, TextInfo, TitleInfo } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";

export function Account() {
    return (
        <Container>
            <ImageView>
                <Icon name="user" size={64} color={'#1669B6'} />
            </ImageView>

            <View style={{width:300 , height:1, marginVertical:16, backgroundColor: "#1669B6"}}/>

            <ContentInfo>
                <TextInfo><TitleInfo>Nome:</TitleInfo> Gabriel Merola</TextInfo>
                <TextInfo><TitleInfo>RA:</TitleInfo> 23.00825-3</TextInfo>
                <TextInfo><TitleInfo>Email:</TitleInfo> 23.00825-3@gmail.com</TextInfo>
            </ContentInfo>

            {/* <Button><TextButton>Deletar Usuário</TextButton></Button> */}
        </Container>
    )
}