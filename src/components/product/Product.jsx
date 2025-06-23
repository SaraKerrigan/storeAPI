import st from "./Product.module.scss";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cartReducer";

export default function Product({ el }) {
  const dispatch = useDispatch();

  return (
    <div className={st.root}>
      <div className={st.top}>
        <Link to={`/product/${el.id}`}>
          <img src={el.images[0]} alt="" />
        </Link>
        <h3>{el.title}</h3>
        <p>{el.description}</p>
      </div>
      <div className={st.bottom}>
        <p>{el.price} $</p>
        <button onClick={() => dispatch(addProduct(el))}>В корзину</button>
        {/* addProduct - повесили на кнопку "В корзину" */}
      </div>
    </div>
  );
}
