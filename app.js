async function load(url, target) {
	const response = await fetch(url); // path to the correct html file
	target.innerHTML = await response.text();

	checkPage(); // now the dynamic DOM exists
}

function loadPage(page) {
	load(`pages/${page}.html`, document.getElementById('app'));
}

// initial load
loadPage('home');

document.addEventListener('click', (e) => {
	if(e.target.matches('li[data-page]')) {
		loadPage(e.target.dataset.page);
	}
});

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

function checkPage() {
	const first = document.querySelector('.first') ?? undefined;
	const second = document.querySelector('.second') ?? undefined;
	if(first !== undefined && second !== undefined) {
		transformDetails();

		const summary = document.querySelector('.summary');
		const details = document.querySelector('.details');
		summary.addEventListener('click', () => {
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