const menuData = {
  "Soups": [
    ["Chicken Soup",99],
    ["Corn Soup",79],
    ["Veg Hot & Sour Soup",79],
    ["Chicken Hot & Sour Soup",99]
  ],

  "Veg Starters": [
    ["Gobhi 65",189],["Gobhi Manchuria",189],
    ["Paneer 65",199],["Paneer Manchuria",199],
    ["Chilly Paneer",209],["Mushroom 65",199],
    ["Mushroom Manchuria",189],["Chilly Babycorn",179],
    ["Onion Pakoda",149],["Crispy Veg",159],
    ["Crispy Corn",149],["Kaju Roast",269],
    ["Capsicum Pakoda",169],["Palli Masala",99]
  ],

  "Chinese Starters Non-Veg": [
    ["Chicken Lollipops",299],["Chicken Drumsticks",289],
    ["Chicken 65",259],["Chilly Chicken",249],
    ["Chicken 555",259],["Chicken Majestic",269],
    ["Dragon Chicken",269],["Kajunot Chicken",279],
    ["Lemon Chicken",249],["Garlic Chicken",249],
    ["Shezwan Chicken",279],["Loose Chicken",299],
    ["Hongkong Chicken",249],["Chicken Chips",299],
    ["Chicken Manchuria",259],["Kamjuppita Roast",259],
    ["Classic Chicken",299],["Chilly Egg",149],["Egg 65",169]
  ],

  "Veg Biryanis": [
    ["Veg Biryani",179],["Paneer Biryani",199],
    ["Kaju Biryani",249],["Mushroom Biryani",199],
    ["Mixed Veg Biryani",199]
  ],

  "Non-Veg Biryanis": [
    ["Dum Biryani",219],["Fry Piece Biryani",229],
    ["SP Biryani",249],["Moghalai Biryani",249],
    ["Lollipop Biryani",289],["Dilkush Biryani",299],
    ["Joint Biryani",299],["Mutton Biryani",319],
    ["Fish Biryani",309],["Prawns Biryani",329],
    ["Egg Biryani",159],["SP Natukodi Biryani",339]
  ],

  "Rice Items": [
    ["Veg Fried Rice",159],["Chicken Fried Rice",199],
    ["Zeera Rice",149],["Kaju Rice",199],
    ["Mushroom Fried Rice",159],["Biryani Rice",129],
    ["Curd Rice",69]
  ]
};

/* -------- RENDER MENU -------- */
const menu = document.getElementById("menu");

for (let section in menuData) {
  const div = document.createElement("div");
  div.className = "section";
  div.innerHTML = `<h2>${section}</h2><div class="items"></div>`;
  const itemsDiv = div.querySelector(".items");

  menuData[section].forEach(([name,price])=>{
    itemsDiv.innerHTML += `
      <div class="item">
        ${section==="Soups" ? `<img src="soup.jpg">` : ``}
        <div>
          <strong>${name}</strong><br>₹${price}<br>
          <button onclick="addToCart('${name}',${price})">Add</button>
        </div>
      </div>`;
  });

  menu.appendChild(div);
}

/* -------- CART -------- */
let cart = {};

function addToCart(name,price){
  cart[name] = cart[name]
    ? {...cart[name], qty:cart[name].qty+1}
    : {price,qty:1};
  renderCart();
}

function removeItem(name){
  delete cart[name];
  renderCart();
}

function renderCart(){
  const box=document.getElementById("cartItems");
  const totalBox=document.getElementById("total");
  box.innerHTML="";
  let total=0;

  for(let i in cart){
    total+=cart[i].price*cart[i].qty;
    box.innerHTML+=`
      <div class="cart-item">
        ${i} x ${cart[i].qty}
        <button onclick="removeItem('${i}')">X</button>
      </div>`;
  }
  totalBox.textContent=total;
}

function sendWhatsApp(){
  let msg="Order Details:%0A";
  let total=0;
  for(let i in cart){
    msg+=`${i} x ${cart[i].qty} = ₹${cart[i].price*cart[i].qty}%0A`;
    total+=cart[i].price*cart[i].qty;
  }
  msg+=`Total ₹${total}`;
  window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`);
}

/* -------- REAL FIRE -------- */
const c=document.getElementById("fireCanvas");
const x=c.getContext("2d");
resize(); window.onresize=resize;
function resize(){c.width=innerWidth;c.height=innerHeight}
let f=[];
for(let i=0;i<150;i++)f.push({x:Math.random()*c.width,y:c.height,r:10+Math.random()*20,a:1});
(function burn(){
x.clearRect(0,0,c.width,c.height);
f.forEach(e=>{
x.fillStyle=`rgba(255,${Math.random()*120},0,${e.a})`;
x.beginPath();x.arc(e.x,e.y,e.r,0,7);x.fill();
e.y-=1.5;e.a-=.006;
if(e.a<=0){e.y=c.height;e.a=1}
});
requestAnimationFrame(burn);
})();
