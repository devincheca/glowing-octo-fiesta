// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS, TABLES } from "../constants";

// Types
import { Pet } from "../types";

const { v4: uuidv4 } = require("uuid");

export async function createPet(pet: Pet.Pet):Promise<{ Id: string }> {
  const Id = await uuidv4();

  const response = await fetch(`${LAMBDA_PETS}?TableName=${TABLES.PET_TABLE}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Action: LAMBDA_POST_ACTIONS.CREATE_PET,
      TableName: TABLES.PET_TABLE,
      Item: {
        Id,
        ...pet,
      },
    }),
  });

  addPetLocalStorage(Id);

  return { Id };
}

function addPetLocalStorage(Id: string) {
  const newPet = [Id];
  const localPets = JSON.parse(localStorage.getItem('pets') || '[]');
  const petArray = localPets.length === 0 ? newPet : localPets.concat(newPet)

  localStorage.setItem('pets', JSON.stringify(petArray));
}
