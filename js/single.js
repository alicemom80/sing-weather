// 주제가 하나뿐인 앱: 묶음 고르기 화면(주제 화면)이 곧 홈이다. (split_by_theme.py 가 넣는다)
(function () {
  if (!A.THEMES || A.THEMES.length !== 1) return;
  const { el } = A;
  const theme = A.THEMES[0];
  const showTheme = A.themePage;
  A.home = () => A.themePage(theme);
  A.themePage = function (t) {
    showTheme(t);
    const page = document.querySelector('.themepage');
    if (!page) return;
    const back = page.querySelector('.topbar .btn.round');
    if (back) back.onclick = () => { try { speechSynthesis.cancel(); } catch (e) { /* 지원하지 않는 브라우저 */ } A.start(); };
    const gear = A.parent.button();
    gear.classList.add('pright');
    const book = el('button', 'btn bookbtn', `📒 <b>스티커북</b> <span>${A.stickers.total()} / ${A.stickers.all()}</span>`);
    book.onclick = () => A.stickers.book(A.home);
    page.append(gear, book, el('div', 'credit small', '<i class="igicon"></i>instagram <b>@alicemom80</b>'));
  };
})();
