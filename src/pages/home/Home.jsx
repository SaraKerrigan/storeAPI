import st from "./Home.module.scss";
// st объект стилей (условное название)

import { useEffect } from "react";
import Header from "../../components/header/Header";
import Product from "../../components/product/Product";
import { sortValues } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  prevPage,
  setMaxPage,
  setProducts,
  setSelectedFilter,
  setSelectedSort,
} from "../../redux/slices/productsReducer";

export default function Home() {
  const dispatch = useDispatch();

  const { products, selectedFilter, selectedSort, limit, page, maxPage } =
    useSelector((state) => state.products);

  function handleSearch(search) {
    dispatch(setSelectedFilter(null));
    dispatch(setSelectedSort("1"));
    setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setProducts(data.products));
        });
    }, 100);
  }

  useEffect(() => {
    let url = "https://dummyjson.com/products";
    url += selectedFilter ? `/category/${selectedFilter}` : "";
    url += selectedSort
      ? `?sortBy=${sortValues[selectedSort].sortBy}&order=${sortValues[selectedSort].order}`
      : "";
    url += `&limit=${limit}&skip=${(page - 1) * limit}`;
    // (page-1)*limit} формула расчета сколько продуктов нужно скипнуть
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data.products));
        dispatch(setMaxPage(Math.ceil(data.total / limit)));
      });
  }, [selectedFilter, selectedSort, limit, page]);
  console.log(products);

  return (
    <div className={st.root}>
      {/* // root - главный родительский класс (обычное обозначение) st - объект из классов (ключами являются классы) */}
      <Header handleSearch={handleSearch} />
      <main>
        <section className={st.products}>
          <div className={st.container}>
            <h1>{selectedFilter ? selectedFilter : "All products"}</h1>
            <div className={st.row}>
              {products.map((el) => {
                return <Product el={el} key={el.id} />;
                // addProduct - передаем в компонент Product пробсом
              })}
            </div>
            <div className={st.pagination}>
              <button
                onClick={() => dispatch(prevPage())}
                disabled={page === 1}
              >
                {"<"}
              </button>
              <span>
                {page} из {maxPage}
              </span>
              <button
                onClick={() => dispatch(nextPage())}
                disabled={page === maxPage}
              >
                {">"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
