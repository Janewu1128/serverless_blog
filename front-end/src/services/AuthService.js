import { Amplify } from 'aws-amplify';
import { signIn } from '@aws-amplify/auth';
import { AuthStack } from '../../../space-finder/outputs.json';
const awsRegion = 'us-west-1';
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: AuthStack.SpaceUserPoolId,
            userPoolClientId: AuthStack.SpaceUserPoolClientId,
            identityPoolId: AuthStack.SpaceIdentityPoolId
        },
    },
});
export class AuthService {
    user;
    userName = '';
    async login(userName, password) {
        try {
            const signInOutput = await signIn({
                username: userName,
                password: password,
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH'
                }
            });
            this.user = signInOutput;
            this.userName = userName;
            return this.user;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    getUserName() {
        return this.userName;
    }
}
