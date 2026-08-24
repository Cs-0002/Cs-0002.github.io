const grid = document.querySelector('.card-grid');
notesData.forEach(note => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.tags = note.tags.join(',');
  card.innerHTML = `
    <h3><a href="${note.url}">${note.title}</a></h3>
    <p>${note.description}</p>
    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    <span class="date">${note.date}</span>
  `;
  grid.appendChild(card);
});
