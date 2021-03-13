import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation} from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginFrom from '../../components/Account/LoginFrom'

export default function Login() {
    
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/Restauran_logo.png")}
                resizeMode="contain"
                style={styles.image}
            >

            </Image>
            <View style={styles.container}>
                <LoginFrom/>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}></Divider>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props) {
    const navigation = useNavigation()

    return (
        <Text style={styles.register}>
            ¿Aún no tienes una cuenta?{" "}  
            <Text style={styles.btnRegister}
            onPress={() => navigation.navigate("register")}>
                 Regístrate
            </Text>
        </Text>
    )

}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#7bb420",
        margin: 40
    },
    register:{
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister:{
        color: "#7bb420",
        fontWeight: "bold"
    }
})
