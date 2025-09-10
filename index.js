import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, title: "Old Laptop", description: "Still works", lat: -26.2, lng: 28.0 },
  { id: 2, title: "Shoes", description: "Size 8", lat: -26.3, lng: 27.9 }
];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

app.get("/items", (req, res) => {
  const { lat, lng } = req.query;
  const nearby = items.filter(
    (item) => getDistance(lat, lng, item.lat, item.lng) < 10
  );
  res.json(nearby);
});

app.post("/items", (req, res) => {
  const { title, description, lat, lng } = req.body;
  const newItem = { id: Date.now(), title, description, lat, lng };
  items.push(newItem);
  res.json(newItem);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));