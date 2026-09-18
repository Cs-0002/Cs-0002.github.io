function renderMeta(note) {
  return `
    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    <span class="date">${note.date}</span>
  `;
}

function getNoteUrl(note) {
  return `gallery/${note.id}/`;
}

function renderCard(note) {
  const url = getNoteUrl(note);
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.tags = note.tags.join(',');
  card.innerHTML = `
    <div style="width: 100%; aspect-ratio: 1; background-color: hsl(0 0% 12.5%); margin-bottom: 0.8rem;" >
    <img src="${note.image}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <h3><a href="${url}">${note.title}</a></h3>
    ${renderMeta(note)}
  `;
  return card;
}

const grid = document.querySelector('.card-grid');
if (grid) {
  galleryData.forEach(note => {
    grid.appendChild(renderCard(note));
  });
}


function renderGalleryItem(note) {
  const url = getNoteUrl(note);
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}">${note.title}</a> - ${note.description}
  `;
  return li;
}
