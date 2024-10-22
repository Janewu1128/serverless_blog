import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces} from "./DeleteSpaces";
import { JsonError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";
import { captureAWSv3Client, getSegment} from "aws-xray-sdk-core";

//outside handler can remain and be reused on further calls
//first make connection to the databse and reuse that connection
const ddbClient = captureAWSv3Client(new DynamoDBClient({}))

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;

    const subSeg = getSegment().addNewSubsegment('MyLongCall')
    await new Promise(resolve =>{ setTimeout(resolve, 3000)});
    subSeg.close();
    const subSeg2 = getSegment().addNewSubsegment('MyShortCall')
    await new Promise(resolve =>{ setTimeout(resolve, 500)})
    subSeg2.close();

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                response = getResponse;
                break;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                response = postResponse;
                break;
            case 'PUT':
                const putResponse = await updateSpaces(event, ddbClient);
                response = putResponse;
                break;
            case 'DELETE':
                const deleteResponse = await deleteSpaces(event, ddbClient);
                response = deleteResponse;
                break;
            default:
                break;
        }
    } catch (error) {
        // console.error(error);
        if (error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: error.message
            }
        }
        if (error instanceof JsonError){
            return {
                statusCode: 400,
                body: error.message
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }

    addCorsHeader(response);
    return response;
}
export { handler }