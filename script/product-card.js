const productContainer = document.getElementById("product-container");

const getProductCard = async () => {
  const BASE_URL = "https://fakestoreapi.com";
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const products = await res.json();
  return products;
};

getProductCard().then((products) => {
  const cards = products.map((product) => {
    return `
      <div class="group bg-white rounded-[6px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        
        <!-- Product Image -->
        <div class="relative h-48 w-full overflow-hidden rounded-t-[6px]">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="object-cover  w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <!-- Card Content -->
        <div class="p-4 flex flex-col flex-grow">

          <!-- Category -->
          <div class="mb-2">
            <span class="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-5a1 1 0 00-1 1v3H6a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V6a1 1 0 00-1-1z" />
              </svg>
              <span>${product.category}</span>
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${product.title}</h3>

          <!-- Description -->
          <p class="text-sm text-gray-600 mb-4 line-clamp-2">
            ${product.description}
          </p>

          <!-- Rating -->
          <div class="flex items-center text-yellow-400 mb-4">
            <div class="flex space-x-1">
              ${'★'.repeat(Math.round(product.rating.rate))}
              ${'☆'.repeat(5 - Math.round(product.rating.rate))}
            </div>
            <span class="ml-2 text-sm text-amber-600">(${product.rating.rate})</span>
          </div>

          <!-- Price & Button -->
          <div class="mt-auto pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md shadow-md transition duration-300 w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    `;
  });

  productContainer.innerHTML = cards.join("");
});