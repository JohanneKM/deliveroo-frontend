import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]); // [ {meal : brunch vegan, quantity: 2 , price : 10€}, ...]

  const handleClickMinus = (index) => {
    const mealsCopy = [...meals];

    mealsCopy[index].quantity = meals[index].quantity - 1;
    setMeals(mealsCopy);
  };

  const handleClickPlus = (index) => {
    const mealsCopy = [...meals];

    mealsCopy[index].quantity = meals[index].quantity + 1;
    setMeals(mealsCopy);
  };

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
        <div className="img-header">
          <img src="./src/assets/img/logo-teal.svg" alt="logo" />
        </div>
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

      <section className="menu-and-basket">
        <section className="menu">
          {data.categories.map((elem) => {
            return (
              <section key={elem.name}>
                <div key={elem.name} className="container">
                  {elem.meals.length === 0 ? (
                    <p></p>
                  ) : (
                    <p className="category" key={elem.name}>
                      {elem.name}
                    </p>
                  )}

                  <div className="dish-detail-all">
                    {elem.meals.map((elem2, index) => {
                      return (
                        <section key={elem2.title}>
                          <div
                            onClick={() => {
                              const mealToFind = meals.find(
                                (e) => e.meal === elem2.title
                              );

                              // je vérifie si le plat est déjà dans mon tableau tabMeals

                              if (mealToFind) {
                                const indexOfMeal = meals.indexOf(mealToFind); // je recherche son idex dans le panier
                                const mealsCopy = [...meals];
                                meals[indexOfMeal].quantity += 1;
                                setMeals(mealsCopy);
                              } else {
                                const mealsCopy = [...meals];
                                mealsCopy.push({
                                  meal: elem2.title,
                                  quantity: 1,
                                  price: elem2.price,
                                });
                                setMeals(mealsCopy);
                              }
                            }}
                            key={elem2.title}
                            className="dish-detail"
                          >
                            <div className="text">
                              <p className="dish-title" key={elem2.title}>
                                {elem2.title}
                              </p>
                              <p className="dish-description" key={elem2.index}>
                                {elem2.description}
                              </p>

                              <div className="price-popular">
                                <p className="dish-price" key={elem2.index}>
                                  {elem2.price} €
                                </p>

                                {elem2.popular ? (
                                  <p className="popular" key={elem2.index}>
                                    <span>
                                      <i className="icon-STAR_FILL"></i>
                                    </span>
                                    Populaire
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </div>

                            {elem2.picture && (
                              <img src={elem2.picture} alt="dish-image" />
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </section>

        <section className="basket">
          <input type="submit" value="Valider mon panier" />
          {meals.map((elem, index) => {
            return (
              <div className="basket-content" key={elem.index}>
                <button onClick={() => handleClickMinus(index)}>-</button>
                <p> {elem.quantity}</p>

                <button
                  onClick={() => {
                    handleClickPlus(index);
                  }}
                >
                  +
                </button>
                <p> {elem.meal}</p>

                <p> {elem.price} €</p>
              </div>
            );
          })}

          <div className="subtotal-delivery">
            <p>Sous total</p>
            <p>Frais de livraison</p>
          </div>

          <div className="total">
            <p>Total</p>
          </div>
        </section>
      </section>
    </>
  );
};

export default App;
