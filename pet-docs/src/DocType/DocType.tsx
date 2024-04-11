// Services
import { createDocType } from "../services";

// Constants
import { NAVIGATION_CONTAINERS } from "../constants";
import { useState, useEffect } from "react";

export default function DocType(props: {
  setActiveContainer: (nav: string) => void
}) {
  const { setActiveContainer } = props;

  const [type, setType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let error = '';

    if (!type) error = 'Type name required';

    setError(error);
  }, [error, type]);

  const getPetDocTypeFormInfo = () => ({
    DocType: type,
    Id: type.toUpperCase(),
  });

  async function addDocType() {
    await createDocType(getPetDocTypeFormInfo());

    setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS);
  }

  const validateName = (name: string) => {
    if (!name) setError('Type name required');
    else setError('');
  };

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.PET_DOCS)}>Go To Pet Documents</button>
      </div>
      <h1 style={{ textAlign: 'left' }}>New Pet Document Type</h1>
      <br></br>
      <form className="m-10 p-10">
        <div>
          <input
            className="input"
            type="text"
            placeholder="Document Type Name:"
            name="typeName"
            id="typeName"
            onChange={event => { validateName((event.target as HTMLInputElement).value); setType((event.target as HTMLInputElement).value); }}
            required />
        </div>
        <br></br>
        <button
          className="p-3 bg-white rounded text-black"
          type="button"
          disabled={!!error}
          onClick={addDocType}>
            Add Document Type
        </button>
      </form>
    </div>
  );
}
