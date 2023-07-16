import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LogEntryForm from "./LogEntryForm";

import { listLogEntries } from "./Api";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});

  const [addEntryLocation, setAddEntryLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await getEntries();
    })(); // immediately invoked functions
  }, []);

  async function getEntries() {
    const response = await listLogEntries();
    setLogEntries(response);
  }

  function showAddMArkerPopup(event) {
    setAddEntryLocation({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });
  }

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -74.0,
        latitude: 40.73,
        zoom: 11,
        bearing: 10,
      }}
      onDblClick={showAddMArkerPopup}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/abhiramkrishna8921/cljug9vxr002501pj6jiu65ra"
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            longitude={entry.longitude}
            latitude={entry.latitude}
            anchor="bottom"
          >
            <div onClick={() => setShowPopup({ [entry._id]: true })}>
              <img
                className="marker"
                style={{
                  height: `24px`,
                  width: `24px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              longitude={entry.longitude}
              latitude={entry.latitude}
              anchor="top"
              closeOnClick={false}
              onClose={() => setShowPopup({})}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>
                  "<i>{entry.comments}</i>"
                </p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
            anchor="bottom"
          >
            <div>
              <img
                className="marker"
                style={{
                  height: `24px`,
                  width: `24px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              />
            </div>
          </Marker>
          <Popup
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
            anchor="top"
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
          >
            <div className="popup">
              <h3>Add your new log entry here!</h3>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </Map>
  );
}

export default App;
