"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const route: {
  name: string;
  position: [number, number];
}[] = [
  { name: "Porto", position: [41.1579, -8.6291] },
  { name: "São Pedro de Rates", position: [41.4233, -8.6723] },
  { name: "Barcelos", position: [41.5317, -8.6184] },
  { name: "Balugães", position: [41.6415, -8.6438] },
  { name: "Ponte de Lima", position: [41.7675, -8.5831] },
  { name: "Rubiães", position: [41.8942, -8.6330] },
  { name: "Tui", position: [42.0478, -8.6440] },
  { name: "O Porriño", position: [42.1609, -8.6153] },
  { name: "Redondela", position: [42.2821, -8.6093] },
  { name: "Pontevedra", position: [42.4310, -8.6444] },
  { name: "Caldas de Reis", position: [42.6048, -8.7388] },
  { name: "Padrón", position: [42.7369, -8.6600] },
  { name: "Santiago de Compostela", position: [42.8782, -8.5448] },
];

const startIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #57534e;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,.3);
    "></div>
  `,
});

const endIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #b45309;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,.3);
    "></div>
  `,
});

const stopIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 14px;
      height: 14px;
      background: white;
      border: 3px solid #78716c;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0,0,0,.25);
    "></div>
  `,
});

export default function RouteMap() {
  const positions = route.map((place) => place.position);
function FitRoute() {
  const map = useMap();

  map.fitBounds(positions, {
    padding: [30, 30],
  });

  return null;
}
  return (
    <div className="h-72 w-full">
      <MapContainer
        center={[42.05, -8.59]}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <FitRoute />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={positions}
          pathOptions={{
            color: "#57534e",
            weight: 4,
            dashArray: "8 8",
          }}
        />

        {route.map((place, index) => {
          const isStart = index === 0;
          const isEnd = index === route.length - 1;

          return (
            <Marker
              key={place.name}
              position={place.position}
              icon={isStart ? startIcon : isEnd ? endIcon : stopIcon}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {isStart
                  ? "Start van mijn Camino"
                  : isEnd
                    ? "Mijn eindbestemming"
                    : "Overnachting"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}