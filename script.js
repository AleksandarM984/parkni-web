const modal = document.querySelector('#modal');
const title = document.querySelector('#modalTitle');
const planInput = document.querySelector('#planInput');
const form = document.querySelector('#leadForm');
const intro = document.querySelector('#modalIntro');
const success = document.querySelector('.success');
const successPlan = document.querySelector('#successPlan');

const PLAN_IDS = ['Basic', 'Standard', 'Premium'];
let selectedPlan = '';
let selectedPrice = NaN;
let interestEventSent = false;

function sendAnalyticsEvent(name, plan, price) {
  if (!window.parkniAnalyticsEnabled || typeof gtag !== 'function') return false;
  if (!PLAN_IDS.includes(plan) || !Number.isFinite(price) || price <= 0) return false;

  try {
    gtag('event', name, {
      plan: plan,
      price_rsd: price
    });
    return true;
  } catch (error) {
    return false;
  }
}

function selectPlan(card, btn) {
  document.querySelectorAll('.plan.selected').forEach(plan => {
    plan.classList.remove('selected');
  });
  card.classList.add('selected');

  selectedPlan = btn.dataset.plan;
  selectedPrice = Number(btn.dataset.price);

  title.textContent = `${selectedPlan} · ${selectedPrice.toLocaleString('sr-RS')} RSD`;
  planInput.value = selectedPlan;
  successPlan.textContent = selectedPlan;
  form.hidden = false;
  intro.hidden = false;
  success.hidden = true;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  sendAnalyticsEvent('plan_selected', selectedPlan, selectedPrice);
}

document.querySelectorAll('.plan').forEach(card => {
  card.addEventListener('click', () => {
    const btn = card.querySelector('[data-plan]');
    if (btn) selectPlan(card, btn);
  });
});

function close() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('.close').onclick = close;
modal.addEventListener('click', e => {
  if (e.target === modal) close();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) return;

  form.hidden = true;
  intro.hidden = true;
  success.hidden = false;

  if (interestEventSent) return;
  if (sendAnalyticsEvent('interest_submitted', selectedPlan, selectedPrice)) {
    interestEventSent = true;
  }
});
