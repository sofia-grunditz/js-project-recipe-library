const allButton = document.getElementById("all");
const italyButton = document.getElementById("italy");
const usaButton = document.getElementById("usa");
const mexicoButton = document.getElementById("mexican");
const asianButton = document.getElementById("asian");

const sortByTimeAscButton = document.getElementById("highToLow");
const sortByTimeDescButton = document.getElementById("lowToHigh");
const recipesSection = document.getElementById("recipes");
const messagesSection = document.getElementById("messages");

const veganButton = document.getElementById("vegan");
const vegetarianButton = document.getElementById("vegetarian");
const glutenFreeButton = document.getElementById("gluten-Free");
const dairyFreeButton = document.getElementById("dairy-Free");

const filterButtons = [allButton, italyButton, usaButton, mexicoButton, asianButton];
const sortButtons = [sortByTimeAscButton, sortByTimeDescButton];
const dietButtons = [veganButton, vegetarianButton, glutenFreeButton, dairyFreeButton];
const randomRecipeButton = document.getElementById("randomRecipe");

const URL = "https://api.spoonacular.com/recipes/random/?apiKey=a88b42ab50a44e01b8351d8a9d509de7&number=20";

let recipes = []; // Global array to store recipes fetched from the API
let currentPage = 1; // Håller reda på vilken sida vi är på
const recipesPerPage = 20; // Hur många recept vi vill hämta per gång
let scrollEnabled = true; // Håller reda på om scroll är aktiverad



const updateHTML = (filter, button, buttonGroup) => {
  removeActiveClass(buttonGroup);
  button.classList.add("active");
};

const removeActiveClass = (buttonGroup) => {
  buttonGroup.forEach(button => {
    button.classList.remove("active");
  });
};

const fetchRecipes = () => {
  const URL = `https://api.spoonacular.com/recipes/random/?apiKey=a88b42ab50a44e01b8351d8a9d509de7&number=${recipesPerPage}&offset=${(currentPage - 1) * recipesPerPage}`;

  fetch(URL)
    .then(response => response.json())  // Omvandla svaret till JSON
    .then(data => {
      const newRecipes = data.recipes;  // Uppdatera recepten med API-data
      recipes = [...recipes, ...newRecipes]; // Lägg till nya recept till de redan existerande
      displayRecipes(recipes);
      console.log("API Response:", newRecipes);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);  // Hantera eventuella fel
    });
};

const displayRecipes = (recipes) => {
  recipesSection.innerHTML = ""; // Clear the existing recipes

  // Filter recipes that have a 'cuisines' property
  const recipesWithCuisines = recipes.filter((recipe) => recipe.cuisines && recipe.cuisines.length > 0);

  recipesWithCuisines.forEach((recipe) => {
    // create ingredient list with the following format: "amount unit name"
    const ingredientsList = recipe.extendedIngredients.map((ingredient) => {
      return `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.name} </li>`;
    }).join("");

    const instructions = recipe.instructions ? recipe.instructions : "No instructions available.";

    recipesSection.innerHTML += `
      <a href="${recipe.sourceUrl}" target="_blank">
        <section class="card">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h2>${recipe.title}</h2>
          <hr>
          <p class="details"><span class="bold">Cuisine:</span> ${recipe.cuisines ? recipe.cuisines.join(", ") : "Unknown"}</p>
          <p class="details"><span class="bold">Ready in:</span> ${recipe.readyInMinutes} minutes</p>
          <p class="details"><span class="bold">Diet:</span> ${recipe.vegetarian ? "Vegetarian" : ""} ${recipe.vegan ? "Vegan" : ""} ${recipe.glutenFree ? "Gluten-Free" : ""} ${recipe.dairyFree ? "Dairy-Free" : ""}</p>
          <div class="ingredients">
            <p class="details bold">Ingredients:</p>
            <ul>${ingredientsList}</ul>
          </div>
          <div class="instructions">
          <p class="details bold">Instructions:</p>
          <p>${instructions}</p>
          </div>
        </section>
      </a>
    `;
  });
};

// Event listeners for filter buttons
allButton.addEventListener("click", () => {
  displayRecipes(recipes);
  updateHTML("all", allButton, filterButtons);
});

italyButton.addEventListener("click", () => {
  const italianRecipes = recipes.filter((recipe) => recipe.cuisines && recipe.cuisines.includes("Italian"));
  displayRecipes(italianRecipes);
  updateHTML("italy", italyButton, filterButtons);
});

usaButton.addEventListener("click", () => {
  const americanRecipes = recipes.filter((recipe) => recipe.cuisines && recipe.cuisines.includes("American"));
  displayRecipes(americanRecipes);
  updateHTML("usa", usaButton, filterButtons);
});

mexicoButton.addEventListener("click", () => {
  const mexicanRecipes = recipes.filter((recipe) => recipe.cuisines && recipe.cuisines.includes("Mexican"));
  displayRecipes(mexicanRecipes);
  updateHTML("mexico", mexicoButton, filterButtons);
});

asianButton.addEventListener("click", () => {
  const asianRecipes = recipes.filter((recipe) => recipe.cuisines && recipe.cuisines.includes("Asian"));
  displayRecipes(asianRecipes);
  updateHTML("asian", asianButton, filterButtons);
});
// Sorting recipes by time
sortByTimeAscButton.addEventListener("click", () => {
  const sortedRecipes = recipes.slice().sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  displayRecipes(sortedRecipes);
  updateHTML("ascending", sortByTimeAscButton, sortButtons);
});

sortByTimeDescButton.addEventListener("click", () => {
  const sortedRecipes = recipes.slice().sort((a, b) => b.readyInMinutes - a.readyInMinutes);
  displayRecipes(sortedRecipes);
  updateHTML("descending", sortByTimeDescButton, sortButtons);
});

// Filter by diet types
veganButton.addEventListener("click", () => {
  const veganRecipes = recipes.filter((recipe) => recipe.vegan);
  displayRecipes(veganRecipes);
  updateHTML("vegan", veganButton, dietButtons);
});


vegetarianButton.addEventListener("click", () => {
  const vegetarianRecipes = recipes.filter((recipe) =>
    recipe.vegetarian);
  displayRecipes(vegetarianRecipes);
  updateHTML("vegetarian", vegetarianButton, dietButtons);
});

glutenFreeButton.addEventListener("click", () => {
  const glutenFreeRecipes = recipes.filter((recipe) =>
    recipe.glutenFree);
  displayRecipes(glutenFreeRecipes);
  updateHTML("gluten-free", glutenFreeButton, dietButtons);
});

dairyFreeButton.addEventListener("click", () => {
  const dairyFreeRecipes = recipes.filter((recipe) => recipe.dairyFree);
  displayRecipes(dairyFreeRecipes);
  updateHTML("dairy-free", dairyFreeButton, dietButtons);
});

// Show a random recipe
randomRecipeButton.addEventListener("click", () => {
  if (scrollEnabled) {
    // temporarily disables the scroll function when the random recipe button is clicked (to not interfere with the random recipe display)
    scrollEnabled = false;

    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = [recipes[randomIndex]];
    displayRecipes(randomRecipe);
    updateHTML("randomRecipe", randomRecipeButton, []);

    // activating the scroll function again
    setTimeout(() => {
      scrollEnabled = true;
    }, 1000); // Vänta en sekund (justera beroende på behov)
  }
});


// Event listener for scroll
window.addEventListener('scroll', () => {
  // checking if the user is near the end of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    // loading more recipes
    currentPage++; // 
    fetchRecipes();
  }
});

// Initial fetch of recipes when the page loads
fetchRecipes();

