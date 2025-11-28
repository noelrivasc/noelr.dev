/**
 * Mobile Menu Toggle for Header
 *
 * Accessibility features:
 * - Sets aria-expanded on toggle button to indicate menu state
 * - Traps focus within menu when open (Tab/Shift+Tab cycle through menu items only)
 * - Supports ESC key to close menu
 * - Restores focus to toggle button when menu closes
 * - Prevents body scroll when menu is open (optional, uncomment if desired)
 */

(function() {
	const menuToggle = document.getElementById('menu-toggle');
	const menuClose = document.getElementById('menu-close');
	const mobileMenu = document.getElementById('mobile-menu');
	const closeIcon = document.getElementById('close-icon');

	let focusableElements = [];
	let firstFocusable = null;
	let lastFocusable = null;

	/**
	 * Opens the mobile menu with fade-in transition
	 */
	function openMenu() {
		// Remove hidden class to show menu (still transparent)
		mobileMenu.classList.remove('hidden');

		// Force reflow to ensure transition works
		mobileMenu.offsetHeight;

		// Fade in
		mobileMenu.classList.add('opacity-100');

		// Toggle icons
		closeIcon.classList.remove('hidden');

		// Update ARIA
		menuToggle.setAttribute('aria-expanded', 'true');

		// Set up focus trap
		updateFocusableElements();
		if (firstFocusable) {
			firstFocusable.focus();
		}

		// Optional: Prevent body scroll
		// document.body.style.overflow = 'hidden';
	}

	/**
	 * Closes the mobile menu with fade-out transition
	 */
	function closeMenu() {
		// Fade out
		mobileMenu.classList.remove('opacity-100');

		// Hide after transition (200ms)
		setTimeout(() => {
			mobileMenu.classList.add('hidden');
		}, 200);

		// Toggle icons
		hamburgerIcon.classList.remove('hidden');
		closeIcon.classList.add('hidden');

		// Update ARIA
		menuToggle.setAttribute('aria-expanded', 'false');

		// Restore focus to toggle button
		menuToggle.focus();

		// Optional: Restore body scroll
		// document.body.style.overflow = '';
	}

	/**
	 * Updates the list of focusable elements within the menu
	 */
	function updateFocusableElements() {
		focusableElements = mobileMenu.querySelectorAll(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		firstFocusable = focusableElements[0];
		lastFocusable = focusableElements[focusableElements.length - 1];
	}

	/**
	 * Traps focus within the mobile menu
	 */
	function trapFocus(e) {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			// Shift + Tab
			if (document.activeElement === firstFocusable) {
				e.preventDefault();
				lastFocusable.focus();
			}
		} else {
			// Tab
			if (document.activeElement === lastFocusable) {
				e.preventDefault();
				firstFocusable.focus();
			}
		}
	}

	// Event listeners
	menuToggle.addEventListener('click', openMenu);
	menuClose.addEventListener('click', closeMenu);

	// ESC key to close menu
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
			closeMenu();
		}
	});

	// Focus trap when menu is open
	mobileMenu.addEventListener('keydown', trapFocus);
})();
