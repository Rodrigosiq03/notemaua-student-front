import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
  align-items: center;
  ${Platform.OS === 'ios' ? 'padding-top: 40px;' : ''}
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #000;
`;

export const Division = styled.View`
  width: 100%;
  height: 1px;
  background-color: #1669B6;
  margin: 16px 0;
`;

export const Cards = styled.View`
  gap: 16px;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ModalContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;