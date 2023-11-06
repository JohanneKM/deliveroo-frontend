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
      <header>
        <img src="./src/assets/logo-teal.svg" alt="logo" />
      </header>

      <section className="presentation">
        <div className="container">
          <div className="text-presentation">
            <h1> {data.restaurant.name} </h1>
            <p> {data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="header-img" />
        </div>
      </section>

      <section className="menu">
        {data.categories.map((elem) => {
          return (
            <>
              <div className="container">
                <p className="category" key={elem.name}>
                  {elem.name}
                </p>

                <div className="dish-detail-all">
                  {elem.meals.map((elem2, index) => {
                    return (
                      <>
                        <div className="dish-detail">
                          <div className="text">
                            <p className="dish-title" key={elem2.title}>
                              {elem2.title}
                            </p>
                            <p className="dish-description" key={elem2.index}>
                              {elem2.description}
                            </p>
                            <p className="dish-price" key={elem2.index}>
                              {elem2.price} €
                            </p>
                            <p key={elem2.index}> {elem2.popular}</p>
                          </div>

                          <img src={elem2.picture} alt="dish-image" />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default App;
