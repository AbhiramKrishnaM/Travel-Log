import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { listLogEntries } from "./Api";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});

  useEffect(() => {
    (async () => {
      const response = await listLogEntries();
      setLogEntries(response);
    })(); // immediately invoked functions
  }, []);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -74.0,
        latitude: 40.73,
        zoom: 11,
        bearing: 10,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/abhiramkrishna8921/cljug9vxr002501pj6jiu65ra"
    >
      {logEntries.map((entry) => (
        <>
          <Marker
            key={entry._id}
            longitude={entry.longitude}
            latitude={entry.latitude}
            anchor="bottom"
          >
            <div
              onClick={() => setShowPopup({ ...showPopup, [entry._id]: true })}
            >
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
              onClose={() => setShowPopup({ ...showPopup, [entry._id]: false })}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
    </Map>
  );
}

export default App;
