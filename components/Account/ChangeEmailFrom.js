import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailFrom({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForms()) {
            return
        }

        setLoading(true)
        const resultReathenticate = await reauthenticate(password)
        if (!resultReathenticate.statusResponse) {
            setErrorPassword("Contraseña incorrecta.")
            setLoading(false)
            return
        }

        const resultUpdate = await updateEmail(newEmail)
        setLoading(false)
        if (!resultUpdate.statusResponse) {
            Alert.alert("No se puede cambiar por este correo ya esta en uso por otro usuario.")
            setLoading(false)
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se han actualizado el email.", 3000)
        setShowModal(false)        
    }

    const validateForms = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un correo electronico valido.")
            isValid = false
        }
        if (newEmail === email) {
            setErrorEmail("Debes ingresar correo electronico diferentes a los actuales.")
            isValid = false
        }

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresar un correo electronico .... "
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresar tu contraseña .... "
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}                      
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Correo Electronico"
                containerStyle={styles.Btncontainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
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

