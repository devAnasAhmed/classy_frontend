// ================================
// CLASSY - Main App JavaScript
// Frontend Only (localStorage)
// ================================

function getPublicApiUrl() {
  return (window.CLASSY_API_URL || '').replace(/\/$/, '');
}

// ===== DEMO DATA =====
const DEMO_PRODUCTS = [
  { _id: 'p1', name: 'كتاب تلوين Mandala', category: 'كتب تلوين', price: 120, oldPrice: 150, stock: 25, status: 'active', rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop', description: 'كتاب تلوين فاخر بتصاميم Mandala معقدة ومريحة للأعصاب. 40 صفحة من الإبداع.' },
  { _id: 'p2', name: 'بوكس ورد مجفف', category: 'بوكسات ورد', price: 350, oldPrice: 400, stock: 10, status: 'active', rating: 4.8, reviews: 32, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=300&fit=crop', description: 'بوكس خشبي أنيق مملوء بورد طبيعي مجفف بألوان دافئة. يدوم لسنوات.' },
  { _id: 'p3', name: 'نوتة Van Gogh', category: 'نوتات مخصصة', price: 85, oldPrice: 100, stock: 30, status: 'active', rating: 4.7, reviews: 28, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop', description: 'نوتة A5 بتصميم فني مستوحى من لوحات Van Gogh. ورق عالي الجودة.' },
  { _id: 'p4', name: 'تغريسة تخرج Senior', category: 'تغريسات تخرج', price: 60, oldPrice: 75, stock: 50, status: 'active', rating: 4.9, reviews: 65, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', description: 'تغريسة خشبية مخصصة بتصميم Senior 2026. يمكن إضافة اسم وصورة.' },
  { _id: 'p5', name: 'برواز مولود', category: 'براويز مواليد', price: 200, oldPrice: 250, stock: 15, status: 'active', rating: 5.0, reviews: 40, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop', description: 'برواز أنيق يحمل تفاصيل ميلاد المولود: الاسم، التاريخ، الوزن، والطول.' },
  { _id: 'p6', name: 'كتاب تلوين حيوانات', category: 'كتب تلوين', price: 100, oldPrice: 130, stock: 20, status: 'active', rating: 4.6, reviews: 22, image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=300&fit=crop', description: 'كتاب تلوين كرتوني لطيف للأطفال والكبار. 30 صفحة من المتعة.' },
  { _id: 'p7', name: 'بوكس ورد طبيعي', category: 'بوكسات ورد', price: 400, oldPrice: 450, stock: 8, status: 'active', rating: 4.9, reviews: 18, image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop', description: 'بوكس ورد طبيعي مجفف بألوان دافئة وتغليف فاخر. هدية مثالية.' },
  { _id: 'p8', name: 'نوتة اقتباسات عربية', category: 'نوتات مخصصة', price: 75, oldPrice: 90, stock: 35, status: 'active', rating: 4.8, reviews: 30, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop', description: 'نوتة بتصميم عربي مميز واقتباسات ملهمة. هدية راقية لعشاق الكتابة.' },
];

const DEMO_CATEGORIES = [
  { _id: 'c1', name: 'كتب تلوين', icon: '🎨', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop', count: 12 },
  { _id: 'c2', name: 'بوكسات ورد', icon: '🌹', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=300&fit=crop', count: 8 },
  { _id: 'c3', name: 'نوتات مخصصة', icon: '📓', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop', count: 15 },
  { _id: 'c4', name: 'تغريسات تخرج', icon: '🎓', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', count: 20 },
  { _id: 'c5', name: 'براويز مواليد', icon: '👶', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop', count: 6 },
  { _id: 'c6', name: 'هدايا مخصصة', icon: '✨', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop', count: 10 },
];

// ===== HELPERS =====
function getProducts() {
  const local = JSON.parse(localStorage.getItem('classy_local_products') || '[]');
  const all = [...DEMO_PRODUCTS];
  local.forEach(lp => {
    const idx = all.findIndex(p => p._id === lp._id);
    if (idx >= 0) all[idx] = lp;
    else all.push(lp);
  });
  return all;
}

function getCart() {
  return JSON.parse(localStorage.getItem('classy_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('classy_cart', JSON.stringify(cart));
  updateCartCount();
}

function formatPrice(price) {
  return price + ' EGP';
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast ' + type;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ===== CART =====
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function addToCart(productId, qty = 1) {
  const products = getProducts();
  const product = products.find(p => p._id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    });
  }
  saveCart(cart);
  showToast('تم إضافة المنتج للسلة! 🛒', 'success');
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
  renderCart();
  renderCheckoutSummary();
}

function updateQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  }
  saveCart(cart);
  renderCart();
  renderCheckoutSummary();
}

function clearCart() {
  localStorage.removeItem('classy_cart');
  updateCartCount();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-xl font-bold mb-2">سلة التسوق فارغة</h3>
        <p class="text-gray-500 mb-6">ابدأ التسوق واكتشف منتجاتنا الرائعة</p>
        <a href="products.html" class="btn-primary">تصفح المنتجات</a>
      </div>
    `;
    updateCartSummary(0);
    return;
  }

  let html = '<div class="space-y-4">';
  let subtotal = 0;
  cart.forEach(item => {
    const total = item.price * item.quantity;
    subtotal += total;
    html += `
      <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl" onerror="this.src='https://via.placeholder.com/100'">
        <div class="flex-1">
          <h4 class="font-bold">${item.name}</h4>
          <p class="text-primary-dark font-bold">${formatPrice(item.price)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="updateQuantity('${item.productId}', -1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">-</button>
          <span class="w-8 text-center font-bold">${item.quantity}</span>
          <button onclick="updateQuantity('${item.productId}', 1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">+</button>
        </div>
        <div class="font-bold text-lg">${formatPrice(total)}</div>
        <button onclick="removeFromCart('${item.productId}')" class="text-red-400 hover:text-red-600 p-2"><i class="fas fa-trash"></i></button>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
  updateCartSummary(subtotal);
}

function updateCartSummary(subtotal) {
  const shipping = subtotal > 500 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;
  const subEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  if (subEl) subEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

// ===== CHECKOUT =====
function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  if (!container) return;

  const cart = getCart();
  const shippingRadio = document.querySelector('input[name="shippingMethod"]:checked');
  const shippingCost = shippingRadio && shippingRadio.value === 'express' ? 50 : 0;

  let subtotal = 0;
  let html = '';
  cart.forEach(item => {
    const total = item.price * item.quantity;
    subtotal += total;
    html += `
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover" onerror="this.src='https://via.placeholder.com/100'">
          <div>
            <div class="font-semibold text-sm">${item.name}</div>
            <div class="text-gray-400 text-xs">x${item.quantity}</div>
          </div>
        </div>
        <div class="font-bold">${formatPrice(total)}</div>
      </div>
    `;
  });
  container.innerHTML = html;
  const total = subtotal + shippingCost;
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

async function submitOrder(e) {
  e.preventDefault();
  const cart = getCart();
  if (!cart.length) {
    showToast('السلة فارغة!', 'error');
    return;
  }
  const form = e.target;
  const formData = new FormData(form);
  const order = {
    customer: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email') || '',
      address: formData.get('address')
    },
    items: cart.map(item => ({
      productName: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (formData.get('shippingMethod') === 'express' ? 50 : 0),
    paymentMethod: formData.get('paymentMethod'),
    shippingMethod: formData.get('shippingMethod'),
    status: 'pending',
    notes: formData.get('notes') || ''
  };

  const apiUrl = getPublicApiUrl();
  if (!apiUrl) {
    showToast('تعذر إرسال الطلب: رابط الخادم غير مضبوط.', 'error');
    return;
  }

  const button = document.getElementById('submitBtn');
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ إرسال الطلب...';
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.message || 'لم يقبل الخادم الطلب');
    }
    const savedOrder = result.data;
    localStorage.setItem('classy_last_order', JSON.stringify(savedOrder));
    clearCart();
    window.location.href = 'order-success.html';
  } catch (error) {
    showToast(`تعذر إرسال الطلب: ${error.message}`, 'error');
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-check-circle"></i> تأكيد الطلب';
  }
}

function renderOrderSuccess() {
  const container = document.getElementById('orderDetails');
  const order = JSON.parse(localStorage.getItem('classy_last_order') || '{}');
  if (!container || !order.orderNumber) return;
  container.innerHTML = `
    <div class="space-y-3 text-right">
      <div class="flex justify-between"><span class="text-gray-500">رقم الطلب:</span><span class="font-bold">${order.orderNumber}</span></div>
      <div class="flex justify-between"><span class="text-gray-500">العميل:</span><span class="font-bold">${order.customer?.name}</span></div>
      <div class="flex justify-between"><span class="text-gray-500">الهاتف:</span><span class="font-bold">${order.customer?.phone}</span></div>
      <div class="flex justify-between"><span class="text-gray-500">العنوان:</span><span class="font-bold">${order.customer?.address}</span></div>
      <div class="flex justify-between"><span class="text-gray-500">الإجمالي:</span><span class="font-bold text-primary-dark">${formatPrice(order.totalPrice)}</span></div>
    </div>
  `;
}

// ===== PRODUCTS =====
function renderProductCard(product) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return `
    <div class="product-card fade-in">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400'">
        ${discount > 0 ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-${discount}%</span>` : ''}
        <button onclick="addToCart('${product._id}')" class="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-dark hover:bg-primary hover:text-white transition-colors">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="product-card-body">
        <div class="text-xs text-gray-400 mb-1">${product.category}</div>
        <h3 class="product-card-title">${product.name}</h3>
        <div class="flex items-center gap-2 mb-3">
          <span class="product-card-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="product-card-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <a href="product-detail.html?id=${product._id}" class="btn-outline w-full justify-center text-sm">عرض التفاصيل</a>
      </div>
    </div>
  `;
}

function loadFeaturedProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;
  const products = getProducts().filter(p => p.status === 'active').slice(0, 8);
  container.innerHTML = products.map(renderProductCard).join('');
}

function loadAllProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;
  const products = getProducts().filter(p => p.status === 'active');
  container.innerHTML = products.map(renderProductCard).join('');
  loadCategoryFilters();
}

function loadCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  let html = `<button class="filter-btn active" onclick="filterProducts('all')">الكل</button>`;
  categories.forEach(cat => {
    html += `<button class="filter-btn" onclick="filterProducts('${cat}')">${cat}</button>`;
  });
  container.innerHTML = html;
}

function filterProducts(category) {
  const products = getProducts().filter(p => p.status === 'active');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  const container = document.getElementById('productsContainer');
  if (container) container.innerHTML = filtered.map(renderProductCard).join('');

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}

function searchProducts() {
  const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const products = getProducts().filter(p => p.status === 'active');
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
  const container = document.getElementById('productsContainer');
  if (container) {
    container.innerHTML = filtered.length 
      ? filtered.map(renderProductCard).join('') 
      : '<div class="col-span-full text-center py-10 text-gray-400">لا توجد نتائج مطابقة</div>';
  }
}

// ===== PRODUCT DETAIL =====
function loadProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProducts().find(p => p._id === id);
  if (!product) {
    container.innerHTML = '<div class="text-center py-20 text-gray-400">المنتج غير موجود</div>';
    return;
  }

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  container.innerHTML = `
    <div class="grid lg:grid-cols-2 gap-10">
      <div class="bg-white rounded-3xl p-6 shadow-lg">
        <img src="${product.image}" alt="${product.name}" class="w-full rounded-2xl" onerror="this.src='https://via.placeholder.com/600'">
      </div>
      <div>
        <div class="text-sm text-gray-400 mb-2">${product.category}</div>
        <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
        <div class="flex items-center gap-3 mb-4">
          <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="text-gray-500">(${product.reviews} تقييم)</span>
        </div>
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl font-bold text-primary-dark">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="text-xl text-gray-400 line-through">${formatPrice(product.oldPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">وفر ${discount}%</span>` : ''}
        </div>
        <p class="text-gray-600 mb-8 leading-relaxed">${product.description}</p>
        <div class="flex gap-4">
          <button onclick="addToCart('${product._id}')" class="btn-primary flex-1 justify-center"><i class="fas fa-shopping-bag"></i> أضف للسلة</button>
          <a href="https://wa.me/201226832747?text=${encodeURIComponent('مرحباً CLASSY، عندي سؤال عن منتج: ' + product.name)}" target="_blank" class="btn-secondary justify-center"><i class="fab fa-whatsapp"></i> استفسر</a>
        </div>
        <div class="mt-8 p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3 text-sm text-gray-600">
            <i class="fas fa-check-circle text-green-500"></i> متوفر في المخزن (${product.stock} قطعة)
          </div>
        </div>
      </div>
    </div>
  `;

  // Load related products
  const relatedContainer = document.getElementById('relatedProducts');
  if (relatedContainer) {
    const related = getProducts().filter(p => p.category === product.category && p._id !== product._id).slice(0, 4);
    relatedContainer.innerHTML = related.map(renderProductCard).join('') || '<div class="col-span-full text-center text-gray-400">لا توجد منتجات مشابهة</div>';
  }
}

// ===== CATEGORIES =====
function loadCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;
  container.innerHTML = DEMO_CATEGORIES.map(cat => `
    <a href="products.html" class="group relative rounded-3xl overflow-hidden shadow-lg h-64">
      <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='https://via.placeholder.com/400'">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <div class="text-3xl mb-2">${cat.icon}</div>
        <h3 class="text-white text-xl font-bold">${cat.name}</h3>
        <p class="text-white/70 text-sm">${cat.count} منتج</p>
      </div>
    </a>
  `).join('');
}

function loadCategoriesPage() {
  loadCategories();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
