import { Container, Logo } from "./styles";
import LogoNote from '../../../assets/LogoNote.png'

export function Header() {
    return (
        <Container>
            <Logo source={LogoNote}/>
        </Container>
    )
}