export const DOC_TYPES = [
  { Name: 'Allergy', Id: 'ALLERGY' },
  { Name: 'Vaccine', Id: 'VACCINE' },
];

export const DOC_TYPES_IMPLEMENTED = {
  ALLERGY: 'ALLERGY',
  VACCINE: 'VACCINE',
};

export const isDocTypeImplemented = (typeId: string) => {
  if (DOC_TYPES.find(({ Id }) => Id === typeId.toString().toUpperCase())) return true;

  return false;
};
