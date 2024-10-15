import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn} from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = 'us-west-1'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-west-1_ap1W78YZG',
            userPoolClientId: 'tojg2ogf7q4ao4p5cu7do77gv',
            identityPoolId: 'us-west-1:11d9977a-942a-44a1-984b-6ac9bf8618ed'
        }
    }
})
export class AuthService {
    public async login(userName: string, passWord: string) {
        const signInOutput: SignInOutput = await signIn({
            username: userName,
            password: passWord,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH'
            }
        });
        return signInOutput;
    }
    /**
     * call only after login
     */
    public async getIdToken(){
        const authSession = await fetchAuthSession();
        return authSession.tokens?.idToken?.toString();
    }

    //generate temp credentials
    public async generateTemporaryCredentials(loginResult: SignInOutput){
        const idToken = await this.getIdToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-west-1_ap1W78YZG`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'us-west-1:11d9977a-942a-44a1-984b-6ac9bf8618ed',
                logins: {
                    [cognitoIdentityPool]: idToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials
    }

}