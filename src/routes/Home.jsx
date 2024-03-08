import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

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

  return (
    <>
      <section className="title-content">
        <strong>SmartGames</strong>
        <h4>O melhor loja de games</h4>
      </section>

      <main>
        {data.map((game) => (
          <div key={game.id} className="gameCard">
            <div
              className="gameImg"
              style={{
                background: `url(${game.imgUrl}) top/cover no-repeat`,
              }}
            ></div>
            <div className="gameInfo">
              <strong>{game.name}</strong>
              <div className="softwareAndPrice">
                <span>{game.software}</span>
                <span>R$ {game.price}</span>
              </div>
              <p>{game.description}</p>
              <div className="btn-container">
                <button><Link to={`/details/${game.id}`}>Visualizar</Link></button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default Home;