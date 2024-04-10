import { AnimalType } from "./AnimalType";

export interface Pet {
  Id?: string;
  Name: string;
  Type: AnimalType | string;
  TypeName?: string;
  TypeId?: string;
  OwnerName: string;
  DOB: Date | string;
};
