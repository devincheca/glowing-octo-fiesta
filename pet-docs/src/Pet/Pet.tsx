// Services
import { createPet, updatePet, getPet } from "../services";

// Constants
import { ANIMAL_TYPES, NAVIGATION_CONTAINERS } from "../constants";
import { useEffect, useState } from "react";

export default function Pet(props: {
  isEdit?: boolean,
  setActiveContainer: (nav: string) => void
}) {
  const { isEdit, setActiveContainer } = props;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const currentPetId = sessionStorage.getItem('currentPet');

    if (currentPetId && isEdit) {
      getPet(currentPetId, ({
        Name,
        OwnerName,
        Id,
        TypeId,
        DOB,
      }) => {
        setName(Name);
        setType(TypeId);
        setOwnerName(OwnerName);
        const toFormatDate = new Date(DOB);
        const month = toFormatDate.getMonth().toString().length === 2 ? toFormatDate.getMonth() + 1 : `0${toFormatDate.getMonth() + 1}`;
        const day = toFormatDate.getDate().toString().length === 2 ? toFormatDate.getDate() : `0${toFormatDate.getDate()}`;
        setDob(`${toFormatDate.getFullYear()}-${month}-${day}`);
      });
    }
  }, [isEdit])

  useEffect(() => {
    let error = '';

    if (!name) error = 'Name required';
    if (!ownerName) error = 'Owner name required';
    if (!(parseInt(type) >= 0)) error = 'Type required';
    const today = new Date();
    if (today < new Date(dob)) error = 'Invalid Date of Birth';
    if (new Date(dob).getFullYear() < 1950) error = 'Invalid Date of Birth';

    setError(error);
  }, [error, name, ownerName, type, dob]);

  const getPetFormInfo = () => {
    const typeId = parseInt(type);
    const Type = ANIMAL_TYPES.find(type => type.Id === typeId) || '';

    return {
      Name: name,
      Type: Type,
      TypeName: Type ? Type.Name : '',
      TypeId: Type ? `${Type.Id}` : '',
      OwnerName: ownerName,
      DOB: new Date(dob),   
    };
  };

  async function addPet() {
    if (!error) {
      const newPet = getPetFormInfo();

      await createPet(newPet);

      setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS);
    }
  }

  async function editPet() {
    if (!error) {
      const editPet = getPetFormInfo();

      await updatePet({ ...editPet, Id: sessionStorage.currentPet });

      setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS);
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS)}>Go To My Pets</button>
      </div>
      <h1 style={{ textAlign: 'left' }}>{isEdit ? 'Edit' : 'Add'} your Pet</h1>
      <br></br>
      <form style={{ width: '50vw' }}>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Name:"
            name="name"
            id="name"
            onChange={event => setName((event.target as HTMLInputElement).value)}
            defaultValue={name || ''}
            required />
        </div>
        <div>
          <label>Type:</label>
          <select
            className="text-black rounded m-5"
            name="type"
            id="type"
            onChange={event => setType((event.target as HTMLSelectElement).value)}
            value={type}
            required>
            <option value="none">-</option>
            {
              ANIMAL_TYPES.map(({ Id, Name }) => <option key={Id} value={Id}>{Name}</option>)
            }
          </select>
        </div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Owner Name:"
            name="ownerName"
            id="ownerName"
            onChange={event => setOwnerName((event.target as HTMLInputElement).value)}
            defaultValue={ownerName || ''}
            required />
        </div>
        <br></br>
        <div>
          <label>Date of Birth:</label>
          <input
            className="input"
            type="date"
            placeholder="Date of Birth:"
            name="dob"
            id="dob"
            onChange={event => setDob((event.target as HTMLInputElement).value)}
            defaultValue={dob || ''}
            required />
        </div>
        <br></br>
        <div className="text-danger">{error}</div>
        <button
          className="p-3 bg-white rounded text-black"
          type="button"
          onClick={isEdit ? editPet : addPet}>
            {isEdit ? 'Save' : 'Add Pet'}
        </button>
      </form>
    </div>
  );
}
