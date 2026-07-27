import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";
import { geolonia } from "@geolonia/maps-suite";

new geolonia.maps.Map(document.getElementById("map"), {
  apiKey: "YOUR-API-KEY",
});
