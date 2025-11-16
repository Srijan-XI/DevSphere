/**
 * DevSphere Search Functionality
 * Real-time search across documentation and resources
 */

class SearchEngine {
	constructor(options = {}) {
		this.searchInput = options.input || document.getElementById('search-input');
		this.searchResults = options.results || document.getElementById('search-results');
		this.minChars = options.minChars || 2;
		this.debounceDelay = options.debounceDelay || 300;
		
		this.searchIndex = [];
		this.debounceTimer = null;
		
		if (this.searchInput) {
			this.init();
		}
	}

	init() {
		// Build search index
		this.buildSearchIndex();
		
		// Add event listeners
		this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
		this.searchInput.addEventListener('focus', () => this.showResults());
		
		// Close results when clicking outside
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.search-container')) {
				this.hideResults();
			}
		});
		
		// Keyboard navigation
		this.searchInput.addEventListener('keydown', (e) => this.handleKeyboard(e));
	}

	buildSearchIndex() {
		// Get data from app.js if available
		if (typeof languages !== 'undefined') {
			languages.forEach(lang => {
				this.searchIndex.push({
					title: lang.name,
					type: 'Language',
					url: `pages/Languages/${lang.folder}/intro.html`,
					keywords: [lang.name.toLowerCase(), 'programming', 'language']
				});
			});
		}
		
		if (typeof frameworks !== 'undefined') {
			frameworks.forEach(fw => {
				this.searchIndex.push({
					title: fw.name,
					type: 'Framework',
					url: `pages/${fw.intro}`,
					keywords: [fw.name.toLowerCase(), 'framework']
				});
			});
		}
		
		if (typeof databases !== 'undefined') {
			databases.forEach(db => {
				this.searchIndex.push({
					title: db.name,
					type: 'Database',
					url: `pages/${db.intro}`,
					keywords: [db.name.toLowerCase(), 'database']
				});
			});
		}
		
		if (typeof tools !== 'undefined') {
			tools.forEach(tool => {
				this.searchIndex.push({
					title: tool.name,
					type: 'DevOps Tool',
					url: `pages/${tool.intro}`,
					keywords: [tool.name.toLowerCase(), 'devops', 'tool']
				});
			});
		}
		
		if (typeof testingTools !== 'undefined') {
			testingTools.forEach(test => {
				this.searchIndex.push({
					title: test.name,
					type: 'Testing',
					url: `pages/${test.intro}`,
					keywords: [test.name.toLowerCase(), 'testing']
				});
			});
		}
		
		// Add static pages
		const staticPages = [
			{ title: 'Documentation', type: 'Guide', url: 'docpages/documentation.html', keywords: ['docs', 'documentation', 'guide'] },
			{ title: 'FAQ', type: 'Guide', url: 'docpages/FAQ.html', keywords: ['faq', 'help', 'questions'] },
			{ title: 'Quick Start', type: 'Guide', url: 'docpages/quickstart.html', keywords: ['quickstart', 'getting started', 'tutorial'] },
			{ title: 'Resources', type: 'Guide', url: 'pages/Resources/Resources.html', keywords: ['resources', 'learning', 'materials'] },
			{ title: 'Changelog', type: 'Info', url: 'pages/changelog.html', keywords: ['changelog', 'updates', 'history'] },
			{ title: 'About', type: 'Info', url: 'pages/about.html', keywords: ['about', 'information'] },
			{ title: 'Community', type: 'Info', url: 'Guidelines/community.html', keywords: ['community', 'contribute', 'guidelines'] },
			{ title: 'Security Policy', type: 'Info', url: 'Guidelines/SecurityPolicy.html', keywords: ['security', 'policy', 'safety'] }
		];
		
		this.searchIndex.push(...staticPages);
	}

	handleSearch(e) {
		clearTimeout(this.debounceTimer);
		
		const query = e.target.value.trim();
		
		if (query.length < this.minChars) {
			this.hideResults();
			return;
		}
		
		this.debounceTimer = setTimeout(() => {
			this.performSearch(query);
		}, this.debounceDelay);
	}

	performSearch(query) {
		const lowerQuery = query.toLowerCase();
		
		const results = this.searchIndex.filter(item => {
			const titleMatch = item.title.toLowerCase().includes(lowerQuery);
			const keywordMatch = item.keywords.some(kw => kw.includes(lowerQuery));
			return titleMatch || keywordMatch;
		});
		
		// Sort by relevance (title matches first)
		results.sort((a, b) => {
			const aTitle = a.title.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
			const bTitle = b.title.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
			return aTitle - bTitle;
		});
		
		this.displayResults(results, query);
	}

	displayResults(results, query) {
		if (!this.searchResults) return;
		
		if (results.length === 0) {
			this.searchResults.innerHTML = `
				<div class="search-no-results">
					<p>No results found for "<strong>${this.escapeHtml(query)}</strong>"</p>
				</div>
			`;
		} else {
			const html = results.slice(0, 8).map((result, index) => `
				<a href="${result.url}" class="search-result-item" data-index="${index}">
					<div class="search-result-type">${result.type}</div>
					<div class="search-result-title">${this.highlightMatch(result.title, query)}</div>
				</a>
			`).join('');
			
			this.searchResults.innerHTML = html;
		}
		
		this.showResults();
	}

	highlightMatch(text, query) {
		const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
		return text.replace(regex, '<mark>$1</mark>');
	}

	escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	escapeRegex(text) {
		return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	showResults() {
		if (this.searchResults && this.searchResults.innerHTML) {
			this.searchResults.classList.add('visible');
		}
	}

	hideResults() {
		if (this.searchResults) {
			this.searchResults.classList.remove('visible');
		}
	}

	handleKeyboard(e) {
		const items = this.searchResults?.querySelectorAll('.search-result-item');
		if (!items || items.length === 0) return;
		
		const current = this.searchResults.querySelector('.search-result-item.focused');
		let index = current ? parseInt(current.dataset.index) : -1;
		
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			index = Math.min(index + 1, items.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			index = Math.max(index - 1, -1);
		} else if (e.key === 'Enter' && current) {
			e.preventDefault();
			current.click();
			return;
		} else if (e.key === 'Escape') {
			this.hideResults();
			this.searchInput.blur();
			return;
		} else {
			return;
		}
		
		items.forEach(item => item.classList.remove('focused'));
		if (index >= 0) {
			items[index].classList.add('focused');
			items[index].scrollIntoView({ block: 'nearest' });
		}
	}
}

// Initialize search
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		new SearchEngine();
	});
} else {
	new SearchEngine();
}
