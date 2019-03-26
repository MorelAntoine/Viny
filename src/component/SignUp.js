// Component
import { Container, Content, Item, Icon, Input, Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import ConnexionStyle from 'style/connexionStyle';
import GlobalStyle from 'style/globalStyle';
import RegexUtility from "../utility/RegexUtility";
import ApiUtility from "../utility/ApiUtility";
import BearerUtility from "../utility/BearerUtility";

export default class SignUp extends Component {
    /*
    ** Configuration
    */

    static navigationOptions = ({ navigation }) => ({
        title: `${ navigation.state.params.title }`,
        headerTitleStyle: {
            width: '80%'
        },
        headerStyle: {
            backgroundColor: '#421421',
        },
        headerTintColor: '#fff5df'
    });

    /*
    ** Constructor
    */

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', userName: '', address: '', email: '', password: '', confirmPassword: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <KeyboardAwareScrollView style={ GlobalStyle.scrollViewAdjustment }>
                    <Content contentContainerStyle={ ConnexionStyle.content } scrollEnabled={ true }>
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
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='lock' style={ ConnexionStyle.icon }/>
                            <Input secureTextEntry={ true } placeholder={ LocalizationManager.localizedString.account.password }
                                   value={ this.state.password } onChangeText={ (password) => this.setState({password}) }/>
                        </Item>
                        <Item rounded style={ ConnexionStyle.item }>
                            <Icon active name='lock' style={ ConnexionStyle.icon }/>
                            <Input secureTextEntry={ true } placeholder={ LocalizationManager.localizedString.account.confirmPassword }
                                   value={ this.state.confirmPassword } onChangeText={ (confirmPassword) => this.setState({confirmPassword}) }/>
                        </Item>
                        <Button full rounded style={ [GlobalStyle.button, ConnexionStyle.button] } onPress={ () => this.attemptToSignUp() }>
                            <Text>{ LocalizationManager.localizedString.connexion.signUp }</Text>
                        </Button>
                    </Content>
                </KeyboardAwareScrollView>
            </Container>
        );
    }

    /*
    ** Service
    */

    attemptToSignUp = () => {
        if ( (this.state.firstName === '') || (this.state.lastName === '') || (this.state.userName === '')
            || (this.state.email === '') || (this.state.password === '') || (this.state.confirmPassword === '') /*|| (this.state.address === '')*/ ) {
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
        if ( (this.state.password.length < 8) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.passwordTooSmall, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (this.state.password !== this.state.confirmPassword) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.confirmPassword, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        const userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        };
        ApiUtility.signUp(userInfo)
            .then( (response) => {
                if ( (response.ok) ) {
                    Toast.show( { text: LocalizationManager.localizedString.httpCode.special.signUp, position: "top", type: "success", duration: 4000 } );
                    this.props.navigation.navigate('signIn');
                } else {
                    Toast.show( { text: LocalizationManager.getHttpStatusMessage(response.status), position: "top", type: "danger", duration: 3000 } );
                }
            })
            .catch( (error) => console.error(error) );
    };

    // Address form

    /*
                       <Item rounded style={ ConnexionStyle.item }>
                           <Icon active name='home' style={ ConnexionStyle.icon }/>
                           <Input placeholder={ LocalizationManager.localizedString.account.address }
                                  value={ this.state.address } onChangeText={ (address) => this.setState({address}) }/>
                       </Item>
                       */

}