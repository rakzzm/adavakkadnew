// Product Data
const products = [
  // Kids Wear
  {
    id: 1,
    name: "Banarasi Butta Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 499,
    image: "Products/Banarasi Butta Saree.png",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 2,
    name: "Kaithari Mundu",
    category: "traditional",
    subcategory: "women",
    price: 299,
    image: "Products/Kaithari Mundu.png",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 3,
    name: "Foil Print Vichitra Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 899,
    image: "Products/Foil Print Vichitra Silk Saree.png",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 4,
    name: "Girls School Uniform",
    category: "school",
    subcategory: "kids",
    price: 849,
    image: "🎀",
    sizes: ["S", "M", "L", "XL"],
    ageGroups: ["5-8 years", "8-12 years", "12-15 years"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Women Wear
  {
    id: 5,
    name: "Cotton Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 4999,
    image: "Products/Cotton Silk Saree.png",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 6,
    name: "Designer Churidar Set",
    category: "women",
    subcategory: "women",
    price: 2499,
    image: "Products/Designer Churidar Set.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 7,
    name: "Churidhar Custom",
    category: "women",
    subcategory: "women",
    price: 1499,
    image: "Products/Churidhar Custom.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 8,
    name: "Mandarin & Banarasi Collars",
    category: "women",
    subcategory: "women",
    price: 1799,
    image: "Products/Mandarin & Banarasi Collars.png",
    sizes: ["S", "M", "L", "XL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Men's Wear
  {
    id: 9,
    name: "Monochromatic Colors",
    category: "women",
    subcategory: "women",
    price: 1699,
    image: "Products/Monochromatic Colors.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 10,
    name: "Organza Dupattas",
    category: "women",
    subcategory: "women",
    price: 1299,
    image: "Products/Organza Dupattas.png",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 11,
    name: "Pure Linen & Handloom Cotton",
    category: "women",
    subcategory: "women",
    price: 1899,
    image: "Products/Pure Linen & Handloom Cotton.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 12,
    name: "Traditional Mundu Set",
    category: "traditional",
    subcategory: "mens",
    price: 1899,
    image: "🕴️",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Traditional Wear
  {
    id: 13,
    name: "Kasavu Saree",
    category: "traditional",
    subcategory: "traditional",
    price: 3499,
    image: "🥻",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 14,
    name: "Traditional Pavada Set",
    category: "traditional",
    subcategory: "kids",
    price: 1299,
    image: "👗",
    sizes: ["S", "M", "L"],
    ageGroups: ["2-5 years", "5-8 years", "8-12 years"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },
  {
    id: 15,
    name: "Kerala Set Mundu",
    category: "traditional",
    subcategory: "mens",
    price: 2299,
    image: "🕴️",
    sizes: ["Free Size"],
    delivery: "Standard: 5-7 days, Express: 2-3 days"
  },

  // Silk Sarees
  {
    id: 16,
    name: "Kanchipuram Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 8999,
    image: "🥻",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 17,
    name: "Mysore Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 6499,
    image: "🥻",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },
  {
    id: 18,
    name: "Banarasi Silk Saree",
    category: "silk-sarees",
    subcategory: "women",
    price: 12999,
    image: "🥻",
    sizes: ["Free Size"],
    delivery: "Standard: 7-10 days, Express: 3-5 days"
  },

  // Wedding Collection
  {
    id: 19,
    name: "Bridal Silk Saree",
    category: "wedding",
    subcategory: "women",
    price: 25999,
    image: "💒",
    sizes: ["Free Size"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 20,
    name: "Groom Sherwani",
    category: "wedding",
    subcategory: "mens",
    price: 18999,
    image: "🤵",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 21,
    name: "Reception Lehenga",
    category: "wedding",
    subcategory: "women",
    price: 22999,
    image: "👗",
    sizes: ["S", "M", "L", "XL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  },
  {
    id: 22,
    name: "Wedding Kurta Set",
    category: "wedding",
    subcategory: "mens",
    price: 5999,
    image: "🕴️",
    sizes: ["S", "M", "L", "XL", "XXL"],
    delivery: "Standard: 10-15 days, Express: 5-7 days"
  }
];

// Render products
function renderProducts(productsToRender) {
  const productsGrid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  
  if (productsToRender.length === 0) {
    productsGrid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  
  productsGrid.style.display = 'grid';
  noResults.style.display = 'none';
  
  productsGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image-placeholder">
        ${product.image.includes('.png') || product.image.includes('.jpg') 
          ? `<img src="${product.image}" alt="${product.name}" class="product-image" />`
          : `<span class="product-icon">${product.image}</span>`
        }
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
        
        <div class="product-details">
          <div class="detail-group">
            <label for="size-${product.id}">Size:</label>
            <select id="size-${product.id}" class="product-select">
              ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
          </div>
          
          ${product.ageGroups ? `
            <div class="detail-group">
              <label for="age-${product.id}">Age:</label>
              <select id="age-${product.id}" class="product-select">
                ${product.ageGroups.map(age => `<option value="${age}">${age}</option>`).join('')}
              </select>
            </div>
          ` : ''}
          
          <div class="detail-group">
            <label>Delivery:</label>
            <p class="delivery-info">${product.delivery}</p>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-buy-now" onclick="buyNow(${product.id})">Buy Now</button>
          <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter products
function filterProducts() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  
  let filtered = products;
  
  // Filter by category
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(product => product.category === categoryFilter);
  }
  
  // Filter by search
  if (searchQuery) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery)
    );
  }
  
  renderProducts(filtered);
}

// Filter by category (for footer links)
function filterByCategory(category) {
  document.getElementById('categoryFilter').value = category;
  filterProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Buy Now function
function buyNow(productId) {
  const product = products.find(p => p.id === productId);
  const size = document.getElementById(`size-${productId}`).value;
  const ageSelect = document.getElementById(`age-${productId}`);
  const age = ageSelect ? ageSelect.value : null;
  
  alert(`Proceeding to checkout:\n\nProduct: ${product.name}\nPrice: ₹${product.price.toLocaleString('en-IN')}\nSize: ${size}${age ? `\nAge: ${age}` : ''}\n\nCheckout functionality coming soon!`);
}

// Add to Cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const size = document.getElementById(`size-${productId}`).value;
  const ageSelect = document.getElementById(`age-${productId}`);
  const age = ageSelect ? ageSelect.value : null;
  
  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Add product to cart
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    size: size,
    age: age,
    quantity: 1
  });
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Show confirmation
  alert(`Added to cart!\n\n${product.name}\nSize: ${size}${age ? `\nAge: ${age}` : ''}\n\nCart items: ${cart.length}`);
}

// Initialize - render all products on page load
document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products);
});
