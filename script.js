const allButton = document.getElementById("all");
const italyButton = document.getElementById("italy");
const usaButton = document.getElementById("usa");
const mexicoButton = document.getElementById("mexican");
const japanButton = document.getElementById("japan");

const sortByTimeAscButton = document.getElementById("highToLow");
const sortByTimeDescButton = document.getElementById("lowToHigh");
const recipesSection = document.getElementById("recipes");
const messagesSection = document.getElementById("messages");

const veganButton = document.getElementById("vegan");
const vegetarianButton = document.getElementById("vegetarian");
const glutenFreeButton = document.getElementById("gluten-Free");
const dairyFreeButton = document.getElementById("dairy-Free");

const filterButtons = [allButton, italyButton, usaButton, mexicoButton, japanButton];
const sortButtons = [sortByTimeAscButton, sortByTimeDescButton];
const dietButtons = [veganButton, vegetarianButton, glutenFreeButton, dairyFreeButton];

const updateHTML = (filter, button, buttonGroup) => {
  removeActiveClass(buttonGroup); // Ta bort aktiv klass
  button.classList.add("active"); // Lägg till aktiv klass

  let message = "";
  if (filter === "all") {
    message = "You eat everything, adventurous!";
  } else if (filter === "vegan") {
    message = "You chose Vegan, healthy choice!";
  } else if (filter === "vegetarian") {
    message = "You chose Vegetarian, great choice!";
  } else if (filter === "gluten-free") {
    message = "You chose Gluten-Free, good choice!";
  } else if (filter === "dairy-free") {
    message = "You chose Dairy-Free, nice choice!";
  } else if (filter === "ascending") {
    message = "Sorting recipes in ascending order.";
  } else if (filter === "descending") {
    message = "Sorting recipes in descending order.";
  }

  // Clear previous messages and add the new message
  messagesSection.innerHTML = `<p>${message}</p>`;
};

