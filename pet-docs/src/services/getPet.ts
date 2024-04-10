// Constants
import { ANIMAL_TYPES, LAMBDA_PETS, LAMBDA_POST_ACTIONS, TABLES } from "../constants";
import { Pet } from "../types";

const { v4: uuidv4 } = require("uuid");

export async function getPet(Id: string, callback: (pet: any) => void):Promise<any> {
  const response = await fetch(`${LAMBDA_PETS}?Id=${Id}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Action: LAMBDA_POST_ACTIONS.GET_PET,
    }),
  });

  callback(parsePet(await response.json()));
}

export function parsePet(pet: Pet.Pet[]) {
  if (pet) {
    const [{ OwnerName, Id, DOB, Name, TypeName, TypeId }] = pet;
    const dob = new Date(DOB);

    return {
      OwnerName: OwnerName,
      Id: Id,
      TypeName,
      TypeId,
      DOB: `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`,
      Name: Name,
    };
  }
}
