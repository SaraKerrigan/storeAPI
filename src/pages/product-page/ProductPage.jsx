import { useEffect, useState } from "react";
import st from "./ProductPage.module.scss";
import Cart from "../../components/cart/Cart";
import StarIcon from "../../assets/icons/StarIcon";
import logo from "../../assets/images/logo.svg";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cartReducer";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log(product);

  const roundRating = Math.round(product.rating);

  return (
    <div className={st.root}>
      <div className={st.container}>
        <header>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <Cart />
        </header>

        <div className={st.row}>
          <img src={product.images[0]} alt="" />
          <div className={st.body}>
            <h1>{product.title}</h1>
            <h2>{product.description}</h2>
            <span>{product.category}</span>
            <div className={st.stars}>
              <StarIcon fill={roundRating >= 1 ? undefined : "grey"} />
              <StarIcon fill={roundRating >= 2 ? undefined : "grey"} />
              <StarIcon fill={roundRating >= 3 ? undefined : "grey"} />
              <StarIcon fill={roundRating >= 4 ? undefined : "grey"} />
              <StarIcon fill={roundRating >= 5 ? undefined : "grey"} />
            </div>
            <button
              onClick={() => dispatch(addProduct(product))}
              className={st.btn}
            >
              Добавить в корзину {product.price} $
            </button>
          </div>
        </div>
        <h2 className={st.title}>Отзывы</h2>
        <div className={st.rewies}>
          {product.reviews.map((item) => {
            return (
              <div className={st.rewie}>
                <div className={st.top}>
                  <div className={st.left}>
                    <h3>{item.reviewerName}</h3>
                    <p>{item.reviewerEmail}</p>
                  </div>
                  <div className={st.right}>
                    {item.rating >= 1 && <StarIcon />}
                    {item.rating >= 2 && <StarIcon />}
                    {item.rating >= 3 && <StarIcon />}
                    {item.rating >= 4 && <StarIcon />}
                    {item.rating >= 5 && <StarIcon />}
                  </div>
                </div>
                <div className={st.bottom}>
                  <p>{item.comment}</p>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
