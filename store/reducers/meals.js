import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVOURITE } from "../actions/meal";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((m) => m.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const newFilteredMeals = state.meals.filter((meal) => {
        if (meal.isGlutenFree && !appliedFilters.glutenFree) {
          return false;
        }
        if (meal.isLactoseFree && !appliedFilters.lactoseFree) {
          return false;
        }

        if (meal.isVegan && !appliedFilters.vegan) {
          return false;
        }

        if (meal.isVegetarian && !appliedFilters.vegetarian) {
          return false;
        }

        return true;
      });

      return { ...state, filteredMeals: newFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
