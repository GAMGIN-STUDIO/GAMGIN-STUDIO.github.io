/* redirect from 404 */
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
	sessionStorage.removeItem('redirect');
	const page = redirect.replace('/', '') || 'home';
	loadPage(page, false);
	history.replaceState({ page }, '', redirect);
} else {
	const initialPage = location.pathname.replace('/', '') || 'home';
	loadPage(initialPage, false);
	history.replaceState({ page: initialPage }, '', location.pathname);
}

/* user agent detection cause of safari bugs elimination */
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua);
const isSafari = /^((?!chrome|android|crios|fxios|edgios|opios).)*safari/i.test(ua);
if (isSafari) {
  document.querySelector('body').classList.add("safari");
}
if (isIOS) {
	document.querySelector('body').classList.add("iOS");
}

/* theme button */
const themeBut = document.querySelector('.theme');
themeBut.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	document.querySelector('.domain-header a').classList.toggle('dark');
	themeBut.classList.toggle('dark');
	document.querySelector('.accessibility').classList.toggle('dark');
	document.querySelector('article').classList.toggle('dark');
	document.querySelector('.summary').classList.toggle('dark');
	document.querySelector('.details').classList.toggle('dark');
	document.querySelector('footer').classList.toggle('dark');
	document.querySelector('main').classList.toggle('dark');
});