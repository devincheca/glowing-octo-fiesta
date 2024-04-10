// React
import { useEffect, useState } from 'react';

// Constants
import { NAVIGATION_CONTAINERS } from '../constants/NAVIGATION_CONTAINERS';

// Components
import { Loading } from '../components';

// Services
import { getAllPets } from '../services';

export default function MyPets(props: { setActiveContainer: (nav: string) => void }) {
  const { setActiveContainer } = props;
  const [pets, setPets] = useState([]);
  const [initialPets, setInitialPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllPets((pets: any) => {
      setPets(pets);
      setInitialPets(pets);
      setIsLoading(false);
    });
  }, []);

  const toDocuments = (Id: string) => {
    sessionStorage.setItem('currentPet', Id);
    setActiveContainer(NAVIGATION_CONTAINERS.PET_DOCS);
  };

  const filterPets = (searchInput: string) => {
    if (!searchInput) setPets(initialPets);
    setPets(initialPets.filter(pet => JSON.stringify(pet).includes(searchInput)));
  };

  return (
    <>
      <h3>Admin - All Pets</h3>
      { isLoading && <Loading /> }
      <div style={{ textAlign: 'right', width: '50vw' }}>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.ADD_DOC_TYPE)}>Add Document Type</button>
      </div>
      { !isLoading && <div>
          <input
            className="input"
            type="text"
            placeholder='Search Pets:'
            onChange={event => filterPets((event.target as HTMLInputElement).value)} />
        </div>
      }
      <div style={{ fontSize: '.70em', height: '50vh', width: "80vw", overflowX: 'hidden', overflowY: 'auto' }}>
        { !isLoading && pets.map(({ Id, Name, OwnerName, DOB, TypeName }, i) => {
          return (
            <div key={i} className={i % 2 ? 'odd' : 'even'} style={{ marginBottom: '.6em' }}>
              <div style={{ textAlign: 'left' }}>
                <button className="button" onClick={() => toDocuments(Id)}>View Documents</button>
              </div>
              <div className="columns">
                <div className="column">Name: {Name}</div>
                <div className="column">Date of Birth: {DOB}</div>
              </div>
              <div className="columns">
                <div className="column">Type: {TypeName}</div>
                <div className="column">Owner Name: {OwnerName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}