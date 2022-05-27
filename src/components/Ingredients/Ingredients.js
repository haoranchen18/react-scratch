import React, { useEffect, useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal.js";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  function addIngredientHandler(ingredient) {
    setIsLoading(true);
    fetch(
      "https://react-hooks-update-48230-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(
      `https://react-hooks-update-48230-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setIsLoading(false);
      setUserIngredients((prevIngredients) => {
        return prevIngredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        );
      });
    }).catch(error => {
      setError("Something went wrong!");
      setIsLoading(false);
    });
  }

  // 用了useCallback wrap起来之后，起到作用：当Ingredients componenet re-render的时候,
  // useCallback 可以将内部函数catch起来，等到 re-render 全部结束之后，pass 到下面的child component 中
  // 这样，onLoadIngredients={filteredIngredientsHandler} 就永远接受到同一个不会改变的参数
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  function clearError() {
    setError(null);
  }

  return (
    <div className="App">
      {error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> : null}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

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
