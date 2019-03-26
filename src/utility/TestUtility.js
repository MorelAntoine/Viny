import ApiUtility from 'src/utility/ApiUtility';

/*
*   Utility class used to facilitate the writing of unit test
*   (This class doesn't use native code for the greatest pleasure of Jest <3)
 */
export default class TestUtility {
    /**************
    *   Attribute *
    ***************/

    /*
    *   Global Attribute
    */

    static bearer = undefined;
    static testValue = undefined;

    /*
    *   Global Information
    */

    static accountEmail = 'koko1@test.fr';
    static accountPassword = 'kokokoko';

    static failAccountEmail = 'omaeWaMouShindeiru@viny.fr';
    static failAccountPassword = 'naniii';

    /*
    *   Module
    */

    static keychainModule = require('react-native-keychain');

    /************
     *   Method *
     ************/

    /*
    *   Connection
    */

    static signInTestMode = async (email, password) => {
        await ApiUtility.signIn(email, password)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.data !== undefined)
                    TestUtility.bearer = responseJson.data.token;
            })
            .catch((error) => console.error(error));
    };

    static signOutTestMode = async () => {
        await ApiUtility.signOut(TestUtility.bearer)
            .then(() => TestUtility.bearer = undefined)
            .catch((error) => console.error(error));
    };

    /*
    *   Management
    */

    static clearGlobalAttribute = () => {
        TestUtility.bearer = undefined;
        TestUtility.testValue = undefined;
    };

    /*
    *   Mock
    */

    static mockGetGenericPassword = (shouldReturnValidCredentials) => {
        if (shouldReturnValidCredentials) {
            TestUtility.keychainModule.getGenericPassword = jest.fn(() => new Promise(() => {
                return {username: 'jerry goler', password: TestUtility.bearer};
            }));
        } else {
            TestUtility.keychainModule.getGenericPassword = jest.fn(() => new Promise(() => {
                return false;
            }));
        }
    };

    static mockResetGenericPassword = () => {
        TestUtility.keychainModule.resetGenericPassword = jest.fn(() => {
            TestUtility.testValue = undefined;
            return new Promise((resolve) => resolve('success'));
        });
    };

    static mockSetGenericPassword = () => {
        TestUtility.keychainModule.setGenericPassword = jest.fn((username, password) => {
            TestUtility.testValue = password;
            return new Promise((resolve => {
                resolve('success');
            }));
        });
    };
};