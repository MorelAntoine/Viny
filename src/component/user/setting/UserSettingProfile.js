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
import RegexUtility from 'src/utility/RegexUtility';

export default class UserSettingProfile extends Component {
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
        this.state = { firstName: '', lastName: '', userName: '', email: '' };
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
                            <Icon active name='person' style={ ConnexionStyle.icon }/>
                            <Input placeholder={ LocalizationManager.localizedString.account.firstName }
                                   value={ this.state.firstName } onChangeText={ (firstName) => this.setState({firstName}) }/>
                        </Item>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='person' style={ ConnexionStyle.icon }/>
                            <Input placeholder={ LocalizationManager.localizedString.account.lastName }
                                   value={ this.state.lastName } onChangeText={ (lastName) => this.setState({lastName}) }/>
                        </Item>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='happy' style={ ConnexionStyle.icon }/>
                            <Input placeholder={ LocalizationManager.localizedString.account.userName }
                                   value={ this.state.userName } onChangeText={ (userName) => this.setState({userName}) }/>
                        </Item>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='mail' style={ ConnexionStyle.icon }/>
                            <Input keyboardType={ 'email-address' } placeholder={ LocalizationManager.localizedString.account.email }
                                   value={ this.state.email } onChangeText={ (email) => this.setState({email}) }/>
                        </Item>
                        <Button full rounded style={ [GlobalStyle.button, ConnexionStyle.button] } onPress={ () => this.attemptToUpdateUserInformation() }>
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

    attemptToUpdateUserInformation = () => {
        if ( (this.state.firstName === '') || (this.state.lastName === '') || (this.state.userName === '') || (this.state.email === '') ) {
            Toast.show( { text: LocalizationManager.localizedString.error.emptyField, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (this.state.userName.length < 3) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.userNameTooSmall, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (!RegexUtility.isEmailValid(this.state.email)) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.invalidEmail, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        const userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: ''
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
                                    password: responseJson.data.password,
                                });
                            }
                        })
                        .catch( (error) => console.error(error) );
                }
            })
            .catch( (error) => console.error(error));
    };
}