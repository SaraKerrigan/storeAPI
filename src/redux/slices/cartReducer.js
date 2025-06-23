import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // state - состояние (объекта initial state)
      // action - параметры (action.payload - данные, которые были переданы в функцию при вызове)
      const isProduct = state.cartProducts.find(
        (el) => el.id === action.payload.id
      );
      if (isProduct) {
        state.cartProducts = state.cartProducts.map((element) => {
          if (element.id === action.payload.id) {
            element.count++;
          }
          return element;
        });
      } else {
        state.cartProducts.push({ ...action.payload, count: 1 });
        // функция с аргументом prev (предыдущее состояние массива), в новый массив копируется весь старый массив и на конце добавляется объект (product) с новым ключом "count" со значением 1
      }
    },

    minusProduct: (state, action) => {
      // prev - предыдущее состояние массива
      state.cartProducts = state.cartProducts.map((element) => {
        if (element.id === action.payload.id) {
          element.count--;
        }
        return element;
      });
    },

    delProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (el) => el.id != action.payload.id
      );
    },
  },
});

export const { addProduct, minusProduct, delProduct } = cartSlice.actions;

export default cartSlice.reducer;
