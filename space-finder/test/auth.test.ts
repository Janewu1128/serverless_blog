import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'janewu',
        '123456789Test$'
    );
    const idToken = await service.getIdToken();
    // if u need idToken, console.log the next line to get the token and paste in spaces.http @token
    // console.log(idToken);
    const credentials = await service.generateTemporaryCredentials(loginResult);
    const buckets = await listBuckets(credentials);
    console.log(buckets);

}

async function listBuckets(credentials: any){
    const client = new S3Client({
        credentials: credentials
    });
    
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return result;
}

testAuth();