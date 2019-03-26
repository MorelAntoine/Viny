import "isomorphic-fetch"; // define fetch
import React from 'react';
import ApiUtility from 'src/utility/ApiUtility';
import TestUtility from 'src/utility/TestUtility';

/*
*   signIn
*/

test('[signIn] succeeded to sign in', () => {
    ApiUtility.signIn(TestUtility.accountEmail, TestUtility.accountPassword)
        .then((response) => expect(response.status).toBe(200))
        .catch((error) => console.error(error));
});

test('[signIn] failed to sign in', () => {
    ApiUtility.signIn(TestUtility.failAccountEmail, TestUtility.failAccountPassword)
        .then((response) => expect(response.status).not.toBe(200))
        .catch((error) => console.error(error));
});

/*
*   signOut
*/

test('[signOut] succeeded to sign out', () => {
    ApiUtility.signIn(TestUtility.accountEmail, TestUtility.accountPassword)
        .then((response) => response.json())
        .then((responseJson) => {
            ApiUtility.signOut(responseJson.data.token)
                .then((response) => expect(response.status).toBe(200))
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[signOut] failed to sign out', () => {
    ApiUtility.signOut('incorrect_information')
        .then((response) => expect(response.status).not.toBe(200))
        .catch((error) => console.error(error));
});

/*
*   signUp
*/

// test('[signUp] succeeded to sign up', async () => {});

// test('[signUp] failed to sign up', async () => {});

/*
*   getUserInfo
 */

test('[getUserInfo] succeeded to get user info', () => {
    ApiUtility.signIn(TestUtility.accountEmail, TestUtility.accountPassword)
        .then((response) => response.json())
        .then((responseJson) => {
            ApiUtility.getUserInfo(responseJson.data.token)
                .then((response) => expect(response.status).toBe(200))
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[getUserInfo] failed to get user info', () => {
    ApiUtility.getUserInfo('incorrect_information')
        .then((response) => expect(response.status).not.toBe(200))
        .catch((error) => console.error(error));
});

/*
*   updateUserInfo
 */

test('[updateUserInfo] succeeded to update user info', () => {
    ApiUtility.signIn(TestUtility.accountEmail, TestUtility.accountPassword)
        .then((response) => response.json())
        .then((responseJson) => {
            ApiUtility.updateUserInfo(responseJson.data.token, { username: 'Koko1', email: 'koko1@test.fr', firstname: 'Koko1', lastname: 'Koko1', raw_password: 'kokokoko' })
                .then((response) => expect(response.status).toBe(200))
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[updateUserInfo] failed to update user info', () => {
    ApiUtility.updateUserInfo('incorrect_information', { username: '', email: '', firstname: '', lastname: '', raw_password: '' })
        .then((response) => expect(response.status).not.toBe(200))
        .catch((error) => console.error(error));
});

test('[sendMessageToChatBot] sent with success', () => {
    ApiUtility.signIn(TestUtility.accountEmail, TestUtility.accountPassword)
        .then((response) => response.json())
        .then((responseJson) => {
            ApiUtility.sendMessageToChatBot(responseJson.data.token, "Salut")
                .then( (response) => expect(response.status).toBe(200))
                .catch( (error) => console.error(error));
        })
        .catch((error) => console.error(error));
});

test('[sendMessageToChatBot] failed to send', () => {
    ApiUtility.sendMessageToChatBot('incorrect_information', "Salut")
        .then( (response) => expect(response.status).not.toBe(200) )
        .catch( (error) => console.error(error) );
});

/*
test('[recoverPassword] sent with success', () => {
});
*/

test('[recoverPassword] failed to send', () => {
    ApiUtility.recoverPassword(TestUtility.failAccountEmail)
        .then( (response) => expect(response.status).not.toBe(200))
        .catch( (error) => console.error(error) );
});