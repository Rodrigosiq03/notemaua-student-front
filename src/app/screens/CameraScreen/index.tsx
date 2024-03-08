import { Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { BackContainer, ScannerBar, ScannerContainer } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export function CameraScreen(){
    const [hasPermission, setHasPermission] = useState(false)
    const navigate = useNavigation()

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
      
        getCameraPermissions();
    }, [])

    // const handleBarCodeScanned = ({ data }: any) => {
    //     navigate.navigate({name: 'withdrawNotebook', params: {serial: data}})
    // };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <Camera style={{flex:1, justifyContent: 'center', alignItems: 'center'}} type={CameraType.back} onBarCodeScanned={()=>{}}>
                <BackContainer>
                    <TouchableOpacity onPress={() => navigate.goBack()} style={{padding: 20}}>
                        <Text style={{color: '#fff', fontSize: 20}}><Icon name="arrow-right" size={20}/></Text>
                    </TouchableOpacity>
                </BackContainer>
                <ScannerContainer>
                    <ScannerBar/>
                </ScannerContainer>
            </Camera>
        </SafeAreaView>
    )
}