/* =========================
   CATEGORY IMAGE LOGIC
   (THIS IS WHAT FIXES EMPTY IMAGES)
========================= */
function getCategoryImage(section){
  if(section.includes("Soup")) return "images/soup.jpg";
  if(section.includes("Starters")) return "images/starters.jpg";
  if(section.includes("Biryani")) return "images/biryani.jpg";
  if(section.includes("Rice")) return "images/rice.jpg";
  return "images/curry.jpg";
}

/* =========================
   FULL MENU DATA
========================= */
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

/* =========================
   RENDER MENU
========================= */
const menu = document.getElementById("menu");

for(let section in menuData){
  const block = document.createElement("div");
  block.className = "section";
  block.innerHTML = `<h2>${section}</h2><div class="items"></div>`;
  const itemsDiv = block.querySelector(".items");

  menuData[section].forEach(([name,price])=>{
    itemsDiv.innerHTML += `
      <div class="item">
        <img src="${getCategoryImage(section)}" alt="${section}">
        <div>
          <strong>${name}</strong><br>
          ₹${price}<br>
          <button onclick="addToCart('${name}',${price})">Add</button>
        </div>
      </div>
    `;
  });

  menu.appendChild(block);
}

/* =========================
   CART LOGIC
========================= */
let cart = {};

function addToCart(name, price){
  if(cart[name]) cart[name].qty++;
  else cart[name] = {price, qty:1};
  renderCart();
}

function removeItem(name){
  delete cart[name];
  renderCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");
  box.innerHTML = "";
  let total = 0;

  for(let item in cart){
    total += cart[item].price * cart[item].qty;
    box.innerHTML += `
      <div class="cart-item">
        ${item} x ${cart[item].qty}
        <button onclick="removeItem('${item}')">X</button>
      </div>
    `;
  }
  totalBox.textContent = total;
}

/* =========================
   WHATSAPP ORDER (FIXED)
========================= */
function sendWhatsApp(){
  if(Object.keys(cart).length === 0){
    alert("Cart is empty");
    return;
  }

  let msg = "Order Details:\n";
  let total = 0;

  for(let item in cart){
    msg += `${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}\n`;
    total += cart[item].price * cart[item].qty;
  }

  msg += `\nTotal Amount: ₹${total}`;

  const phone = "919642200422";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/* =========================
   REAL MOVING FIRE FLAMES
========================= */
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let flames = [];
for(let i=0;i<220;i++){
  flames.push({
    x: Math.random()*canvas.width,
    y: canvas.height + Math.random()*200,
    r: 10 + Math.random()*30,
    speed: 1 + Math.random()*2,
    a: 0.9
  });
}

function animateFire(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  flames.forEach(f=>{
    const g = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);
    g.addColorStop(0,`rgba(255,255,180,${f.a})`);
    g.addColorStop(0.5,`rgba(255,120,0,${f.a})`);
    g.addColorStop(1,"rgba(200,0,0,0)");
    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y -= f.speed;
    f.a -= 0.004;
    if(f.a <= 0){
      f.x = Math.random()*canvas.width;
      f.y = canvas.height + 100;
      f.a = 0.9;
    }
  });
  requestAnimationFrame(animateFire);
}
animateFire();
