import styled from "styled-components/native";

export const ScannerContainer = styled.View`
    width: 80%;
    height: 100px;
    border: 1px dotted #000;
    justify-content: center;
    align-items: center;
`;

export const ScannerBar = styled.View`
    width: 100%;
    height: 1px;
    border: .5px dashed red;
`;

export const BackContainer = styled.View`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
`;