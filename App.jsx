import { useState, useEffect } from "react";

function App() {
  const [location, setLocation] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (location) {
      fetch(`http://localhost:5000/items?lat=${location.lat}&lng=${location.lng}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [location]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Barter App</h1>
      <p>Find and post goods nearby</p>

      {location ? (
        <p>Your location: {location.lat}, {location.lng}</p>
      ) : (
        <p>Getting your location...</p>
      )}

      <h2 className="text-xl mt-4">Nearby Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border p-2 my-2 rounded">
            <strong>{item.title}</strong> – {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;