export default class en_US {
    static Dictionary() {
        const strings = {
            title: "Viny",
            account: {
                address: "Address",
                confirmPassword: "Password confirmation",
                email: "Email",
                firstName: "First name",
                lastName: "Last name",
                password: "Password",
                userName: "Username"
            },
            connexion: {
                forgottenPassword: "Forgot your password?",
                noAccountSignUp: "You do not have an account ? Register.",
                signIn: "Sign in",
                signUp: "Sign up",
                update: "Update",
                recoverPassword: "Send"
            },
            error: {
                confirmPassword: "Your password is different from your confirmation password.",
                emptyField: "Please complete all fields.",
                invalidEmail: "Your email is invalid.",
                passwordTooSmall: "Your password must be at least 8 characters long.",
                userNameTooSmall: "Your username must be at least 3 characters long.",
                currentPasswordIncorrect: "Your current password is incorrect"
            },
            header: {
                signUp: "Registration",
                forgotPassword: "Forgot password",
                userHome: "Viny | Home",
                userChatBot: "Viny | ChatBot",
                userSetting: "Viny | Setting",
                userSettingProfile: "Viny | My Information",
                userSettingPassword: "Viny | Edit Password"
            },
            httpCode: {
                special: {
                    unknown: "An error has occurred. Try Again.",
                    signUp: "Your account has been created.",
                    updateUserInformation: "Your information has been updated."
                },
                "200": "Ok",
                "201": "Success creation",
                "204": "No content",
                "400": "Bad request",
                "401": "Unauthorized access",
                "422": "Non-treatable entity",
                "500": "Error server",
            },
            localization: {
                changeLanguage: "Souhaitez-vous passer en Français ?",
                currentLanguage: "ENG",
            },
            setting: {
                userInformation: "My information",
                passwordUpdate: "Edit my password",
                signOut: "Sign Out",
                currentPassword: "Your current password",
                newPassword: "Your new password",
                confirmNewPassword: "Confirmation of your new password"
            },
            message: {
                forgotPasswordSuccess: "An email has been sent"
            }
        };

        return (strings);
    }
};
