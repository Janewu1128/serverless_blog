import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn} from "@aws-amplify/auth";

const awsRegion = 'us-west-1'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-west-1_ap1W78YZG',
            userPoolClientId: 'tojg2ogf7q4ao4p5cu7do77gv'
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
}