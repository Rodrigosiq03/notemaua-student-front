import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #FFF;
    align-items: center;
    justify-content: space-between;
    padding: 32px;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 28px;
`;

export const Content = styled.View`
    width: 100%;
    /* background-color: #ff0; */
    align-items: center;
`;

export const Form = styled.View`
    gap: 16px;
`;

export const InputContainer = styled.View`
    gap: 8px;
`;

export const InputLabel = styled.Text`
    font-size: 24px;
    margin-left: 8px;
`;

export const Input = styled.TextInput`
    background-color: #D6D6D6;
    width: 300px;
    padding: 8px;
    border-radius: 10px;
    font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1669B6;
    margin-top: 28px;
    padding: 8px 64px;
    border-radius: 10px;
`;

export const TextButton = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
`;

export const ContainerLinks = styled.View`
    margin-top: 16px;
`;

export const FirstAccessText = styled.Text`
    font-size: 20px;
`;