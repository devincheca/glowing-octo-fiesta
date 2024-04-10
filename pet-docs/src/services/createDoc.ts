// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS, TABLES } from "../constants";

// Types
import { Doc } from "../types";

const { v4: uuidv4 } = require("uuid");

export async function createDoc(doc: Doc.Doc):Promise<{ Id: string }> {
  const Id = await uuidv4();

  const response = await fetch(`${LAMBDA_PETS}?TableName=${TABLES.DOC_TABLE}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Action: LAMBDA_POST_ACTIONS.CREATE_DOC,
      TableName: TABLES.DOC_TABLE,
      Item: {
        Id,
        PetId: sessionStorage.getItem('currentPet'),
        ...doc,
      },
    }),
  });

  return { Id };
}
