
const categoryContainer = document.getElementById('category-container');
const plantsContainer = document.getElementById('plants-by -category');

const loadCategory = () => {
// fetch catergory from api 
fetch('https://openapi.programming-hero.com/api/categories')
.then(res => res.json())
.then(data => {
    // show category list to ui 
    const categories = data.categories
    categories.forEach(category => {
        categoryContainer.innerHTML +=`
         <li 
         id="${category.id}" class="hover:bg-[#1eaa51] hover:text-white cursor-pointer p-[10px] rounded-md text-black my-2 pl-2">
         ${category.category_name} 
         </li>
        
        `
    });
})
.catch(err => {
    console.log(err)
})
// add listener on categorylist to add indicator
categoryContainer.addEventListener('click' ,(e) =>{
    // remove privious indicator from list
    const allLi = document.querySelectorAll('li')
    allLi.forEach(li =>{
        li.classList.remove('bg-[#0a5827]')
        li.classList.remove('text-white')
    })
    // add indicator to list 
    if(e.target.localName === 'li'){
        e.target.classList.add('bg-[#0a5827]')
        e.target.classList.add('text-white')
        
        plantsByCategory(e.target.id)
    }

})
};

const plantsByCategory = (categoryId) => {
    
 fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
 .then(res => res.json())
 .then(data =>{
    // console.log(data.plants)
    plantsContainer.innerHTML =""
    const plants = data.plants;
    plants.forEach(plant =>{
        plantsContainer.innerHTML +=`
        <div class="w-[330px] h-[380px] bg-white rounded-lg py-[10px] px-[10px] mx-auto">
              
              <img src="${plant.image}"  alt="" class="w-[298px] h-[178px] bg-gray-100 rounded-lg mx-auto object-cover ">
              <h4 class="font-bold my-2">${plant.name}</h4>
              <p class="text-[12px] line-clamp-2 ">${plant.description}</p>
              <div class="flex justify-between items-center  py-3">
                <button class="btn bg-[#DCFCE7] rounded-3xl text-[#15803D]">${plant.category}</button>
                <h4 class="font-bold">৳${plant.price}</h4>
              </div>
              <button class="btn bg-[#15803d] rounded-3xl text-white w-[100%] px-2  mx-auto">Add to Cart </button>

            </div>
        
        `
    })


 })
 .catch(err =>{

 })
}
const allPlants = () => {
    
 fetch("https://openapi.programming-hero.com/api/plants")
 .then(res => res.json())
 .then(data =>{
    console.log(data.plants)
    plantsContainer.innerHTML =""
    const plants = data.plants;
    plants.forEach(plant =>{
        plantsContainer.innerHTML +=`
        <div class="w-[330px] h-[380px] bg-white rounded-lg py-[10px] px-[10px] mx-auto">
              
              <img src="${plant.image}"  alt="" class="w-[298px] h-[178px] bg-gray-100 rounded-lg mx-auto object-cover ">
              <h4 class="font-bold my-2">${plant.name}</h4>
              <p class="text-[12px] line-clamp-2 ">${plant.description}</p>
              <div class="flex justify-between items-center  py-3">
                <button class="btn bg-[#DCFCE7] rounded-3xl text-[#15803D]">${plant.category}</button>
                <h4 class="font-bold">৳${plant.price}</h4>
              </div>
              <button class="btn bg-[#15803d] rounded-3xl text-white w-[100%] px-2  mx-auto">Add to Cart </button>

            </div>
        
        `
    })


 })
 .catch(err =>{

 })
}



// load category on startup 
loadCategory()
allPlants()