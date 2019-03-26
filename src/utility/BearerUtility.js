import * as Keychain from 'react-native-keychain';

/*
*   Utility class used to manage the bearer contained in the secure storage
 */
export default class BearerUtility {
    // Return a Promise containing the bearer or an empty string (in case there is no bearer)
    static getBearer = () => {
        return Keychain.getGenericPassword()
            .then( (credentials) => {
                if (credentials) {
                    return credentials.password;
                }
                else {
                    return '';
                }
            });
    };

    // Remove the bearer from the secure storage
    static removeBearer = () => Keychain.resetGenericPassword().catch((error) => console.error(error));

    // Store the bearer in the secure storage
    static setBearer = (bearer) => Keychain.setGenericPassword('@viny:bearer', bearer).catch((error) => console.error(error));
};