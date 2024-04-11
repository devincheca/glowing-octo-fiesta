// Services
import { createDoc, getDocTypes } from "../services";

// Constants
import { DOC_TYPES_IMPLEMENTED, NAVIGATION_CONTAINERS, isDocTypeImplemented } from "../constants";
import { useEffect, useState } from "react";

export default function Doc(props: {
  setActiveContainer: (nav: string) => void
}) {
  const { setActiveContainer } = props;

  const [type, setType] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [allergyName, setAllergyName] = useState('');
  const [allergyReaction, setAllergyReaction] = useState('');
  const [allergySeverity, setAllergySeverity] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentPetId = sessionStorage.getItem('currentPet');

    if (currentPetId) getDocTypes(types => setAvailableTypes(types));
    else setError('An error occured, please refresh the page and try again');
  }, []);

  const getPetDocFormInfo = () => {
    return {
      DocType: type,
      DocTypeId: type,
      OtherDescription: otherDescription,
      VaccineName: vaccineName,
      DateAdministered: dateAdministered,
      AllergyName: allergyName,
      PetAllergyReaction: allergyReaction,
      AllergySeverity: allergySeverity,
    };
  };

  async function addDoc() {
    if (!error) {
      const newDoc = getPetDocFormInfo();

      await createDoc(newDoc);

      setActiveContainer(NAVIGATION_CONTAINERS.PET_DOCS);
    }
  }

  const validateType = (type: string) => {
    if (type === 'none') setError('Type required');
    else setError('');
  };

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.PET_DOCS)}>Go To Pet Documents</button>
      </div>
      <h1 style={{ textAlign: 'left' }}>New Pet Document</h1>
      <br></br>
      <form style={{ width: '50vw', margin: 'auto', }}>
        <div>
          <label>Document Type:</label>
          <select
            className="text-black rounded m-5"
            name="type"
            id="type"
            onChange={event => { validateType((event.target as HTMLSelectElement).value); setType((event.target as HTMLSelectElement).value); }}
            value={type}
            required>
            <option value="none">-</option>
            {
              availableTypes.map(({ Id, Name }) => <option key={Id} value={Id}>{Name}</option>)
            }
          </select>
        </div>
        { type !== '' && !isDocTypeImplemented(type) && <div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Description:"
                name="otherDescription"
                id="otherDescription"
                onChange={event => setOtherDescription((event.target as HTMLInputElement).value)}
                required />
            </div>
          </div>
        }
        { type === DOC_TYPES_IMPLEMENTED.VACCINE && <div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Vaccine Name:"
                name="vaccineName"
                id="vaccineName"
                onChange={event => setVaccineName((event.target as HTMLInputElement).value)}
                required />
            </div>
            <br></br>
            <div>
              <div>
                <label>Date Administered:</label>
                <input
                  className="input"
                  type="date"
                  name="dob"
                  id="dob"
                  onChange={event => setDateAdministered((event.target as HTMLInputElement).value)}
                  defaultValue={dateAdministered || ''}
                  required />
              </div>
            </div>
          </div>
        }
        { type === DOC_TYPES_IMPLEMENTED.ALLERGY && <div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Allergy Name:"
                name="allergyName"
                id="allergyName"
                onChange={event => setAllergyName((event.target as HTMLInputElement).value)}
                required />
            </div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Allergy Reactions:"
                name="allergyReactions"
                id="allergyReactions"
                onChange={event => setAllergyReaction((event.target as HTMLInputElement).value)}
                required />
            </div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Allergy Severity:"
                name="allergySeverity"
                id="allergySeverity"
                onChange={event => setAllergySeverity((event.target as HTMLInputElement).value)}
                required />
            </div>
          </div>
        }
        <br></br>
        <div className="has-text-danger">{error}</div>
        <button
          className="p-3 bg-white rounded text-black"
          type="button"
          disabled={!!error}
          onClick={addDoc}>
            Add Document
        </button>
      </form>
    </div>
  );
}
