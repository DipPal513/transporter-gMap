import React, { useState } from 'react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import Modal from '../modal/Modal'; // Adjust the import path as necessary
import Trees from '../../../public/data/data'; // Your data import

function MyGoogleMap() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="h-[60vh] w-full relative">
      <APIProvider apiKey="AIzaSyCJgOiSJeJlRdoFK_jTK-mNug5b22XPRn4">
        <Map
          center={{ lat: 46.8508, lng: 9.5328 }}
          zoom={16}
          mapId={"c4d3f0df86a8b9"}
        >
          <Markers points={Trees} onMarkerClick={openModal} />
        </Map>
      </APIProvider>

      {/* Custom modal for displaying point information */}
      <Modal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
}

const Markers = ({ points, onMarkerClick }) => {
  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          position={point}
          key={index}
          onClick={() => onMarkerClick()}
        >
          <span className="text-2xl">🚗</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MyGoogleMap;
