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
    font-weight: bold;
    margin-bottom: 28px;
`;

export const Content = styled.View`
    width: 100%;
    /* background-color: #ff0; */
    align-items: center;
`;

export const CircleCheck = styled.View`
    background-color: #00CE3A;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
`;

export const ContainerText = styled.View`
    gap: 8px;
    align-items: center;
`;