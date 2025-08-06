
    // Generate star rating
    function generateStars(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      let stars = '';
      
      for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
      }
      
      if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      }
      
      const emptyStars = 5 - Math.ceil(rating);
      for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
      }
      
      return stars;
    }

    // Add item to cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCartUI();
      showToast('Item added to cart!');
      
      // Add bounce animation to cart button
      cartButton.classList.add('cart-bounce');
      setTimeout(() => cartButton.classList.remove('cart-bounce'), 600);
    }

    // Remove item from cart
    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCartUI();
      displayCartItems();
    }

    // Update cart UI
    function updateCartUI() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      cartCount.textContent = totalItems;
      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
      
      if (totalItems > 0) {
        cartBadge.classList.remove('hidden');
        cartBadgeCount.textContent = totalItems;
      } else {
        cartBadge.classList.add('hidden');
      }
    }

    // Display cart items
    function displayCartItems() {
      if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="text-center py-8">
            <i class="fas fa-shopping-cart text-gray-300 text-4xl mb-4"></i>
            <p class="text-gray-500">Your cart is empty</p>
          </div>
        `;
        return;
      }

      const cartHTML = cart.map(item => `
        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-contain">
          <div class="flex-grow">
            <h4 class="font-medium text-sm line-clamp-2">${item.title}</h4>
            <p class="text-sm text-gray-600">$${item.price.toFixed(2)} × ${item.quantity}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('');

      cartItems.innerHTML = cartHTML;
    }

    function openCart() {
  cartSidebar.classList.remove('translate-x-full');
  cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
}

function closeCart() {
  cartSidebar.classList.add('translate-x-full');
  cartOverlay.classList.add('opacity-0', 'pointer-events-none');
}
