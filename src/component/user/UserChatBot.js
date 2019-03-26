// Component
import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';

// Manager
import LocalizationManager from 'src/manager/LocalizationManager';

// Utility
import ApiUtility from 'src/utility/ApiUtility';
import BearerUtility from 'src/utility/BearerUtility';

export default class UserChatBot extends Component {
    /*
    ** Configuration
    */

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Bienvenu !',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'ChatBot',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
        BearerUtility.getBearer()
            .then( (bearer) => {
                if ( (bearer !== '') ) {
                    this.state.bearer = bearer;
                }
            })
            .catch( (error) => console.error(error));
    }

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

    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'ChatBot',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                }),
            };
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        ApiUtility.sendMessageToChatBot(this.state.bearer, messages[0].text)
            .then( (response) => {
                if (response.status === 200) {
                    return (response.text());
                }
            })
            .then( (responseText) => {
                this.onReceive(responseText);
            })
            .catch( (error) => console.error(error) );
    }

    /*
    ** Constructor
    */

    constructor(props) {
        super(props);
        this.state = { messages: [], bearer: '' };
    }

    /*
    ** Render
    */

    render() {
        return (
            <GiftedChat messages={ this.state.messages } onSend={ messages => this.onSend(messages) } user={{ _id: 1, }}/>
        );
    }

    /*
    ** Service
    */

    navigateToHome = () => {
        this.props.navigation.navigate('userHome', { title: LocalizationManager.localizedString.header.userHome })
    };

    navigateToSetting = () => {
        this.props.navigation.navigate('userSetting', { title: LocalizationManager.localizedString.header.userSetting })
    };
}