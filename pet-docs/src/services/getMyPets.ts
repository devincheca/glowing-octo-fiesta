// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS } from "../constants";

export async function getMyPets(callback: (pets: any) => void):Promise<any> {
  const localPetIds = JSON.parse(localStorage.getItem('pets') || '[]');

  const requestPromises = localPetIds.map((Id: string) => {
    return fetch(`${LAMBDA_PETS}?Id=${Id}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Action: LAMBDA_POST_ACTIONS.GET_PET,
      }),
    });
  });
  const toJson = await Promise.all(requestPromises);
  callback(parsePets(await Promise.all(toJson.map(response => response.json()))))
}

export function parsePets(pets: any) {
  return pets
    .reduce((acc: [], petArr: []) => petArr.concat(acc), [])
    .map((pet: any) => {
      const { OwnerName, Id, DOB, Name, TypeName, TypeId } = pet;
      const dob = new Date(DOB);

      return {
        OwnerName,
        Id,
        TypeName,
        TypeId,
        DOB: `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`,
        Name,
      };
    });
}
