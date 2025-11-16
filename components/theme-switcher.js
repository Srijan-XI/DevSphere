/**
 * DevSphere Theme Switcher
 * Dark/Light mode with localStorage persistence
 */

class ThemeSwitcher {
	constructor() {
		this.themes = ['dark', 'light'];
		// Use the same storage key as app.js for consistency
		this.storageKey = 'il-devlangs-theme';
		this.currentTheme = localStorage.getItem(this.storageKey) || 'dark';
		
		this.init();
	}

	init() {
		// Announce that ThemeSwitcher manages theme so other scripts can defer
		window.devSphereThemeManager = 'theme-switcher';
		// Apply saved theme
		this.applyTheme(this.currentTheme);
		
		// Create toggle button
		this.createToggleButton();
		
		// Listen for system theme changes
		if (window.matchMedia) {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
				if (!localStorage.getItem('devSphereTheme')) {
					this.setTheme(e.matches ? 'dark' : 'light');
				}
			});
		}
	}

	createToggleButton() {
		// Reuse existing header button if present to avoid duplicates
		let button = document.getElementById('btn-theme');
		if (button) {
			button.innerHTML = this.getThemeIcon(this.currentTheme);
			button.setAttribute('aria-label', 'Toggle theme');
			button.addEventListener('click', () => this.toggleTheme());
			return;
		}

		// Otherwise, create our own minimal toggle
		button = document.createElement('button');
		button.id = 'theme-toggle';
		button.className = 'theme-toggle';
		button.setAttribute('aria-label', 'Toggle theme');
		button.innerHTML = this.getThemeIcon(this.currentTheme);
		button.addEventListener('click', () => this.toggleTheme());

		const header = document.querySelector('.brand') || document.querySelector('header');
		if (header) {
			header.appendChild(button);
		} else {
			document.body.appendChild(button);
			button.classList.add('floating');
		}
	}

	getThemeIcon(theme) {
		return theme === 'dark' 
			? '<span class="theme-icon">☀️</span><span class="theme-label">Light</span>'
			: '<span class="theme-icon">🌙</span><span class="theme-label">Dark</span>';
	}

	toggleTheme() {
		const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
		this.setTheme(newTheme);
	}

	setTheme(theme) {
		this.currentTheme = theme;
		this.applyTheme(theme);
		localStorage.setItem(this.storageKey, theme);
		
		// Update button icon
		const button = document.getElementById('btn-theme') || document.getElementById('theme-toggle');
		if (button) {
			button.innerHTML = this.getThemeIcon(theme);
		}
	}

	applyTheme(theme) {
		// Align with site CSS: toggle body.light to switch variable set
		document.body.classList.toggle('light', theme === 'light');
		// Optional: also set data-theme for future CSS
		document.documentElement.setAttribute('data-theme', theme);
	}
}

// Initialize theme switcher
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		new ThemeSwitcher();
	});
} else {
	new ThemeSwitcher();
}
