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

// main app funcitons
async function load(url, target) {
	const response = await fetch(url); // path to the correct html file
	target.innerHTML = await response.text();
	// now the dynamic DOM exists
	detailsTransformFunc(); // Transform details content for animation effect
	await projectsHeaderFunc(url); // Add browser header onto projects cards
	contactFormProcessingFunc(url); // Handles contact form processing
	// initial cookie managment
	initialThemeSet();
}
function loadPage(page) {
	load(`pages/${page}.html`, document.getElementById('app'));
}

// initial load
loadPage('projects');

// click managment
document.addEventListener('click', (e) => {

	// navigation managment
	if(e.target.matches('a[data-page]')) {
		e.preventDefault();
		loadPage(e.target.dataset.page);
		e.target.classList.add('mobile-hover');
		setTimeout(()=> {
			e.target.classList.remove('mobile-hover');
		}, 200);
	}

	// theme managment
	if(e.target.matches('.theme[data-theme]')) {
		const theme = getCookie('gamgin-theme');
		if(theme === 'dark') {
			setWhiteTheme();
			document.cookie = "gamgin-theme=white; path=/; max-age=604800"; // expires in 7 days
		}else{
			setDarkTheme();
			document.cookie = "gamgin-theme=dark; path=/; max-age=604800"; // expires in 7 days
		}
	}

	// github and youtube managment
	if(e.target.matches('a[data-promo]')) {
		e.target.classList.add('mobile-hover');
		setTimeout(()=> {
			e.target.classList.remove('mobile-hover');
		}, 200);
	}

	// card project managment
	const card = e.target.closest('a.card-project');
	if(card) {
		const hasHover = window.matchMedia("(hover: hover)").matches;
		if(!hasHover) {
			if(!card.classList.contains('mobile-hover')) {
				e.preventDefault();
				card.classList.add('mobile-hover');
			}else{
				if(card.classList.contains('used')){
					e.preventDefault();
					card.classList.remove('mobile-hover');
					card.classList.remove('used');
				}else{
					card.classList.add('used');
				}
			}
		}
	}else{
		return;
	}
});


// other functions
function randomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	if (min > max) return null;
	return Math.floor(Math.random() * (max - min  + 1)) + min;
}

function transformDetails() {
	const detailsContent = document.querySelector('.details').children; // convert HTMLCollection to array
	for(const [key,item] of Object.entries(detailsContent)) {
		const wordsArray = item.textContent.split(' ');
		const spanArray = wordsArray.map(word => `<span>${word}</span>`);
		item.innerHTML = spanArray.join(' ');
		document.querySelector('.details').children[key].innerHTML = item.innerHTML;
	}
	for(const span of document.querySelectorAll('.details p span')) {
		span.style.animationDelay = `${randomNumber(0,1000)}ms`;
	}
};

function detailsTransformFunc() {
	const first = document.querySelector('.first') ?? undefined; // that is teoretically no needed
	const second = document.querySelector('.second') ?? undefined;
	if(first !== undefined && second !== undefined) {
		transformDetails();
		const summary = document.querySelector('.summary');
		const summaryLink = document.getElementById('summary');
		const details = document.querySelector('.details');
		summaryLink.addEventListener('click', (e) => {
			e.preventDefault();
			summary.classList.add('opened');
			details.classList.add('opened');
			for(const span of document.querySelectorAll('.details p span')) {
				span.classList.remove('close');
				span.classList.add('word');
			};	
		});
		details.addEventListener('click', () => {
				summary.classList.remove('opened');
				details.classList.remove('opened');
				for(const span of document.querySelectorAll('.word')) {
					span.classList.add('close');
					span.style.animationDelay = `${randomNumber(0, 1000)}ms`;
				}
		});
	}
}

async function projectsHeaderFunc(url) {
	if(url === 'pages/projects.html'){
		const browserTemplates = document.querySelectorAll('#browser-header') ?? undefined;
		if (browserTemplates !== undefined){
			const response = await fetch('browser-template/browser-header.html');
			readyResToHTML = await response.text();
			for(const browserTemplate of browserTemplates){
 				browserTemplate.innerHTML = readyResToHTML;
			}
		}
	}
}

function contactFormProcessingFunc(url) {
	if(url === 'pages/contact.html'){
		const formI = document.getElementById('form-I');
		const formILang = document.getElementById('form-I-lang');
		const formIBut = document.getElementById('form-I-but');
		
		// initial name regards managment
		nameRegardsFunc();

		// language managment
		formILang.addEventListener('click', () => {
			// mobile hover managment
			formILang.classList.add('mobile-hover');
			setTimeout(() => {
				formILang.classList.remove('mobile-hover');
			}, 200);
			// lang managment
			if(formI.dataset.lang === 'cs'){

				// dataset managment
				formI.dataset.lang = 'en';

				// lang form managment
				formILang.innerText = 'cs';
				formIBut.innerText = 'Send e-mail';
				changeLangToEn();

			}else{

				// dataset managment
				formI.dataset.lang = 'cs';		

				// lang form managment
				formILang.innerText = 'en';
				formIBut.innerText = 'Odeslat e-mail';	
				changeLangToCs();

			}
		});

		// form validation
		formI.addEventListener("input", (e) => {

			// validity managment
			if(formI.checkValidity()){
				formIBut.classList.add('active');
			}else{
				formIBut.classList.remove('active');
			};

			// name regards managment
			if(e.target.matches('input[name="full-name"]')){
				nameRegardsFunc();
			}
		});

		// form button processing
		formIBut.addEventListener('click', (e) => {
			// mobile hover managment
			formIBut.classList.add('mobile-hover');
			setTimeout(() => {
				formIBut.classList.remove('mobile-hover');
			}, 200);
			// email managment			
			if(formI.checkValidity()){
				e.preventDefault();
				// parameters
				const salutation = encodeURIComponent(document.querySelector('select[name="salutation"]').value);
				const subject = encodeURIComponent(document.querySelector('input[name="subject"]').value);
				const hello = encodeURIComponent(document.querySelector('.hello').innerText);
				const message = encodeURIComponent(document.querySelector('textarea[name="message"]').value);
				const regards = encodeURIComponent(document.querySelector('.regards').innerText);
				const response = encodeURIComponent(document.querySelector('select[name="response"]').value);
				const br = encodeURIComponent('\n');
				// email href
				window.location.href = `mailto:info@gamgin.net?subject=${subject}&body=${hello}${br+br}${message}${br+br}${regards}${br+br+br+br}[salutation=${salutation}]${br}[response=${response}]`;
			}
		});
	}
}

