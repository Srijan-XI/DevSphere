/**
 * DevSphere Code Syntax Highlighter
 * Uses Highlight.js for syntax highlighting with theme support
 */

class CodeHighlighter {
	constructor(options = {}) {
		this.themes = {
			'vs-dark': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css',
			'monokai': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css',
			'github': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
			'dracula': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dracula.min.css',
			'nord': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/nord.min.css',
			'atom-one-dark': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css'
		};
		
		this.currentTheme = localStorage.getItem('devSphereCodeTheme') || 'vs-dark';
		
		this.init();
	}

	init() {
		// Load Highlight.js library
		this.loadHighlightJS().then(() => {
			// Load current theme
			this.loadTheme(this.currentTheme);
			
			// Highlight all code blocks
			this.highlightAll();
			
			// Add copy buttons
			this.addCopyButtons();
			
			// Create theme selector
			this.createThemeSelector();
		});
	}

	loadHighlightJS() {
		return new Promise((resolve, reject) => {
			// Check if already loaded
			if (window.hljs) {
				resolve();
				return;
			}
			
			const script = document.createElement('script');
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
			script.onload = () => {
				// Load common languages
				const languages = ['javascript', 'python', 'java', 'cpp', 'php', 'rust', 'go', 'typescript', 'sql', 'bash', 'json', 'xml', 'yaml'];
				Promise.all(languages.map(lang => this.loadLanguage(lang)))
					.then(() => resolve())
					.catch(reject);
			};
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	loadLanguage(lang) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${lang}.min.js`;
			script.onload = resolve;
			script.onerror = resolve; // Don't fail if language doesn't load
			document.head.appendChild(script);
		});
	}

	loadTheme(themeName) {
		// Remove existing theme
		const existing = document.getElementById('hljs-theme');
		if (existing) {
			existing.remove();
		}
		
		// Add new theme
		const link = document.createElement('link');
		link.id = 'hljs-theme';
		link.rel = 'stylesheet';
		link.href = this.themes[themeName] || this.themes['vs-dark'];
		document.head.appendChild(link);
		
		this.currentTheme = themeName;
		localStorage.setItem('devSphereCodeTheme', themeName);
	}

	highlightAll() {
		if (!window.hljs) return;
		
		// Find all code blocks
		document.querySelectorAll('pre code').forEach((block) => {
			// Auto-detect language or use data-language attribute
			const language = block.getAttribute('data-language') || 
			                block.className.replace('language-', '') || 
			                'plaintext';
			
			// Set language class
			block.className = `language-${language}`;
			
			// Highlight
			hljs.highlightElement(block);
		});
	}

	addCopyButtons() {
		document.querySelectorAll('pre code').forEach((block) => {
			const pre = block.parentElement;
			
			// Skip if button already exists
			if (pre.querySelector('.copy-button')) return;
			
			// Create wrapper
			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			pre.parentNode.insertBefore(wrapper, pre);
			wrapper.appendChild(pre);
			
			// Create copy button
			const button = document.createElement('button');
			button.className = 'copy-button';
			button.innerHTML = `
				<svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z"/>
					<path d="M2 6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2H6a3 3 0 0 1-3-3V6H2z"/>
				</svg>
				<svg class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/>
				</svg>
				<span class="copy-text">Copy</span>
			`;
			
			button.addEventListener('click', () => this.copyCode(block, button));
			
			wrapper.appendChild(button);
		});
	}

	copyCode(codeBlock, button) {
		const code = codeBlock.textContent;
		
		navigator.clipboard.writeText(code).then(() => {
			// Show success state
			button.classList.add('copied');
			
			// Reset after 2 seconds
			setTimeout(() => {
				button.classList.remove('copied');
			}, 2000);
		}).catch(err => {
			console.error('Failed to copy code:', err);
		});
	}

	createThemeSelector() {
		const selector = document.createElement('div');
		selector.className = 'code-theme-selector';
		selector.innerHTML = `
			<button class="theme-selector-button" aria-label="Select code theme">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2z"/>
					<path d="M5 5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 5 5z"/>
					<path d="M11 5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 11 5z"/>
				</svg>
				Code Theme
			</button>
			<div class="theme-selector-dropdown">
				${Object.keys(this.themes).map(theme => `
					<button class="theme-option ${theme === this.currentTheme ? 'active' : ''}" data-theme="${theme}">
						${this.formatThemeName(theme)}
					</button>
				`).join('')}
			</div>
		`;
		
		// Add to page
		const header = document.querySelector('.brand') || document.querySelector('header');
		if (header) {
			header.appendChild(selector);
		}
		
		// Toggle dropdown
		const toggleButton = selector.querySelector('.theme-selector-button');
		const dropdown = selector.querySelector('.theme-selector-dropdown');
		
		toggleButton.addEventListener('click', (e) => {
			e.stopPropagation();
			dropdown.classList.toggle('visible');
		});
		
		// Theme selection
		selector.querySelectorAll('.theme-option').forEach(option => {
			option.addEventListener('click', (e) => {
				const theme = e.target.dataset.theme;
				this.changeTheme(theme);
				dropdown.classList.remove('visible');
			});
		});
		
		// Close on outside click
		document.addEventListener('click', () => {
			dropdown.classList.remove('visible');
		});
	}

	changeTheme(themeName) {
		this.loadTheme(themeName);
		
		// Update active state
		document.querySelectorAll('.theme-option').forEach(option => {
			option.classList.toggle('active', option.dataset.theme === themeName);
		});
	}

	formatThemeName(name) {
		return name
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
}

// Initialize code highlighter
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		new CodeHighlighter();
	});
} else {
	new CodeHighlighter();
}
