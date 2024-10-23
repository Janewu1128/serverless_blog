import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DataStack, ApiStack } from '../../../space-finder/outputs.json';
const spacesUrl = ApiStack.SpacesApiEndpoint36C4F3B6 + 'spaces';
export class DataService {
    authService;
    s3Client;
    awsRegion = 'us-west-1';
    constructor(authService) {
        this.authService = authService;
    }
    reserveSpace(spaceId) {
        return '123';
    }
    async getSpaces() {
        const getSpacesResult = await fetch(spacesUrl, {
            method: 'GET',
            headers: {
                'Authorization': this.authService.jwtToken
            }
        });
        const getSpacesResultJson = await getSpacesResult.json();
        return getSpacesResultJson;
    }
    async createSpace(name, location, photo) {
        const space = {};
        space.name = name;
        space.location = location;
        if (photo) {
            const uploadUrl = await this.uploadPublicFile(photo);
            space.photoUrl = uploadUrl;
        }
        const postResult = await fetch(spacesUrl, {
            method: 'POST',
            body: JSON.stringify(space),
            headers: {
                'Authorization': this.authService.jwtToken
            }
        });
        const postResultJSON = await postResult.json();
        return postResultJSON.id;
    }
    async uploadPublicFile(file) {
        const credentials = await this.authService.getTemporaryCredentials();
        if (!this.s3Client) {
            this.s3Client = new S3Client({
                credentials: credentials,
                region: this.awsRegion
            });
        }
        const command = new PutObjectCommand({
            Bucket: DataStack.SpaceFinderPhotosBucketName,
            Key: file.name,
            ACL: 'public-read',
            Body: file
        });
        await this.s3Client.send(command);
        return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
    }
    isAuthorized() {
        return this.authService.isAuthorized();
    }
}
