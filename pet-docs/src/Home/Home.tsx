// Constants
import { NAVIGATION_CONTAINERS } from '.././constants/NAVIGATION_CONTAINERS';

export default function Home(props: { setActiveContainer: (nav: string) => void }) {
  const { setActiveContainer } = props;

  return (
    <>
      <div style={{ margin: '.5em' }}>Keep track of your pet documents in one place</div>
      <div className='columns'>
        <button className="button column" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.GET_STARTED)}>Get Started</button>
        <button className="button column" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS)}>My Pets</button>
      </div>
      <p>
        Novellia
      </p>
    </>
  );
}