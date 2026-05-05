const foods = [
  {name:"Burger", price:100, category:"fast", img:"img/burger.jpg"},
  {name:"Pizza", price:200, category:"fast", img:"img/pizza.jpg"},
  {name:"Pasta", price:150, category:"fast", img:"img/Pasta.jpg"},
  {name:"French Fries", price:90, category:"fast", img:"img/French fries.jpg"},
  {name:"Sandwich", price:80, category:"fast", img:"img/sandwitch.jpg"},
  
  {name:"Salad", price:80, category:"healthy", img:"img/salad.jpg"},
  {name:"Fruit Bowl", price:120, category:"healthy", img:"img/Fruitbowl.jpg"},
  {name:"Smoothie", price:140, category:"healthy", img:"img/Smoothie.jpg"},
  
  {name:"Chicken Biryani", price:220, category:"fast", img:"img/chickenbriyani.jpg"},
  {name:"Paneer Butter Masala", price:180, category:"fast", img:"img/Paneerbuttermasala.jpg"},
  {name:"Dosa", price:100, category:"fast", img:"img/Dosa.jpg"},
  {name:"Noodles", price:130, category:"fast", img:"img/Noodles.jpg"},
  
  {name:"Ice Cream", price:70, category:"dessert", img:"img/Ice_Cream.jpg"},
  {name:"Chocolate Cake", price:150, category:"dessert", img:"img/chocolate cake.jpg"},
  {name:"Donut", price:60, category:"dessert", img:"img/donut.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DISPLAY FOOD */
function displayFoods(list) {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";

  list.forEach((food, index) => {
    menu.innerHTML += `
      <div class="item">
        <img src="${food.img}">
        <h3>${food.name}</h3>
        <p>₹${food.price}</p>
        <button class="addBtn" onclick="addToCart(${index})">Add</button>
      </div>
    `;
  });
}

/* ADD TO CART */
function addToCart(index) {
  let item = foods[index];
  let found = cart.find(f => f.name === item.name);

  if(found) found.qty++;
  else cart.push({...item, qty:1});

  saveCart();
  renderCart();
  showToast("Added to cart");
}

/* RENDER CART */
function renderCart() {
  let cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div class="cart-item">
        ${item.name} x${item.qty}
        <div>
          <button onclick="changeQty(${i},1)">+</button>
          <button onclick="changeQty(${i},-1)">-</button>
          <button onclick="removeItem(${i})">❌</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;
}

/* CHANGE QTY */
function changeQty(i, change) {
  cart[i].qty += change;
  if(cart[i].qty <= 0) cart.splice(i,1);
  saveCart();
  renderCart();
}

/* REMOVE */
function removeItem(i) {
  cart.splice(i,1);
  saveCart();
  renderCart();
}

/* SAVE */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CLEAR CART */
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

/* CART TOGGLE */
function toggleCart() {
  document.getElementById("cartBox").classList.toggle("active");
}

/* SEARCH */
document.getElementById("search").addEventListener("input", (e) => {
  let val = e.target.value.toLowerCase();
  let filtered = foods.filter(f => f.name.toLowerCase().includes(val));
  displayFoods(filtered);
});

/* FILTER */
function filterFood(cat) {
  if(cat === "all") displayFoods(foods);
  else displayFoods(foods.filter(f => f.category === cat));
}

/* THEME */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* TOAST */
function showToast(msg) {
  let t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

/* ORDER */
function placeOrder() {
  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("orderPopup").style.display = "block";

    setTimeout(() => {
      document.getElementById("orderPopup").style.display = "none";
    }, 2000);

    clearCart();
  }, 2000);
}

displayFoods(foods);
renderCart();