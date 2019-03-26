// Component
import { Container, Content, Icon, Button, Text, Footer, FooterTab, Card, Left, Thumbnail, Body, CardItem, Header, Right } from 'native-base';
import React, { Component } from 'react';
import { BackHandler } from 'react-native';

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Style
import GlobalStyle from 'style/globalStyle';

export default class UserHome extends Component {
    /*
    ** Configuration
    */

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', UserHome.handleBackButton);
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', UserHome.handleBackButton);
    };

    static handleBackButton() {
        return true;
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
        this.state = { refresh: false };
    }

    /*
    ** Render
    */

    render() {
        return (
            <Container style={ GlobalStyle.container }>
                <Content contentContainerStyle={ GlobalStyle.content }>
                    <Card style={ GlobalStyle.card }>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/4.png?x34982'}} />
                                <Body>
                                <Text>Evénement</Text>
                                <Text note>Octobre 22, 2018</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Inauguration d'un caviste près de chez vous !
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={ GlobalStyle.card }>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'http://www.nychi-acupuncture.com/wp-content/uploads/2015/12/Red-Wine-Holidays.jpg'}} />
                                <Body>
                                <Text>Viny</Text>
                                <Text note>Septembre 26, 2018</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Suivie du sprint II
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={ GlobalStyle.card }>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/4.png?x34982'}} />
                                <Body>
                                <Text>Evénement</Text>
                                <Text note>Septembre 22, 2018</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Dégustation de vin rouge près de chez vous !
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={ GlobalStyle.card }>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'http://www.nychi-acupuncture.com/wp-content/uploads/2015/12/Red-Wine-Holidays.jpg'}} />
                                <Body>
                                <Text>Viny</Text>
                                <Text note>Juillet 27, 2018</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Début du sprint II
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full disabled={true} style={ GlobalStyle.footerTabSelected }>
                            <Icon active name='home' style={ GlobalStyle.footerIconSelected }/>
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full style={ GlobalStyle.footerTab } onPress={ () => this.navigateToChatBot() }>
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
                        <Button full style={ GlobalStyle.footerTab } onPress={ () => this.navigateToSetting() }>
                            <Icon active name='settings' style={ GlobalStyle.footerIcon }/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    /*
    ** Service
    */

    navigateToChatBot = () => {
        this.props.navigation.navigate('userChatBot', { title: LocalizationManager.localizedString.header.userChatBot })
    };

    navigateToSetting = () => {
        this.props.navigation.navigate('userSetting', { title: LocalizationManager.localizedString.header.userSetting, refreshParent: this.selfRefresh })
    };

    selfRefresh = () => {
        this.props.navigation.setParams({ title: LocalizationManager.localizedString.header.userHome });
        this.setState({ refresh: !this.state.refresh });
    };
}