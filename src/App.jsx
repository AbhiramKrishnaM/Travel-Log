import { useEffect } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  useEffect(() => {}, []);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -95.665,
        latitude: 37.6,
        zoom: 3,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/abhiramkrishna8921/cljufl47a001z01pj96ax2sne"
    />
  );
}

export default App;
