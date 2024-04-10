// Constants
import { LAMBDA_PETS, TABLES } from "../constants";

// Services
import { parsePet } from "./getPet";

// Types
import { Pet } from "../types";

export async function getAllPets(callback: (pets: any) => void) {
  const request = await fetch(`${LAMBDA_PETS}?TableName=${TABLES.PET_TABLE}`);

  const data = await request.json();

  callback(data.Items.map((pet: Pet.Pet) => parsePet([pet])));
}
