import { createRoot } from "react-dom/client";
import { Map } from "@geolonia/maps-react";
import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";

// #region map
createRoot(document.getElementById("root")!).render(
  <Map
    apiKey="YOUR-API-KEY"
    center={{ lng: 139.767125, lat: 35.681236 }}
    zoom={14}
    containerStyle={{ width: "100%", height: "100vh" }}
  />,
);
// #endregion
