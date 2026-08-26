// ================================
// CLASSY Admin Dashboard JavaScript
// Connected to Backend API
// ================================

// API URL - can be configured via localStorage or defaults to localhost
function getApiUrl() {
  return localStorage.getItem('classy_api_url') || 'https://classy-backend.vercel.app/api';
}
let API_URL = getApiUrl();

// ===== AUTH =====
function getToken() { return localStorage.getItem('classy_admin_token'); }
function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': 'Bearer ' + token } : {};
}

// Check auth on load
(function checkAuth() {
  const token = getToken();
  if (!token) { window.location.href = 'login.html'; return; }
  const user = JSON.parse(localStorage.getItem('classy_admin_user') || '{}');
  // لو المدير غيّر اسمه من قبل، الاسم المحفوظ ده بيبقى له الأولوية
  const savedName = localStorage.getItem('classy_manager_name');
  const displayName = savedName || user.name;
  if (displayName) {
    document.getElementById('sidebarName').textContent = displayName;
    document.getElementById('sidebarAvatar').textContent = displayName.charAt(0);
  }
})();

function logout() {
  localStorage.removeItem('classy_admin_token');
  localStorage.removeItem('classy_admin_user');
  window.location.href = 'login.html';
}

// ===== API HELPERS =====
async function apiGet(endpoint) {
  try {
    const res = await fetch(getApiUrl() + endpoint, { headers: getAuthHeaders() });
    return await res.json();
  } catch (e) { return { success: false, error: e.message }; }
}
async function apiPostForm(endpoint, formData) {
  try {
    const res = await fetch(getApiUrl() + endpoint, {
      method: 'POST',
      headers: getAuthHeaders(), // Don't set Content-Type - browser sets it with boundary for FormData
      body: formData
    });
    return await res.json();
  } catch (e) { return { success: false, error: e.message }; }
}
async function apiPutForm(endpoint, formData) {
  try {
    const res = await fetch(getApiUrl() + endpoint, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData
    });
    return await res.json();
  } catch (e) { return { success: false, error: e.message }; }
}
async function apiPutJSON(endpoint, dataObject) {
  try {
    const res = await fetch(getApiUrl() + endpoint, {
      method: 'PUT',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObject)
    });
    return await res.json();
  } catch (e) { return { success: false, error: e.message }; }
}
async function apiDelete(endpoint) {
  try {
    const res = await fetch(getApiUrl() + endpoint, { method: 'DELETE', headers: getAuthHeaders() });
    return await res.json();
  } catch (e) { return { success: false, error: e.message }; }
}

// ===== DEMO DATA (Fallback) =====
let products = [], orders = [], customers = [], galleryItems = [];
let categories = [];

