import { useEffect, useState } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { listLogEntries } from "./Api";

function App() {
  const [logEntries, setLogEntries] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await listLogEntries();
      setLogEntries(response);
    })();
  }, []);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -74.0,
        latitude: 40.73,
        zoom: 11,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/abhiramkrishna8921/cljug9vxr002501pj6jiu65ra"
    />
  );
}

export default App;
