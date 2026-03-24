const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 59.99,
    image: "https://via.placeholder.com/300x180?text=Shoes"
  },
  {
    id: 2,
    name: "Backpack",
    price: 39.99,
    image: "https://via.placeholder.com/300x180?text=Backpack"
  },
  {
    id: 3,
    name: "Watch",
    price: 99.99,
    image: "https://via.placeholder.com/300x180?text=Watch"
  }
];

const cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function renderProducts() {
  productList.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(item => item.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(product => product.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex(product => product.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <div>$${item.price.toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);
}

renderProducts();
renderCart();
