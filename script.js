const filters = [
  { id: 'typeSelect', label: 'Tipo' },
  { id: 'stateSelect', label: 'Estado' },
  { id: 'labelSelect', label: 'Rótulo' },
  { id: 'assigneeSelect', label: 'Responsável' }
];

const chipsContainer = document.querySelector('#chips');
const queryPreview = document.querySelector('#queryPreview');
const copyButton = document.querySelector('#copyButton');
const results = document.querySelector('#results');

const fakeIssues = [
  { title: 'Erro ao salvar formulário com anexo', label: 'bug', state: 'Aberto', user: '@me' },
  { title: 'Botão de exportar não aparece no mobile', label: 'bug', state: 'Aberto', user: '@me' },
  { title: 'Melhorar texto de ajuda na tela de busca', label: 'documentation', state: 'Aberto', user: 'Octocat' }
];

let order = filters.map(filter => filter.id);

function getFilterData(id) {
  const select = document.querySelector(`#${id}`);
  const selectedText = select.options[select.selectedIndex].textContent;
  const filter = filters.find(item => item.id === id);

  return {
    id,
    label: filter.label,
    text: selectedText,
    value: select.value
  };
}

function render() {
  chipsContainer.innerHTML = '';

  order.map(getFilterData).forEach(item => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.draggable = true;
    chip.dataset.id = item.id;
    chip.innerHTML = `<strong>${item.text}</strong><span>${item.label}</span>`;
    chipsContainer.appendChild(chip);
  });

  const query = order.map(id => getFilterData(id).value).join(' ') + ' sort:updated-desc';
  queryPreview.textContent = query;
  renderResults();
}

function renderResults() {
  results.innerHTML = '';

  fakeIssues.forEach(issue => {
    const card = document.createElement('article');
    card.className = 'result-card';
    card.innerHTML = `
      <strong>${issue.title}</strong>
      <div class="result-meta">${issue.state} · ${issue.label} · responsável ${issue.user}</div>
    `;
    results.appendChild(card);
  });
}

filters.forEach(filter => {
  document.querySelector(`#${filter.id}`).addEventListener('change', render);
});

chipsContainer.addEventListener('dragstart', event => {
  const chip = event.target.closest('.chip');
  if (!chip) return;
  chip.classList.add('dragging');
  event.dataTransfer.setData('text/plain', chip.dataset.id);
});

chipsContainer.addEventListener('dragend', event => {
  const chip = event.target.closest('.chip');
  if (chip) chip.classList.remove('dragging');
});

chipsContainer.addEventListener('dragover', event => {
  event.preventDefault();
  const draggingId = document.querySelector('.dragging')?.dataset.id;
  const target = event.target.closest('.chip');

  if (!draggingId || !target || target.dataset.id === draggingId) return;

  const targetId = target.dataset.id;
  const draggingIndex = order.indexOf(draggingId);
  const targetIndex = order.indexOf(targetId);

  order.splice(draggingIndex, 1);
  order.splice(targetIndex, 0, draggingId);
  render();

  const newDragging = [...document.querySelectorAll('.chip')].find(chip => chip.dataset.id === draggingId);
  if (newDragging) newDragging.classList.add('dragging');
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(queryPreview.textContent);
    copyButton.textContent = 'Copiado';
    setTimeout(() => (copyButton.textContent = 'Copiar consulta'), 1200);
  } catch (error) {
    copyButton.textContent = 'Copie manualmente';
  }
});

render();
