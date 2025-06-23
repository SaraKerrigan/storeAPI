import st from "./Product.module.scss";
import pizza from "../../assets/images/pizza.png";

export default function Product({ el }) {

  return (
    <div className={st.root}>
      <div className={st.top}>
        <img src={el.images[0]} alt="" />
        <h3>{el.title}</h3>
        <p>{el.description}</p>
      </div>
      <div className={st.bottom}>
        <p>{el.price} $</p>
        <button>В корзину</button>
      </div>
    </div>
  );
}
