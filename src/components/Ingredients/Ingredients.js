import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  function addIngredientHandler(ingredient) {
    fetch(
      "https://react-hooks-update-48230-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resoponseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: resoponseData.name, ...ingredient },
        ]);
      });
  }

  function removeIngredientHandler(ingredientId) {
    setUserIngredients((prevIngredients) => {
      return prevIngredients.filter(
        (ingredient) => ingredient.id !== ingredientId
      );
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
