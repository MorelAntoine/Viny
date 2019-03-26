import { Root } from "native-base";
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import SignIn from 'src/component/SignIn';
import SignUp from 'src/component/SignUp';
import ForgotPassword from 'src/component/ForgotPassword';
import UserHome from 'src/component/user/UserHome';
import UserChatBot from 'src/component/user/UserChatBot';
import UserSetting from 'src/component/user/setting/UserSetting';
import UserSettingProfile from 'src/component/user/setting/UserSettingProfile';
import UserSettingPassword from 'src/component/user/setting/UserSettingPassword';

const RootStack = createStackNavigator(
    {
        signIn: SignIn,
        signUp: SignUp,
        forgotPassword: ForgotPassword,
        userHome: UserHome,
        userChatBot: UserChatBot,
        userSetting: UserSetting,
        userSettingProfile : UserSettingProfile,
        userSettingPassword : UserSettingPassword
    },
    {
        initialRouteName: 'signIn'
    }
);

type Props = {};
export default class App extends Component<Props> {
  render() {

    return (
        <Root>
            <RootStack/>
        </Root>
    );
  };
}
