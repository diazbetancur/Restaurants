import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RegisterForm from '../../components/Account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image } from 'react-native'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/Restauran_logo.png")}
                resizeMode="contain"
                style={styles.image}
            >
            </Image>
            <RegisterForm />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    }
})
