const state = { menu: null, category: 'all', keyword: '' };

const money = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';

function categoryIcon(category) {
  const icons = {
    'tra-sua': '🧋',
    'kem-cheese': '🧀',
    'tra-tuoi': '🍊',
    'kem-trung': '🥚',
    'sua-chua': '🥛',
    'sua-tuoi': '🥛',
    'milo-dam': '🍫',
    'topping': '➕'
  };
  return icons[category] || '🥤';
}

function priceHtml(item) {
  if (item.unitPrice) {
    return `<div class="card-price">${money(item.unitPrice)} <small>/ phần</small></div>`;
  }
  return `<div class="card-prices">
    <div><span>M</span><strong>${money(item.prices.M)}</strong></div>
    <div><span>L</span><strong>${money(item.prices.L)}</strong></div>
  </div>`;
}

function cardHtml(item) {
  return `<article class="menu-card">
    <div class="card-visual ${item.category}">
      <span class="card-icon">${categoryIcon(item.category)}</span>
      ${item.bestSeller ? '<span class="best-badge">⭐ BEST SELLER</span>' : ''}
    </div>
    <div class="menu-card-body">
      <div class="card-id">${item.id}</div>
      <h3>${item.name}</h3>
      ${priceHtml(item)}
    </div>
  </article>`;
}

function renderFilters() {
  const el = document.getElementById('categoryFilters');
  el.innerHTML = [
    `<button class="filter active" data-category="all">Tất cả</button>`,
    ...state.menu.categories.map(c => `<button class="filter" data-category="${c.id}">${categoryIcon(c.id)} ${c.name}</button>`)
  ].join('');

  el.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      state.category = button.dataset.category;
      el.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      renderSections();
    });
  });
}

function renderSections() {
  const root = document.getElementById('sections');
  const keyword = state.keyword.toLowerCase();
  const categories = state.menu.categories.filter(c => state.category === 'all' || c.id === state.category);

  let html = '';
  let totalVisible = 0;

  categories.forEach(category => {
    const items = state.menu.items.filter(item =>
      item.category === category.id &&
      (!keyword || item.name.toLowerCase().includes(keyword))
    );

    if (!items.length) return;
    totalVisible += items.length;

    html += `<section class="menu-section" id="${category.id}">
      <div class="title">
        <div><h2>${categoryIcon(category.id)} ${category.name}</h2><p>${items.length} món</p></div>
      </div>
      <div class="menu-grid">${items.map(cardHtml).join('')}</div>
    </section>`;
  });

  root.innerHTML = totalVisible ? html : '<div class="empty">Không tìm thấy món phù hợp.</div>';
}

async function initMenu() {
  try {
    const response = await fetch('data/menu.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Không thể tải menu.');
    state.menu = await response.json();
    renderFilters();
    renderSections();
  } catch (error) {
    document.getElementById('sections').innerHTML = '<div class="error">Không thể tải dữ liệu menu. Hãy kiểm tra file <strong>data/menu.json</strong>.</div>';
    console.error(error);
  }
}

document.getElementById('search').addEventListener('input', event => {
  state.keyword = event.target.value.trim();
  if (state.menu) renderSections();
});

initMenu();
