import LocalizedString from 'react-native-localization';
import en_US from 'locale/en_US';
import fr_FR from 'locale/fr_FR';

// Static class used to manage language
export default class LocalizationManager {
    /*
    ** Attribute
    */

    static localizedString = new LocalizedString({
        'en-US': en_US.Dictionary(),
        'fr-FR': fr_FR.Dictionary()
    });

    /*
    ** Property
    */

    static getAvailableLanguages = () => {
        return LocalizationManager.localizedString.getAvailableLanguages();
    };

    static getInterfaceLanguage = () => {
        return LocalizationManager.localizedString.getInterfaceLanguage();
    };

    static getCurrentLanguage = () => {
        return LocalizationManager.localizedString.getLanguage();
    };

    static setLanguage = (language) => {
        LocalizationManager.localizedString.setLanguage(language);
    };

    /*
    ** Method
    */

    static getHttpStatusMessage = (statusCode) => {
        if (LocalizationManager.localizedString.httpCode[statusCode] !== undefined)
        {
            return LocalizationManager.localizedString.httpCode[statusCode];
        }
        return LocalizationManager.localizedString.httpCode.special.unknown;
    }

}
