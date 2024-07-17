
var cartItems = [];

function addToCart(name, price, imageSrc) {
  var existingCartItem = cartItems.find(item => item.name === name);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cartItems.push({
      name: name,
      price: price,
      imageSrc: imageSrc,
      quantity: 1
    });
  }

  updateCartDisplay();
  saveCartToLocalStorage(); // Зберігати кошик у localStorage
  alert('Товар ' + name + ' додано в кошик!');
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
  saveCartToLocalStorage(); // Зберігати кошик у localStorage
}

function increaseQuantity(index) {
  cartItems[index].quantity += 1;
  updateCartDisplay();
  saveCartToLocalStorage(); // Зберігати кошик у localStorage
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    updateCartDisplay();
    saveCartToLocalStorage(); // Зберігати кошик у localStorage
  }
}

function updateCartDisplay() {
  var cartItemsContainer = document.querySelector('.cart-item');
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(function (item, index) {
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.imageSrc}" alt="Product">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <p>${item.quantity} шт</p>
      <button class="increase-button" onclick="increaseQuantity(${index})">+</button>
      <button class="decrease-button" onclick="decreaseQuantity(${index})">-</button>
      <button class="remove-button" onclick="removeFromCart(${index})">Видалити</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });
}

function restoreCartFromLocalStorage() {
  var savedCartItems = localStorage.getItem('cartItems');

  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    updateCartDisplay();
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('DOMContentLoaded', function() {
  restoreCartFromLocalStorage();
});
// Отримати збережені товари з localStorage та відобразити їх
function restoreCartFromLocalStorage() {
    var savedCartItems = localStorage.getItem('cartItems');
  
    if (savedCartItems) {
      cartItems = JSON.parse(savedCartItems);
      updateCartDisplay();
    }
  }
  
  // Зберегти кошик у localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }