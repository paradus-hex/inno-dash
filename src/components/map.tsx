import React, { useEffect } from "react";
import L from "leaflet";
import { Company } from "@/types";
import RoomIcon from "@mui/icons-material/Room";
import ReactDOMServer from "react-dom/server";

const Map = ({ company }: { company: Company }) => {
  useEffect(() => {
    const map = L.map("map").setView(
      [Number(company.address.latitude), Number(company.address.longitude)],
      13
    );

    const MyIcon = () => <RoomIcon style={{ color: "darkred" }} />;

    const myIcon = L.divIcon({
      className: "my-div-icon",
      html: ReactDOMServer.renderToString(<MyIcon />),
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    const marker = L.marker(
      [Number(company.address.latitude), Number(company.address.longitude)],
      { icon: myIcon }
    ).addTo(map);

    marker
      .bindPopup(`${company.address.street} ${company.address.house}`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default Map;
