// Popup functionality
(function() {
	const popup = document.getElementById('dev-popup');
	const closeBtn = document.getElementById('close-popup');
	const dontShowCheckbox = document.getElementById('dont-show-again');
	const storageKey = 'hide-dev-popup';

	// Defensive guard: if elements are missing (e.g., included on a page without the markup), exit early.
	if (!popup || !closeBtn || !dontShowCheckbox) {
		console.warn('[Dev Popup] Required elements not found. Popup script aborted.');
		return;
	}

	// Check if user has chosen to hide the popup
	const shouldHide = localStorage.getItem(storageKey);
	
	if (!shouldHide) {
		// Show popup after a short delay
		setTimeout(() => {
			popup.classList.add('show');
			console.log('[Dev Popup] Shown (no hide preference set).');
		}, 500);
	} else {
		console.log('[Dev Popup] Hidden due to stored preference.');
	}

	// Close popup handler
	function closePopup() {
		popup.classList.remove('show');
		
		// Save preference if checkbox is checked
		if (dontShowCheckbox.checked) {
			localStorage.setItem(storageKey, 'true');
		}
	}

	closeBtn.addEventListener('click', closePopup);
	
	// Close on overlay click
	popup.addEventListener('click', (e) => {
		if (e.target === popup) {
			closePopup();
		}
	});

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && popup.classList.contains('show')) {
			closePopup();
		}
	});
})();
