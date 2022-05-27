import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  // 可以将props这个object中的 function, onLoadIngredients给卸下来
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-update-48230-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    // useEffect cleanup
    return () => {
      clearTimeout(timer);
    };

    // onLoadIngredients 如果在parent component 中，ie. Ingredients 中，用useCallback，那么这个地方
    // 的值也理所当然的不会变，所以[enteredFilter, onLoadIngredients] 都没有改变，则useEffect只运行一次
    // 所以就不会有infinite loop
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
