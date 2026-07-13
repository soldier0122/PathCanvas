import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';

function App() {

  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/generate-graph?lat=50.0647&lng=19.9450&radius=1000')
      .then(response => response.json())
      .then(data => setNetworkData(data))
      .catch(error => console.error("Error fetching graph:", error));
  }, []);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapContainer center={[50.0647, 19.9450]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {networkData && <GeoJSON data={networkData} style={{ color: 'blue', weight: 2 }} />}
      </MapContainer>
    </div>
  );
}

export default App;