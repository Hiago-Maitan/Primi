import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const position = { lat: -23.503928, lng: -46.832592 };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/games");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const gameParams = data.find((game) => game.id === id);
  console.log(gameParams);

  return (
    <section className="details-container">
      {gameParams && (
        <>
          <div
            className="banner"
            style={{
              background: `url(${gameParams.imgUrl}) top/cover no-repeat`,
            }}
          ></div>
          <strong>{gameParams.name}</strong>
          <span>{gameParams.software}</span>
          <p>{gameParams.description}</p>

          <button>99.99</button>

          <APIProvider apiKey="AIzaSyBUGAD0qEqPqmlf8u4V_2M_BPsBDMJ8HWA">
            <div style={{ height: "50vh", width: "50%" }}>
              <Map zoom={15} center={position} mapId="174e671f85f9dcdc">
                <AdvancedMarker position={position}></AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        </>
      )}
    </section>
  );
}
