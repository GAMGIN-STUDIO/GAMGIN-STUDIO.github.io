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