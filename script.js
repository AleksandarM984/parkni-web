const modal = document.querySelector('#modal');
const title = document.querySelector('#modalTitle');
const planInput = document.querySelector('#planInput');
const form = document.querySelector('#leadForm');
const intro = document.querySelector('#modalIntro');
const success = document.querySelector('.success');
const successPlan = document.querySelector('#successPlan');

function selectPlan(card, btn) {
  document.querySelectorAll('.plan.selected').forEach(plan => {
    plan.classList.remove('selected');
  });
  card.classList.add('selected');

  title.textContent = `${btn.dataset.plan} · ${Number(btn.dataset.price).toLocaleString('sr-RS')} RSD`;
  planInput.value = btn.dataset.plan;
  successPlan.textContent = btn.dataset.plan;
  form.hidden = false;
  intro.hidden = false;
  success.hidden = true;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
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
  const data = Object.fromEntries(new FormData(form));
  data.plan = planInput.value;
  console.log('lead_submitted', data);
  form.hidden = true;
  intro.hidden = true;
  success.hidden = false;
});
