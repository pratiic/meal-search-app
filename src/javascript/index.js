import { elements } from "./elements.js";
import { searchMeal, renderMealDetails } from "./fetchMeal.js";

elements.form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (elements.searchBar.value !== "") {
		searchMeal(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${elements.searchBar.value}`
		);
	}
});

elements.randomButton.addEventListener("click", () => {
	searchMeal(`https://www.themealdb.com/api/json/v1/1/random.php`);
});

elements.mealList.addEventListener("click", (event) => {
	if (event.target.classList.contains("meal")) {
		renderMealDetails(event.target);
	}
});
