import { GeolocationControl, Map, Placemark } from "@pbe/react-yandex-maps";
import { useState } from "react";
import st from "./DeliveryMap.module.scss";

export default function DeliveryMap() {
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);
  const [address, setAddress] = useState("");

  function handleMapClick(event) {
    const coords = event.get("coords");
    setCoordinates(coords);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json&addressdetails=1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAddress(`${data.address.road} ${data.address.house_number}`);
      });
  }

  return (
    <div className={st.root}>
      <Map
        onClick={handleMapClick}
        defaultState={{ center: coordinates, zoom: 9 }}
        width={"100%"}
        height={"300px"}
        modules={["geocode", "Placemark", "geolocation"]}
      >
        <GeolocationControl />
        <Placemark geometry={coordinates} />
      </Map>
      <p>
        {address
          ? `Выбранный адрес: ${address}`
          : `Кликните по карте для выбора адреса`}
      </p>
    </div>
  );
}
