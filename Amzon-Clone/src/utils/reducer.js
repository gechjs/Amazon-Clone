import { type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
  totalPrice: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
          totalPrice: state.totalPrice + action.item.price,
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        return {
          ...state,
          basket: updatedBasket,
          totalPrice: state.totalPrice + action.item.price,
        };
      }

    case type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        const itemPrice = newBasket[index].price;
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
        return {
          ...state,
          basket: newBasket,
          totalPrice: state.totalPrice - itemPrice,
        };
      }

      return state;

    case type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
        totalPrice: 0,
      };

    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
