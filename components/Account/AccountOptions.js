import { map } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../Modal'

import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailFrom from './ChangeEmailFrom'
import ChangePassword from './ChangePassword'


export default function AccountOptions({ user, toastRef, setReloadUser }) {
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Cambiar Nombres y Apellidos",
                iconNameLetf: "account-circle",
                iconColorLeft: "#7bb420",
                iconNameRigth: "chevron-right",
                iconColorRigth: "#7bb420",
                onPress: () => selectedComponent('displayName')
            },
            {
                title: "Cambiar Email",
                iconNameLetf: "at",
                iconColorLeft: "#7bb420",
                iconNameRigth: "chevron-right",
                iconColorRigth: "#7bb420",
                onPress: () => selectedComponent('Email')
            },
            {
                title: "Cambiar Contraseña",
                iconNameLetf: "lock-reset",
                iconColorLeft: "#7bb420",
                iconNameRigth: "chevron-right",
                iconColorRigth: "#7bb420",
                onPress: () => selectedComponent('Password')
            }
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "Email":
                setRenderComponent(
                    <ChangeEmailFrom
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "Password":
                setRenderComponent(
                    <ChangePassword
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                break;
        }
        setShowModal(true)
    }

    const menuOption = generateOptions()

    return (
        <View>
            {
                map(menuOption, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.MenuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            menu={menu.iconNameLetf}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            menu={menu.iconNameRigth}
                            color={menu.iconColorRigth}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    MenuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#7bb420"
    }
})
