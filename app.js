// Ürünleri localStorage'dan al
function getProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

// Ürünleri localStorage'a kaydet
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Ürün ekle
function addProduct(name, price, image, category) {
  const products = getProducts();
  const newProduct = {
    id: Date.now(),
    name: name,
    price: parseFloat(price),
    image: image,
    category: category
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

// Ürün sil
function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(product => product.id !== id);
  saveProducts(products);
}

// Ürün kartı HTML oluştur
function createProductCard(product, showDelete = false) {
  const categoryLabel = product.category === 'meyve' ? 'Meyve' : product.category === 'sebze' ? 'Sebze' : '';
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x300/e0e0e0/999999?text=Resim+Yok'">
        ${categoryLabel ? `<span class="product-category-badge">${categoryLabel}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price.toFixed(2)} TL</div>
        ${showDelete ? `<div class="product-actions"><button class="btn-delete" onclick="handleDelete(${product.id})">Sil</button></div>` : ''}
      </div>
    </div>
  `;
}

// URL parametrelerini al
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Kategoriye göre ürünleri göster
function showCategory(category) {
  const homeView = document.getElementById('home-view');
  const productsView = document.getElementById('products-view');
  const productsContainer = document.getElementById('products-container');
  const categoryTitle = document.getElementById('category-title');
  
  if (!homeView || !productsView || !productsContainer) return;
  
  // Görünümleri değiştir
  homeView.style.display = 'none';
  productsView.style.display = 'block';
  
  // Başlığı güncelle
  const categoryName = category === 'meyve' ? 'Meyveler' : 'Sebzeler';
  categoryTitle.textContent = categoryName;
  
  // Ürünleri filtrele ve göster
  const products = getProducts();
  const filteredProducts = products.filter(product => product.category === category);
  
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '<div class="empty-state"><p>Bu kategoride henüz ürün yok. Admin panelinden ürün ekleyebilirsiniz.</p></div>';
  } else {
    productsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
  }
}

// Ana sayfaya dön
function showHome() {
  const homeView = document.getElementById('home-view');
  const productsView = document.getElementById('products-view');
  
  if (homeView && productsView) {
    homeView.style.display = 'block';
    productsView.style.display = 'none';
  }
}

// Admin sayfasında ürünleri listele
function displayAdminProducts() {
  const container = document.getElementById('admin-products-container');
  if (!container) return;

  const products = getProducts();
  
  if (products.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Henüz ürün yok.</p></div>';
    return;
  }

  container.innerHTML = products.map(product => createProductCard(product, true)).join('');
}

// Ürün silme işlemi
function handleDelete(id) {
  if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
    const products = getProducts();
    const deletedProduct = products.find(p => p.id === id);
    const category = deletedProduct ? deletedProduct.category : null;
    
    deleteProduct(id);
    displayAdminProducts();
    
    // Ana sayfada ürün görünümündeyse ve aynı kategorideyse yenile
    const productsView = document.getElementById('products-view');
    if (productsView && productsView.style.display !== 'none' && category) {
      showCategory(category);
    }
  }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
  // Ana sayfa
  const homeView = document.getElementById('home-view');
  if (homeView) {
    // Kategori kartlarına tıklama event'i ekle
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', function() {
        const category = this.dataset.category;
        showCategory(category);
      });
    });
    
    // Geri butonuna tıklama event'i ekle
    const backButton = document.getElementById('back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        showHome();
      });
    }
  }

  // Admin sayfası
  if (document.getElementById('product-form')) {
    displayAdminProducts();
    
    // Form submit
    document.getElementById('product-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('product-name').value.trim();
      const price = document.getElementById('product-price').value;
      const image = document.getElementById('product-image').value.trim();
      const category = document.getElementById('product-category').value;
      
      if (name && price && image && category) {
        addProduct(name, price, image, category);
        
        // Formu temizle
        this.reset();
        
        // Ürünleri yeniden listele
        displayAdminProducts();
        
        // Başarı mesajı
        alert('Ürün başarıyla eklendi!');
      } else {
        alert('Lütfen tüm alanları doldurun!');
      }
    });
  }
});
