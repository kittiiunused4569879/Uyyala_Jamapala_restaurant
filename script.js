/* =========================
   CATEGORY IMAGE SELECTOR
========================= */
function getCategoryImage(section){
  const s = section.toLowerCase();
  if (s.includes("soup")) return "images/soup.jpg";
  if (s.includes("starter") || s.includes("tandoori") || s.includes("naan")) return "images/starters.jpg";
  if (s.includes("biryani")) return "images/biryani.jpg";
  if (s.includes("rice")) return "images/rice.jpg";
  return "images/curry.jpg";
}

/* =========================
   FULL MENU DATA (2 POSTERS)
========================= */
const menuData = {

  /* Poster-1 Left */
  "Soups": [
    ["Chicken Soup", 99],
    ["Corn Soup", 79],
    ["Veg Hot & Sour Soup", 79],
    ["Chicken Hot & Sour Soup", 99]
  ],

  "Veg Starters": [
    ["Gobhi 65", 189],
    ["Gobhi Manchuria", 189],
    ["Paneer 65", 199],
    ["Paneer Manchuria", 199],
    ["Chilly Paneer", 209],
    ["Mushroom 65", 199],
    ["Mushroom Manchuria", 189],
    ["Chilly Babycorn", 179],
    ["Onion Pakoda", 149],
    ["Crispy Veg", 159],
    ["Crispy Corn", 149],
    ["Kaju Roast", 269],
    ["Capsicum Pakoda", 169],
    ["Palli Masala", 99]
  ],

  "Veg Biryanis": [
    ["Veg Biryani", 179],
    ["Paneer Biryani", 199],
    ["Kaju Biryani", 249],
    ["Mushroom Biryani", 199],
    ["Mixed Veg Biryani", 199]
  ],

  "Veg Currys": [
    ["Paneer Butter Masala", 219],
    ["Mushroom Masala", 199],
    ["Kaju Paneer", 249],
    ["Kaju Tomato", 229],
    ["Baby Corn Masala", 199],
    ["Mixed Veg Curry", 189],
    ["Egg Bhurji", 149],
    ["Double Egg Omlet", 59]
  ],

  /* Poster-1 Right */
  "Chinese Starters Nonveg": [
    ["Chicken Lollypops", 299],
    ["Chicken Drumsticks", 289],
    ["Chicken 65", 259],
    ["Chilly Chicken", 249],
    ["Chicken 555", 259],
    ["Chicken Megestick", 269],
    ["Dragon Chicken", 269],
    ["Kajunut Chicken", 279],
    ["Lemon Chicken", 249],
    ["Garlic Chicken", 249],
    ["Shezwan Chicken", 279],
    ["Loose Chicken", 299],
    ["Hongkong Chicken", 249],
    ["Chicken Chips", 299],
    ["Chicken Manchuria", 259],
    ["Kamjupitta Roast", 259],
    ["Classic Chicken", 299],
    ["Chilly Egg", 149],
    ["Egg 65", 169]
  ],

  "Non Veg Biryanis": [
    ["Dum Biryani", 219],
    ["Fry Piece Biryani", 229],
    ["SP Biryani", 249],
    ["Moghalai Biryani", 249],
    ["Lollipop Biryani", 289],
    ["Dilkush Biryani", 299],
    ["Joint Biryani", 299],
    ["Mutton Biryani", 319],
    ["Fish Biryani", 309],
    ["Prawns Biryani", 329],
    ["Egg Biryani", 159],
    ["SP Natukodi Biryani", 339]
  ],

  /* Poster-2 Left */
  "Rice Items": [
    ["Veg Fried Rice", 159],
    ["Chicken Fried Rice", 199],
    ["Zeera Rice", 149],
    ["Kaju Rice", 199],
    ["Mushroom Fried Rice", 159],
    ["Biryani Rice", 129],
    ["Curd Rice", 69]
  ],

  "Indian Nonveg Currys": [
    ["Chicken Curry Bone / Boneless", "199/249"],
    ["Butter Chicken", 259],
    ["Andhra Chicken", 269],
    ["Egg Curry", 149],
    ["Natukodi Curry", 349],
    ["Prawns Curry", 329],
    ["Kadai Chicken", 259],
    ["Moghaloy Chicken", 269],
    ["Hyderabad Chicken", 259]
  ],

  "Fish Starters": [
    ["Apollo Fish", 319],
    ["Chilly Fish", 309],
    ["Loose Prawns", 329],
    ["Chilly Prawns", 319],
    ["Prawns 65", 329]
  ],

  "Tandoori Chicken": [
    ["Tandoori Chicken half / Full", "189/379"],
    ["Tangdi Kabab", 299],
    ["Chicken Tikka", 259],
    ["Paneer Tikka", 219]
  ],

  "Nauty Non’s": [
    ["Tandoori Roti", 29],
    ["Butter Non", 39],
    ["Plain Non", 29],
    ["Garlic Non", 49],
    ["Masala kulcha", 59],
    ["Butter Roti", 39],
    ["Aloo Parotha", 79],
    ["Paneer Parotha", 89]
  ]
};

