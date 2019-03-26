// Component
import { Container, Content, Item, Icon, Input, Button, Text, Footer, FooterTab, Title, Header, Body, Toast } from 'native-base';
import React, { Component } from 'react';

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import ConnexionStyle from 'style/connexionStyle';
import GlobalStyle from 'style/globalStyle';

// Utility
import ApiUtility from 'src/utility/ApiUtility';
import BearerUtility from 'src/utility/BearerUtility';
import RegexUtility from 'src/utility/RegexUtility';

export default class SignIn extends Component {
    /*
    ** Configuration
    */

    static navigationOptions = {
        header: null,
    };

    /*
    ** Constructor
    */

    constructor(props) {
        super(props);
        this.state = { refresh: false, email: '', password: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <Header style={ ConnexionStyle.header }>
                    <Body>
                        <Button transparent={ true } full>
                            <Text uppercase={ false } style={ ConnexionStyle.headerText } onPress={ () => this.updateCurrentLanguage() }>
                                { LocalizationManager.localizedString.localization.changeLanguage }
                            </Text>
                        </Button>
                    </Body>
                </Header>
                <Content contentContainerStyle={ [ConnexionStyle.content, ConnexionStyle.additionalMargin] }>
                    <Title style={ ConnexionStyle.title }>
                        { LocalizationManager.localizedString.title }
                    </Title>
                    <Item rounded style={ ConnexionStyle.item }>
                        <Icon active name='person' style={ ConnexionStyle.icon }/>
                        <Input keyboardType={ 'email-address' } placeholder={ LocalizationManager.localizedString.account.email } onChangeText={ (email) => this.setState({email}) }/>
                    </Item>
                    <Item rounded style={ ConnexionStyle.item }>
                        <Icon active name='lock' style={ ConnexionStyle.icon }/>
                        <Input secureTextEntry={ true } placeholder={ LocalizationManager.localizedString.account.password } onChangeText={ (password) => this.setState({password}) }/>
                    </Item>
                    <Button full rounded style={ [GlobalStyle.button, ConnexionStyle.button] } onPress={ () => this.attemptToSignIn() }>
                        <Text>{ LocalizationManager.localizedString.connexion.signIn }</Text>
                    </Button>
                    <Button full transparent style={ ConnexionStyle.forgottenPasswordButton } onPress={ () => this.goToForgotPassword() }>
                        <Text uppercase={ false } style={ ConnexionStyle.forgottenPasswordText }>
                            { LocalizationManager.localizedString.connexion.forgottenPassword }
                        </Text>
                    </Button>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full style={ ConnexionStyle.footer } onPress={ () => this.goToSignUp() }>
                            <Text uppercase={ false } style={ ConnexionStyle.footerText }>
                                { LocalizationManager.localizedString.connexion.noAccountSignUp }
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    /*
    ** Service
    */

    attemptToSignIn = () => {
        if ( (this.state.email === '') || (this.state.password === '') ) {
            Toast.show( { text: LocalizationManager.localizedString.error.emptyField, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        if ( (!RegexUtility.isEmailValid(this.state.email)) ) {
            Toast.show( { text: LocalizationManager.localizedString.error.invalidEmail, position: "top", type: "danger", duration: 3000 } );
            return;
        }
        ApiUtility.signIn(this.state.email, this.state.password)
            .then( (response) => {
                if ( (response.ok) ) {
                    return response.json();
                }
                Toast.show( { text: LocalizationManager.getHttpStatusMessage(response.status), position: "top", type: "danger", duration: 3000 } );
                return undefined;
            })
            .then( (responseJson) => {
                if ( (responseJson !== undefined) && (responseJson.data !== undefined) ) {
                    BearerUtility.setBearer(responseJson.data.token);
                    this.props.navigation.navigate('userHome', { title: LocalizationManager.localizedString.header.userHome });
                }
            })
            .catch( (error) => console.error(error) );
    };

    goToForgotPassword = () => {
        this.props.navigation.navigate('forgotPassword', { title: LocalizationManager.localizedString.header.forgotPassword });
    };

    goToSignUp = () => {
        this.props.navigation.navigate('signUp', { title: LocalizationManager.localizedString.header.signUp });
    };

    refreshParent = () => {
        this.setState({ refresh: !this.state.refresh });
    };

    updateCurrentLanguage = () => {
        if (LocalizationManager.getCurrentLanguage() === "fr-FR")
            LocalizationManager.setLanguage("en-US");
        else
            LocalizationManager.setLanguage("fr-FR");
        this.refreshParent();
    };
}