(() => {
	// --- Config (optional override via window.repoConfig) ---
	const cfg = Object.assign({
		repoUrl: null,
		zipUrl: null,
	}, window.repoConfig || {});

	// --- Data model ---
	const languages = [
		{ type: 'language', name: 'Python', folder: 'Python', install: 'Python/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/PYTHON/Python%20questions' },
		{ type: 'language', name: 'Java', folder: 'Java', install: 'Java/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/JAVA/Question' },
		{ type: 'language', name: 'JavaScript', folder: 'Js', install: 'Js/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/JavaScript/questions' },
		{ type: 'language', name: 'TypeScript', folder: 'Ts', install: 'Ts/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/TypeScript/questions' },
		{ type: 'language', name: 'C & C++', folder: 'C&C++', install: 'C&C++/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/C%20%26%20C%2B%2B/questions%20of%20c%20%26%20cpp' },
		{ type: 'language', name: 'Rust', folder: 'Rust', install: 'Rust/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/RUST/Qustions' },
		{ type: 'language', name: 'Go', folder: 'Golang', install: 'Golang/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/Golang/questions' },
		{ type: 'language', name: 'PHP', folder: 'php', install: 'php/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/PHP/Question' },
		{ type: 'language', name: 'R', folder: 'R', install: 'R/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/R/R%20programming%20questions' },
		{ type: 'language', name: 'SQL', folder: 'SQL', install: 'SQL/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/SQL/questions' },
		{ type: 'language', name: 'KQL', folder: 'Kql', install: 'Kql/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/Kql/Questions' },
		{ type: 'language', name: 'Bash', folder: 'Bash', install: 'Bash/install-guide.html', questions: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/tree/main/Bash/Questions' }
	];

	const frameworks = [
		{ type: 'framework', name: 'Node.js', intro: 'Framework/NodeJs/intro.html', folder: 'Framework/NodeJs' },
		{ type: 'framework', name: 'Express.js', intro: 'Framework/ExpressJs/intro.html', folder: 'Framework/ExpressJs' },
		{ type: 'framework', name: 'Next.js', intro: 'Framework/NextJs/intro.html', folder: 'Framework/NextJs' },
		{ type: 'framework', name: 'Django', intro: 'Framework/Django/intro.html', folder: 'Framework/Django' },
		{ type: 'framework', name: 'Flask', intro: 'Framework/Flask/intro.html', folder: 'Framework/Flask' },
		{ type: 'framework', name: 'Spring Boot', intro: 'Framework/Spring Boot/intro.html', folder: 'Framework/Spring Boot' }
	];

	const databases = [
		{ type: 'database', name: 'DynamoDB', intro: 'Database/DynamoDB/intro.html', folder: 'Database/DynamoDB' },
		{ type: 'database', name: 'MongoDB', intro: 'Database/MongoDB/intro.html', folder: 'Database/MongoDB' },
		{ type: 'database', name: 'MySQL', intro: 'Database/MySQL/intro.html', folder: 'Database/MySQL' },
		{ type: 'database', name: 'PostgreSQL', intro: 'Database/PostgreSQL/intro.html', folder: 'Database/PostgreSQL' },
		{ type: 'database', name: 'Redis', intro: 'Database/Redis/intro.html', folder: 'Database/Redis' }
	];

	const tools = [
		{ type: 'tool', name: 'Docker', intro: 'Devop&API/Docker/intro.html', folder: 'Devop&API/Docker' },
		{ type: 'tool', name: 'GitHub', intro: 'Devop&API/GitHub/intro.html', folder: 'Devop&API/GitHub' },
		{ type: 'tool', name: 'Postman', intro: 'Devop&API/Postman/intro.html', folder: 'Devop&API/Postman' },
		{ type: 'tool', name: 'Jenkins', intro: 'Devop&API/Jenkins/intro.html', folder: 'Devop&API/Jenkins' },
		{ type: 'tool', name: 'Git', intro: 'Devop&API/Git/intro.html', folder: 'Devop&API/Git' }
	];

	const testingTools = [
		{ type: 'testing', name: 'Jest', intro: 'Testing/Jest/intro.html', folder: 'Testing/Jest' },
		{ type: 'testing', name: 'JTest', intro: 'Testing/JTest/intro.html', folder: 'Testing/JTest' }
	];

  const quickLinks = [
    { label: 'Contact', url: 'docpages/contact.html' },
    { label: 'Quickstart', url: 'docpages/quickstart.html' },
    { label: 'Documentation', url: 'docpages/documentation.html' },
    { label: 'Community', url: 'Guidelines/community.html' },
    { label: 'Resources', url: 'pages/Resources/Resources.html' },
    { label: 'FAQ', url: 'docpages/FAQ.html' },
    { label: 'Changelog', url: 'pages/changelog.html' },
    { label: 'Security', url: 'Guidelines/SecurityPolicy.html' },
    { label: 'License', url: 'https://github.com/Srijan-XI/Install-and-Learn-DevLangs/blob/main/LICENSE' },
	{ label: 'Notes', url: 'pages/Resources/notes.html' },
	{ label: 'Projects', url: 'pages/Resources/projects.html' },
	{ label: 'Tools', url: 'pages/Resources/tools.html' },
  ];

	const allItems = [...languages, ...frameworks, ...databases, ...tools, ...testingTools];

	// --- Utilities ---
	const byId = (id) => document.getElementById(id);
	const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
	const el = (tag, className, attrs={}) => {
		const e = document.createElement(tag);
		if (className) e.className = className;
		for (const [k,v] of Object.entries(attrs)) e.setAttribute(k,v);
		return e;
	};
	const encodePath = (parts) => parts.map(encodeURIComponent).join('/');
	const rel = (parts) => `../${encodePath(parts)}`;
	const nowFmt = () => new Date().toLocaleString();

	// --- Rendering ---
	function renderStats() {
		const s = byId('stats');
		s.innerHTML = '';
		const stats = [
			{ label: 'Languages', num: String(languages.length) },
			{ label: 'Frameworks', num: String(frameworks.length) },
			{ label: 'Databases', num: String(databases.length) },
			{ label: 'DevOps Tools', num: String(tools.length) },
			{ label: 'Testing', num: String(testingTools.length) }
		];
		for (const st of stats) {
			const card = el('div','stat');
			const num = el('div','num'); num.textContent = st.num;
			const lab = el('div','label'); lab.textContent = st.label;
			card.append(num, lab);
			s.append(card);
		}
	}

	function typeBadge(t) {
		const b = el('span','badge');
		b.textContent = t.charAt(0).toUpperCase() + t.slice(1);
		return b;
	}

	function cardFor(item) {
		const c = el('div','card');
		c.dataset.type = item.type;

		const title = el('div','title');
		title.textContent = item.name;
		const meta = el('div','meta');
		meta.append(typeBadge(item.type));

		const links = el('div','links');

		// Language-specific
		if (item.type === 'language') {
			if (item.install) {
				const installA = el('a', null, { href: `pages/Languages/${item.install}`, target: '_blank', rel: 'noopener' });
				installA.textContent = 'Install guide';
				links.append(installA);
			}
			if (item.questions) {
				const qA = el('a', null, { href: item.questions, target: '_blank', rel: 'noopener' });
				qA.textContent = 'Questions';
				links.append(qA);
			}
		}

		// Frameworks / Databases / Tools / Testing: intro link
		if ((item.type === 'framework' || item.type === 'database' || item.type === 'tool' || item.type === 'testing') && item.intro) {
			const iA = el('a', null, { href: `pages/${item.intro}`, target: '_blank', rel: 'noopener' });
			iA.textContent = 'Intro';
			links.append(iA);
		}

		c.append(title, meta, links);
		return c;
	}

	function renderCards(list = allItems) {
		const wrap = byId('cards');
		wrap.innerHTML = '';
		list.forEach(item => wrap.append(cardFor(item)));
	}

  function renderQuickLinks() {
    const wrap = byId('links');
    wrap.innerHTML = '';
    quickLinks.forEach(q => {
      const href = q.url || rel(q.path);
      const a = el('a', null, { href: href, target: '_blank', rel: 'noopener' });
      a.textContent = q.label;
      wrap.append(a);
    });
  }	// --- Interactions ---
	function setupSearchAndFilters() {
		const search = byId('search');
		const chips = $$('.chip');
		let filter = 'all';
		let query = '';

		const apply = () => {
			const q = query.trim().toLowerCase();
			const list = allItems.filter(it => {
				const matchesType = filter === 'all' ? true : it.type === filter;
				const matchesQuery = q ? it.name.toLowerCase().includes(q) : true;
				return matchesType && matchesQuery;
			});
			renderCards(list);
		};

		search.addEventListener('input', (e) => { query = e.target.value || ''; apply(); });
		chips.forEach(ch => ch.addEventListener('click', () => {
			chips.forEach(x => x.classList.remove('active'));
			ch.classList.add('active');
			filter = ch.dataset.filter || 'all';
			apply();
		}));
	}

	function setupTheme() {
		// If ThemeSwitcher is managing theme, skip duplicate setup
		if (window && window.devSphereThemeManager === 'theme-switcher') return;
		const btn = byId('btn-theme');
		const key = 'il-devlangs-theme';
		const set = (val) => {
			document.body.classList.toggle('light', val === 'light');
			localStorage.setItem(key, val);
		};
		const stored = localStorage.getItem(key);
		if (stored) set(stored); else set('dark');
		if (btn) {
			btn.addEventListener('click', () => {
				const cur = document.body.classList.contains('light') ? 'light' : 'dark';
				set(cur === 'light' ? 'dark' : 'light');
			});
		}
	}

	function setupRepoLinks() {
		const aZip = byId('btn-download');
		const aRepo = byId('repo-link');
		const aIssues = byId('issues-link');
		const aDisclaimerRepo = byId('disclaimer-repo-link');
		const meta = byId('meta');

		if (cfg.zipUrl) aZip.href = cfg.zipUrl; else { aZip.href = '#'; aZip.setAttribute('aria-disabled','true'); aZip.classList.add('disabled'); }
		if (cfg.repoUrl) {
			aRepo.href = cfg.repoUrl;
			aIssues.href = `${cfg.repoUrl.replace(/\/$/,'')}/issues`;
			if (aDisclaimerRepo) aDisclaimerRepo.href = cfg.repoUrl;
		} else {
			aRepo.href = '#';
			aIssues.href = '#';
			if (aDisclaimerRepo) aDisclaimerRepo.href = '#';
		}
		meta.textContent = '';
	}

	// --- Init ---
	function init(){
		renderStats();
		renderCards();
		renderQuickLinks();
		setupSearchAndFilters();
		setupTheme();
		setupRepoLinks();
	}

	document.addEventListener('DOMContentLoaded', init);
})();

