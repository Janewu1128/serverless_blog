import { AuthService } from "./AuthService";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'janewu',
        '123456789Test$'
    );
    const idToken = await service.getIdToken();
    console.log(idToken);
    
}
testAuth();