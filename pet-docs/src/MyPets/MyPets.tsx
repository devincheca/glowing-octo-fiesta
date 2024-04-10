// React
import { useEffect, useState } from 'react';

// Constants
import { NAVIGATION_CONTAINERS } from '.././constants/NAVIGATION_CONTAINERS';

// Components
import { Loading } from '../components';

// Services
import { getMyPets } from '../services';

export default function MyPets(props: { setActiveContainer: (nav: string) => void }) {
  const { setActiveContainer } = props;
  const [pets, setPets] = useState([]);
  const [initialPets, setInitialPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMyPets((pets: any) => {
      setPets(pets);
      setInitialPets(pets);
      setIsLoading(false);
    });
  }, []);

  const toEdit = (Id: string) => {
    sessionStorage.setItem('currentPet', Id);
    setActiveContainer(NAVIGATION_CONTAINERS.EDIT_PET);
  };

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
      <h3>My Pets</h3>
      <div className="section">
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.GET_STARTED)}>Add Pet</button>
      </div>
      { isLoading && <Loading /> }
      { !isLoading && pets.length > 0 && <div>
          <input
            className="input"
            type="text"
            placeholder='Search Pets:'
            onChange={event => filterPets((event.target as HTMLInputElement).value)} />
        </div>
      }
      { !isLoading && pets.length === 0 && <div>No Pets Available</div> }
      <div style={{ fontSize: '.70em', height: '50vh', width: "80vw", overflowX: 'hidden', overflowY: 'auto' }}>
        { !isLoading && pets.map(({ Id, Name, OwnerName, DOB, TypeName }, i) => {
          return (
            <div key={i} className={i % 2 ? 'odd' : 'even'} style={{ marginBottom: '.6em' }}>
              <div style={{ textAlign: 'left' }}>
                <button className="button" onClick={() => toEdit(Id)}>Edit</button>
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