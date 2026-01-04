/* 🔥 CANVAS FIRE ANIMATION */
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Fire {
  constructor() {
    this.x = Math.random() * w;
    this.y = h;
    this.r = Math.random() * 3 + 1;
    this.vy = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.4;
    this.life = 60;
  }
  update() {
    this.y -= this.vy;
    this.life--;
    this.alpha -= 0.01;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,140,0,${this.alpha})`;
    ctx.fill();
  }
}

function animateFire() {
  ctx.clearRect(0,0,w,h);
  for (let i=0;i<6;i++) particles.push(new Fire());
  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.life<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animateFire);
}
animateFire();

/* 🛒 CART LOGIC */
let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  let total = 0;
  cartDiv.innerHTML = "";
  cart.forEach(item => {
    total += item.price;
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });
  document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  let msg = "New Order:%0A";
  cart.forEach(i => msg += `${i.name} - ₹${i.price}%0A`);
  window.open("https://wa.me/9182900422?text=" + msg, "_blank");
}
