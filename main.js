window.onload = function() {
  Particles.init({
    selector: '.background',
	 maxParticles: 120,
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
	document.querySelector('details').classList.toggle('dark');
	
});