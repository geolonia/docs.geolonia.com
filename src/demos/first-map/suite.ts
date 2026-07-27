import { geolonia } from "@geolonia/maps-suite";
import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";

// #region map
new geolonia.maps.Map(document.getElementById("map")!, {
  apiKey: "YOUR-API-KEY",
  center: { lat: 35.681236, lng: 139.767125 },
  zoom: 14,
});
// #endregion