const recipes = [
  {
    id: 1,
    title: "Risotto alla Milanese",
    image: "https://i0.wp.com/baketotheroots.de/wp-content/uploads/2022/04/SQ_220102_Risotto-alla-Milanese.jpg?fit=1200%2C1200&ssl=1",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegetarian"],
    cuisine: "Italy",
    ingredients: [
      "300 g Arborio rice",
      "1 small onion, finely chopped",
      "1 liter chicken broth",
      "1/2 cup white wine",
      "2 tablespoons olive oil",
      "50 g butter",
      "1 pinch saffron threads",
      "50 g grated Parmesan cheese",
      "salt and pepper to taste"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2018/04/vegan-pesto-pasta-bowl-800x1200.jpg",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "https://www.faithfullyglutenfree.com/wp-content/uploads/2011/01/Chicken-Stir-Fry-2221669.jpg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Japanese",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "https://www.wholekitchensink.com/wp-content/uploads/2024/03/Halibut-Fish-Tacos-18.jpg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Enchiladas",
    image: "https://weelicious.com/wp-content/uploads/2021/05/Mexican-Enchiladas-13-2-768x1151.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://weelicious.com/mexican-enchiladas/",
    diets: ["vegan", "gluten-free"],
    cuisine: "Mexican",
    ingredients: [
      "ground cumin",
      "garlic clove",
      "chicken",
      "mexican cheese blend",
      "enchilada sauce",
      "tortillas"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "https://minimalistbaker.com/wp-content/uploads/2016/07/My-GO-TO-Avocado-Toast-5-minutes-3-ingredients-SO-delicious-vegan-glutenfree-avocado-recipe-breakfast-768x1152.jpg",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "USA",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Twin Peaks Cherry Pie",
    image: "https://eatlittlebird.com/wp-content/uploads/2019/09/cherry-pie-2-680x1024.jpg",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: ["vegetarian"],
    cuisine: "USA",
    ingredients: [
      "150 g unsalted butter, cold",
      "200 g plain flour (all-purpose flour)",
      "30 g icing sugar (powdered sugar)",
      "1 egg",
      "1/2 tablespoon water",
      "1.5 kg fresh cherries, pitted",
      "80 g (1/3 cup) caster sugar (superfine sugar)",
      "juice and zest of 1 lemon",
      "1 vanilla pod",
      "2 tablespoons cornflour"
    ],
    pricePerServing: 5.5,
    popularity: 80
  },

  {
    id: 8,
    title: "Tiramisu",
    image: "https://addictedtodates.com/wp-content/uploads/2023/09/vegan-tiramisu-500x375.jpg",
    readyInMinutes: 40,
    servings: 6,
    sourceUrl: "https://example.com/tiramisu",
    diets: ["vegetarian"],
    cuisine: "Italy",
    ingredients: [
      "250 g mascarpone cheese",
      "3 eggs",
      "75 g sugar",
      "200 ml strong coffee",
      "100 ml Marsala wine",
      "20 ladyfingers",
      "2 tablespoons cocoa powder"
    ],
    pricePerServing: 4.0,
    popularity: 95
  },
  {
    id: 9,
    title: "S'mores",
    image: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/ogbvwstfndunwmli5jmu.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/smores",
    diets: ["vegetarian", "dairy-free"],
    cuisine: "USA",
    ingredients: [
      "8 graham crackers",
      "4 marshmallows",
      "4 pieces of chocolate"
    ],
    pricePerServing: 1.5,
    popularity: 92
  },
  {
    id: 10,
    title: "Guacamole",
    image: "https://www.mylatinatable.com/wp-content/uploads/2018/05/guacamole-foto-heroe-1024x723-500x375.jpg",
    readyInMinutes: 15,
    servings: 3,
    sourceUrl: "https://example.com/guacamole",
    diets: ["vegan", "gluten-free"],
    cuisine: "Mexican",
    ingredients: [
      "3 avocados",
      "1 lime",
      "1 teaspoon salt",
      "1/2 cup diced onion",
      "3 tablespoons chopped cilantro",
      "2 roma tomatoes, diced",
      "1 teaspoon minced garlic"
    ],
    pricePerServing: 2.0,
    popularity: 89
  },
  {
    id: 11,
    title: "Matcha Green Tea Ice Cream",
    image: "https://www.samanthaseeley.com/wp-content/uploads/2012/02/green-tea-ice-cream-3-720x720.jpg",
    readyInMinutes: 60,
    servings: 4,
    sourceUrl: "https://example.com/matcha-ice-cream",
    diets: ["vegetarian"],
    cuisine: "Japanese",
    ingredients: [
      "2 cups heavy cream",
      "1 cup whole milk",
      "3/4 cup sugar",
      "1 tablespoon matcha green tea powder",
      "4 egg yolks"
    ],
    pricePerServing: 3.5,
    popularity: 88
  },

  {
    id: 16,
    title: "Okonomiyaki",
    image: "https://monmackfood.com/wp-content/uploads/Screen-Shot-2021-06-28-at-12.32.59-pm.jpeg",
    readyInMinutes: 40,
    servings: 4,
    sourceUrl: "https://example.com/okonomiyaki",
    diets: [],
    cuisine: "Japanese",
    ingredients: [
      "2 cups all-purpose flour",
      "2 eggs",
      "1 1/2 cups dashi stock",
      "1/4 cup grated yam",
      "1/2 head cabbage, shredded",
      "200 g sliced pork belly",
      "okonomiyaki sauce",
      "mayonnaise",
      "bonito flakes"
    ],
    pricePerServing: 7.5,
    popularity: 93
  }
]

const displayRecipes = (recipes) => {
  recipesSection.innerHTML = "";

  recipes.forEach((recipe) => {
    const ingredientsList = recipe.ingredients.map((ingredient) => {
      return `<li>${ingredient}</li>`
    }).join("");

    recipesSection.innerHTML += `
    <a href="${recipe.sourceUrl}" target="_blank">
    <section class="card">
      <img src="${recipe.image}" alt="${recipe.title}">
      <h2>${recipe.title}</h2>
      <hr>
      <p class="details">
      <span class="bold">Cuisine:</span> ${recipe.cuisine}</p>
      <p class="details">
        <span class="bold">Ready in:</span> ${recipe.readyInMinutes} minutes</p>
      <div class="ingredients">
      <p class="details bold">Ingredients:</p>
      <ul>${ingredientsList}</ul>
      </div>
      </section>
      </a>
      `})
}

allButton.addEventListener("click", () => {
  displayRecipes(recipes);
  updateHTML("all", allButton, filterButtons);
})
italyButton.addEventListener("click", () => {
  const italianRecipes = recipes.filter((recipe) => recipe.cuisine === "Italian");
  displayRecipes(italianRecipes);
  updateHTML("italy", italyButton, filterButtons);
})
usaButton.addEventListener("click", () => {
  const americanRecipes = recipes.filter((recipe) => recipe.cuisine === "American");
  displayRecipes(americanRecipes);
  updateHTML("usa", usaButton, filterButtons);
})
mexicoButton.addEventListener("click", () => {
  const mexicanRecipes = recipes.filter((recipe) => recipe.cuisine === "Mexican");
  displayRecipes(mexicanRecipes);
  updateHTML("mexico", mexicoButton, filterButtons);
})
japanButton.addEventListener("click", () => {
  const japaneseRecipes = recipes.filter((recipe) => recipe.cuisine === "Japanese");
  displayRecipes(japaneseRecipes);
  updateHTML("japan", japanButton, filterButtons);
})

sortByTimeAscButton.addEventListener("click", () => {
  const sortedRecipes = recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  displayRecipes(sortedRecipes);
  updateHTML("ascending", sortByTimeAscButton, sortButtons);
})
sortByTimeDescButton.addEventListener("click", () => {
  const sortedRecipes = recipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
  displayRecipes(sortedRecipes);
  updateHTML("descending", sortByTimeDescButton, sortButtons);
})

veganButton.addEventListener("click", () => {
  const veganRecipes = recipes.filter((recipe) => recipe.diets.includes("vegan"));
  displayRecipes(veganRecipes);
  updateHTML("vegan", veganButton, dietButtons);
});
vegetarianButton.addEventListener("click", () => {
  const vegetarianRecipes = recipes.filter((recipe) => recipe.diets.includes("vegetarian"));
  displayRecipes(vegetarianRecipes);
  updateHTML("vegetarian", vegetarianButton, dietButtons);
});
glutenFreeButton.addEventListener("click", () => {
  const glutenFreeRecipes = recipes.filter((recipe) => recipe.diets.includes("gluten-free"));
  displayRecipes(glutenFreeRecipes);
  updateHTML("gluten-free", glutenFreeButton, dietButtons);
});
dairyFreeButton.addEventListener("click", () => {
  const dairyFreeRecipes = recipes.filter((recipe) => recipe.diets.includes("dairy-free"));
  displayRecipes(dairyFreeRecipes);
  updateHTML("dairy-free", dairyFreeButton, dietButtons);
});

displayRecipes(recipes)