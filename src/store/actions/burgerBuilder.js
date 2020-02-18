import * as actionTypes from "./actions";
import axios from "../../axios-orders";

export const addIngredient = igName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: igName
  };
};

export const removeIngredient = igName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: igName
  };
};

const setIngredients = ings => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ings
  };
};

export const initIngredients = () => {
  return dispatch =>
    axios
      .get("/ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
