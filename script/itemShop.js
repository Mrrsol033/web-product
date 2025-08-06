  // Global state
    let products = [];
    let cart = [];
    let filteredProducts = [];

    // DOM elements
    const productContainer = document.getElementById('productContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const categoryFilter = document.getElementById('categoryFilter');
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartButton = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const cartBadge = document.getElementById('cartBadge');
    const cartBadgeCount = document.getElementById('cartBadgeCount');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Fetch products from API
    async function loadProducts() {
      try {
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        products = await response.json();
        filteredProducts = [...products];
        displayProducts(products);
        loadingSpinner.classList.add('hidden');
      } catch (error) {
        console.error('Error loading products:', error);
        loadingSpinner.classList.add('hidden');
        errorMessage.classList.remove('hidden');
      }
    }

    // Display products
    function displayProducts(productsToShow) {
      const cards = productsToShow.map(product => `
        <div class="product-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden fade-in">
          <!-- Product Image -->
          <div class="relative h-64 overflow-hidden bg-gray-50">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                ${product.category}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title="${product.title}">
              ${product.title}
            </h3>

            <p class="text-sm text-gray-600 mb-4 line-clamp-2">
              ${product.description}
            </p>

            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                ${generateStars(product.rating.rate)}
              </div>
              <span class="ml-2 text-sm text-gray-500">(${product.rating.count})</span>
            </div>

            <!-- Price & Button -->
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
              <button
                onclick="addToCart(${product.id})"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 flex items-center"
              >
                <i class="fas fa-cart-plus mr-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `).join('');

      productContainer.innerHTML = cards;
    }


    // Show toast notification
    function showToast(message) {
      toastMessage.textContent = message;
      toast.classList.remove('translate-x-full');
      setTimeout(() => toast.classList.add('translate-x-full'), 3000);
    }

    // Filter products by category
    function filterProducts() {
      const selectedCategory = categoryFilter.value;
      
      if (selectedCategory === 'all') {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter(product => 
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      
      displayProducts(filteredProducts);
    }

    // Open cart sidebar
    function openCart() {
      cartSidebar.classList.remove('translate-x-full');
      cartOverlay.classList.remove('hidden');
      displayCartItems();
    }

    // Close cart sidebar
    function closeCart() {
      cartSidebar.classList.add('translate-x-full');
      cartOverlay.classList.add('hidden');
    }

    // Scroll to products section
    function scrollToProducts() {
      productContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    cartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);

    // Initialize app
    document.addEventListener('DOMContentLoaded', () => {
      loadProducts();
    });

