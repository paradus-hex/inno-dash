import React, { useEffect } from "react";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const Map: React.FC = (props: any) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const map = L.map("map").setView([50.779729, 6.100367], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      const marker = L.marker([50.779729, 6.100367]).addTo(map);

      marker
        .bindPopup("<b>Innoloft GmbH</b><br>Jülicher Straße 72a, 52070 Aachen")
        .openPopup();

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default Map;
