import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces} from "./DeleteSpaces";
import { MissingFieldError } from "../shared/Validator";

//outside handler can remain and be reused on further calls
//first make connection to the databse and reuse that connection
const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                console.log(getResponse)
                return getResponse;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
            case 'PUT':
                const putResponse = await updateSpaces(event, ddbClient);
                console.log(putResponse)
                return putResponse;
            case 'DELETE':
                const deleteResponse = await deleteSpaces(event, ddbClient);
                console.log(deleteResponse)
                return deleteResponse;
            default:
                break;
        }
    } catch (error) {
        // console.error(error);
        if (error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    return response;
}
export { handler }