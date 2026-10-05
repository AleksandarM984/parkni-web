const modal = document.querySelector('#modal');
const title = document.querySelector('#modalTitle');
const planInput = document.querySelector('#planInput');
const form = document.querySelector('#leadForm');
const success = document.querySelector('.success');

function selectPlan(card, btn) {
  document.querySelectorAll('.plan.selected').forEach(plan => {
    plan.classList.remove('selected');
  });
  card.classList.add('selected');

  title.textContent = `${btn.dataset.plan} · ${Number(btn.dataset.price).toLocaleString('sr-RS')} RSD`;
  planInput.value = btn.dataset.plan;
  form.hidden = false;
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
  success.hidden = false;
});
