import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async (event) => {

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        const requestBody = JSON.parse(event.body);
        
        switch (event.httpMethod) {
            case 'GET':
                body = await dynamo.scan({ TableName: event.queryStringParameters.TableName });
                break;
            case 'POST':
                if (requestBody.Action === 'CREATE_PET') body = await dynamo.put(requestBody);
                if (requestBody.Action === 'CREATE_DOC') body = await dynamo.put(requestBody);
                if (requestBody.Action === 'CREATE_DOC_TYPE') body = await dynamo.put(requestBody);
                else if (requestBody.Action === 'EDIT_PET') {
                    const client = new DynamoDBClient({});
                    const docClient = DynamoDBDocumentClient.from(client);
                    body = await docClient.send(new UpdateCommand({
                        TableName: "novellia-pets",
                        Key: { Id: requestBody.Item.Id },
                        AttributeUpdates: {
                          "Name": {
                              Value: requestBody.Item.Name,
                              Action: "PUT",
                          },
                          "OwnerName": {
                              Value: requestBody.Item.OwnerName,
                              Action: "PUT",
                          },
                          "Type": {
                              Value: requestBody.Item.Type,
                              Action: "PUT",
                          },
                          "TypeName": {
                              Value: requestBody.Item.TypeName,
                              Action: "PUT",
                          },
                          "TypeId": {
                              Value: requestBody.Item.TypeId,
                              Action: "PUT",
                          },
                          "DOB": {
                              Value: requestBody.Item.DOB,
                              Action: "PUT",
                          },
                        },
                        ReturnValues: "ALL_NEW",
                    }));
                }
                else if (requestBody.Action === 'GET_PET') {
                    body = await dynamo.scan({ TableName: 'novellia-pets' });
                    body = body.Items.filter(({ Id }) => Id === event.queryStringParameters.Id);
                }
                else if (requestBody.Action === 'GET_PET_DOCS') {
                    body = await dynamo.scan({ TableName: 'novellia-pet-docs' });
                    body = body.Items.filter(({ PetId }) => PetId === event.queryStringParameters.Id);
                }
                break;
            case 'PUT':
                body = await dynamo.update(JSON.parse(event.body));
                break;
            case 'OPTIONS':
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
