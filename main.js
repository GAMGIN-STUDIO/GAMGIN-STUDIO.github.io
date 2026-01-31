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
	document.querySelector('.details').classList.toggle('dark');
	document.querySelector('.summary').classList.toggle('dark');
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
	for(const span of document.querySelectorAll('.details span')) {
		span.classList.add('word');
		span.style.animationDelay = `${randomNumber(0,1000)}ms`;
		span.style.transitionDelay = `${randomNumber(0, 1000)}ms`;
	}
};
transformDetails();

const summary = document.querySelector('.summary');
summary.addEventListener('click', () => {
	const details = document.querySelector('.details');
	summary.classList.add('opened');
	details.classList.add('opened');
});

const details = document.querySelector('.details');
details.addEventListener('click', () => {
		details.classList.add('closing');
		for(const span of document.querySelectorAll('.word')) {
			span.classList.add('close');
		}
		setTimeout(() => {
			details.classList.remove('opened');
			summary.classList.remove('opened');
			for(const span of document.querySelectorAll('.word')) {
				span.classList.remove('close');
				span.style.animationDelay = `${randomNumber(0, 1000)}ms`;
				span.style.transitionDelay = `${randomNumber(0, 1000)}ms`;
			}
			details.classList.remove('closing');
		}, 2000);
});