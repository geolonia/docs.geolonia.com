import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";
import { createRoot } from "react-dom/client";
import { Map } from "@geolonia/maps-react";

createRoot(document.getElementById("root")).render(
  <Map
    apiKey="YOUR-API-KEY"
    containerStyle={{ width: "100%", height: "100vh" }}
  />,
);
