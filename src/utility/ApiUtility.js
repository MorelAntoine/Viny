import ApiRouting from 'config/ApiRouting.config';

/*
*   Utility class used to compute API request
*   All the functions return a Promise containing the response
 */
export default class ApiUtility {
    static sendMessageToChatBot = (bearer, message) => {
        let body = JSON.stringify({
            message: message
        });

        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.sendMessageToChatBot, 'POST', bearer, body);
    };

    /*
    *   Connection
    */

    static signIn = (email, password) => {
        let body = JSON.stringify({
            email: email,
            password: password
        });

        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.signIn, 'POST', null, body);
    };

    static signOut = (bearer) => {
        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.signOut, 'DELETE', bearer, null);
    };

    static signUp = (userInfo) => {
        let body = JSON.stringify({
            user: {
                username: userInfo.userName,
                email: userInfo.email,
                firstname: userInfo.firstName,
                lastname: userInfo.lastName,
                raw_password: userInfo.password
            }
        });

        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.signUp, 'POST', null, body);
    };

    /*
    *   Information
    */

    static getUserInfo = (bearer) => {
        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.getUserInfo, 'GET', bearer, null);
    };

    /*
    *   Update
    */

    static recoverPassword = (email) => {
        let body = JSON.stringify({
            email: email
        });

        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.forgotPassword, 'POST', null, body);
    };

    static updateUserInfo = (bearer, userInfo) => {
        let body = JSON.stringify({
            user: {
                username: userInfo.userName,
                email: userInfo.email,
                firstname: userInfo.firstName,
                lastname: userInfo.lastName,
                raw_password: userInfo.password
            }
        });

        return ApiUtility.fetchToApi(ApiRouting.host + ApiRouting.version + ApiRouting.account.updateUserInfo, 'PATCH', bearer, body);
    };

    /*
    *   Service
    */

    static fetchToApi = (url, method, bearer, body) => {
        let option;
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (bearer !== null)
            header['Authorization'] = 'Bearer ' + bearer;
        option = {
            method: method,
            headers: header
        };
        if (body !== null)
            option['body'] = body;
        return fetch(url, option);
    }
};