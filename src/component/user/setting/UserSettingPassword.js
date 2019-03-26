// Component
import {Container, Content, Icon, Button, Item, Input, Text, Toast} from 'native-base';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import ConnexionStyle from 'style/connexionStyle';
import GlobalStyle from 'style/globalStyle';

// Utility
import ApiUtility from 'src/utility/ApiUtility';
import BearerUtility from 'src/utility/BearerUtility';

export default class UserSettingPassword extends Component {
    /*
    ** Configuration
    */

    componentDidMount() {
        BearerUtility.getBearer()
            .then( (bearer) => {
                if ( (bearer !== '') ) {
                    ApiUtility.getUserInfo(bearer)
                        .then( (response) => {
                            if ( (response.ok) ) {
                                return response.json();
                            }
                            return undefined;
                        })
                        .then( (responseJson) => {
                            this.setState({
                                firstName: responseJson.data.firstname,
                                lastName: responseJson.data.lastname,
                                userName: responseJson.data.username,
                                email: responseJson.data.email
                            });
                        })
                        .catch( (error) => console.error(error));
                }
            })
            .catch( (error) => console.error(error));
    };

    static navigationOptions = ({ navigation }) => ({
        title: `${ navigation.state.params.title }`,
        headerTitleStyle: {
            width: '80%'
        },
        headerStyle: {
            backgroundColor: '#421421',
        },
        headerTintColor: '#fff5df',
    });

    /*
    ** Constructor
    */

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', userName: '', email: '', newPassword: '', confirmNewPassword: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <KeyboardAwareScrollView style={ GlobalStyle.scrollViewAdjustment }>
                    <Content contentContainerStyle={ ConnexionStyle.content }>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='lock' style={ ConnexionStyle.icon }/>
                            <Input secureTextEntry={ true } placeholder={ LocalizationManager.localizedString.setting.newPassword }
                                   value={ this.state.newPassword } onChangeText={ (newPassword) => this.setState({newPassword}) }/>
                        </Item>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='lock' style={ ConnexionStyle.icon }/>
                            <Input secureTextEntry={ true } placeholder={ LocalizationManager.localizedString.account.confirmPassword }
                                   value={ this.state.confirmNewPassword } onChangeText={ (confirmNewPassword) => this.setState({confirmNewPassword}) }/>
                        </Item>
                        <Button full rounded style={ [GlobalStyle.button, ConnexionStyle.button] } onPress={ () => this.attemptToUpdatePassword() }>
                            <Text>{ LocalizationManager.localizedString.connexion.update }</Text>
                        </Button>
                    </Content>
                </KeyboardAwareScrollView>
            </Container>
        );
    }

    /*
    ** Service
    */

    attemptToUpdatePassword = () => {
        if ( (this.state.newPassword === '') || (this.state.confirmNewPassword === '') ) {
            Toast.show( { text: LocalizationManager.localizedString.error.emptyField, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (this.state.newPassword !== this.state.confirmNewPassword) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.confirmPassword, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        const userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.newPassword
        };
        BearerUtility.getBearer()
            .then( (bearer) => {
                if ( (bearer !== '') ) {
                    ApiUtility.updateUserInfo(bearer, userInfo)
                        .then( (response) => {
                            if ( (response.ok) ) {
                                Toast.show( { text: LocalizationManager.localizedString.httpCode.special.updateUserInformation, position: "top", type: "success", duration: 4000 } );
                                return response.json();
                            }
                            Toast.show( { text: LocalizationManager.getHttpStatusMessage(response.status), position: "top", type: "danger", duration: 3000 } );
                            return undefined;
                        })
                        .then( (responseJson) => {
                            if ( (responseJson !== undefined) && (responseJson.data !== undefined) ) {
                                this.setState({
                                    firstName: responseJson.data.firstname,
                                    lastName: responseJson.data.lastname,
                                    userName: responseJson.data.username,
                                    email: responseJson.data.email,
                                });
                            }
                        })
                        .catch( (error) => console.error(error) );
                }
            })
            .catch( (error) => console.error(error));
    };
}