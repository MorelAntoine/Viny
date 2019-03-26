export default class fr_FR {
    static Dictionary() {
        const strings = {
            title: "Viny",
            account: {
                address: "Adresse postale",
                confirmPassword: "Confirmation de mot de passe",
                email: "Email",
                firstName: "Prénom",
                lastName: "Nom",
                password: "Mot de passe",
                userName: "Nom d'utilisateur"
            },
            connexion: {
                forgottenPassword: "Mot de passe oublié ?",
                noAccountSignUp: "Vous n'avez pas de compte ? Inscrivez-vous.",
                signIn: "Se connecter",
                signUp: "S'inscrire",
                update: "Mettre à jour",
                recoverPassword: "Envoyer"
            },
            error: {
                confirmPassword: "Votre mot de passe est différent de votre mot de passe de confirmation.",
                emptyField: "Veuillez remplir tous les champs.",
                invalidEmail: "Votre e-mail est invalide.",
                passwordTooSmall: "Votre mot de passe doit faire au minimum 8 caractères.",
                userNameTooSmall: "Votre nom d'utilisateur doit faire au minimum 3 caractères.",
                currentPasswordIncorrect: "Votre mot de passe actuel est incorrect"
            },
            header: {
                signUp: "Inscription",
                forgotPassword: "Mot de passe oublié",
                userHome: "Viny | Accueil",
                userChatBot: "Viny | ChatBot",
                userSetting: "Viny | Paramètre",
                userSettingProfile: "Viny | Mes Informations",
                userSettingPassword: "Viny | Éditer mon mot de passe"
            },
            httpCode: {
                special: {
                    unknown: "Une erreur est survenue. Veuillez réessayer.",
                    signUp: "Votre compte a été créé.",
                    updateUserInformation: "Vos informations ont été mises à jour."
                },
                "200": "Ok",
                "201": "Création réussite",
                "204": "Il n'y a pas de contenu",
                "400": "Mauvaise demande",
                "401": "Accès non autorisé",
                "422": "Entité non traitable",
                "500": "Erreur serveur"
            },
            localization: {
                changeLanguage: "Would you like to switch to English?",
                currentLanguage: "FR",
            },
            setting: {
                userInformation: "Mes informations",
                passwordUpdate: "Éditer mon mot de passe",
                signOut: "Déconnexion",
                currentPassword: "Votre mot de passe actuel",
                newPassword: "Votre nouveau mot de passe"
            },
            message: {
                forgotPasswordSuccess: "Un email a été envoyé"
            }
        };

        return (strings);
    }
};
