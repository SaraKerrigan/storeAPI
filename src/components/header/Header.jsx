import { useEffect, useState } from "react";
import st from "./Header.module.scss";
import Cart from "../cart/Cart.jsx";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setLimit,
  setPage,
  setSelectedFilter,
  setSelectedSort,
} from "../../redux/slices/productsReducer.js";

export default function Header({ handleSearch }) {
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { selectedFilter, selectedSort, limit } = useSelector(
    (state) => state.products
  );

  function clearSearch() {
    setSearch("");
    handleSearch("");
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setFilters(data);
      });
  }, []);

  return (
    <header className={st.root}>
      <div className={st.container}>
        <div className={st.row}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <div className={st.filters}>
            {filters.map((el) => {
              return (
                <button
                  key={el}
                  className={selectedFilter === el ? st.active : null}
                  onClick={() => {
                    dispatch(
                      setSelectedFilter(selectedFilter === el ? null : el)
                    );
                    dispatch(setPage(1));
                  }}
                >
                  {el}
                </button>
              );
            })}
          </div>
          <Cart />
        </div>
        <div className={st.row}>
          <div className={st.selectRows}>
            <div className={st.selectContainer}>
              <span>На странице:</span>
              <select
                value={limit}
                onChange={(event) => {
                  dispatch(setLimit(event.target.value));
                  dispatch(setPage(1));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className={st.selectContainer}>
              <span>Сортировка:</span>
              <select
                value={selectedSort}
                onChange={(event) =>
                  dispatch(setSelectedSort(event.target.value))
                }
              >
                <option value="1">По Умолчанию</option>
                <option value="2">По Названию</option>
                <option value="3">По Цене ↑</option>
                <option value="4">По Цене ↓</option>
              </select>
            </div>
          </div>

          <div className={st.search}>
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={clearSearch}>X</button>
            {/* если функция без параметров, то она передается без колбэка и круглых скобках */}
            <button onClick={() => handleSearch(search)}>Найти</button>
          </div>
        </div>
      </div>
    </header>
  );
}
