// Component
import { Container, Content, Item, Icon, Input, Button, Text, Toast } from 'native-base';
import React, { Component } from 'react';

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import ConnexionStyle from 'style/connexionStyle';
import GlobalStyle from 'style/globalStyle';

// Utility
import ApiUtility from 'src/utility/ApiUtility';
import RegexUtility from 'src/utility/RegexUtility';

export default class ForgotPassword extends Component {
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
        this.state = { email: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <Content contentContainerStyle={ [ConnexionStyle.content, ConnexionStyle.additionalMargin] }>
                    <Item rounded style={ ConnexionStyle.item }>
                        <Icon active name='person' style={ ConnexionStyle.icon }/>
                        <Input keyboardType={ 'email-address' } placeholder={ LocalizationManager.localizedString.account.email } onChangeText={ (email) => this.setState({email}) }/>
                    </Item>
                    <Button full rounded style={ [GlobalStyle.button, ConnexionStyle.button] } onPress={ () => this.attemptToResetPassword() }>
                        <Text>{ LocalizationManager.localizedString.connexion.recoverPassword }</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    /*
    ** Service
    */

    attemptToResetPassword = () => {
        if ( (this.state.email === '') ) {
            Toast.show( { text: LocalizationManager.localizedString.error.emptyField, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (!RegexUtility.isEmailValid(this.state.email)) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.invalidEmail, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        ApiUtility.recoverPassword(this.state.email)
            .then( (response) => {
                if (response.ok) {
                    Toast.show( { text: LocalizationManager.localizedString.message.forgotPasswordSuccess, position: "top", type: "success", duration: 3000 } );
                    this.props.navigation.navigate('signIn');
                }
            })
            .catch( (error) => console.error(error) );
    };
}