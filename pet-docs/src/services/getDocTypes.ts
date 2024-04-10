// Constants
import { LAMBDA_PETS, TABLES } from "../constants";

export async function getDocTypes(callback: (pets: any) => void) {
  const request = await fetch(`${LAMBDA_PETS}?TableName=${TABLES.DOC_TYPE_TABLE}`);

  const data = await request.json();

  callback(data.Items);
}
