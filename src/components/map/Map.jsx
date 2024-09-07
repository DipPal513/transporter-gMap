import React, { useState } from 'react';
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import CarModal from '../modal/CarModal'; // Import the CarModal component
import Modal from "../modal/Modal"; // Import the TreeModal component
import Trees from '../../../public/data/data'; // Your data import for trees
import { data2 } from '../../../public/data/data'; // Your data import for cars
import { CSSTransition } from 'react-transition-group'; // Import CSSTransition for animations

function MyGoogleMap() {
  const [carModalIsOpen, setCarModalIsOpen] = useState(false);
  const [treeModalIsOpen, setTreeModalIsOpen] = useState(false); // For tree modal
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);


  const openCarModal = (car) => {
    setSelectedCar(car);
    setCarModalIsOpen(true);
  };

  const closeCarModal = () => {
    setCarModalIsOpen(false);
    setSelectedCar(null);
  };

  const openTreeModal = (item) => {
    setTreeModalIsOpen(true);
    setSelectedSlot(item)
  };

  const closeTreeModal = () => {
    setTreeModalIsOpen(false);
  };

  return (
    <div className="h-[90vh] w-full relative">
      <APIProvider apiKey="AIzaSyCJgOiSJeJlRdoFK_jTK-mNug5b22XPRn4">
        <Map
          defaultCenter={{ lat: 46.8508, lng: 9.5328 }}
          // draggableCursor={true}
          zoom={16}
          mapId={"c4d3f0df86a8b9"}
        >
          {/* Tree markers */}
          <Markers points={Trees} onMarkerClick={openTreeModal} />

          {/* Car markers */}
          <CarMarkers points={data2} onMarkerClick={openCarModal} />
        </Map>
      </APIProvider>

      {/* Tree Modal with Animation */}
      <CSSTransition
        in={treeModalIsOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Modal isOpen={treeModalIsOpen} slot={selectedSlot} onClose={closeTreeModal} />
      </CSSTransition>

      {/* Car Modal with Animation */}
      <CSSTransition
        in={carModalIsOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <CarModal isOpen={carModalIsOpen} car={selectedCar} onClose={closeCarModal} />
      </CSSTransition>
    </div>
  );
}

// Markers for Trees
const Markers = ({ points, onMarkerClick }) => {
  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          position={point}
          key={index}
          onClick={() => onMarkerClick(point)} // Open tree modal
        >
          <span className="text-lg bg-blue-500 align-middle text-white border-4 border-blue-200 rounded-full w-10 h-10 text-center block">
            {index}
          </span>
        </AdvancedMarker>
      ))}
    </>
  );
};

// Markers for Cars
const CarMarkers = ({ points, onMarkerClick }) => {
  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          position={point}
          key={index}
          onClick={() => onMarkerClick(point)} // Open car modal with car data
        >
          <span className="text-xl bg-black text-white rounded-full w-6 h-6 p-2">
            🚗
          </span>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MyGoogleMap;
