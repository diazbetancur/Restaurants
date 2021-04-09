import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toastRef, setReloadUser }) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForms()) {
            return
        }
        setLoading(true)
        const result = await updateProfile({ displayName: newDisplayName })
        if (!result.statusResponse) {
            Alert.alert("Error actualizando el nombre y apellido, por favor intenta mas tarde.")
            setLoading(false)
            return
        }
        setReloadUser(true)
        toastRef.current.show("Se han actualizado nombres y apellidos.", 3000)
        setShowModal(false)
    }

    const validateForms = () => {
        setError(null)

        if (isEmpty(newDisplayName)) {
            setError("Debes ingresar nombres y apellidos.")
            return false;
        }
        if (newDisplayName === displayName) {
            setError("Debes ingresar nombres y apellidos diferentes a los actuales.")
            return false;
        }

        return true
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresar Nombres y Apellidos"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Button
                title="Cambiar Nombres y Apellidos"
                containerStyle={styles.Btncontainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading = {loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    Btncontainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#7bb420"
    }
})
