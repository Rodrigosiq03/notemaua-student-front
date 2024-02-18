import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from 'react-native';
import logoNote from '../../../assets/LogoNote.png';
import logoMaua from '../../../assets/LogoMaua.png';

export function Login(){
    return (
        <View style={styles.container}>
            <Image source={logoNote}/>
            
            
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                
                <View style={{marginBottom: 8}}>
                    <Text style={styles.subTitle}>E-mail (@maua.br)</Text>
                    <TextInput style={styles.input}/>
                </View>

                <View style={{marginBottom: 8}}>
                    <Text style={styles.subTitle}>Senha</Text>
                    <TextInput secureTextEntry style={styles.input}/>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center', marginTop: 12, fontSize:16}}>Primeiro acesso? <Text style={{color: '#1669B6', fontWeight: '600'}}>Clique Aqui</Text> </Text>
                <Text style={{textAlign: 'center', marginTop: 12, fontWeight: '600', color: '#1669B6'}}>Esqueci a Senha</Text>
            
            </View>

            <Image source={logoMaua}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 32,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    content: {
        height: '75%',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 32
    },
    subTitle: {
        fontSize: 16,
        marginLeft: 8
    },
    input: {
        backgroundColor:'#D6D6D6',
        width: 250,
        padding: 4,
        borderRadius: 8,
        fontSize: 16
    },
    button: {
        backgroundColor: '#1669B6',
        padding: 12,
        marginTop: 8,
        borderRadius: 10
    },
    textButton: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }
  });
  