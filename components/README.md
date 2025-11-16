# DevSphere Components Documentation

## 📦 Components Overview

This folder contains reusable UI components that enhance the DevSphere experience with modern features.

## 🎨 Available Components

### 1. **Breadcrumb Navigation** (`breadcrumb.js` + `breadcrumb.css`)

Automatically generates breadcrumb navigation based on the current URL path.

**Features:**
- Auto-detection of page location
- Emoji icons for known sections
- Automatic path resolution
- Clean, accessible markup

**Usage:**
```html
<!-- Add this div where you want breadcrumbs -->
<div id="breadcrumb" class="breadcrumb-container"></div>

<!-- Include the files -->
<link rel="stylesheet" href="path/to/components/breadcrumb.css">
<script src="path/to/components/breadcrumb.js"></script>
```

**Example Output:**
```
🏠 Home → 💻 Languages → 🐍 Python → ⚙️ Install Guide
```

---

### 2. **Theme Switcher** (`theme-switcher.js` + `theme-switcher.css`)

Dark/Light mode toggle with localStorage persistence and CSS variables.

**Features:**
- Dark and light themes
- Persists user preference
- Smooth transitions
- System theme detection
- CSS variable-based theming

**Usage:**
```html
<link rel="stylesheet" href="path/to/components/theme-switcher.css">
<script src="path/to/components/theme-switcher.js"></script>
```

**CSS Variables:**
```css
:root[data-theme="dark"] {
  --bg-primary: #0a0e14;
  --text-primary: #e1e4e8;
  --accent-primary: #8b5cf6;
  /* ... */
}

:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #24292f;
  --accent-primary: #8b5cf6;
  /* ... */
}
```

---

### 3. **Search Engine** (`search.js` + `search.css`)

Real-time search across all documentation and resources.

**Features:**
- Instant search results
- Keyboard navigation (↑ ↓ Enter Escape)
- Fuzzy matching
- Categorized results
- Debounced input (300ms)

**Usage:**
```html
<!-- Search container -->
<div class="search-container">
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input type="text" id="search-input" placeholder="Search..." />
  </div>
  <div id="search-results"></div>
</div>

<link rel="stylesheet" href="path/to/components/search.css">
<script src="path/to/components/search.js"></script>
```

**Keyboard Shortcuts:**
- `↓` - Next result
- `↑` - Previous result
- `Enter` - Open selected result
- `Escape` - Close search

---

### 4. **Scroll-to-Top Button** (`scroll-to-top.js` + `scroll-to-top.css`)

Floating button that appears after scrolling down, enables smooth scroll to top.

**Features:**
- Auto-show/hide based on scroll position
- Smooth scroll animation
- Accessible (ARIA label)
- Customizable trigger point

**Usage:**
```html
<link rel="stylesheet" href="path/to/components/scroll-to-top.css">
<script src="path/to/components/scroll-to-top.js"></script>
```

**Options:**
```javascript
new ScrollToTop({
  showAfter: 300 // Show after 300px scroll (default)
});
```

---

### 5. **Code Highlighter** (`code-highlighter.js` + `code-highlighter.css`)

Syntax highlighting with Highlight.js, copy buttons, and theme selector.

**Features:**
- Syntax highlighting for 13+ languages
- Copy-to-clipboard buttons
- 6 color themes (VS Dark, Monokai, GitHub, Dracula, Nord, Atom One Dark)
- Theme selector UI
- Auto-detection of language

**Usage:**
```html
<!-- Wrap code in pre/code tags -->
<pre><code data-language="python">
def hello():
    print("Hello, World!")
</code></pre>

<link rel="stylesheet" href="path/to/components/code-highlighter.css">
<script src="path/to/components/code-highlighter.js"></script>
```

**Supported Languages:**
- JavaScript, Python, Java, C++, PHP
- Rust, Go, TypeScript, SQL
- Bash, JSON, XML, YAML

**Available Themes:**
- VS Dark (default)
- Monokai
- GitHub
- Dracula
- Nord
- Atom One Dark

---

### 6. **Animations** (`animations.css`)

Pre-built CSS animations for smooth transitions and effects.

**Features:**
- Card animations (fade in, hover effects)
- Page transitions
- Button effects (pulse, bounce, ripple)
- Shimmer loading effect
- Gradient animations
- Accessibility support (prefers-reduced-motion)

**Usage:**
```html
<link rel="stylesheet" href="path/to/components/animations.css">

<!-- Add animation classes to elements -->
<div class="card fade-in">Content</div>
<div class="hero page-transition">Hero Section</div>
<button class="bounce-on-hover">Click Me</button>
```

