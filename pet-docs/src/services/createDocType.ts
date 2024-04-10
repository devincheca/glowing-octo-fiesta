// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS, TABLES } from "../constants";

export async function createDocType(type: { Id: string, DocType: string }):Promise<{ Id: string }> {
  const { Id, DocType } = type;

  await fetch(`${LAMBDA_PETS}?TableName=${TABLES.DOC_TYPE_TABLE}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Action: LAMBDA_POST_ACTIONS.CREATE_DOC_TYPE,
      TableName: TABLES.DOC_TYPE_TABLE,
      Item: {
        Id,
        Name: DocType,
      },
    }),
  });

  return { Id };
}
