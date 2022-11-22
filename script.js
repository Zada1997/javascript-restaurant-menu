import { menu } from "./data.js";

console.log(menu)
const btns = document.querySelector(".btns");
const menuList = document.getElementById("menu-items");
const search = document.getElementById("search");

const createMenu = (menu)=>{
    return menu.map((item)=>{
        menuList.innerHTML +=`
        <div class = "menu-item">
            <img src="${item.img}" alt="${item.title}">
        <div>
            <h6 class = "desc">${item.title}<span>$${item.price}</span></h6>
            <hr/>
            <p>${item.desc}</p>
        </div>
        </div>
        `
    
    })

}
createMenu(menu);




const uniqueCategory = menu.reduce((uniqueArray, item)=> {
    if(uniqueArray.indexOf(item.category) === -1) {
        uniqueArray.push(item.category)
    }
    return uniqueArray;
},["All"])


uniqueCategory.map((category)=>{
    btns.innerHTML += `
    <button class = "filter-btn" id = "${category}"> ${category}</button>`
})

const filterBtn = document.querySelectorAll(".filter-btn")

filterBtn.forEach((btn)=>{
    
    btn.addEventListener('click', (e)=>{
        menuList.innerHTML="";
        const id = e.currentTarget.id;
        const filteredMenu = menu.filter((item)=>{
            if(item.category.includes(id)){
                return item
            }

        })
        if(id === "All"){
            return createMenu(menu)
        }else{
            return createMenu(filteredMenu);
        }


    })
});

search.addEventListener("input",(e)=>{
    menuList.innerHTML="";
    const value = e.target.value;
    const filteredByInput = menu.filter((item)=>{
        if((item.title || item.desc || item.category).toLowerCase().includes(value.toLowerCase())){
            return item
        }
    })
    if(filteredByInput.length){
        return createMenu(filteredByInput)
    }else{
        return menuList.innerHTML = `
        <h5>No Items Found</h5>`
    }

})
