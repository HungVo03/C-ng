async function loadCampaign() {
  const hero = document.getElementById('campaignHero');
  const grid = document.getElementById('offerGrid');
  try {
    const response = await fetch('data/campaign.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const campaign = await response.json();

    document.title = `Cưng Tea | ${campaign.eyebrow || 'Ưu đãi hôm nay'}`;
    document.getElementById('topBar').textContent = campaign.eyebrow || '🥤 CƯNG TEA · LUNCH TIME';
    document.getElementById('offerTitle').textContent = campaign.offerTitle || '🎁 Ưu đãi hôm nay';
    document.getElementById('offerTime').textContent = campaign.offerTime || '';

    hero.innerHTML = `
      <div class="campaign-copy">
        <span class="ey">${escapeHtml(campaign.eyebrow || '')}</span>
        <h1>${escapeHtml(campaign.titleLine1 || '')}<br><span>${escapeHtml(campaign.titleLine2 || '')}</span></h1>
        <p>${escapeHtml(campaign.description || '')}</p>
        <a class="primary" href="menu.html">Xem menu →</a>
      </div>
      <div class="campaign-visual" aria-hidden="true">
        <div class="campaign-cup"></div>
        <div class="campaign-fruit">🍊 🍓 🍋</div>
      </div>`;

    grid.innerHTML = (campaign.offers || []).map(offer => `
      <article class="offer-card">
        <span class="offer-tag">${escapeHtml(offer.tag || 'CƯNG TEA')}</span>
        <h3>${escapeHtml(offer.title || '')}</h3>
        <p>${escapeHtml(offer.description || '')}</p>
        <div class="offer-bottom"><strong>${escapeHtml(offer.price || '')}</strong><a href="menu.html">Xem món →</a></div>
      </article>`).join('');
  } catch (error) {
    console.error('Không thể tải campaign.json:', error);
    hero.innerHTML = `
      <div class="campaign-copy">
        <span class="ey">🥤 CƯNG TEA</span>
        <h1>Hôm nay uống gì?<br><span>Chọn món Cưng nhé ❤️</span></h1>
        <p>Không thể tải chiến dịch. Vui lòng kiểm tra file data/campaign.json.</p>
        <a class="primary" href="menu.html">Xem menu →</a>
      </div>`;
    grid.innerHTML = '<div class="loading">Không thể tải ưu đãi.</div>';
  }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
loadCampaign();
