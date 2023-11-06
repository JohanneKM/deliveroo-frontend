import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Je passe dans mon useEffect");
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-backend--j7xsyk95scmh.code.run/"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <header></header>
      <section className="presentation">
        <h1> {data.restaurant.name} </h1>
        <p> {data.restaurant.description}</p>
        <img src="" alt="" />
      </section>

      <section className="menu">
        {data.categories.map((elem) => {
          return <p key={elem.name}> {elem.name}</p>;
        })}
      </section>
    </>
  );
};

export default App;
