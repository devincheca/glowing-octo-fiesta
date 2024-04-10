export interface Doc {
  Id?: string;
  DocTypeId: string;
  VaccineName?: string;
  DateAdministered?: Date | string;
  AllergyName?: string;
  PetAllergyReaction?: string;
  AllergySeverity?: string;
};
