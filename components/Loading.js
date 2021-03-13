import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0,5)"
            overLayBackgroundColor="Transparent"
            overlayStyle={styles.overlay}
            >
            <View style={styles.view}>
                <ActivityIndicator 
                    size="large"
                    color= "#eec72e"
                ></ActivityIndicator>
                {
                text && <Text style={styles.text}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 100,
        backgroundColor: "#fff",
        borderColor: "#8d8492",
        borderWidth: 2,
        borderRadius: 10
    },

    view:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: "#eec72e",
        marginTop: 10
    }
})
