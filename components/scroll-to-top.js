/**
 * DevSphere Scroll-to-Top Button
 * Smooth scroll with visibility based on scroll position
 */

class ScrollToTop {
	constructor(options = {}) {
		this.showAfter = options.showAfter || 300;
		this.button = null;
		
		this.init();
	}

	init() {
		// Create button
		this.createButton();
		
		// Add scroll listener
		window.addEventListener('scroll', () => this.handleScroll());
		
		// Add click listener
		this.button.addEventListener('click', () => this.scrollToTop());
	}

	createButton() {
		this.button = document.createElement('button');
		this.button.id = 'scroll-to-top';
		this.button.className = 'scroll-to-top';
		this.button.setAttribute('aria-label', 'Scroll to top');
		this.button.innerHTML = `
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 15l-6-6-6 6"/>
			</svg>
		`;
		
		document.body.appendChild(this.button);
	}

	handleScroll() {
		if (window.scrollY > this.showAfter) {
			this.button.classList.add('visible');
		} else {
			this.button.classList.remove('visible');
		}
	}

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}

// Initialize scroll-to-top
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		new ScrollToTop();
	});
} else {
	new ScrollToTop();
}
