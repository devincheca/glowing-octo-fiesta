// Constants
import { NAVIGATION_CONTAINERS } from '.././constants/NAVIGATION_CONTAINERS';

export default function Home(props: { setActiveContainer: (nav: string) => void }) {
  const { setActiveContainer } = props;

  return (
    <>
      <div style={{ margin: '.5em' }}>Keep track of your pet documents in one place</div>
      <br></br>
      <div>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.GET_STARTED)}>Get Started</button>
      </div>
      <br></br>
      <div>
        <button className="button" onClick={() => setActiveContainer(NAVIGATION_CONTAINERS.MY_PETS)}>My Pets</button>
      </div>
      <br></br>
      <p>
        Novellia
      </p>
    </>
  );
}