/* =========================
   RENDER MENU
========================= */
const menu = document.getElementById("menu");
menu.innerHTML = "";

for (const section in menuData) {
  const block = document.createElement("div");
  block.className = "section";
  block.innerHTML = `<h2>${section}</h2><div class="items"></div>`;
  const itemsDiv = block.querySelector(".items");

  menuData[section].forEach(([name, price]) => {
    // handle "199/249" style
    const priceText = typeof price === "number" ? `₹${price}` : `₹${price}`;
    const addPrice = (typeof price === "number") ? price : null;

    itemsDiv.innerHTML += `
      <div class="item">
        <img src="${getCategoryImage(section)}" alt="${section}">
        <div>
          <strong>${name}</strong><br>
          ${priceText}<br>
          ${
            addPrice !== null
              ? `<button onclick="addToCart('${escapeQuotes(name)}', ${addPrice})">Add</button>`
              : `<button onclick="alert('Select price manually: ${priceText}')">Add</button>`
          }
        </div>
      </div>
    `;
  });

  menu.appendChild(block);
}

function escapeQuotes(str){
  return String(str).replace(/'/g, "\\'");
}

/* =========================
   CART LOGIC
========================= */
let cart = {};

function addToCart(name, price){
  if(cart[name]) cart[name].qty++;
  else cart[name] = { price, qty: 1 };
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

  Object.keys(cart).forEach(item=>{
    total += cart[item].price * cart[item].qty;
    box.innerHTML += `
      <div class="cart-item">
        ${item} x ${cart[item].qty}
        <button onclick="removeItem('${escapeQuotes(item)}')">X</button>
      </div>
    `;
  });

  totalBox.textContent = total;
}

/* =========================
   WHATSAPP (MOBILE SAFE)
========================= */
function sendWhatsApp(){
  if(Object.keys(cart).length === 0){
    alert("Cart is empty");
    return;
  }

  let msg = "Order Details:\n";
  let total = 0;

  Object.keys(cart).forEach(item=>{
    msg += `${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}\n`;
    total += cart[item].price * cart[item].qty;
  });

  msg += `\nTotal Amount: ₹${total}`;

  const phone = "919642200422";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* =========================
   FIRE BACKGROUND (REDUCED INTENSITY)
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
for(let i=0;i<120;i++){
  flames.push({
    x:Math.random()*canvas.width,
    y:canvas.height + Math.random()*120,
    r:8 + Math.random()*18,
    s:0.8 + Math.random()*1.2,
    a:0.35
  });
}

(function burn(){
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  flames.forEach(f=>{
    const g = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);
    g.addColorStop(0,`rgba(255,220,160,${f.a})`);
    g.addColorStop(0.5,`rgba(255,120,0,${f.a})`);
    g.addColorStop(1,"rgba(200,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();

    f.y -= f.s;
    if(f.y < -50){
      f.x = Math.random()*canvas.width;
      f.y = canvas.height + 120;
    }
  });

  requestAnimationFrame(burn);
})();
