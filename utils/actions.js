import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false

    firebase.auth().onAuthStateChanged((user) => {
        user != null && (isLogged = true)
    })
    return isLogged
}

export const getCurrenUser = () =>{
    return firebase.auth().currentUser
}

export const registerUser = async(email, password ) =>{
    const result = {statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const loginEmailPassword = async(email, password) => {
    const result = { statusResponse : true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario y/o contraseña no validos."
    }
    return result
}

export const uploadImage = async (image, path, name) => {
    const result = {statusResponse: false, error: null, url: null}
    const reference = firebase.storage().ref(path).child(name)
    const blod = await fileToBlob(image)

    try{
        await reference.put(blod)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    }
    catch(error){
        result.error = error
    }
    return result;
}

export const updateProfile = async(data) => {
    const result = {statusResponse:true, error: null}

    try{
        await firebase.auth().currentUser.updateProfile(data)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const reauthenticate = async(password) => {
    const result = {statusResponse:true, error: null}
    const user = getCurrenUser()
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try{
        await user.reauthenticateWithCredential(credential)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updateEmail= async(email) => {
    const result = {statusResponse:true, error: null}

    try{
        await firebase.auth().currentUser.updateEmail(email)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updatePassword= async(password) => {
    const result = {statusResponse:true, error: null}

    try{
        await firebase.auth().currentUser.updatePassword(password)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const addDocumentWithoutId= async(collection, data) => {
    const result = {statusResponse:true, error: null}

    try{
        await db.collection(collection).add(data)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}