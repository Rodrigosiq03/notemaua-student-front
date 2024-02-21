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
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 28px;
`;

export const Content = styled.View`
    width: 100%;
    /* background-color: #ff0; */
    align-items: center;
`;

export const InputContainer = styled.View`
    gap: 8px;
`;

export const InputLabel = styled.Text`
    font-size: 16px;
    margin-left: 8px;
`;

export const Input = styled.TextInput`
    background-color: #D6D6D6;
    width: 300px;
    padding: 8px;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1669B6;
    margin-top: 8px;
    padding: 12px 32px;
    border-radius: 100px;
`;

export const CheckBoxContainer = styled.View`
    margin: 16px 0;
    flex-direction: row;
    gap:8;
`;

export const CheckBox = styled.TouchableOpacity`
    border: 1px solid #000;
`; 

export const CheckBoxLabel = styled.Text`
    color: #1669B6;
    font-weight: 600;
`;

export const ButtonConfirm = styled.TouchableOpacity`
    background-color: #00CE3A;
    margin-top: 8px;
    padding: 16px 32px;
    border-radius: 100px;
`;