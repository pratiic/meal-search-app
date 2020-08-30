import { elements } from "./elements.js";

let fetchedMeals = [];

export let searchMeal = function (url) {
	clearMealDetails();

	let data = fetch(url)
		.then((result) => result.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return error;
		});
	data.then((data) => {
		if (data.meals === null) {
			showMeals(null);
		} else {
			showMeals(data.meals);
		}
	}).catch((error) => {
		showError(error);
	});
};

let showMeals = function (meals) {
	clearMealList();

	if (meals === null) {
		showAlert("meal not found");
	} else {
		meals.forEach((meal) => {
			fetchedMeals.push(meal);
			showMealList(meal);
		});
	}
};

let showError = function (error) {
	console.log(error);
};

let showMealList = function (meal) {
	elements.mealList.innerHTML += `
	    <div class="meal" id = "${meal.idMeal}">
	        <img
	            src="${meal.strMealThumb}"
	            alt=""
	            class="meal-image"
	        />
	        <p class="meal-name">${meal.strMeal}</p>
	    </div>
    `;
	console.log(fetchedMeals);
};

export let renderMealDetails = function (selectedMeal) {
	clearMealDetails();
	console.log(elements.mealDetails);
	fetchedMeals.forEach((fetchedMeal) => {
		if (fetchedMeal.idMeal === selectedMeal.id) {
			elements.mealDetails.innerHTML += `
                <h1 class="meal-name capitalize mb-3">${fetchedMeal.strMeal}</h1>
                <div class="meal-image-container mb-3">
                    <img src="${fetchedMeal.strMealThumb}" alt="" class="meal-image" />
                </div>
                <div class = "recipe-info mb-3">
                    <p class = "recipe-category capitalize mb-1">${fetchedMeal.strCategory}</p>
                    <p class = "recipe-area capitalize">${fetchedMeal.strArea}</p>
                </div>
                <p class="meal-recipe mb-3">${fetchedMeal.strInstructions}</p>
                <div class="ingredients">
                    <h3 class = "mb-3 capitalize">ingredients</h3>
                    <div class = "ingredients-main"></div>
                </div>
			</div>
            `;
			let ingredients = [];

			for (let i = 0; i <= 20; i++) {
				if (fetchedMeal[`strIngredient${i}`]) {
					ingredients.push(
						`${fetchedMeal[`strIngredient${i}`]} - ${
							fetchedMeal[`strMeasure${i}`]
						}`
					);
				}
			}

			ingredients.forEach((ingredient) => {
				document.querySelector(
					".ingredients-main"
				).innerHTML += `<div class = "ingredient">${ingredient}</div>`;
			});
		}
	});
};

let clearMealList = function () {
	elements.mealList.innerHTML = "";
	fetchedMeals = [];
};

let showAlert = function (message) {
	elements.alert.style.display = "block";
	elements.alert.innerText = message;

	setTimeout(function () {
		elements.alert.style = "none";
	}, 1500);
};

let clearMealDetails = function () {
	elements.mealDetails.innerHTML = "";
};
