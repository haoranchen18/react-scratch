import React, { useEffect, useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

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

  // 用了useCallback wrap起来之后，起到作用：当Ingredients componenet re-render的时候,
  // useCallback 可以将内部函数catch起来，等到 re-render 全部结束之后，pass 到下面的child component 中
  // 这样，onLoadIngredients={filteredIngredientsHandler} 就永远接受到同一个不会改变的参数
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
