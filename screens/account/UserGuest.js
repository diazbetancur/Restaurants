import React from 'react'
import { Button } from 'react-native-elements'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/Restauran_logo.png")}
                resizeMode="contain"
                style={styles.image}
            ></Image>
            <Text style={styles.title}>Consulta tu perfil en restaurantes</Text>
            <Text style={styles.description}>
                ¿Cómo describirías tu mejor restuarante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cuál te ha gustado más y comenta cómo ha sido tu experiencia.
                </Text>
            <Button
                buttonStyle={styles.button}
                title="Ver tu perfil"
                onPress={()  => navigation.navigate("login")}
            ></Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        width: "100%",
        height: 300,
        marginBottom: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center",
        color: "#8c6cac"
    },
    description: {
        textAlign: 'justify',
        marginBottom: 20,
        color: "#eec72e"
    },
    button:{
        backgroundColor: "#7bb420"
    }
})
