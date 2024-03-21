import { Container, Logo } from "./styles";

import LogoMaua from '../../../../assets/LogoMaua.png'

export function Footer() {
    return (
        <Container>
            <Logo source={LogoMaua}/>
        </Container>
    )
}