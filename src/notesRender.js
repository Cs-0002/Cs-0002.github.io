function renderMeta(note) {
  return `
    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    <span class="date">${note.date}</span>
  `;
}

function getNoteUrl(note) {
  return `notes/${note.id}.html`;
}

function renderCard(note) {
  const url = getNoteUrl(note);
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.tags = note.tags.join(',');
  card.innerHTML = `
    <h3><a href="${url}">${note.title}</a></h3>
    <p>${note.description}</p>
    ${renderMeta(note)}
  `;
  return card;
}

const grid = document.querySelector('.card-grid');
if (grid) {
  notesData.forEach(note => {
    grid.appendChild(renderCard(note));
  });
}

function renderNoteDetail(id) {
  const current = notesData.find(n => n.id === id);
  const metaEl = document.querySelector('.meta');
  if (metaEl) {
    metaEl.innerHTML = renderMeta(current);
  }
}

const metaEl = document.querySelector('.meta');
if (metaEl) {
  const filename = window.location.pathname.split('/').pop();
  const id = filename.replace('.html', '');
  renderNoteDetail(id);
}

function renderWorkItem(note) {
  const url = getNoteUrl(note);
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}">${note.title}</a> - ${note.description}
  `;
  return li;
}
