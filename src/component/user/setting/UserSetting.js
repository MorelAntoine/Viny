// Component
import { Container, Content, Icon, Button, Footer, FooterTab, List, ListItem, Text, Left, Right } from 'native-base';
import React, { Component } from 'react';

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import GlobalStyle from 'style/globalStyle';

// Utility
import ApiUtility from 'src/utility/ApiUtility';
import BearerUtility from 'src/utility/BearerUtility';

export default class UserSetting extends Component {
    /*
    ** Configuration
    */

    componentDidMount() {
        BearerUtility.getBearer()
            .then( (bearer) => {
                if ( (bearer !== '') ) {
                    this.state.bearer = bearer;
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
        headerLeft: null
    });

    /*
    ** Constructor
    */

    constructor(props) {
        super(props);
        this.state = { refresh: false, bearer: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <Content>
                    <List>
                        <ListItem button={ true } style={ GlobalStyle.listItem } onPress={ () => this.navigateToUserSettingProfile() }>
                            <Left>
                                <Text style={ GlobalStyle.listText }>
                                    { LocalizationManager.localizedString.setting.userInformation }
                                </Text>
                            </Left>
                            <Right>
                                <Icon active name='arrow-round-forward' style={ GlobalStyle.listIcon }/>
                            </Right>
                        </ListItem>
                        <ListItem button={ true } style={ GlobalStyle.listItem } onPress={ () => this.navigateToUserSettingPassword() }>
                            <Left>
                                <Text style={ GlobalStyle.listText }>
                                    { LocalizationManager.localizedString.setting.passwordUpdate }
                                </Text>
                            </Left>
                            <Right>
                                <Icon active name='arrow-round-forward' style={ GlobalStyle.listIcon }/>
                            </Right>
                        </ListItem>
                        <ListItem button={ true } style={ GlobalStyle.listItem } onPress={ () => this.updateCurrentLanguage() }>
                            <Text style={ GlobalStyle.listText }>
                                { LocalizationManager.localizedString.localization.changeLanguage }
                            </Text>
                        </ListItem>
                        <ListItem button={ true } style={ GlobalStyle.listItem } onPress={ () => this.signOut() }>
                            <Text style={ GlobalStyle.listText }>
                                { LocalizationManager.localizedString.setting.signOut }
                            </Text>
                        </ListItem>
                    </List>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTab } onPress={ () => this.navigateToHome() }>
                            <Icon active name='home' style={ GlobalStyle.footerIcon }/>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTab }>
                            <Icon active name='text' style={ GlobalStyle.footerIcon }/>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTab }>
                            <Icon active name='wine' style={ GlobalStyle.footerIcon }/>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTab }>
                            <Icon active name='subway' style={ GlobalStyle.footerIcon }/>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTabSelected }>
                            <Icon active name='settings' style={ GlobalStyle.footerIconSelected }/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    /*
    ** Service
    */

    navigateToHome = () => {
        this.props.navigation.navigate('userHome', { title: LocalizationManager.localizedString.header.userHome, parentRefresh: this.selfRefresh })
    };

    navigateToUserSettingProfile = () => {
        this.props.navigation.navigate('userSettingProfile', { title: LocalizationManager.localizedString.header.userSettingProfile })
    };

    navigateToUserSettingPassword = () => {
        this.props.navigation.navigate('userSettingPassword', { title: LocalizationManager.localizedString.header.userSettingPassword })
    };

    selfParent = () => {
        this.setState({ refresh: !this.state.refresh });
    };

    signOut = () => {
        ApiUtility.signOut(this.state.bearer)
            .then( () => {
                BearerUtility.removeBearer();
                this.props.navigation.navigate('signIn');
            })
            .catch( (error) => console.error(error) );
    };

    updateCurrentLanguage = () => {
        if (LocalizationManager.getCurrentLanguage() === "fr-FR")
            LocalizationManager.setLanguage("en-US");
        else
            LocalizationManager.setLanguage("fr-FR");
        this.props.navigation.setParams({ title: LocalizationManager.localizedString.header.userSetting });
        this.props.navigation.state.params.refreshParent();
        this.selfParent();
    };
}