# Abdullah Mohammed Ramadan — Portfolio Website
### Graphic Designer | Digital Marketer | Creative Content Creator

Welcome to the official single-page portfolio website for **Abdullah Mohammed Ramadan**.

---

## 📁 File Structure
```
/
├── index.html          # Semantic HTML5 markup, all content, SVG mockups & SEO metadata
├── css/
│   └── style.css       # Complete responsive CSS3, dark/light themes, typography & animations
├── js/
│   └── script.js       # Vanilla ES6+ JavaScript (theme switcher, nav, animations, form demo)
└── README.md           # Documentation and customization guide
```

---

## 🎨 Visual Design System & Themes
- **Default Theme**: Sophisticated Dark Theme (`#0B0D12` background, `#171B24` cards, `#8B7CFF` accent).
- **Light Theme**: Soft off-white backgrounds (`#F7F9FC`), dark readable text, subtle gray borders.
- **Typography**: Google Fonts — **Space Grotesk** (Headings), **Inter** (Body), and **IBM Plex Sans Arabic** (Arabic fallback).
- **Responsive Breakpoints**:
  - Mobile: 320px – 767px
  - Tablet: 768px – 1023px
  - Desktop: 1024px – 1439px
  - Large Screens: 1440px+

---

## 🚀 How to Run Locally
Simply open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge). No build step, node modules, or external servers are required.

---

## ✏️ Easy Customization Guide

### 1. Replacing Project Links & Images
Each project card in `index.html` is clearly marked.
- To add a real image, replace the `<svg class="project-svg">` placeholder with:
  ```html
  <img src="assets/projects/ivora.jpg" alt="IVORA Brand Identity" class="project-img">
  ```
- To update project URLs, change the `data-url` or `href` attribute on the `<a class="project-link">` element.

### 2. Adding Your Real Portrait Photo
In the hero section of `index.html` (inside `#portrait-slot`), replace the SVG placeholder with:
```html
<img src="assets/abdullah.jpg" alt="Abdullah Mohammed Ramadan" class="portrait-img">
```

### 3. Activating Contact & Social Links
In `index.html`, locate the contact section (`#contact`) and update:
- `[ADD PROFESSIONAL EMAIL ADDRESS]`
- `[ADD INSTAGRAM PROFILE URL]`
- `[ADD FACEBOOK PROFILE URL]`
- `[ADD LINKEDIN PROFILE URL]`
- `[ADD YOUTUBE CHANNEL URL]`

### 4. Connecting a Live Contact Form Backend
In `js/script.js` (Section 7), the form currently runs front-end validation and demonstrates a successful submission state. To receive client messages directly in your email inbox, connect a service such as [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com).
