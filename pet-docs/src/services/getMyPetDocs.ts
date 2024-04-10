// Constants
import { LAMBDA_PETS, LAMBDA_POST_ACTIONS } from "../constants";

export async function getMyPetDocs(callback: (pets: any) => void):Promise<any> {
  const petId = sessionStorage.getItem('currentPet');

  const response = await fetch(`${LAMBDA_PETS}?Id=${petId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Action: LAMBDA_POST_ACTIONS.GET_PET_DOCS,
    }),
  });

  callback(await response.json());
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
