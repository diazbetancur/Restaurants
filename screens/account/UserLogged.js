import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrenUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOptions'

export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrenUser)
    }, [])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser
                            user={user}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <AccountOptions
                            user={user}
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                            />                        
                    </View>
                )
            }

            <Button
                title="Cerrar Sessión"
                buttonStyle={styles.btnContainer}
                titleStyle={styles.btnCloseTitel}
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnContainer: {
        marginTop: 30,
        borderTopWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderTopColor: "#7bb420",
        borderBottomWidth: 1,
        borderBottomColor: "#7bb420",
        paddingVertical: 10
    },
    btnCloseTitel: {
        color: "#7bb420"
    }
})
