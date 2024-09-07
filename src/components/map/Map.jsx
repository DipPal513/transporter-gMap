/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Modal from "../modal/Modal"; 
import Trees from "../../../public/data/data"; // Your data import
import { data2 } from "../../../public/data/data";
function MyGoogleMap() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="h-[60vh] w-full relative">
      <APIProvider apiKey="AIzaSyCJgOiSJeJlRdoFK_jTK-mNug5b22XPRn4">
        <Map
          defaultCenter={{ lat: 46.8508, lng: 9.5328 }}
          draggableCursor={true}
          defaultZoom={16}
          mapId={"c4d3f0df86a8b9"}
        >
          <Markers points={Trees} onMarkerClick={() => openModal()} />
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
          onClick={() => onMarkerClick(point)}
        >
          <span className="text-lg bg-blue-500 align-middle text-white border-4 border-blue-200 rounded-full w-10  h-10 text-center block ">
            {index}
          </span>
        </AdvancedMarker>
      ))}
      {data2.map((point, index) => (
        <AdvancedMarker
          position={point}
          key={index}
          onClick={() => onMarkerClick()}
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
