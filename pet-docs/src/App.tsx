import React, { useState } from 'react';
import './App.css';

// Containers
import Home from "./Home/Home";
import Pet from "./Pet/Pet";
import MyPets from "./MyPets/MyPets"
import PetDocs from "./PetDocs/PetDocs";
import Doc from "./Doc/Doc";
import AdminPets from "./AdminPets/AdminPets";
import DocType from "./DocType/DocType";

// Constants
import { NAVIGATION_CONTAINERS } from './constants/NAVIGATION_CONTAINERS';

function App() {
  const [activeContainer, setActiveContainer] = useState(NAVIGATION_CONTAINERS.HOME);

  let containerChild = <Home setActiveContainer={nav => setActiveContainer(nav)} />;

  switch(activeContainer) {
    case NAVIGATION_CONTAINERS.GET_STARTED:
      containerChild = <Pet setActiveContainer={nav => setActiveContainer(nav)} />;
      break; 
    case NAVIGATION_CONTAINERS.MY_PETS:
      containerChild = <MyPets setActiveContainer={nav => setActiveContainer(nav)} />;
      break; 
    case NAVIGATION_CONTAINERS.EDIT_PET:
      containerChild = <Pet isEdit={true} setActiveContainer={nav => setActiveContainer(nav)} />;
      break; 
    case NAVIGATION_CONTAINERS.PET_DOCS:
      containerChild = <PetDocs setActiveContainer={nav => setActiveContainer(nav)} />;
      break; 
    case NAVIGATION_CONTAINERS.ADD_DOC:
      containerChild = <Doc setActiveContainer={nav => setActiveContainer(nav)} />;
      break; 
  }

  const [urlParams] = window.location.href.split('?').reverse();
  if (urlParams.includes('isAdmin=true')) {
    if (activeContainer === NAVIGATION_CONTAINERS.PET_DOCS) {
      containerChild = <PetDocs setActiveContainer={nav => setActiveContainer(nav)} />;
    } else if (activeContainer === NAVIGATION_CONTAINERS.ADD_DOC) {
      containerChild = <Doc setActiveContainer={nav => setActiveContainer(nav)} />;
    } else if (activeContainer === NAVIGATION_CONTAINERS.ADD_DOC_TYPE) {
      containerChild = <DocType setActiveContainer={nav => setActiveContainer(nav)} />;
    }
    else containerChild = <AdminPets setActiveContainer={nav => setActiveContainer(nav)} />;
  }

  return (
    <div className="App">
      <header className="App-header rows">
        <div className="App-body">
          <h2>Pet Docs</h2>
          {containerChild}
        </div>
      </header>
    </div>
  );
}

export default App;
