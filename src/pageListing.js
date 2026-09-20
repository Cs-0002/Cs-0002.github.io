function renderMeta(note) {
  return `
  ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    <span class="date">${note.date}</span>
    `;
}

function getNoteUrl(note, type) {
  if (type === "notes") return `/notes/${note.id}/`;
  if (type === "gallery") return `/gallery/${note.id}/`;
}

function renderCard(note, type) {
  const url = getNoteUrl(note, type);
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.tags = note.tags.join(',');
  card.innerHTML = `
  ${note.image ? `
      <div style="width: 100%; aspect-ratio: 1; background-color: hsl(0 0% 12.5%); margin-bottom: 0.8rem;" >
      <img src="${note.image}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      ` : ''}
    <h3><a href="${url}">${note.title}</a></h3>
    ${note.description ? `<p>${note.description}</p>` : ''}
    ${renderMeta(note)}
  `;
  return card;
}

function renderList(data, type) {
  const grid = document.querySelector('.card-grid');
  if (grid) {
    data.forEach(note => {
      grid.appendChild(renderCard(note, type));
    });
  }
}

function renderListItem(note, type) {
  const url = getNoteUrl(note, type);
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}">${note.title}</a> - ${note.description ? note.description : ''} 
  `;
  return li;
}

//notesのみに影響
const metaEl = document.querySelector('.meta');
if (metaEl) {
  const filename = window.location.pathname.split('/').pop();
  const id = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const current = notesData.find(n => n.id === id);
  metaEl.innerHTML = renderMeta(current)
}

