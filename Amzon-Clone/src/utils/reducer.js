import { type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      const updatedBasket = state.basket.reduce((acc, item) => {
        if (item.id === action.item.id) {
          acc.push({ ...item, amount: item.amount + 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      const isExistingItem = state.basket.some(
        (item) => item.id === action.item.id
      );

      if (!isExistingItem) {
        updatedBasket.push({ ...action.item, amount: 1 });
      }

      return {
        ...state,
        basket: updatedBasket,
      };

    case type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };

    case type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
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
