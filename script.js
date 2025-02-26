//document.addEventListener("DOMContentLoaded", () => {
//const filters = document.querySelectorAll(".filter");
//const diets = document.querySelectorAll(".diet");
//const sorts = document.querySelectorAll(".sort");
//const messageBox = document.getElementById("messages");

//let selectedFilter = "all";
//let selectedDiet = null;
//let selectedSort = null;

//function updateMessage() {
//let message = `Här har du ${selectedFilter} recipes`;
//if (selectedDiet) message += `, filtered by ${selectedDiet}`;
//if (selectedSort) message += `, sorted by ${selectedSort}`;
//messageBox.innerHTML = `<h2>${message}</h2>`;
//}

//function handleSelection(buttons, category) {
//buttons.forEach(button => {
//button.addEventListener("click", () => {
//buttons.forEach(btn => btn.classList.remove("active"));
//button.classList.add("active");

//if (category === "filter") selectedFilter = button.id;
//if (category === "diet") selectedDiet = button.id;
//if (category === "sort") selectedSort = button.id;

//updateMessage();
//});
//});
//}

//handleSelection(filters, "filter");
//handleSelection(diets, "diet");
//handleSelection(sorts, "sort");

//updateMessage();
//});