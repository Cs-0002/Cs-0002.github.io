function renderHeader(title) {
  const header = document.querySelector('header');
  header.innerHTML = `
    <img src="/images/アイコン.png" class="profile-image" alt="アイコン">
    <h1>${title}</h1>
    <nav>
      <a href="/">Index</a>
      <a href="/notes/">Notes</a>
      <a href="/gallery/">Gallery</a>
    </nav>
  `;
}
