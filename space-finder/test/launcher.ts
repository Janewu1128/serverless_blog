import { handler } from "../src/services/spaces/handler";


process.env.AWS_REGION = "us-west-1";
process.env.TABLE_NAME = 'SpaceTable-026ef5527fa7'

//POST
// handler({
//     httpMethod: 'POST',
//     body: JSON.stringify({
//         location: 'Irvine'
//     })
// } as any, {} as any);

//SCAN/GET
handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: 'ce8dec38-835c-4782-97d6-69a2cf05d42e'
    }
} as any, {} as any);