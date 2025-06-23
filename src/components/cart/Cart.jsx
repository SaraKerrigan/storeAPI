import { useState } from "react";
import st from "./Cart.module.scss";
import close from "../../assets/images/modal-close.svg";
import closeModalImg from "../../assets/images/close.svg";
import DeliveryMap from "../deliveryMap/DeliveryMap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  delProduct,
  minusProduct,
} from "../../redux/slices/cartReducer";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const { cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const price = cartProducts
    .reduce((sum, el) => sum + el.price * el.count, 0)
    .toFixed(2);

  return (
    <>
      <button className={st.root} onClick={openModal}>
        <span>Корзина</span>
        <div className={st.separator}></div>
        <span>{cartProducts.length}</span>
      </button>
      <div className={`${st.modal} ${open ? st.open : ""}`}>
        <div className={st.modalContainer}>
          <div className={st.closeModal}>
            <h2>Корзина</h2>
            <button onClick={closeModal}>
              <img src={closeModalImg} alt="" />
            </button>
          </div>
          {!delivery && (
            <>
              <div className={st.itemsContainer}>
                {cartProducts.map((el) => {
                  return (
                    <div className={st.item}>
                      <div className={st.itemLeft}>
                        <img src={el.images[0]} alt="" />
                        <div className={st.info}>
                          <h3>{el.title}</h3>
                          <p>{el.description}</p>
                        </div>
                      </div>
                      <div className={st.itemRigth}>
                        <p className={st.price}>{el.price} $</p>
                        <div className={st.btns}>
                          <button
                            onClick={() => dispatch(minusProduct(el))}
                            disabled={el.count === 1}
                          >
                            -
                          </button>
                          <span>{el.count}</span>
                          <button onClick={() => dispatch(addProduct(el))}>
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(delProduct(el))}
                          className={st.modalClose}
                        >
                          <img src={close} alt="" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={st.bottom}>
                <div className={st.bottomLeft}>
                  <p>Сумма заказа:</p>
                  <span>{price} $</span>
                </div>
                <button
                  className={st.bottomBtn}
                  onClick={() => setDelivery(true)}
                >
                  Оформить
                </button>
              </div>
            </>
          )}
          {delivery && (
            <>
              <form>
                <div className={st.field}>
                  <label>ФИО:</label>
                  <input type="text" placeholder="ФИО" />
                </div>
                <div className={st.field}>
                  <label>Email:</label>
                  <input type="email" placeholder="email" />
                </div>
                <DeliveryMap />
              </form>
              <div className={st.bottom}>
                <div className={st.bottomLeft}>
                  <p>Сумма заказа:</p>
                  <span>{price} $</span>
                </div>
                <button
                  className={st.bottomBtnGrey}
                  onClick={() => setDelivery(false)}
                >
                  Отмена
                </button>
                <button className={st.bottomBtn}>Оплатить</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
