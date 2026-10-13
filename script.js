// ⚠️ استبدل هذه القيم بمفاتيحك الخاصة
const SUPABASE_URL = 'https://nedpatttdbkqiurkurzn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_toujZpj9ujYjzNryLsuUbQ_Ftpgc-qp';



// إنشاء الاتصال بـ Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// دالة لجلب المنتجات من قاعدة البيانات
async function loadProducts() {
  const container = document.getElementById('products-container');
  
  const { data: products, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('خطأ في جلب المنتجات:', error);
    container.innerHTML = '<p class="no-products">حدث خطأ في تحميل المنتجات</p>';
    return;
  }

  if (!products || products.length === 0) {
    container.innerHTML = '<p class="no-products">لا توجد منتجات حالياً</p>';
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description || 'لا يوجد وصف'}</p>
        <div class="product-price">${product.price} د.م</div>
        <button class="buy-btn">أضف إلى السلة</button>
      </div>
    </div>
  `).join('');
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadProducts);