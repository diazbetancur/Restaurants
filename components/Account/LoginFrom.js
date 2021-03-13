import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {isEmpty} from 'lodash'

import { validateEmail } from '../../utils/helpers'
import { loginEmailPassword } from '../../utils/actions'
import Loading from '../Loading'

export default function LoginFrom() {
    const [showPass, setshowPass] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doLogin = async () => {
        if (!validateData()) {
            return
        }

        setLoading(true)
        const result = await loginEmailPassword(formData.email, formData.password)
        setLoading(false)

        if (!result.statusResponse) {
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("account")
    }

    const validateData = () => {
        setErrorPass("")
        setErrorEmail("")

        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email valido.")
            isValid = false
        }

        if (isEmpty(formData.password)) {
            setErrorPass("Debes de ingresar ti contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email...."
                onChange={(e) => onChange(e, "email")}
                keyboardType='email-address'
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                placeholder="Ingresa tu contraseña...."
                password={true}
                secureTextEntry={!showPass}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPass}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPass(!showPass)}
                    />
                }
            />
            <Button
                title="Iniciar Sessión"
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando Sessión ..." />
        </View>
    )
}

const defaultFormValues = () => {
    return {email: "", password: ""}
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {

        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#7bb420"
    },
    icon: {
        color: "#7bb420"
    }
})
