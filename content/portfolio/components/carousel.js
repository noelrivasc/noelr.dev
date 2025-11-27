// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
	const carousels = document.querySelectorAll('.carousel-container');

	carousels.forEach(carousel => {
		const track = carousel.querySelector('.carousel-track');
		const slides = carousel.querySelectorAll('.carousel-slide');
		const prevBtn = carousel.querySelector('.carousel-prev');
		const nextBtn = carousel.querySelector('.carousel-next');

		let currentIndex = 0;
		const totalSlides = slides.length;

		// Don't add arrows to an empty or single-image set
		if(!totalSlides || totalSlides == 1) {
			return;
		}

		prevBtn.classList.remove('hidden');
		nextBtn.classList.remove('hidden');

		function updateCarousel() {
			const slideWidth = slides[0].offsetWidth;
			const offset = -currentIndex * slideWidth;
			track.style.transform = `translateX(${offset}px)`;

			// Update button visibility
			prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
			prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
			nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.3' : '1';
			nextBtn.style.pointerEvents = currentIndex === totalSlides - 1 ? 'none' : 'auto';
		}

		prevBtn.addEventListener('click', () => {
		console.log(currentIndex);
			if (currentIndex > 0) {
				currentIndex--;
				updateCarousel();
			}
		});

		nextBtn.addEventListener('click', () => {
		console.log(currentIndex);
			if (currentIndex < totalSlides - 1) {
				currentIndex++;
				updateCarousel();
			}
		});

		updateCarousel();
	});
});
