import { Text, TouchableOpacity, View } from "react-native";
// import { Camera, CameraType } from "expo-camera";
import { CameraView, Camera } from "expo-camera/next"
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScannerBar, ScannerContainer } from "./styles";

export function CameraScreen({ navigation }: any){
    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
      
        getCameraPermissions();
    }, [])

    const handleBarCodeScanned = ({ data }: any) => {
        setScanned(true);
        navigation.navigate({name: 'withdrawNotebook', params: {serial: data}})
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <CameraView style={{flex:1, justifyContent:'center', alignItems:'center'}} onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} barcodeScannerSettings={{barcodeTypes: ["codabar"]}}>
                <ScannerContainer>
                    <ScannerBar/>
                </ScannerContainer>
            </CameraView>
        </SafeAreaView>
    )
}