const DEMO_PRODUCTS = [
  { _id: 'p1', name: 'كتاب تلوين Mandala', category: 'كتب تلوين', price: 120, stock: 25, status: 'active', rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=100&h=100&fit=crop', description: 'كتاب تلوين فاخر' },
  { _id: 'p2', name: 'بوكس ورد مجفف', category: 'بوكسات ورد', price: 350, stock: 10, status: 'active', rating: 4.8, reviews: 32, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=100&h=100&fit=crop', description: 'بوكس خشبي أنيق' },
  { _id: 'p3', name: 'نوتة Van Gogh', category: 'نوتات مخصصة', price: 85, stock: 30, status: 'active', rating: 4.7, reviews: 28, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&h=100&fit=crop', description: 'نوتة A5 فنية' },
  { _id: 'p4', name: 'تغريسة تخرج Senior', category: 'تغريسات تخرج', price: 60, stock: 50, status: 'active', rating: 4.9, reviews: 65, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop', description: 'تغريسة خشبية' },
  { _id: 'p5', name: 'برواز مولود', category: 'براويز مواليد', price: 200, stock: 15, status: 'active', rating: 5.0, reviews: 40, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=100&h=100&fit=crop', description: 'برواز تفاصيل الميلاد' },
];

const DEMO_ORDERS = [
  { _id: 'o1', orderNumber: '#ORD00001', customer: { name: 'فاطمة محمد', phone: '201226832747', email: 'fatima@example.com', address: 'القاهرة، مصر الجديدة' }, items: [{ productName: 'بوكس ورد مجفف', quantity: 1, price: 350 }, { productName: 'نوتة Van Gogh', quantity: 1, price: 85 }], totalPrice: 435, paymentMethod: 'cash_on_delivery', shippingMethod: 'standard', status: 'pending', notes: 'يرجى التواصل قبل التوصيل', date: '23 أغسطس 2026' },
  { _id: 'o2', orderNumber: '#ORD00002', customer: { name: 'نور أحمد', phone: '201111111111', email: 'nour@example.com', address: 'الإسكندرية، سموحة' }, items: [{ productName: 'كتاب تلوين Mandala', quantity: 1, price: 120 }], totalPrice: 120, paymentMethod: 'cash_on_delivery', shippingMethod: 'express', status: 'processing', notes: '', date: '22 أغسطس 2026' },
  { _id: 'o3', orderNumber: '#ORD00003', customer: { name: 'ياسمين خالد', phone: '201222222222', email: 'yasmin@example.com', address: 'الجيزة، الدقي' }, items: [{ productName: 'برواز مولود', quantity: 1, price: 200 }, { productName: 'تغريسة تخرج', quantity: 1, price: 60 }], totalPrice: 260, paymentMethod: 'cash_on_delivery', shippingMethod: 'standard', status: 'delivered', notes: 'هدية', date: '21 أغسطس 2026' },
  { _id: 'o4', orderNumber: '#ORD00004', customer: { name: 'سارة علي', phone: '201333333333', email: 'sara@example.com', address: 'القاهرة، مدينة نصر' }, items: [{ productName: 'نوتة Van Gogh', quantity: 1, price: 85 }, { productName: 'بوكس ورد', quantity: 1, price: 350 }], totalPrice: 435, paymentMethod: 'cash_on_delivery', shippingMethod: 'standard', status: 'pending', notes: '', date: '20 أغسطس 2026' },
  { _id: 'o5', orderNumber: '#ORD00005', customer: { name: 'محمد حسن', phone: '201444444444', email: 'mohamed@example.com', address: 'القاهرة، المعادي' }, items: [{ productName: 'تغريسة تخرج', quantity: 5, price: 60 }], totalPrice: 300, paymentMethod: 'cash_on_delivery', shippingMethod: 'express', status: 'processing', notes: '5 تغريسات', date: '19 أغسطس 2026' },
  { _id: 'o6', orderNumber: '#ORD00006', customer: { name: 'ليلى سامي', phone: '201555555555', email: 'laila@example.com', address: 'طنطا، شارع الجيش' }, items: [{ productName: 'كتاب تلوين', quantity: 2, price: 120 }, { productName: 'نوتة', quantity: 1, price: 85 }], totalPrice: 325, paymentMethod: 'online', shippingMethod: 'standard', status: 'cancelled', notes: 'ألغى العميل', date: '18 أغسطس 2026' },
];

const DEMO_CUSTOMERS = [
  { _id: 'c1', name: 'فاطمة محمد', email: 'fatima@example.com', phone: '201226832747', address: 'القاهرة، مصر', orders: 5, total: 1250, date: '15 يناير 2026' },
  { _id: 'c2', name: 'نور أحمد', email: 'nour@example.com', phone: '201111111111', address: 'الإسكندرية، مصر', orders: 3, total: 680, date: '20 فبراير 2026' },
  { _id: 'c3', name: 'ياسمين خالد', email: 'yasmin@example.com', phone: '201222222222', address: 'الجيزة، مصر', orders: 8, total: 2100, date: '5 مارس 2026' },
  { _id: 'c4', name: 'سارة علي', email: 'sara@example.com', phone: '201333333333', address: 'القاهرة، مصر', orders: 2, total: 870, date: '10 أبريل 2026' },
  { _id: 'c5', name: 'محمد حسن', email: 'mohamed@example.com', phone: '201444444444', address: 'القاهرة، مصر', orders: 4, total: 1500, date: '25 مايو 2026' },
];

const DEMO_GALLERY = [
  { _id: 'g1', title: 'كتاب تلوين', desc: 'Mandala Design', category: 'كتب تلوين', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop' },
  { _id: 'g2', title: 'بوكس ورد', desc: 'ورد مجفف وردي', category: 'بوكسات ورد', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop' },
  { _id: 'g3', title: 'نوتة مخصصة', desc: 'Van Gogh Design', category: 'نوتات مخصصة', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop' },
  { _id: 'g4', title: 'تغريسة تخرج', desc: 'Senior 2026', category: 'تغريسات تخرج', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop' },
];

// ===== STATUS CONFIG =====
const STATUS_CONFIG = {
  pending:    { label: 'قيد المراجعة', class: 'status-badge pending', icon: '⏳' },
  processing: { label: 'قيد المعالجة', class: 'status-badge processing', icon: '🔧' },
  delivered:  { label: 'تم التسليم',   class: 'status-badge delivered', icon: '✅' },
  cancelled:  { label: 'إلغاء',        class: 'status-badge cancelled', icon: '❌' },
};
const PAYMENT_LABELS = { cash_on_delivery: 'الدفع عند الاستلام', online: 'دفع إلكتروني' };
const SHIPPING_LABELS = { standard: 'شحن عادي', express: 'شحن سريع' };

// ===== SIDEBAR =====
// تم التعديل: نفس الزرار بقى يفتح/يقفل صح على الموبايل (كلاس open)
// وعلى الديسكتوب بيصغّر/يكبّر (كلاس collapsed) - زي ما كان بالظبط
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}

function showSection(sectionName) {
  const sections = ['dashboard', 'products', 'orders', 'customers', 'gallery', 'settings'];
  sections.forEach(s => { const el = document.getElementById(s + 'Section'); if (el) el.style.display = 'none'; });
  const selected = document.getElementById(sectionName + 'Section');
  if (selected) selected.style.display = 'block';
  document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
  if (event && event.target) event.target.closest('.sidebar-item').classList.add('active');
  const titles = { 'dashboard': 'لوحة التحكم', 'products': 'المنتجات', 'orders': 'الطلبات', 'customers': 'العملاء', 'gallery': 'معرض الأعمال', 'settings': 'الإعدادات' };
  const breadcrumb = document.getElementById('pageBreadcrumb');
  if (breadcrumb) breadcrumb.textContent = titles[sectionName] || sectionName;
  if (sectionName === 'products') loadProducts();
  if (sectionName === 'orders') loadOrders();
  if (sectionName === 'customers') loadCustomers();
  if (sectionName === 'gallery') loadGallery();
  if (sectionName === 'settings') loadSettingsToForm();

  // على الموبايل: نقفل القايمة تلقائي بعد اختيار قسم عشان المحتوى يبان
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

// ===== MODALS =====
function openModal(modalId) { document.getElementById(modalId).classList.add('open'); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('open'); });
});

// ===== TOAST =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ===== IMAGE UPLOAD HELPERS =====
function handleImagePreview(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('حجم الصورة كبير جداً! الحد الأقصى 5MB', 'error'); input.value = ''; return; }

  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('imagePreview').src = e.target.result;
    document.getElementById('imagePreview').style.display = 'block';
    document.getElementById('imagePreviewArea').style.display = 'none';
    document.getElementById('removeImageBtn').style.display = 'inline-block';
    // Clear URL field since we have a file
    document.getElementById('prodImageUrl').value = '';
  };
  reader.readAsDataURL(file);
}

function removeImagePreview() {
  document.getElementById('prodImageFile').value = '';
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('imagePreviewArea').style.display = 'block';
  document.getElementById('removeImageBtn').style.display = 'none';
}

function handleUrlPreview(url) {
  if (!url) return;
  document.getElementById('imagePreview').src = url;
  document.getElementById('imagePreview').style.display = 'block';
  document.getElementById('imagePreviewArea').style.display = 'none';
  document.getElementById('removeImageBtn').style.display = 'inline-block';
  // Clear file input since we have URL
  document.getElementById('prodImageFile').value = '';
}

// ===== LOAD DATA =====
async function loadAllData() {
  const prodRes = await apiGet('/products');
  products = prodRes.success && prodRes.data ? prodRes.data : DEMO_PRODUCTS;
  const ordRes = await apiGet('/orders');
  orders = ordRes.success && ordRes.data ? ordRes.data : DEMO_ORDERS;
  const catRes = await apiGet('/categories');
  categories = catRes.success && catRes.data ? catRes.data : [];
  const galRes = await apiGet('/gallery');
  galleryItems = galRes.success && galRes.data ? galRes.data : DEMO_GALLERY;
  customers = extractCustomersFromOrders();

  renderDashboardOrders();
  renderProductsTable();
  renderOrdersTable();
  renderCustomersTable();
  renderGalleryGrid();
  updateDashboardStats();
  initCharts();
}

function extractCustomersFromOrders() {
  const map = {};
  orders.forEach(o => {
    const key = o.customer.phone;
    if (!map[key]) {
      map[key] = { _id: 'c_' + key, name: o.customer.name, email: o.customer.email || '', phone: o.customer.phone, address: o.customer.address, orders: 0, total: 0, date: o.date };
    }
    map[key].orders++;
    map[key].total += o.totalPrice;
  });
  return Object.values(map);
}

// ===== DASHBOARD =====
function renderDashboardOrders() {
  const tbody = document.getElementById('dashboardOrdersBody');
  if (!tbody) return;
  const recent = orders.slice(0, 5);
  if (!recent.length) { tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-400">لا توجد طلبات</td></tr>'; return; }
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><span class="font-bold text-primary-dark">${o.orderNumber}</span></td>
      <td>${o.customer.name}</td>
      <td>${o.items.map(i => i.productName).join(' + ')}</td>
      <td class="font-bold">${o.totalPrice} EGP</td>
      <td><span class="${STATUS_CONFIG[o.status]?.class || 'status-badge pending'}">${STATUS_CONFIG[o.status]?.label || o.status}</span></td>
      <td>${formatDate(o.createdAt || o.date)}</td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${o._id}')" title="عرض"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editOrder('${o._id}')" title="تعديل"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
  `).join('');
}

function updateDashboardStats() {
  const totalOrders = orders.length;
  const totalProducts = products.filter(p => p.status === 'active').length;
  const totalCustomers = customers.length;
  const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.totalPrice || 0), 0);
  if (document.getElementById('dashTotalOrders')) animateNumber(document.getElementById('dashTotalOrders'), totalOrders);
  if (document.getElementById('dashTotalCustomers')) animateNumber(document.getElementById('dashTotalCustomers'), totalCustomers);
  if (document.getElementById('dashTotalProducts')) animateNumber(document.getElementById('dashTotalProducts'), totalProducts);
  if (document.getElementById('dashTotalSales')) animateNumber(document.getElementById('dashTotalSales'), totalSales);
}

function animateNumber(el, target) {
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current.toLocaleString();
  }, 20);
}

function formatDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== PRODUCTS =====
async function loadProducts() {
  const res = await apiGet('/products');
  if (res.success && res.data) products = res.data;
  renderProductsTable();
}

function renderProductsTable(filter = '') {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;
  let list = products;
  if (filter) list = products.filter(p => p.name.includes(filter) || p.category.includes(filter));
  if (!list.length) { tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-400">لا توجد منتجات</td></tr>'; return; }

  tbody.innerHTML = list.map(p => `
    <tr>
      <td>
        <div class="table-product">
          <img src="${p.image || 'https://placehold.co/100'}" alt="${p.name}" onerror="this.src='https://placehold.co/100'">
          <div class="table-product-info"><h4>${p.name}</h4><p>ID: #${String(p._id).slice(-4)}</p></div>
        </div>
      </td>
      <td>${p.category}</td>
      <td class="font-bold">${p.price} EGP</td>
      <td>${p.stock}</td>
      <td><span class="status-badge ${p.status === 'active' ? 'active' : 'inactive'}">${p.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
      <td><span class="rating-stars">${'★'.repeat(Math.floor(p.rating || 0))}${'☆'.repeat(5 - Math.floor(p.rating || 0))}</span> ${p.rating || 0}</td>
      <td>
        <button class="action-btn view" onclick="viewProduct('${p._id}')" title="عرض"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editProduct('${p._id}')" title="تعديل"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="promptDelete('product', '${p._id}')" title="حذف"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterProductsTable() { renderProductsTable(document.getElementById('productSearch')?.value || ''); }

function openProductModal() {
  document.getElementById('productModalTitle').textContent = 'إضافة منتج جديد';
  document.getElementById('productEditId').value = '';
  ['prodName','prodPrice','prodStock','prodCategory','prodDesc','prodImageUrl'].forEach(id => document.getElementById(id).value = '');
  removeImagePreview();
  openModal('productModal');
}

function viewProduct(id) {
  const p = products.find(x => x._id == id);
  if (!p) return;
  document.getElementById('productViewBody').innerHTML = `
    <div class="text-center mb-4"><img src="${p.image || 'https://placehold.co/150'}" alt="${p.name}" style="width:150px;height:150px;object-fit:cover;border-radius:16px;" onerror="this.src='https://placehold.co/150'"></div>
    <div class="space-y-3">
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">الاسم:</span><span class="font-bold">${p.name}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">التصنيف:</span><span class="font-bold">${p.category}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">السعر:</span><span class="font-bold text-primary-dark">${p.price} EGP</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">المخزون:</span><span class="font-bold">${p.stock}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">التقييم:</span><span class="font-bold">${p.rating || 0} ★</span></div>
      <div class="p-3 bg-gray-50 rounded-xl"><span class="text-gray-500 block mb-1">الوصف:</span><span>${p.description || '—'}</span></div>
    </div>
  `;
  openModal('productViewModal');
}

function editProduct(id) {
  const p = products.find(x => x._id == id);
  if (!p) return;
  document.getElementById('productModalTitle').textContent = 'تعديل المنتج';
  document.getElementById('productEditId').value = p._id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodDesc').value = p.description || '';

  // Show existing image
  if (p.image) {
    document.getElementById('imagePreview').src = p.image;
    document.getElementById('imagePreview').style.display = 'block';
    document.getElementById('imagePreviewArea').style.display = 'none';
    document.getElementById('removeImageBtn').style.display = 'inline-block';
    document.getElementById('prodImageUrl').value = p.image.startsWith('http') ? p.image : '';
  } else {
    removeImagePreview();
  }
  openModal('productModal');
}

async function saveProduct() {
  const id = document.getElementById('productEditId').value;
  const name = document.getElementById('prodName').value.trim();
  const price = parseFloat(document.getElementById('prodPrice').value);
  const stock = parseInt(document.getElementById('prodStock').value);
  const category = document.getElementById('prodCategory').value.trim();
  const description = document.getElementById('prodDesc').value.trim();
  const imageFile = document.getElementById('prodImageFile').files[0];
  const imageUrl = document.getElementById('prodImageUrl').value.trim();

  if (!name || !price || !stock || !category) {
    showToast('يرجى ملء جميع الحقول المطلوبة!', 'error');
    return;
  }

  // Build FormData for multipart upload
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('status', 'active');

  // If user selected a file, upload it. Otherwise use URL if provided
  if (imageFile) {
    formData.append('image', imageFile);
  } else if (imageUrl) {
    formData.append('image', imageUrl);
  }

  let res;
  if (id) {
    res = await apiPutForm('/products/' + id, formData);
    if (res.success) showToast('تم تعديل المنتج بنجاح!', 'success');
  } else {
    res = await apiPostForm('/products', formData);
    if (res.success) showToast('تم إضافة المنتج بنجاح!', 'success');
  }
  if (!res.success) showToast(res.message || res.error || 'حدث خطأ', 'error');

  closeModal('productModal');
  removeImagePreview();
  await loadProducts();
  updateDashboardStats();
}

// ===== ORDERS =====
async function loadOrders() {
  const res = await apiGet('/orders');
  if (res.success && res.data) orders = res.data;
  customers = extractCustomersFromOrders();
  renderOrdersTable();
}

function renderOrdersTable(filterText = '', statusFilter = 'all') {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  let list = orders;
  if (filterText) list = list.filter(o => (o.orderNumber || '').includes(filterText) || o.customer.name.includes(filterText) || o.customer.phone.includes(filterText));
  if (statusFilter !== 'all') list = list.filter(o => o.status === statusFilter);
  if (!list.length) { tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-400">لا توجد طلبات</td></tr>'; return; }

  tbody.innerHTML = list.map(o => `
    <tr>
      <td class="font-bold text-primary-dark">${o.orderNumber}</td>
      <td>${o.customer.name}</td>
      <td>${o.customer.phone}</td>
      <td>${o.items.map(i => i.productName + ' x' + i.quantity).join(', ')}</td>
      <td class="font-bold">${o.totalPrice} EGP</td>
      <td>${PAYMENT_LABELS[o.paymentMethod] || o.paymentMethod}</td>
      <td><span class="${STATUS_CONFIG[o.status]?.class || 'status-badge pending'}">${STATUS_CONFIG[o.status]?.label || o.status}</span></td>
      <td>${formatDate(o.createdAt || o.date)}</td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${o._id}')" title="عرض"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editOrder('${o._id}')" title="تعديل"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="promptDelete('order', '${o._id}')" title="حذف"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterOrdersTable() { renderOrdersTable(document.getElementById('orderSearch')?.value || '', document.getElementById('orderStatusFilter')?.value || 'all'); }

let currentViewOrderId = null;

function viewOrder(id) {
  const o = orders.find(x => x._id == id);
  if (!o) return;
  currentViewOrderId = id;
  const status = STATUS_CONFIG[o.status] || STATUS_CONFIG.pending;
  document.getElementById('viewOrderNumber').textContent = o.orderNumber;
  document.getElementById('orderViewBody').innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <span class="${status.class}" style="font-size:1rem;padding:8px 18px;">${status.icon} ${status.label}</span>
        <span class="text-gray-400">|</span>
        <span class="text-gray-500">${formatDate(o.createdAt || o.date)}</span>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-gray-50 rounded-xl">
          <h4 class="font-bold mb-3 text-primary-dark"><i class="fas fa-user ml-2"></i>بيانات العميل</h4>
          <div class="space-y-2 text-sm">
            <div><span class="text-gray-500">الاسم:</span> <span class="font-semibold">${o.customer.name}</span></div>
            <div><span class="text-gray-500">الهاتف:</span> <span class="font-semibold">${o.customer.phone}</span></div>
            <div><span class="text-gray-500">البريد:</span> <span class="font-semibold">${o.customer.email || '—'}</span></div>
            <div><span class="text-gray-500">العنوان:</span> <span class="font-semibold">${o.customer.address}</span></div>
          </div>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl">
          <h4 class="font-bold mb-3 text-primary-dark"><i class="fas fa-truck ml-2"></i>الشحن والدفع</h4>
          <div class="space-y-2 text-sm">
            <div><span class="text-gray-500">الدفع:</span> <span class="font-semibold">${PAYMENT_LABELS[o.paymentMethod] || o.paymentMethod}</span></div>
            <div><span class="text-gray-500">الشحن:</span> <span class="font-semibold">${SHIPPING_LABELS[o.shippingMethod] || o.shippingMethod}</span></div>
            <div><span class="text-gray-500">الطلب:</span> <span class="font-semibold">${o.orderNumber}</span></div>
          </div>
        </div>
      </div>
      <div class="p-4 bg-gray-50 rounded-xl">
        <h4 class="font-bold mb-3 text-primary-dark"><i class="fas fa-box ml-2"></i>المنتجات</h4>
        <div class="space-y-2">
          ${o.items.map((item, i) => `
            <div class="flex justify-between items-center p-3 bg-white rounded-lg">
              <span class="font-semibold">${i + 1}. ${item.productName} <span class="text-gray-400">x${item.quantity}</span></span>
              <span class="font-bold">${(item.price * item.quantity)} EGP</span>
            </div>
          `).join('')}
        </div>
        <div class="border-t mt-3 pt-3 flex justify-between items-center">
          <span class="font-bold text-lg">الإجمالي:</span>
          <span class="font-bold text-primary-dark text-xl">${o.totalPrice} EGP</span>
        </div>
      </div>
      ${o.notes ? `<div class="p-4 bg-yellow-50 rounded-xl border border-yellow-200"><h4 class="font-bold mb-1 text-yellow-700"><i class="fas fa-sticky-note ml-2"></i>ملاحظات</h4><p class="text-sm text-yellow-800">${o.notes}</p></div>` : ''}
    </div>
  `;
  openModal('orderViewModal');
}

function editOrder(id) {
  const o = orders.find(x => x._id == id);
  if (!o) return;
  currentViewOrderId = id;
  document.getElementById('editOrderId').value = o._id;
  document.getElementById('editOrderNumber').textContent = o.orderNumber;
  document.getElementById('editCustName').value = o.customer.name;
  document.getElementById('editCustPhone').value = o.customer.phone;
  document.getElementById('editCustEmail').value = o.customer.email || '';
  document.getElementById('editCustAddress').value = o.customer.address;
  document.getElementById('editPaymentMethod').value = o.paymentMethod;
  document.getElementById('editShippingMethod').value = o.shippingMethod;
  document.getElementById('editOrderStatus').value = o.status;
  document.getElementById('editOrderNotes').value = o.notes || '';
  document.getElementById('editOrderTotal').textContent = o.totalPrice + ' EGP';
  document.getElementById('editOrderItems').innerHTML = o.items.map((item, i) => `
    <div class="flex justify-between p-2 bg-white rounded-lg">
      <span>${i + 1}. ${item.productName} <span class="text-gray-400">x${item.quantity}</span> @ ${item.price} EGP</span>
      <span class="font-bold">${item.price * item.quantity} EGP</span>
    </div>
  `).join('');
  openModal('orderEditModal');
}

function openEditFromView() { closeModal('orderViewModal'); if (currentViewOrderId) editOrder(currentViewOrderId); }

async function saveOrderEdit() {
  const id = document.getElementById('editOrderId').value;
  const body = {
    customer: {
      name: document.getElementById('editCustName').value.trim(),
      phone: document.getElementById('editCustPhone').value.trim(),
      email: document.getElementById('editCustEmail').value.trim(),
      address: document.getElementById('editCustAddress').value.trim()
    },
    paymentMethod: document.getElementById('editPaymentMethod').value,
    shippingMethod: document.getElementById('editShippingMethod').value,
    status: document.getElementById('editOrderStatus').value,
    notes: document.getElementById('editOrderNotes').value.trim()
  };
  const res = await apiPutJSON('/orders/' + id, body); // JSON عشان customer object متداخل ومتبعتش صح مع URLSearchParams
  if (res.success) {
    showToast('تم تحديث الطلب بنجاح!', 'success');
    closeModal('orderEditModal');
    await loadOrders();
    renderDashboardOrders();
    updateDashboardStats();
  } else {
    showToast(res.message || 'حدث خطأ', 'error');
  }
}

// ===== CUSTOMERS =====
function loadCustomers() { customers = extractCustomersFromOrders(); renderCustomersTable(); }

function renderCustomersTable(filter = '') {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;
  let list = customers;
  if (filter) list = customers.filter(c => c.name.includes(filter) || c.phone.includes(filter));
  if (!list.length) { tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-400">لا يوجد عملاء</td></tr>'; return; }

  tbody.innerHTML = list.map(c => `
    <tr>
      <td><div class="table-product"><div class="user-avatar" style="width:40px;height:40px;border-radius:10px;">${c.name.charAt(0)}</div><div class="table-product-info"><h4>${c.name}</h4></div></div></td>
      <td>${c.email || '—'}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td>${c.orders}</td>
      <td class="font-bold">${c.total.toLocaleString()} EGP</td>
      <td>${c.date}</td>
      <td>
        <button class="action-btn view" onclick="viewCustomer('${c._id}')" title="عرض"><i class="fas fa-eye"></i></button>
        <button class="action-btn delete" onclick="promptDelete('customer', '${c._id}')" title="حذف"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterCustomersTable() { renderCustomersTable(document.getElementById('customerSearch')?.value || ''); }

function viewCustomer(id) {
  const c = customers.find(x => x._id == id);
  if (!c) return;
  document.getElementById('customerViewBody').innerHTML = `
    <div class="text-center mb-4"><div class="user-avatar mx-auto" style="width:80px;height:80px;font-size:2rem;">${c.name.charAt(0)}</div><h3 class="font-bold text-xl mt-3">${c.name}</h3></div>
    <div class="space-y-3">
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">البريد:</span><span class="font-bold">${c.email || '—'}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">الهاتف:</span><span class="font-bold">${c.phone}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">العنوان:</span><span class="font-bold">${c.address}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">الطلبات:</span><span class="font-bold">${c.orders}</span></div>
      <div class="flex justify-between p-3 bg-gray-50 rounded-xl"><span class="text-gray-500">المشتريات:</span><span class="font-bold text-primary-dark">${c.total.toLocaleString()} EGP</span></div>
    </div>
  `;
  openModal('customerViewModal');
}

// ===== GALLERY =====
async function loadGallery() {
  const res = await apiGet('/gallery');
  if (res.success && res.data) galleryItems = res.data;
  renderGalleryGrid();
}

function renderGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  if (!galleryItems.length) { grid.innerHTML = '<div class="col-span-full text-center py-10 text-gray-400">لا توجد صور</div>'; return; }
  grid.innerHTML = galleryItems.map(g => `
    <div class="gallery-item" style="position:relative;">
      <img src="${g.image || g.img}" alt="${g.title}" style="width:100%;height:220px;object-fit:cover;border-radius:16px;" onerror="this.src='https://placehold.co/400'">
      <div class="gallery-overlay" style="border-radius:16px;"><h4>${g.title}</h4><p>${g.desc || g.description} — ${g.category}</p></div>
      <div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;">
        <button class="action-btn edit" onclick="editGalleryItem('${g._id}')" title="تعديل" style="background:rgba(255,255,255,0.9);"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="promptDelete('gallery', '${g._id}')" title="حذف" style="background:rgba(255,255,255,0.9);"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openGalleryModal() {
  document.getElementById('galleryModalTitle').textContent = 'إضافة صورة للمعرض';
  document.getElementById('galleryEditId').value = '';
  ['galTitle','galDesc','galCategory','galImage'].forEach(id => document.getElementById(id).value = '');
  openModal('galleryModal');
}

function editGalleryItem(id) {
  const g = galleryItems.find(x => x._id == id);
  if (!g) return;
  document.getElementById('galleryModalTitle').textContent = 'تعديل صورة';
  document.getElementById('galleryEditId').value = g._id;
  document.getElementById('galTitle').value = g.title;
  document.getElementById('galDesc').value = g.desc || g.description || '';
  document.getElementById('galCategory').value = g.category;
  document.getElementById('galImage').value = g.image || g.img || '';
  openModal('galleryModal');
}

async function saveGalleryItem() {
  const id = document.getElementById('galleryEditId').value;
  const body = { title: document.getElementById('galTitle').value.trim(), description: document.getElementById('galDesc').value.trim(), category: document.getElementById('galCategory').value.trim(), image: document.getElementById('galImage').value.trim() };
  if (!body.title || !body.category) { showToast('يرجى ملء الحقول المطلوبة!', 'error'); return; }

  let res;
  if (id) { res = await apiPutForm('/gallery/' + id, new URLSearchParams(body)); if (res.success) showToast('تم تعديل الصورة!', 'success'); }
  else { res = await apiPostForm('/gallery', new URLSearchParams(body)); if (res.success) showToast('تم إضافة الصورة!', 'success'); }
  if (!res.success) showToast(res.message || 'حدث خطأ', 'error');

  closeModal('galleryModal');
  await loadGallery();
}

// ===== DELETE =====
let deleteTarget = { type: null, id: null };
function promptDelete(type, id) {
  deleteTarget = { type, id };
  const names = { product: 'المنتج', order: 'الطلب', customer: 'العميل', gallery: 'الصورة' };
  document.getElementById('deleteConfirmText').textContent = `سيتم حذف ${names[type]} نهائياً.`;
  openModal('deleteConfirmModal');
}

async function confirmDelete() {
  const { type, id } = deleteTarget;
  let res;
  if (type === 'product') {
    res = await apiDelete('/products/' + id);
    if (res.success) { products = products.filter(p => p._id != id); renderProductsTable(); }
  } else if (type === 'order') {
    res = await apiDelete('/orders/' + id);
    if (res.success) { orders = orders.filter(o => o._id != id); renderOrdersTable(); renderDashboardOrders(); }
  } else if (type === 'customer') {
    customers = customers.filter(c => c._id != id);
    renderCustomersTable();
    closeModal('deleteConfirmModal');
    showToast('تم الحذف من العرض فقط', 'success');
    return;
  } else if (type === 'gallery') {
    res = await apiDelete('/gallery/' + id);
    if (res.success) { galleryItems = galleryItems.filter(g => g._id != id); renderGalleryGrid(); }
  }
  updateDashboardStats();
  closeModal('deleteConfirmModal');
  showToast(res?.success ? 'تم الحذف بنجاح!' : (res?.message || 'حدث خطأ'), res?.success ? 'success' : 'error');
}

// ===== CHARTS =====
let salesChartInstance = null;
let ordersChartInstance = null;

const ARABIC_MONTHS = { 'يناير':0,'فبراير':1,'مارس':2,'أبريل':3,'مايو':4,'يونيو':5,'يوليو':6,'أغسطس':7,'سبتمبر':8,'أكتوبر':9,'نوفمبر':10,'ديسمبر':11 };

// بيقرأ التاريخ سواء جاي ISO من السيرفر أو نص عربي زي "23 أغسطس 2026"
function parseOrderDate(raw) {
  if (!raw) return null;
  let d = new Date(raw);
  if (!isNaN(d)) return d;
  const parts = String(raw).trim().split(' ');
  if (parts.length === 3 && ARABIC_MONTHS[parts[1]] !== undefined) {
    return new Date(parseInt(parts[2]), ARABIC_MONTHS[parts[1]], parseInt(parts[0]));
  }
  return null;
}

// بيحسب إجمالي المبيعات الحقيقي لكل شهر من آخر monthsCount شهر (بيستبعد الطلبات الملغية)
function calculateMonthlySales(monthsCount = 8) {
  const now = new Date();
  const monthNames = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const buckets = [];
  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ year: d.getFullYear(), month: d.getMonth(), label: monthNames[d.getMonth()], total: 0 });
  }
  orders.forEach(o => {
    if (o.status === 'cancelled') return;
    const d = parseOrderDate(o.createdAt || o.date);
    if (!d) return;
    const bucket = buckets.find(b => b.year === d.getFullYear() && b.month === d.getMonth());
    if (bucket) bucket.total += (o.totalPrice || 0);
  });
  return { labels: buckets.map(b => b.label), data: buckets.map(b => b.total) };
}

function initCharts() {
  const salesCtx = document.getElementById('salesChart');
  if (salesCtx) {
    if (salesChartInstance) salesChartInstance.destroy();
    const { labels: salesLabels, data: salesData } = calculateMonthlySales(8);
    salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: salesLabels,
        datasets: [{
          label: 'المبيعات (EGP)',
          data: salesData,
          borderColor: '#C8A2C8',
          backgroundColor: 'rgba(200, 162, 200, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#C8A2C8',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Cairo' } } },
          x: { grid: { display: false }, ticks: { font: { family: 'Cairo' } } }
        }
      }
    });
  }

  const ordersCtx = document.getElementById('ordersChart');
  if (ordersCtx) {
    if (ordersChartInstance) ordersChartInstance.destroy();
    const counts = { pending: orders.filter(o => o.status === 'pending').length, processing: orders.filter(o => o.status === 'processing').length, delivered: orders.filter(o => o.status === 'delivered').length, cancelled: orders.filter(o => o.status === 'cancelled').length };
    ordersChartInstance = new Chart(ordersCtx, {
      type: 'doughnut',
      data: { labels: ['قيد المراجعة', 'قيد المعالجة', 'تم التسليم', 'إلغاء'], datasets: [{ data: [counts.pending, counts.processing, counts.delivered, counts.cancelled], backgroundColor: ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { family: 'Cairo', size: 12 }, padding: 20, usePointStyle: true } } } }
    });
  }
}


// ===== SETTINGS API =====
async function loadSettings() {
  const res = await apiGet('/settings');
  if (res.success && res.data) {
    const settings = res.data;
    // Update WhatsApp number in all links
    if (settings.whatsapp_number) {
      document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.href = `https://wa.me/${settings.whatsapp_number}`;
      });
    }
    return settings;
  }
  return {};
}

async function saveSetting(key, value) {
  const res = await apiPutForm('/settings', new URLSearchParams({ key, value }));
  if (res.success) showToast('تم حفظ الإعداد!', 'success');
  else showToast(res.message || 'حدث خطأ', 'error');
  return res;
}


// ===== API CONFIG =====
function saveApiUrl() {
  const url = document.getElementById('apiUrlInput')?.value.trim();
  if (!url) { showToast('يرجى إدخال رابط السيرفر!', 'error'); return; }
  localStorage.setItem('classy_api_url', url);
  API_URL = url;
  showToast('تم حفظ رابط السيرفر! جاري إعادة التحميل...', 'success');
  setTimeout(() => location.reload(), 1000);
}

async function testApiConnection() {
  const resultDiv = document.getElementById('apiTestResult');
  if (!resultDiv) return;
  resultDiv.innerHTML = '<span class="text-blue-500">جاري الاختبار...</span>';
  try {
    const res = await fetch(getApiUrl().replace('/api', '') + '/api/health');
    const data = await res.json();
    if (data.success) {
      resultDiv.innerHTML = '<span class="text-green-500"><i class="fas fa-check-circle"></i> الاتصال ناجح! السيرفر يعمل.</span>';
    } else {
      resultDiv.innerHTML = '<span class="text-yellow-500">⚠️ السيرفر رد بس فيه مشكلة.</span>';
    }
  } catch (e) {
    resultDiv.innerHTML = '<span class="text-red-500"><i class="fas fa-times-circle"></i> فشل الاتصال. تأكد من الرابط.</span>';
  }
}

// ===== MANAGER NAME (sidebar display name) =====
function saveManagerName() {
  const input = document.getElementById('settingsManagerName');
  const name = input?.value.trim();
  if (!name) { showToast('يرجى إدخال اسم المدير!', 'error'); return; }

  localStorage.setItem('classy_manager_name', name);

  // تحديث الاسم كمان جوه بيانات المستخدم المحفوظة عشان يفضل متزامن
  const user = JSON.parse(localStorage.getItem('classy_admin_user') || '{}');
  user.name = name;
  localStorage.setItem('classy_admin_user', JSON.stringify(user));

  document.getElementById('sidebarName').textContent = name;
  document.getElementById('sidebarAvatar').textContent = name.charAt(0);

  showToast('تم تحديث اسم المدير بنجاح!', 'success');
}

async function saveAllSettings() {
  const settings = {
    store_name: document.getElementById('settingsStoreName')?.value || 'CLASSY',
    store_email: document.getElementById('settingsStoreEmail')?.value || '',
    store_phone: document.getElementById('settingsStorePhone')?.value || '',
    store_address: document.getElementById('settingsStoreAddress')?.value || '',
    whatsapp_number: document.getElementById('settingsWhatsapp')?.value || '201226832747',
    facebook_url: document.getElementById('settingsFacebook')?.value || '',
    instagram_url: document.getElementById('settingsInstagram')?.value || '',
    tiktok_url: document.getElementById('settingsTiktok')?.value || '',
    shipping_standard_cost: document.getElementById('settingsShippingStandardCost')?.value || '0',
    shipping_express_cost: document.getElementById('settingsShippingExpressCost')?.value || '50',
    shipping_standard_days: document.getElementById('settingsShippingStandardDays')?.value || '3',
    shipping_express_days: document.getElementById('settingsShippingExpressDays')?.value || '1',
  };

  const res = await apiPutForm('/settings/bulk', new URLSearchParams(settings));
  if (res.success) {
    showToast('تم حفظ جميع الإعدادات بنجاح!', 'success');
  } else {
    // Fallback: save to localStorage
    Object.entries(settings).forEach(([k, v]) => localStorage.setItem('classy_setting_' + k, v));
    showToast('تم حفظ الإعدادات محلياً (لا يوجد سيرفر)', 'success');
  }
}

async function loadSettingsToForm() {
  // تحميل اسم المدير الحالي في حقل الإعدادات لو موجود
  if (document.getElementById('settingsManagerName')) {
    const savedName = localStorage.getItem('classy_manager_name');
    const user = JSON.parse(localStorage.getItem('classy_admin_user') || '{}');
    document.getElementById('settingsManagerName').value = savedName || user.name || '';
  }

  const res = await apiGet('/settings');
  if (res.success && res.data) {
    const s = res.data;
    if (document.getElementById('settingsStoreName')) document.getElementById('settingsStoreName').value = s.store_name || '';
    if (document.getElementById('settingsStoreEmail')) document.getElementById('settingsStoreEmail').value = s.store_email || '';
    if (document.getElementById('settingsStorePhone')) document.getElementById('settingsStorePhone').value = s.store_phone || '';
    if (document.getElementById('settingsStoreAddress')) document.getElementById('settingsStoreAddress').value = s.store_address || '';
    if (document.getElementById('settingsWhatsapp')) document.getElementById('settingsWhatsapp').value = s.whatsapp_number || '201226832747';
    if (document.getElementById('settingsFacebook')) document.getElementById('settingsFacebook').value = s.facebook_url || '';
    if (document.getElementById('settingsInstagram')) document.getElementById('settingsInstagram').value = s.instagram_url || '';
    if (document.getElementById('settingsTiktok')) document.getElementById('settingsTiktok').value = s.tiktok_url || '';
    if (document.getElementById('settingsShippingStandardCost')) document.getElementById('settingsShippingStandardCost').value = s.shipping_standard_cost || '0';
    if (document.getElementById('settingsShippingExpressCost')) document.getElementById('settingsShippingExpressCost').value = s.shipping_express_cost || '50';
    if (document.getElementById('settingsShippingStandardDays')) document.getElementById('settingsShippingStandardDays').value = s.shipping_standard_days || '3';
    if (document.getElementById('settingsShippingExpressDays')) document.getElementById('settingsShippingExpressDays').value = s.shipping_express_days || '1';
  } else {
    // Load from localStorage fallback
    if (document.getElementById('settingsWhatsapp')) document.getElementById('settingsWhatsapp').value = localStorage.getItem('classy_setting_whatsapp_number') || '201226832747';
  }

  // Load API URL
  const savedApi = localStorage.getItem('classy_api_url');
  if (savedApi && document.getElementById('apiUrlInput')) {
    document.getElementById('apiUrlInput').value = savedApi;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() { loadAllData(); });

// Mobile sidebar (kept for compatibility if any button still calls this directly)
toggleMobileSidebar = function() { document.getElementById('sidebar').classList.toggle('open'); }
