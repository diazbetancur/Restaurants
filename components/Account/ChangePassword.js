import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePassword({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [newConfirmPassword, setnewConfirmPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCofirmPassword, setErrorCofirmPassword] = useState(null)
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

        const resultUpdate = await updatePassword(newPassword)
        setLoading(false)
        if (!resultUpdate.statusResponse) {
            Alert.alert("Hubo un problema cambiando la contraseña.")
            setLoading(false)
            return
        }

        toastRef.current.show("Se han actualizado la contraseña.", 3000)
        setShowModal(false)
    }

    const validateForms = () => {        
        setErrorPassword(null)
        setErrorCofirmPassword(null)
        setErrorNewPassword(null)
        let isValid = true

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña Actual.")
            isValid = false
        }

        if(size(newPassword) < 6){
            setErrorNewPassword("Debes ingresar una contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(newConfirmPassword !== newPassword){
            setErrorCofirmPassword("La nueva contraseña y la confirmación no son iguales.")
            setErrorNewPassword("La nueva contraseña y la confirmación no son iguales.")
            isValid = false
        }

        if(password === newPassword){
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorCofirmPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresar tu contraseña Actual.... "
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
                        iconStyle={{color: "#c2c2c2"}}                    
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresar tu contraseña Nueva.... "
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#c2c2c2"}}                       
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Confirmar tu contraseña Nueva.... "
                containerStyle={styles.input}
                defaultValue={newConfirmPassword}
                onChange={(e) => setnewConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorCofirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#c2c2c2"}}                        
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Contraseña"
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