**Available Classes:**
- `fade-in` - Fade in animation
- `fade-in-up` - Fade in with upward movement
- `slide-in-left` / `slide-in-right` - Slide in from sides
- `page-transition` - Smooth page entry
- `bounce-on-hover` - Bounce effect on hover
- `scale-on-hover` - Scale up on hover
- `rotate-on-hover` - Rotate on hover
- `glow-on-hover` - Glow effect on hover
- `shimmer` - Loading shimmer effect
- `floating` - Continuous floating animation
- `gradient-text` - Animated gradient text

---

## 🚀 Quick Start

### Adding All Components to a Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page - DevSphere</title>
  
  <!-- Main CSS -->
  <link rel="stylesheet" href="path/to/main.css">
  
  <!-- Component Styles -->
  <link rel="stylesheet" href="path/to/components/breadcrumb.css">
  <link rel="stylesheet" href="path/to/components/theme-switcher.css">
  <link rel="stylesheet" href="path/to/components/search.css">
  <link rel="stylesheet" href="path/to/components/scroll-to-top.css">
  <link rel="stylesheet" href="path/to/components/code-highlighter.css">
  <link rel="stylesheet" href="path/to/components/animations.css">
</head>
<body>
  <!-- Breadcrumb -->
  <div id="breadcrumb" class="breadcrumb-container"></div>
  
  <!-- Your content here -->
  
  <!-- Component Scripts -->
  <script src="path/to/components/breadcrumb.js"></script>
  <script src="path/to/components/theme-switcher.js"></script>
  <script src="path/to/components/search.js"></script>
  <script src="path/to/components/scroll-to-top.js"></script>
  <script src="path/to/components/code-highlighter.js"></script>
</body>
</html>
```

---

## 📝 Path Resolution Guide

### For Pages at Different Depths:

**Root level** (`index.html`):
```html
<link rel="stylesheet" href="components/breadcrumb.css">
<script src="components/breadcrumb.js"></script>
```

**One level deep** (`pages/about.html`):
```html
<link rel="stylesheet" href="../components/breadcrumb.css">
<script src="../components/breadcrumb.js"></script>
```

**Two levels deep** (`pages/Languages/languages.html`):
```html
<link rel="stylesheet" href="../../components/breadcrumb.css">
<script src="../../components/breadcrumb.js"></script>
```

**Three levels deep** (`pages/Languages/Python/intro.html`):
```html
<link rel="stylesheet" href="../../../components/breadcrumb.css">
<script src="../../../components/breadcrumb.js"></script>
```

---

## 🎨 Customization

### Theme Colors

Edit `theme-switcher.css` to customize colors:

```css
:root[data-theme="dark"] {
  --accent-primary: #8b5cf6; /* Change primary accent */
  --accent-secondary: #f59e0b; /* Change secondary accent */
  /* ... */
}
```

### Search Index

Edit `search.js` to add more searchable content:

```javascript
this.searchIndex.push({
  title: 'Custom Page',
  type: 'Guide',
  url: 'path/to/page.html',
  keywords: ['custom', 'keywords']
});
```

### Animation Speed

Edit `animations.css` to adjust timing:

```css
.card {
  transition: all 0.3s ease; /* Change 0.3s to desired speed */
}
```

---

## 🔧 Browser Support

All components support:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Polyfills needed for older browsers:**
- `localStorage` (for theme persistence)
- `IntersectionObserver` (for scroll spy)
- `navigator.clipboard` (for copy buttons)

---

## ♿ Accessibility

All components follow accessibility best practices:
- ARIA labels on interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` support
- Semantic HTML markup
- Focus visible indicators

---

## 📦 Dependencies

### External Dependencies:

**Code Highlighter:**
- Highlight.js (loaded via CDN)
- Language modules (loaded on-demand)

**All other components:**
- ✅ No external dependencies
- ✅ Pure vanilla JavaScript
- ✅ No jQuery required

---

## 🐛 Troubleshooting

### Breadcrumbs not showing?
- Check that `<div id="breadcrumb"></div>` exists
- Verify script path is correct
- Ensure script loads after DOM

### Theme not persisting?
- Check browser localStorage is enabled
- Clear cache and try again
- Verify `theme-switcher.js` loads

### Search not working?
- Ensure `app.js` loads before `search.js`
- Check that data arrays (languages, frameworks, etc.) are defined
- Verify input has `id="search-input"`

### Code highlighting not working?
- Check internet connection (Highlight.js loads from CDN)
- Verify code blocks use `<pre><code data-language="...">` format
- Check browser console for errors

---

## 📄 License

These components are part of the DevSphere project and follow the same license as the main repository.

---

## 🤝 Contributing

To add or improve components:

1. Create component files (`component-name.js` + `component-name.css`)
2. Follow existing naming conventions
3. Add documentation to this README
4. Test across browsers
5. Ensure accessibility compliance

---

**Last Updated:** November 16, 2025
**Version:** 1.0.0
