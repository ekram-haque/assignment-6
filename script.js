
const categoryContainer = document.getElementById('category-container');
const plantsContainer = document.getElementById('plants-by-category');
const cartsContainer = document.getElementById('carts-container');
const totalPrice = document.getElementById('total-price');
const modalContainer = document.getElementById('modal-container');

let carts = [];

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
         id="${category.id}" class="group hover:bg-[#1eaa51] hover:text-white  cursor-pointer p-[10px] rounded-md text-black my-1.5 pl-2">
         ${category.category_name} 
         
         <p class="mt-1 text-sm text-white hidden group-hover:block group-focus-within:block line-clamp-2">
         ${category.small_description} </p>
         </li>
        
        `
        console.log(category.small_description)
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
    loadingbar()
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

    // console.log(data)

    // const plant = data.plants;
    
    plantsContainer.innerHTML =""
   
    const plants = data.plants;
    plants.forEach(plant =>{
        console.log(plant)
       
        plantsContainer.innerHTML +=`
        <div id="${plant.id}" class="w-[330px] h-[380px] bg-white rounded-lg py-[10px] px-[10px] mx-auto">
              
              <img src="${plant.image}"  alt="" class="w-[298px] h-[178px] bg-gray-100 rounded-lg mx-auto object-cover ">
              <h4 onclick="loaditemdetails(${plant.id})" class="font-bold my-2 cursor-pointer">${plant.name}</h4>
              <p class="text-[12px] line-clamp-2 ">${plant.description}</p>
              <div class="flex justify-between items-center  py-3">
                <button class="btn bg-[#DCFCE7] rounded-3xl text-[#15803D]">${plant.category}</button>
                <div class="flex gap-1">
                <p>৳ </p>
                <h4 class="font-bold"> ${plant.price}</h4>
                </div>
                
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
    // console.log(data.plants)

    plantsContainer.innerHTML =""
    const plants = data.plants;
    plants.forEach(plant =>{
        plantsContainer.innerHTML +=`
        <div id="${plant.id}" class="w-[330px] h-[380px] bg-white rounded-lg py-[10px] px-[10px] mx-auto">
              
              <img src="${plant.image}"  alt="" class="w-[298px] h-[178px] bg-gray-100 rounded-lg mx-auto object-cover ">
              <h4 onclick="loaditemdetails(${plant.id})" class="font-bold my-2 cursor-pointer">${plant.name}</h4>
              <p class="text-[12px] line-clamp-2 ">${plant.description}</p>
              <div class="flex justify-between items-center  py-3">
                <button class="btn bg-[#DCFCE7] rounded-3xl text-[#15803D]">${plant.category}</button>
                <div class="flex gap-1">
                <p>৳ </p>
                <h4 class="font-bold"> ${plant.price}</h4>
                </div>
                
              </div>
              <button class="btn bg-[#15803d] rounded-3xl text-white w-[100%] px-2  mx-auto">Add to Cart </button>

            </div>
        
        `
    })


 })
 .catch(err =>{

 })
}


plantsContainer.addEventListener('click', (e) => {
    // console.log(e.target.parentNode)
    
    if(e.target.innerText === 'Add to Cart'){
        // console.log('button clicked')
        const id = e.target.parentNode.id
        const title = e.target.parentNode.children[1].innerText
        const price = e.target.parentNode.children[3].children[1].children[1].innerText
        // console.log(price)

        if(!carts.find(cart => cart.id === id)){
            
            carts.push({
            id:id,
            title: title,
            price:price
            
        })
    
        showCarts(carts)
        }else{
            alert("This item already available on cart. ")
        }

        

      
        
    }

    // loaditemdetails();
})

const showCarts = (carts) => {
// console.log(carts)

  cartsContainer.innerHTML = ""
 
 carts.forEach(cart => {
        cartsContainer.innerHTML += `
            <div class="bg-[#F0FDF4] flex  justify-between items-center py-3 px-2 my-3 ">
                <div>
                    <h4>${cart.title}</h4>
                    <h5>${cart.price}</h5>
                </div>
                <button onclick="deleteCarts('${cart.id}')"><i class="fa-solid fa-xmark"></i></button>
            </div>

    `
  
 })
 calculateTotalPrice(carts);


}

const deleteCarts = (cartId) => {
//  console.log(cartId)
 const filteredCarts = carts.filter(cart => cart.id !== cartId)
 console.log(filteredCarts)
 carts = filteredCarts;
 showCarts(carts)

}

const calculateTotalPrice = (carts) => {

     let total = 0;
     carts.forEach(cart =>{
        // console.log(cart.price)
         total +=Number(cart.price) ;
        
     })

   totalPrice.innerText ="৳ "+  total
   


}

const loadingbar = () => {
    plantsContainer.innerHTML = `
    <div class="flex justify-center items-center w-[100%]">
                  <progress class="progress w-[56%] justify-center "></progress>
            </div>
    `
}

loaditemdetails = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data =>{
  
    showmodal(data)

    })
    
}

showmodal = (data) => {

    const plant = data.plants;
    // console.log(plant)
    modalContainer.innerHTML = `
    <div id="${plant.id}" class="w-[330px] h-[380px] bg-white rounded-lg py-[10px] px-[10px] mx-auto">
              
              <img src="${plant.image}"  alt="" class="w-[400px] h-[178px] bg-gray-100 rounded-lg mx-auto object-cover ">
              <h4 onclick="loaditemdetails(${plant.id})" class="font-bold my-2 cursor-pointer">${plant.name}</h4>
              <p class="text-[12px]  ">${plant.description}</p>
              <div class="flex justify-between items-center  py-3">
                <button class="btn bg-[#DCFCE7] rounded-3xl text-[#15803D]">${plant.category}</button>
                <div class="flex gap-1">
                <p>৳ </p>
                <h4 class="font-bold"> ${plant.price}</h4>
                </div>
                
              </div>
              

            </div>
        
    `
    document.getElementById("my_modal_5").showModal();
}




// load category on startup 
loadCategory()
allPlants()