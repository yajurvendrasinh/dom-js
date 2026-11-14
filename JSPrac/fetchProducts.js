const PRODUCTS_URL = 'https://dummyjson.com/products';

/**
 * Fetches product data with HTTP status validation.
 */
async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data.products) ? data.products : [];
}

/**
 * Pure helper function to construct an accessible product card.
 */
function createProductCard(product) {
  const figure = document.createElement('figure');
  figure.className = 'product-card';
  figure.dataset.productId = product.id;

  const img = document.createElement('img');
  img.src = product.images?.[0] || 'placeholder.png';
  img.alt = product.title || 'Product image';
  img.loading = 'lazy';
  img.decoding = 'async';

  const figcaption = document.createElement('figcaption');
  
  const title = document.createElement('h3');
  title.textContent = product.title;

  const brand = document.createElement('p');
  brand.textContent = product.brand ? `Brand: ${product.brand}` : '';

  figcaption.append(title, brand);
  figure.append(img, figcaption);

  return figure;
}

/**
 * Main controller handling UI states (Loading, Empty, Error, Success).
 */
async function renderProductGrid(container, url) {
  if (!container) return;

  // 1. Loading State (Accessible live region)
  container.setAttribute('aria-busy', 'true');
  container.textContent = 'Loading products...';

  try {
    const products = await fetchProducts(url);

    // 2. Empty State
    if (products.length === 0) {
      container.textContent = 'No products available.';
      return;
    }

    // 3. Success State (Batched DOM insertion)
    const fragment = document.createDocumentFragment();
    const cards = products.map(createProductCard);
    fragment.append(...cards);

    container.replaceChildren(fragment);
  } catch (error) {
    // 4. Error State
    console.error('Failed to render product grid:', error);
    container.textContent = 'Unable to load products. Please try again later.';
  } finally {
    container.removeAttribute('aria-busy');
  }
}

const container = document.getElementById('domB');
renderProductGrid(container, PRODUCTS_URL);
