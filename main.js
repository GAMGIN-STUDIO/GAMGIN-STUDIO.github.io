window.onload = function () {
  Particles.init({
    selector: '.background',
	 maxParticles: 200,
	 sizeVariations: 3,
	 speed: 0.4,
	 color: '#800080', /* purple */
	 connectParticles: false,
	 responsive: null
  });
};

const themeBut = document.querySelector('.theme');
themeBut.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	document.querySelector('.domain-header a').classList.toggle('dark');
	themeBut.classList.toggle('dark');
	document.querySelector('.accessibility').classList.toggle('dark');
	document.querySelector('article').classList.toggle('dark');
	document.querySelector('.summary').classList.toggle('dark');
	document.querySelector('.details').classList.toggle('dark');
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