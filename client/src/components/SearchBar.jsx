import {filterByName} from "../actions"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./styles/SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  let handleName = (e) => {
    e.preventDefault();
    setName(e.target.name);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterByName(name));
    setName("");
  };

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={style.input}
        type="text"
        placeholder="Search recipe ..."
        onChange={(e) => handleName(e)}
        value={name}
      />
      <button
        className={style.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
