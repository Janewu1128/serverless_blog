import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signIn } from '@aws-amplify/auth';
import { AuthStack } from '../../../space-finder/outputs.json';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
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
    jwtToken;
    temporaryCredentials;
    awsRegion;
    isAuthorized() {
        if (this.user) {
            return true;
        }
        return false;
    }
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
            await this.generateIdToken(); //generate id token once login success
            return this.user;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    async getTemporaryCredentials() {
        if (this.temporaryCredentials) {
            return this.temporaryCredentials;
        }
        this.temporaryCredentials = await this.generateTempCredentials();
        return this.temporaryCredentials;
    }
    async generateTempCredentials() {
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpaceUserPoolId}`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                clientConfig: {
                    region: awsRegion
                },
                identityPoolId: AuthStack.SpaceIdentityPoolId,
                logins: {
                    [cognitoIdentityPool]: this.jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
    async generateIdToken() {
        const session = await fetchAuthSession();
        this.jwtToken = session.tokens?.idToken?.toString();
    }
    getIdToken() {
        return this.jwtToken;
    }
    getUserName() {
        return this.userName;
    }
}
