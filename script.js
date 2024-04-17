/** @format */

let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let recipeContainer = document.querySelector(".recipeContainer");
let recoSearchToggle = document.querySelector(".search-results");
let randomButton = document.getElementById("RandomBtn");
let recipeInstructionContiner = document.querySelector(".recipeInstructionContiner");


fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=indian`)
.then(response=>response.json())
.then((data)=>{
  recipeContainer.innerHTML = "";
  let cardDetails = ``;
  data?.meals.forEach((meal)=>{
    let { strMealThumb, strMeal, idMeal } =meal;
    cardDetails+= `
    <div class="recipeCard" data-id = ${idMeal}>
   <img src=${strMealThumb}>
   <div class="recipeName"><h2>${strMeal}</h2></div>
   <button id="recipeBtn" class = "recipeBtn" >Get Recipe</button>
   </div>
   `;
  })
  recipeContainer.innerHTML+=cardDetails;
})       

searchButton.addEventListener("click", () => {
  if(searchInput.value != ""){
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`
  )
  .then((data) => data.json())
  .then((data) => { 
      recoSearchToggle.innerHTML = "Search Results : "
        recipeContainer.innerHTML = "";
        let cardDetails = ``;
        // console.log(data);
        if(!data.meals){
          recipeContainer.innerHTML =`<h2 class="notFindMeal" > Sorry, we didn't find any meal! </h2>`;
        }
        else{
      data?.meals.forEach((item) => {
        let { strMealThumb, strMeal, idMeal } = item;
        // console.log(item?.strMeal);
         cardDetails+= `
         <div class="recipeCard" data-id = ${idMeal}>
        <img src=${strMealThumb}>
        <div class="recipeName"><h2>${strMeal}</h2></div>
        <button id="recipeBtn" class = "recipeBtn">Get Recipe</button>
        </div>
        `;
      });
      recipeContainer.innerHTML+=cardDetails;
    }
    });
  }
    
});


randomButton.addEventListener("click" , ()=>{
  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
  .then(response=>response.json())
  .then((data)=>{
    recoSearchToggle.innerHTML = "Random Recipes : "
    recipeContainer.innerHTML = "";
    let cardDetails = ``;
    for(let i = 0 ; i<20 ; i++){
      let index = Math.floor(Math.random()*data?.meals.length);
      // console.log(data?.meals[index] , index);
      let { strMealThumb, strMeal, idMeal } = data?.meals[index];
      cardDetails+= `
      <div class="recipeCard" data-id = ${idMeal}>
     <img src=${strMealThumb}>
     <div class="recipeName"><h2>${strMeal}</h2></div>
     <button id="recipeBtn" class = "recipeBtn">Get Recipe</button>
     </div>
     `;
    }
    recipeContainer.innerHTML+=cardDetails;
  })
})

recipeContainer.addEventListener('click' , (e)=>{
  if(e.target.classList.contains("recipeBtn")){
    let recipeCard = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeCard.dataset.id}`)
    .then((response)=>response.json())
    .then((data)=>{
      let {strMealThumb , strInstructions , strCategory , strMeal , strYoutube} = data?.meals[0];
      // console.log(data?.meals[0]);
      recipeInstructionContiner.innerHTML = `
      <div class="hideBtn"><button class=hideRecipeInstruction>❌</button></div>
      <h2 class="recipeInstructionTitle ">${strMeal}</h2>
      <h2 class="recipeInstructionCategory">${strCategory}</h2>
      <h3 class="recipeInstruction">Instructions:</h3>
      <p class="para">${strInstructions}</p>
      <img src=${strMealThumb} class="recipeInstructionImage" >
      <a class="ytlink" href=${strYoutube} target="_blank">Watch Video</a>
      `
      recipeInstructionContiner.classList.add("showRecipe");
    })
   
  }
})

recipeInstructionContiner.addEventListener('click' , (e)=>{
  if(e.target.classList.contains("hideRecipeInstruction")){
    recipeInstructionContiner.classList.remove("showRecipe");
  }
})
