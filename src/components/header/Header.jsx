import { useEffect, useState } from "react";
import st from "./Header.module.scss";

export default function Header({
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort,
  handleSearch,
  limit,
  setLimit,
}) {
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");

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
  console.log(filters);
  console.log(selectedFilter);
  console.log(selectedSort);

  return (
    <header className={st.root}>
      <div className={st.container}>
        <div className={st.row}>
          <div className={st.filters}>
            {filters.map((el) => {
              return (
                <button
                  className={selectedFilter === el && st.active}
                  onClick={() =>
                    setSelectedFilter((prev) => (prev === el ? null : el))
                  }
                >
                  {el}
                </button>
              );
            })}
          </div>
          <button className={st.cart}>
            <span>Корзина</span>
            <div className={st.separator}></div>
            <span>1</span>
          </button>
        </div>
        <div className={st.row}>
          <div className={st.selectRows}>
            <div className={st.selectContainer}>
              <span>На странице:</span>
              <select
                value={limit}
                onChange={(event) => setLimit(event.target.value)}
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
                onChange={(event) => setSelectedSort(event.target.value)}
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