function changeLangToCs(){
	const salutation = document.querySelector('select[name="salutation"]');
	const fullNameInput = document.querySelector('input[name="full-name"]');
	const subjectInput = document.querySelector('input[name="subject"]');
	const hello = document.querySelector('.hello');
	const labelMessage = document.querySelector('label#message');
	const textarea = document.querySelector('textarea[name="message"]');
	const response = document.querySelector('select[name="response"]');
	const ppContent = document.getElementById('pp-content');

	for(const child of salutation.children){
		if(child.value === '') child.innerText = 'OSLOVENÍ';
		if(child.value === 'mr') child.innerText = 'Pan';
		if(child.value === 'mrs') child.innerText = 'Paní';
		if(child.value === 'other') child.innerText = 'Jiné';	
	}

	fullNameInput.placeholder = 'CELÉ JMÉNO';
	subjectInput.placeholder = 'PŘEDMĚT';
	hello.innerText = 'Dobrý den,';
	labelMessage.innerText = 'Zpráva:';
	textarea.placeholder = 'potřebuji se zeptat..';
	nameRegardsFunc();

	for(const child of response.children){
		if(child.value === '') child.innerText = 'Forma odpovědi';
		if(child.value === 'phone') child.innerText = 'Telefon';
		if(child.value === 'email') child.innerText = 'E-mail';
	}

	ppContent.innerHTML = 'Souhlasím se&nbsp;zpracováním svých osobních údajů za&nbsp;účelem zodpovězení mé&nbsp;poptávky,  v&nbsp;souladu s&nbsp;zásadami ochrany osobních údajů na&nbsp;těchto webových stránkách.';
}

function changeLangToEn(){
	const salutation = document.querySelector('select[name="salutation"]');
	const fullNameInput = document.querySelector('input[name="full-name"]');
	const subjectInput = document.querySelector('input[name="subject"]');
	const hello = document.querySelector('.hello');
	const labelMessage = document.querySelector('label#message');
	const textarea = document.querySelector('textarea[name="message"]');
	const response = document.querySelector('select[name="response"]');
	const ppContent = document.getElementById('pp-content');

	for(const child of salutation.children){
		if(child.value === '') child.innerText = 'SALUTATION';
		if(child.value === 'mr') child.innerText = 'Mr';
		if(child.value === 'mrs') child.innerText = 'Mrs';
		if(child.value === 'other') child.innerText = 'Other';	
	}

	fullNameInput.placeholder = 'FULL NAME';
	subjectInput.placeholder = 'SUBJECT';
	hello.innerText = 'Hello,';
	labelMessage.innerText = 'Message:';
	textarea.placeholder = 'I want to ask you about..';
	nameRegardsFunc();

	for(const child of response.children){
		if(child.value === '') child.innerText = 'Contact method';
		if(child.value === 'phone') child.innerText = 'Phone';
		if(child.value === 'email') child.innerText = 'E-mail';
	}

	ppContent.innerHTML = 'I agree to&nbsp;the&nbsp;processing of&nbsp;my personal data for&nbsp;the&nbsp;purpose of&nbsp;responding to&nbsp;my inquiry, in&nbsp;accordance with&nbsp;the&nbsp;Privacy Policy of&nbsp;this website.';
}

function nameRegardsFunc() {
	const formI = document.getElementById('form-I');
	const fullNameInput = document.querySelector('input[name="full-name"]');
	let name = fullNameInput.value;
	const regards = document.querySelector('.regards');
	if(formI.dataset.lang === 'cs'){
		if(name === '') name = 'Jméno Příjmení';
		regards.innerHTML = `S pozdravem,<br>${name}`;
	}else{
		if(name === '') name = 'Name Surname'
		regards.innerHTML = `Best regards,<br>${name}`;
	}
}

function getCookie(name){
	const cookies = document.cookie.split('; ');
	const cookie = cookies.find(() => `${name}=`).replace(`${name}=`, '')
	return cookie;
}

function initialThemeSet(){
	const theme  = getCookie('gamgin-theme');
	if(!theme){
		document.cookie = "gamgin-theme=white; path=/; max-age=604800"; // expires in 7 days
	}else{
		if(theme === "dark"){
			setDarkTheme();
		}
	}
}

function setDarkTheme() {
	document.body.classList.add('dark');
}

function setWhiteTheme() {
	document.body.classList.remove('dark');
}