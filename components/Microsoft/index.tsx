import { Container, Logo } from "./styles";

import LogoMicrosoft from '@/assets/microsoftLogo.jpg';

export function Microsoft() {
  return (
    <Container>
      <Logo source={LogoMicrosoft} />
    </Container>
  )
}