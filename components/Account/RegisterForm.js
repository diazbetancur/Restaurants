import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import {size} from 'lodash'
import { useNavigation} from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser} from '../../utils/actions'
import Loading from '../Loading'

export default function RegisterForm() {
    const [showPass, setshowPass] = useState(false)
    const [showPassC, setshowPassC] = useState(false)
    const [formData, setformData] =  useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const [errroConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) =>{
        setformData({...formData, [type]: e.nativeEvent.text })
    }

    const doRegisterUser = async() =>{
        if (!validateData()){
            return
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)

        if(!result.statusResponse){
            setErrorEmail(result.error)
            return
        }
        navigation.navigate("account")
    }

    const validateData = () =>
    {
        setErrorConfirm("")
        setErrorPass("")
        setErrorEmail("")

        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes de ingresar un email valido.")
            isValid = false
        }

        if(size(formData.password) < 6 ) {
            setErrorPass("Debes ingresar una contraeña de al menos 6 acaracteres.")
            isValid = false
        }
        
        if(size(formData.confirm) < 6 ) {
            setErrorConfirm("Debes ingresar una confirmación de contraeña de al menos 6 acaracteres.")
            isValid = false
        }

        if(formData.password !== formData.confirm){
            setErrorConfirm("La confirmacion de la contraseña y la contraseña no son iguales.")
            setErrorPass("La confirmacion de la contraseña y la contraseña no son iguales.")
            isValid = false
        }
        
        return isValid
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email...."
                onChange={(e) => onChange (e, "email")}
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                placeholder="Ingresa tu contraseña...."
                password={true}
                secureTextEntry={!showPass}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPass ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPass(!showPass)}
                    />
                }
                onChange={(e) => onChange (e, "password")}
                errorMessage={errorPass}
                defaultValue={formData.password}
            />
            <Input
                placeholder="Confirma tu contraseña...."
                password={true}
                secureTextEntry={!showPassC}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassC ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPassC(!showPassC)}
                    />
                }
                onChange={(e) => onChange (e, "confirm")}
                errorMessage={errroConfirm}
                defaultValue={formData.confirm}
            />
            <Button
                title="Registrar nuevo usuario"
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
                onPress={() => doRegisterUser()}
            />
            <Loading isVisible={loading} text="Creando cuenta ..."/>
        </View>
    )
}

const defaultFormValues = () => {
    return {email: "", password: "", confirm: ""}
} 

const styles = StyleSheet.create({
    form: {
        flex:1,
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
