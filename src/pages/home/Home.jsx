import st from "./Home.module.scss";
// st объект стилей (условное название)

import React, { use, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Product from "../../components/product/Product";
import { sortValues } from "../../constants";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("1");
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  function handleSearch(search) {
    setSelectedFilter(null);
    setSelectedSort("1");
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => prev - 1);
  }

  useEffect(() => {
    let url = "https://dummyjson.com/products";
    url += selectedFilter ? `/category/${selectedFilter}` : "";
    url += selectedSort
      ? `?sortBy=${sortValues[selectedSort].sortBy}&order=${sortValues[selectedSort].order}`
      : "";
    url += `&limit=${limit}&skip=0`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, [selectedFilter, selectedSort, limit]);
  console.log(products);

  return (
    <div className={st.root}>
      {/* // root - главный родительский класс (обычное обозначение) st - объект из классов (ключами являются классы) */}
      <Header
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        handleSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />
      <main>
        <section className={st.products}>
          <div className={st.container}>
            <h1>{selectedFilter ? selectedFilter : "All products"}</h1>
            <div className={st.row}>
              {products.map((el) => {
                return <Product el={el} key={el.id} />;
              })}
            </div>
            <div className={st.pagination}>
              <button>{"<"}</button>
              <span>1</span>
              <button>{">"}</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
