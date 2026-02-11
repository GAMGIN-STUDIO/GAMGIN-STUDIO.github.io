/* user agent detection cause of safari bugs elimination */
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.querySelector('body').classList.add("safari");
}

/* particles load */
window.onload = function () {
  Particles.init({
    selector: '.background',
	 maxParticles: 200,
	 sizeVariations: 3,
	 speed: 0.3,
	 color: '#800080', /* purple */
	 connectParticles: false,
	 responsive: null
  });
};


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