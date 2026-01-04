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
  "Soups": [
    {name:"Chicken Soup", price:99},
    {name:"Corn Soup", price:79},
    {name:"Veg Hot & Sour Soup", price:79},
    {name:"Chicken Hot & Sour Soup", price:99}
  ],

  "Veg Starters": [
    {name:"Gobhi 65", price:189},
    {name:"Gobhi Manchuria", price:189},
    {name:"Paneer 65", price:199},
    {name:"Paneer Manchuria", price:199},
    {name:"Chilly Paneer", price:209},
    {name:"Mushroom 65", price:199},
    {name:"Mushroom Manchuria", price:189},
    {name:"Chilly Babycorn", price:179},
    {name:"Onion Pakoda", price:149},
    {name:"Crispy Veg", price:159},
    {name:"Crispy Corn", price:149},
    {name:"Kaju Roast", price:269},
    {name:"Capsicum Pakoda", price:169},
    {name:"Palli Masala", price:99}
  ],

  "Veg Biryanis": [
    {name:"Veg Biryani", price:179},
    {name:"Paneer Biryani", price:199},
    {name:"Kaju Biryani", price:249},
    {name:"Mushroom Biryani", price:199},
    {name:"Mixed Veg Biryani", price:199}
  ],

  "Veg Currys": [
    {name:"Paneer Butter Masala", price:219},
    {name:"Mushroom Masala", price:199},
    {name:"Kaju Paneer", price:249},
    {name:"Kaju Tomato", price:229},
    {name:"Baby Corn Masala", price:199},
    {name:"Mixed Veg Curry", price:189},
    {name:"Egg Bhurji", price:149},
    {name:"Double Egg Omlet", price:59}
  ],

  "Chinese Starters Nonveg": [
    {name:"Chicken Lollypops", price:299},
    {name:"Chicken Drumsticks", price:289},
    {name:"Chicken 65", price:259},
    {name:"Chilly Chicken", price:249},
    {name:"Chicken 555", price:259},
    {name:"Dragon Chicken", price:269},
    {name:"Garlic Chicken", price:249},
    {name:"Chicken Manchuria", price:259}
  ],

  "Non Veg Biryanis": [
    {name:"Dum Biryani", price:219},
    {name:"Fry Piece Biryani", price:229},
    {name:"SP Biryani", price:249},
    {name:"Mutton Biryani", price:319},
    {name:"Egg Biryani", price:159}
  ],

  "Rice Items": [
    {name:"Veg Fried Rice", price:159},
    {name:"Chicken Fried Rice", price:199},
    {name:"Zeera Rice", price:149},
    {name:"Curd Rice", price:69}
  ],

  /* SPLIT PRICE ITEMS */
  "Indian Nonveg Currys": [
    {name:"Chicken Curry (Bone)", price:199},
    {name:"Chicken Curry (Boneless)", price:249},
    {name:"Butter Chicken", price:259},
    {name:"Andhra Chicken", price:269}
  ],

  "Tandoori Chicken": [
    {name:"Tandoori Chicken (Half)", price:189},
    {name:"Tandoori Chicken (Full)", price:379},
    {name:"Tangdi Kabab", price:299},
    {name:"Chicken Tikka", price:259}
  ],

  "Nauty Non’s": [
    {name:"Tandoori Roti", price:29},
    {name:"Butter Naan", price:39},
    {name:"Plain Naan", price:29},
    {name:"Garlic Naan", price:49},
    {name:"Masala Kulcha", price:59}
  ]
};

/* =========================
   RENDER MENU (SAFE)
========================= */
const menu = document.getElementById("menu");
menu.innerHTML = "";

Object.entries(menuData).forEach(([section, items])=>{
  const block = document.createElement("div");
  block.className = "section";
  block.innerHTML = `<h2>${section}</h2><div class="items"></div>`;
  const itemsDiv = block.querySelector(".items");

  items.forEach(item=>{
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <img src="${getCategoryImage(section)}" alt="${item.name}">
      <div>
        <strong>${item.name}</strong><br>
        ₹${item.price}<br>
        <button>Add</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", ()=>{
      addToCart(item.name, item.price);
    });

    itemsDiv.appendChild(card);
  });

  menu.appendChild(block);
});

/* =========================
   CART LOGIC (WORKING)
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

  Object.entries(cart).forEach(([name,item])=>{
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `${name} x ${item.qty} <button>X</button>`;
    row.querySelector("button").addEventListener("click", ()=>removeItem(name));
    box.appendChild(row);
  });

  totalBox.textContent = total;
}

/* =========================
   WHATSAPP
========================= */
function sendWhatsApp(){
  if(!Object.keys(cart).length){
    alert("Cart is empty");
    return;
  }

  let msg = "Order Details:\n";
  let total = 0;

  Object.entries(cart).forEach(([name,item])=>{
    msg += `${name} x ${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  msg += `\nTotal: ₹${total}`;

  window.open(
    `https://wa.me/919642200422?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/* =========================
   FIRE BACKGROUND
========================= */
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let flames = Array.from({length:120}, ()=>({
  x:Math.random()*innerWidth,
  y:innerHeight+Math.random()*120,
  r:8+Math.random()*18,
  s:.8+Math.random()*1.2,
  a:.35
}));

(function burn(){
  ctx.fillStyle="rgba(0,0,0,.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  flames.forEach(f=>{
    ctx.beginPath();
    ctx.fillStyle=`rgba(255,120,0,${f.a})`;
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y-=f.s;
    if(f.y<0){f.y=canvas.height;f.x=Math.random()*canvas.width;}
  });
  requestAnimationFrame(burn);
})();
