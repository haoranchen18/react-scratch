import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  function addIngredientHandler(ingredient) {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient },
    ]);
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
