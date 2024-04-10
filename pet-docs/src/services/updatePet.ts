// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS, TABLES } from "../constants";

// Types
import { Pet } from "../types";

export async function updatePet(pet: Pet.Pet):Promise<{ Id: string } | undefined> {
  if (pet.Id) {
    await fetch(`${LAMBDA_PETS}?TableName=${TABLES.PET_TABLE}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Action: LAMBDA_POST_ACTIONS.EDIT_PET,
        TableName: TABLES.PET_TABLE,
        Item: {
          Id: pet.Id,
          ...pet,
        },
      }),
    });

    return { Id: pet.Id };
  }
}
