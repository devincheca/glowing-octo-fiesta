// React
import { useEffect, useState } from 'react';

// Constants
import { DOC_TYPES_IMPLEMENTED, NAVIGATION_CONTAINERS, isDocTypeImplemented } from '.././constants';

// Components
import { Loading } from '../components';

// Services
import { getMyPetDocs } from '../services';

export default function PetDocs(props: { setActiveContainer: (nav: string) => void }) {
  const { setActiveContainer } = props;
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMyPetDocs((docs: any) => {
      setDocs(docs);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h3>My Pet Documents</h3>
      <div className="section">
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS)}>Go To My Pets</button>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.ADD_DOC)}>Add Document</button>
      </div>
      { isLoading && <Loading /> }
      { !isLoading && docs.length === 0 && <div>No Docs Available</div> }
      <div style={{ fontSize: '.70em', height: '50vh', width: "80vw", overflowX: 'hidden', overflowY: 'auto' }}>
        { !isLoading && docs.map(({
          Id,
          DocType,
          OtherDescription,
          VaccineName,
          DateAdministered,
          AllergyName,
          PetAllergyReaction,
          AllergySeverity,
        }, i) => {
          return (
            <div key={i} className={i % 2 ? 'odd' : 'even'} style={{ marginBottom: '.6em' }}>
              <div className="columns">
                <div className="column">Document Type: {DocType}</div>
              </div>
              { !isDocTypeImplemented(DocType) && <div className="columns">
                  <div className="column">Description: {OtherDescription}</div>
                </div>
              }
              { DocType === DOC_TYPES_IMPLEMENTED.VACCINE && <div className="columns">
                  <div className="column">Vaccine: {VaccineName}</div>
                  <div className="column">Date Administered: {DateAdministered}</div>
                </div>
              }
              { DocType === DOC_TYPES_IMPLEMENTED.ALLERGY && <div className="columns">
                  <div className="column">Allergy: {AllergyName}</div>
                  <div className="column">Reaction: {PetAllergyReaction}</div>
                  <div className="column">Severity: {AllergySeverity}</div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  );
}