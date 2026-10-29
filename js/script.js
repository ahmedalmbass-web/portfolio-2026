/**
 * ============================================================================
 * ABDULLAH MOHAMMED RAMADAN — PORTFOLIO SCRIPT
 * Graphic Designer | Digital Marketer | Creative Content Creator
 * Vanilla JavaScript (ES6+) • Accessible • Zero External Dependencies
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT THEME)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const THEME_STORAGE_KEY = 'ar_portfolio_theme';

  /**
   * Determine initial theme:
   * 1. Stored user preference in localStorage
   * 2. Default to 'dark' as specified in design direction
   */
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'dark'; // Default premium dark theme
  };

  /**
   * Apply theme to DOM and update button accessibility attributes
   */
  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggleBtn.setAttribute('aria-label', label);
      themeToggleBtn.setAttribute('title', label);
    }
  };

  // Initialize theme on load
  const currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  /* --------------------------------------------------------------------------
     1B. MULTILINGUAL SYSTEM (5 LANGUAGES: AR, EN, ZH, MS, LA)
     -------------------------------------------------------------------------- */
  const LANG_STORAGE_KEY = 'ar_portfolio_lang';
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const currentLangText = document.getElementById('current-lang-text');
  const langOptions = document.querySelectorAll('.lang-option');
  const mobileLangBtns = document.querySelectorAll('.mobile-lang-btn');

  const langNames = {
    ar: 'العربية',
    en: 'English',
    zh: '简体中文',
    ms: 'Melayu',
    la: 'Latina'
  };

  const getInitialLanguage = () => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && ['ar', 'en', 'zh', 'ms', 'la'].includes(saved)) {
      return saved;
    }
    return 'ar'; // Default to Arabic as requested
  };

  const applyLanguage = (lang) => {
    if (typeof translations === 'undefined' || !translations[lang]) return;
    const t = translations[lang];

    // 1. Update root attributes
    htmlRoot.setAttribute('lang', t.lang);
    htmlRoot.setAttribute('dir', t.dir);
    localStorage.setItem(LANG_STORAGE_KEY, lang);

    // 2. Update UI controls
    if (currentLangText) {
      currentLangText.textContent = langNames[lang] || lang;
    }

    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
        opt.setAttribute('aria-selected', 'true');
      } else {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
      }
    });

    mobileLangBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Navigation Links (Desktop, Mobile & Footer)
    const navMap = [
      { sel: '.desktop-nav a[href="#hero"]', text: t.nav.home },
      { sel: '.desktop-nav a[href="#about"]', text: t.nav.about },
      { sel: '.desktop-nav a[href="#skills"]', text: t.nav.skills },
      { sel: '.desktop-nav a[href="#projects"]', text: t.nav.projects },
      { sel: '.desktop-nav a[href="#experience"]', text: t.nav.experience },
      { sel: '.desktop-nav a[href="#services"]', text: t.nav.services },
      { sel: '.desktop-nav a[href="#contact"]', text: t.nav.contact },
      { sel: '.mobile-nav-list a[href="#hero"]', text: t.nav.home },
      { sel: '.mobile-nav-list a[href="#about"]', text: t.nav.about },
      { sel: '.mobile-nav-list a[href="#skills"]', text: t.nav.skills },
      { sel: '.mobile-nav-list a[href="#projects"]', text: t.nav.projects },
      { sel: '.mobile-nav-list a[href="#experience"]', text: t.nav.experience },
      { sel: '.mobile-nav-list a[href="#services"]', text: t.nav.services },
      { sel: '.mobile-nav-list a[href="#contact"]', text: t.nav.contact },
      { sel: '.footer-links a[href="#hero"]', text: t.nav.home },
      { sel: '.footer-links a[href="#about"]', text: t.nav.about },
      { sel: '.footer-links a[href="#skills"]', text: t.nav.skills },
      { sel: '.footer-links a[href="#projects"]', text: t.nav.projects },
      { sel: '.footer-links a[href="#experience"]', text: t.nav.experience },
      { sel: '.footer-links a[href="#services"]', text: t.nav.services },
      { sel: '.footer-links a[href="#contact"]', text: t.nav.contact }
    ];
    navMap.forEach(item => {
      const el = document.querySelector(item.sel);
      if (el) el.textContent = item.text;
    });

    // Header & Mobile Brand & CTAs
    const brandNameEls = document.querySelectorAll('.brand-name');
    brandNameEls.forEach(el => { el.textContent = t.brandName; });

    const brandTitleEls = document.querySelectorAll('.brand-title, .mobile-nav-tagline');
    brandTitleEls.forEach(el => {
      el.textContent = t.brandTitle;
      el.setAttribute('dir', t.dir);
    });

    const navCta = document.querySelector('.nav-cta');
    if (navCta) navCta.textContent = t.nav.letsTalk;

    const mobileCta = document.querySelector('.mobile-cta');
    if (mobileCta) mobileCta.textContent = t.nav.letsCollaborate;

    // 4. Hero Section
    const heroLabel = document.querySelector('.hero-label');
    if (heroLabel) heroLabel.textContent = t.hero.badge;

    const heroName = document.getElementById('hero-name');
    if (heroName) {
      if (lang === 'ar') {
        heroName.innerHTML = 'عبدالله رمضان <span class="hero-name-en">Abdullah Ramadan</span>';
      } else if (lang === 'zh') {
        heroName.innerHTML = '阿卜杜拉·拉马丹 <span class="hero-name-en">Abdullah Ramadan</span>';
      } else {
        heroName.innerHTML = 'Abdullah Ramadan <span class="hero-name-en">عبدالله رمضان</span>';
      }
    }

    const heroDesc = document.querySelector('.hero-descriptor');
    if (heroDesc) {
      heroDesc.textContent = t.hero.descriptor;
      heroDesc.setAttribute('dir', t.dir);
    }

    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
      heroIntro.textContent = t.hero.intro;
      heroIntro.setAttribute('dir', t.dir);
    }

    const heroSubintro = document.querySelector('.hero-subintro');
    if (heroSubintro) {
      heroSubintro.textContent = t.hero.subintro;
    }

    const heroCta1 = document.querySelector('.hero-cta-group a.btn-primary span');
    if (heroCta1) heroCta1.textContent = t.hero.btnExplore;

    const heroCta2 = document.querySelector('.hero-cta-group a.btn-secondary span');
    if (heroCta2) heroCta2.textContent = t.hero.btnContact;

    const heroMeta = document.querySelector('.hero-meta-label span');
    if (heroMeta) heroMeta.textContent = t.hero.metaLabel;

    const badgeExpNum = document.querySelector('.badge-exp .badge-num');
    if (badgeExpNum) badgeExpNum.textContent = t.hero.badgeExpNum;

    const badgeExpText = document.querySelector('.badge-exp .badge-text');
    if (badgeExpText) badgeExpText.textContent = t.hero.badgeExpText;

    const badgeDiscipline = document.querySelector('.badge-discipline .badge-text');
    if (badgeDiscipline) badgeDiscipline.textContent = t.hero.badgeDiscipline;

    // 5. About Section
    const aboutOverline = document.querySelector('#about .section-overline');
    if (aboutOverline) aboutOverline.textContent = t.about.overline;

    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.textContent = t.about.title;

    const aboutSubtitle = document.querySelector('#about .section-subtitle');
    if (aboutSubtitle) aboutSubtitle.textContent = t.about.subtitle;

    const aboutNarrative = document.querySelector('.about-narrative');
    if (aboutNarrative) {
      const leadP = aboutNarrative.querySelector('.lead-text');
      if (leadP) {
        leadP.textContent = t.about.lead;
        leadP.setAttribute('dir', t.dir);
      }
      const allPs = aboutNarrative.querySelectorAll('p:not(.lead-text):not(.highlight-text)');
      if (allPs[0]) allPs[0].textContent = t.about.p1;
      if (allPs[1]) allPs[1].textContent = t.about.p2;
      if (allPs[2]) {
        allPs[2].textContent = t.about.p3;
        allPs[2].setAttribute('dir', t.dir);
      }
      const highlightP = aboutNarrative.querySelector('.highlight-text');
      if (highlightP) highlightP.textContent = t.about.highlight;
    }

    const hlCards = document.querySelectorAll('.highlight-card');
    if (hlCards[0]) {
      hlCards[0].querySelector('.highlight-label').textContent = t.about.card1Label;
      hlCards[0].querySelector('.highlight-title').textContent = t.about.card1Title;
      hlCards[0].querySelector('.highlight-desc').textContent = t.about.card1Desc;
    }
    if (hlCards[1]) {
      hlCards[1].querySelector('.highlight-label').textContent = t.about.card2Label;
      hlCards[1].querySelector('.highlight-title').textContent = t.about.card2Title;
      hlCards[1].querySelector('.highlight-desc').textContent = t.about.card2Desc;
    }
    if (hlCards[2]) {
      hlCards[2].querySelector('.highlight-label').textContent = t.about.card3Label;
      hlCards[2].querySelector('.highlight-title').textContent = t.about.card3Title;
      hlCards[2].querySelector('.highlight-desc').textContent = t.about.card3Desc;
    }
    if (hlCards[3]) {
      hlCards[3].querySelector('.highlight-label').textContent = t.about.card4Label;
      hlCards[3].querySelector('.highlight-title').textContent = t.about.card4Title;
      hlCards[3].querySelector('.highlight-desc').textContent = t.about.card4Desc;
    }

    // 6. Skills Section
    const skillsOverline = document.querySelector('#skills .section-overline');
    if (skillsOverline) skillsOverline.textContent = t.skills.overline;

    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.textContent = t.skills.title;

    const skillsSubtitle = document.querySelector('#skills .section-subtitle');
    if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle;

    const catCards = document.querySelectorAll('.skill-category-card');
    if (catCards[0]) {
      catCards[0].querySelector('.category-title').textContent = t.skills.cat1Title;
      catCards[0].querySelector('.category-summary').textContent = t.skills.cat1Desc;
    }
    if (catCards[1]) {
      catCards[1].querySelector('.category-title').textContent = t.skills.cat2Title;
      catCards[1].querySelector('.category-summary').textContent = t.skills.cat2Desc;
    }
    if (catCards[2]) {
      catCards[2].querySelector('.category-title').textContent = t.skills.cat3Title;
      catCards[2].querySelector('.category-summary').textContent = t.skills.cat3Desc;
    }

    const toolsBlocks = document.querySelectorAll('.tools-block');
    if (toolsBlocks[0]) {
      toolsBlocks[0].querySelector('.tools-badge').textContent = t.skills.softwareBadge;
      toolsBlocks[0].querySelector('.tools-title').textContent = t.skills.softwareTitle;
      toolsBlocks[0].querySelector('.tools-desc').textContent = t.skills.softwareDesc;
    }
    if (toolsBlocks[1]) {
      toolsBlocks[1].querySelector('.tools-badge').textContent = t.skills.aiBadge;
      toolsBlocks[1].querySelector('.tools-title').textContent = t.skills.aiTitle;
      toolsBlocks[1].querySelector('.tools-desc').textContent = t.skills.aiDesc;
    }

    // 7. Projects Section
    const projectsOverline = document.querySelector('#projects .section-overline');
    if (projectsOverline) projectsOverline.textContent = t.projects.overline;

    const projectsTitle = document.getElementById('projects-title');
    if (projectsTitle) projectsTitle.textContent = t.projects.title;

    const projectsSubtitle = document.querySelector('#projects .section-subtitle');
    if (projectsSubtitle) projectsSubtitle.textContent = t.projects.subtitle;

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      const f = btn.getAttribute('data-filter');
      if (f === 'all') btn.textContent = t.projects.filterAll;
      if (f === 'branding') btn.textContent = t.projects.filterBranding;
      if (f === 'logo') btn.textContent = t.projects.filterLogo;
      if (f === 'advertising') btn.textContent = t.projects.filterAdvertising;
      if (f === 'packaging') btn.textContent = t.projects.filterPackaging;
      if (f === 'profile') btn.textContent = t.projects.filterProfile;
      if (f === 'infographic') btn.textContent = t.projects.filterInfographic;
      if (f === 'creative') btn.textContent = t.projects.filterCreative;
    });

    const noteText = document.querySelector('.project-note-banner .note-text');
    if (noteText) noteText.textContent = t.projects.authenticNote;

    // 8. Experience Section
    const expOverline = document.querySelector('#experience .section-overline');
    if (expOverline) expOverline.textContent = t.experience.overline;

    const expTitle = document.getElementById('experience-title');
    if (expTitle) expTitle.textContent = t.experience.title;

    const expSubtitle = document.querySelector('#experience .section-subtitle');
    if (expSubtitle) expSubtitle.textContent = t.experience.subtitle;

    const tlItems = document.querySelectorAll('.timeline-item');
    if (tlItems[0]) {
      tlItems[0].querySelector('.timeline-role').textContent = t.experience.role1;
      tlItems[0].querySelector('.timeline-period').textContent = t.experience.period1;
      tlItems[0].querySelector('.timeline-discipline').textContent = t.experience.disc1;
      tlItems[0].querySelector('.timeline-desc').textContent = t.experience.desc1;
      tlItems[0].querySelector('.focus-title').textContent = t.experience.focusTitle;
    }
    if (tlItems[1]) {
      tlItems[1].querySelector('.timeline-role').textContent = t.experience.role2;
      tlItems[1].querySelector('.timeline-period').textContent = t.experience.period2;
      tlItems[1].querySelector('.timeline-discipline').textContent = t.experience.disc2;
      tlItems[1].querySelector('.timeline-desc').textContent = t.experience.desc2;
      tlItems[1].querySelector('.focus-title').textContent = t.experience.focusTitle;
    }
    if (tlItems[2]) {
      tlItems[2].querySelector('.timeline-role').textContent = t.experience.role3;
      tlItems[2].querySelector('.timeline-period').textContent = t.experience.period3;
      tlItems[2].querySelector('.timeline-discipline').textContent = t.experience.disc3;
      tlItems[2].querySelector('.timeline-desc').textContent = t.experience.desc3;
      tlItems[2].querySelector('.focus-title').textContent = t.experience.focusTitle;
    }
    if (tlItems[3]) {
      tlItems[3].querySelector('.timeline-role').textContent = t.experience.role4;
      tlItems[3].querySelector('.timeline-period').textContent = t.experience.period4;
      tlItems[3].querySelector('.timeline-discipline').textContent = t.experience.disc4;
      tlItems[3].querySelector('.timeline-desc').textContent = t.experience.desc4;
      tlItems[3].querySelector('.focus-title').textContent = t.experience.focusTitle;
    }

    // 9. Services Section
    const srvOverline = document.querySelector('#services .section-overline');
    if (srvOverline) srvOverline.textContent = t.services.overline;

    const srvTitle = document.getElementById('services-title');
    if (srvTitle) srvTitle.textContent = t.services.title;

    const srvSubtitle = document.querySelector('#services .section-subtitle');
    if (srvSubtitle) srvSubtitle.textContent = t.services.subtitle;

    const srvCards = document.querySelectorAll('.service-card');
    if (srvCards[0]) {
      srvCards[0].querySelector('.service-title').textContent = t.services.s1Title;
      srvCards[0].querySelector('.service-desc').textContent = t.services.s1Desc;
      srvCards[0].querySelector('.deliverables-heading').textContent = t.services.deliverablesTitle;
    }
    if (srvCards[1]) {
      srvCards[1].querySelector('.service-title').textContent = t.services.s2Title;
      srvCards[1].querySelector('.service-desc').textContent = t.services.s2Desc;
      srvCards[1].querySelector('.deliverables-heading').textContent = t.services.deliverablesTitle;
    }
    if (srvCards[2]) {
      srvCards[2].querySelector('.service-title').textContent = t.services.s3Title;
      srvCards[2].querySelector('.service-desc').textContent = t.services.s3Desc;
      srvCards[2].querySelector('.deliverables-heading').textContent = t.services.deliverablesTitle;
    }
    if (srvCards[3]) {
      srvCards[3].querySelector('.service-title').textContent = t.services.s4Title;
      srvCards[3].querySelector('.service-desc').textContent = t.services.s4Desc;
      srvCards[3].querySelector('.deliverables-heading').textContent = t.services.deliverablesTitle;
    }

    // 10. Strengths Section
    const strOverline = document.querySelector('#strengths .section-overline');
    if (strOverline) strOverline.textContent = t.strengths.overline;

    const strTitle = document.getElementById('strengths-title');
    if (strTitle) strTitle.textContent = t.strengths.title;

    const strSubtitle = document.querySelector('#strengths .section-subtitle');
    if (strSubtitle) strSubtitle.textContent = t.strengths.subtitle;

    const strCards = document.querySelectorAll('.strength-card');
    if (strCards[0]) {
      strCards[0].querySelector('.strength-name').textContent = t.strengths.st1Title;
      strCards[0].querySelector('.strength-desc').textContent = t.strengths.st1Desc;
    }
    if (strCards[1]) {
      strCards[1].querySelector('.strength-name').textContent = t.strengths.st2Title;
      strCards[1].querySelector('.strength-desc').textContent = t.strengths.st2Desc;
    }
    if (strCards[2]) {
      strCards[2].querySelector('.strength-name').textContent = t.strengths.st3Title;
      strCards[2].querySelector('.strength-desc').textContent = t.strengths.st3Desc;
    }
    if (strCards[3]) {
      strCards[3].querySelector('.strength-name').textContent = t.strengths.st4Title;
      strCards[3].querySelector('.strength-desc').textContent = t.strengths.st4Desc;
    }
    if (strCards[4]) {
      strCards[4].querySelector('.strength-name').textContent = t.strengths.st5Title;
      strCards[4].querySelector('.strength-desc').textContent = t.strengths.st5Desc;
    }
    if (strCards[5]) {
      strCards[5].querySelector('.strength-name').textContent = t.strengths.st6Title;
      strCards[5].querySelector('.strength-desc').textContent = t.strengths.st6Desc;
    }

    // 11. Vision Section
    const visOverline = document.querySelector('.vision-overline');
    if (visOverline) visOverline.textContent = t.vision.overline;

    const visLead = document.querySelector('.vision-lead');
    if (visLead) visLead.textContent = t.vision.quote1;

    const visBody = document.querySelector('.vision-body');
    if (visBody) visBody.textContent = t.vision.quote2;

    const visClose = document.querySelector('.vision-closing');
    if (visClose) visClose.textContent = t.vision.quote3;

    const visAuthor = document.querySelector('.signature-author');
    if (visAuthor) visAuthor.textContent = t.vision.author;

    const visRole = document.querySelector('.signature-role');
    if (visRole) visRole.textContent = t.vision.role;

    // 12. Credibility Highlights
    const credOverline = document.querySelector('#highlights .section-overline');
    if (credOverline) credOverline.textContent = t.highlights.overline;

    const credTitle = document.getElementById('highlights-title');
    if (credTitle) credTitle.textContent = t.highlights.title;

    const credSubtitle = document.querySelector('#highlights .section-subtitle');
    if (credSubtitle) credSubtitle.textContent = t.highlights.subtitle;

    const credPills = document.querySelectorAll('.cred-pill');
    if (credPills[0]) {
      credPills[0].querySelector('.cred-num').textContent = t.highlights.years;
      credPills[0].querySelector('.cred-label').textContent = t.highlights.yearsLabel;
    }
    if (credPills[1]) credPills[1].querySelector('.cred-label').textContent = t.highlights.branding;
    if (credPills[2]) credPills[2].querySelector('.cred-label').textContent = t.highlights.campaigns;
    if (credPills[3]) credPills[3].querySelector('.cred-label').textContent = t.highlights.packaging;
    if (credPills[4]) credPills[4].querySelector('.cred-label').textContent = t.highlights.modernMedia;

    // 13. Contact Section
    const cntOverline = document.querySelector('#contact .section-overline');
    if (cntOverline) cntOverline.textContent = t.contact.overline;

    const cntHeadline = document.getElementById('contact-title');
    if (cntHeadline) cntHeadline.textContent = t.contact.title;

    const cntDesc = document.querySelector('.contact-desc');
    if (cntDesc) cntDesc.textContent = t.contact.desc;

    const cntSubdesc = document.querySelector('.contact-subdesc');
    if (cntSubdesc) cntSubdesc.textContent = t.contact.subdesc;

    const channelCards = document.querySelectorAll('.channel-card');
    if (channelCards[0]) channelCards[0].querySelector('.channel-title').textContent = t.contact.emailTitle;
    if (channelCards[1]) channelCards[1].querySelector('.channel-title').textContent = t.contact.whatsappTitle;

    const socialsHeading = document.querySelector('.socials-heading');
    if (socialsHeading) socialsHeading.textContent = t.contact.socialsTitle;

    const formTitle = document.querySelector('.form-title');
    if (formTitle) formTitle.textContent = t.contact.formTitle;

    const formSubtitle = document.querySelector('.form-subtitle');
    if (formSubtitle) formSubtitle.textContent = t.contact.formSubtitle;

    const lblName = document.querySelector('label[for="full-name"]');
    if (lblName && lblName.childNodes[0]) lblName.childNodes[0].textContent = t.contact.lblName + ' ';

    const inputName = document.getElementById('full-name');
    if (inputName) inputName.setAttribute('placeholder', t.contact.placeholderName);

    const lblEmail = document.querySelector('label[for="email-address"]');
    if (lblEmail && lblEmail.childNodes[0]) lblEmail.childNodes[0].textContent = t.contact.lblEmail + ' ';

    const inputEmail = document.getElementById('email-address');
    if (inputEmail) inputEmail.setAttribute('placeholder', t.contact.placeholderEmail);

    const lblService = document.querySelector('label[for="service-required"]');
    if (lblService && lblService.childNodes[0]) lblService.childNodes[0].textContent = t.contact.lblService + ' ';

    const lblBudget = document.querySelector('label[for="project-budget"]');
    if (lblBudget && lblBudget.childNodes[0]) lblBudget.childNodes[0].textContent = t.contact.lblBudget + ' ';

    const lblDetails = document.querySelector('label[for="project-details"]');
    if (lblDetails && lblDetails.childNodes[0]) lblDetails.childNodes[0].textContent = t.contact.lblDetails + ' ';

    const inputDetails = document.getElementById('project-details');
    if (inputDetails) inputDetails.setAttribute('placeholder', t.contact.placeholderDetails);

    const submitBtnSpan = document.querySelector('#submit-btn span');
    if (submitBtnSpan) submitBtnSpan.textContent = t.contact.btnSend;

    // 14. Footer
    const footerName = document.querySelector('.footer-name');
    if (footerName) footerName.textContent = t.footer.name;

    const footerTitle = document.querySelector('.footer-title');
    if (footerTitle) {
      footerTitle.textContent = t.footer.title;
      footerTitle.setAttribute('dir', t.dir);
    }

    const footerStatement = document.querySelector('.footer-statement');
    if (footerStatement) footerStatement.textContent = t.footer.statement;

    const footerHeadings = document.querySelectorAll('.footer-heading');
    if (footerHeadings[0]) footerHeadings[0].textContent = t.footer.navHeading;
    if (footerHeadings[1]) footerHeadings[1].textContent = t.footer.connectHeading;

    const backToTopLinkSpan = document.querySelector('#footer-back-to-top span');
    if (backToTopLinkSpan) backToTopLinkSpan.textContent = t.footer.backToTop;

    const copyrightText = document.querySelector('.copyright-text');
    if (copyrightText) copyrightText.textContent = t.footer.copyright;

    const footerDiscipline = document.querySelector('.footer-discipline-note');
    if (footerDiscipline) footerDiscipline.textContent = t.footer.disciplineNote;
  };

  // Toggle Language Dropdown
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.contains('open');
      if (isOpen) {
        langDropdown.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      } else {
        langDropdown.classList.add('open');
        langBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Language options click (Desktop dropdown)
  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedLang = opt.getAttribute('data-lang');
      applyLanguage(selectedLang);
      if (langDropdown) {
        langDropdown.classList.remove('open');
        langBtn?.setAttribute('aria-expanded', 'false');
      }
      showToast(`Language: ${langNames[selectedLang] || selectedLang}`);
    });
  });

  // Mobile language buttons click
  mobileLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
      showToast(`Language: ${langNames[selectedLang] || selectedLang}`);
    });
  });

  // Initialize Language on load
  const currentLang = getInitialLanguage();
  applyLanguage(currentLang);

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const menuToggleBtn = document.getElementById('menu-toggle');
  const menuCloseBtn = document.getElementById('menu-close');
  const mobileNavDrawer = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  const openMobileNav = () => {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    menuToggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuCloseBtn?.focus();
  };

  const closeMobileNav = () => {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMobileNav);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer?.classList.contains('open')) {
      closeMobileNav();
      menuToggleBtn?.focus();
    }
  });

  // Close drawer when any mobile nav link is selected
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  /* --------------------------------------------------------------------------
     3. SMOOTH SCROLLING WITH FIXED HEADER OFFSET
     -------------------------------------------------------------------------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const siteHeader = document.getElementById('site-header');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set URL hash cleanly without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. ACTIVE NAVIGATION LINK UPDATES (SCROLLSPY)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((navLink) => {
          if (navLink.getAttribute('href') === `#${sectionId}`) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* --------------------------------------------------------------------------
     5. SCROLL-TRIGGERED REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // If user prefers reduced motion, reveal all elements immediately
    revealElements.forEach((el) => el.classList.add('revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* --------------------------------------------------------------------------
     6. PROJECT FILTERING BAR
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button state & ARIA
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        const catList = category.trim().split(/\s+/);
        const isMatch = filterValue === 'all' || catList.includes(filterValue);
        if (isMatch) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & CLIENT-SIDE DEMONSTRATION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Input elements
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email-address');
  const serviceInput = document.getElementById('service-required');
  const budgetInput = document.getElementById('project-budget');
  const detailsInput = document.getElementById('project-details');

  // Error span elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const serviceError = document.getElementById('service-error');
  const detailsError = document.getElementById('details-error');

  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearErrors = () => {
    [nameError, emailError, serviceError, detailsError].forEach((el) => {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, serviceInput, detailsInput].forEach((input) => {
      input?.classList.remove('invalid');
    });
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }
  };

  // Real-time error clearing when user types
  [nameInput, emailInput, serviceInput, detailsInput].forEach((input) => {
    input?.addEventListener('input', () => {
      input.classList.remove('invalid');
      const errEl = document.getElementById(`${input.id.replace('-address', '').replace('-required', '').replace('-name', 'name')}-error`);
      if (errEl) errEl.textContent = '';
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Full Name
      const nameVal = nameInput?.value.trim() || '';
      if (!nameVal) {
        isValid = false;
        nameInput?.classList.add('invalid');
        if (nameError) nameError.textContent = 'Please enter your full name.';
      } else if (nameVal.length < 2) {
        isValid = false;
        nameInput?.classList.add('invalid');
        if (nameError) nameError.textContent = 'Name must be at least 2 characters.';
      }

      // Validate Email
      const emailVal = emailInput?.value.trim() || '';
      if (!emailVal) {
        isValid = false;
        emailInput?.classList.add('invalid');
        if (emailError) emailError.textContent = 'Please enter your email address.';
      } else if (!emailRegex.test(emailVal)) {
        isValid = false;
        emailInput?.classList.add('invalid');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
      }

      // Validate Service Required
      const serviceVal = serviceInput?.value || '';
      if (!serviceVal) {
        isValid = false;
        serviceInput?.classList.add('invalid');
        if (serviceError) serviceError.textContent = 'Please select a required creative service.';
      }

      // Validate Project Details
      const detailsVal = detailsInput?.value.trim() || '';
      if (!detailsVal) {
        isValid = false;
        detailsInput?.classList.add('invalid');
        if (detailsError) detailsError.textContent = 'Please share a brief summary of your project.';
      } else if (detailsVal.length < 10) {
        isValid = false;
        detailsInput?.classList.add('invalid');
        if (detailsError) detailsError.textContent = 'Please provide at least 10 characters describing your project.';
      }

      if (!isValid) {
        // Focus the first invalid field
        const firstInvalid = contactForm.querySelector('.form-control.invalid');
        firstInvalid?.focus();
        return;
      }

      // Simulation / Front-end Validation Success State
      // NOTE FOR BACKEND INTEGRATION:
      // To connect a live email service, replace this block with your fetch() call to Formspree, Formkeep, or EmailJS.
      // Example:
      // fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: new FormData(contactForm) })

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Validating...</span>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" class="spin-icon">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
          </svg>
        `;
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Inquiry Validated!</strong> Thank you, ${escapeHtml(nameVal)}. Your project details for <em>${escapeHtml(serviceVal)}</em> have been submitted.
            <br><small style="opacity: 0.85;">(Front-end validation demonstration: To route messages directly to your inbox, connect your backend form handler in <code>js/script.js</code>.)</small>
          `;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Project Inquiry</span>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
        }

        contactForm.reset();
        showToast('Project inquiry validated successfully');
      }, 700);
    });
  }

  /* --------------------------------------------------------------------------
     7.5 INTERACTIVE PROJECT GALLERY & LIGHTBOX
     -------------------------------------------------------------------------- */
  const PROJECT_GALLERIES = {
    'ivora': {
      title: 'IVORA — Brand Identity System',
      titleAr: 'IVORA — نظام الهوية البصرية والتصميم الإبداعي',
      images: [
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-1.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-2.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-3.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-4.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-5.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-6.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-7.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-8.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-9.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-10.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-11.jpg',
        'assets/ivora/ivora%D9%84%D9%88%D8%AC%D9%88-13.jpg'
      ]
    },
    'browe': {
      title: 'BROWÉ — Beauty Brand & Product Presentation',
      titleAr: 'BROWÉ — هوية مستحضرات التجميل وتغليف المنتجات',
      images: [
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-1.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-2.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-3.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-4.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-5.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-6.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-7.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-8.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-9.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-10.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-11.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-12.jpg',
        'assets/BROW%C3%89/%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%5BRecovered%5D-13.jpg'
      ]
    },
    'weshah': {
      title: 'وشاح — Contemporary Visual Communication',
      titleAr: 'وشاح — تصميم جرافيكي وتواصل بصري معاصر',
      images: [
        'assets/%D9%88%D8%B4%D8%A7%D8%AD/77.png'
      ]
    },
    'beto': {
      title: 'BETO — Brand Identity & Visual Design',
      titleAr: 'BETO — الهوية البصرية والتصميم الإبداعي',
      images: [
        'assets/BETO/88.png'
      ]
    },
    'khozam': {
      title: 'خزام — Brand Identity & Creative Design',
      titleAr: 'خزام — الهوية البصرية والتصميم الإبداعي',
      images: [
        'assets/%D8%AE%D8%B2%D8%A7%D9%85/%D8%AE%D8%B2%D8%A7%D9%851.jpg'
      ]
    },
    'athar-culinary': {
      title: 'أثر لفنون الطهي — Culinary Brand & Creative Direction',
      titleAr: 'أثر لفنون الطهي — هوية بصرية وإخراج إبداعي',
      images: [
        'assets/%D8%A3%D8%AB%D8%B1%20%D9%84%D9%81%D9%86%D9%88%D9%86%20%D8%A7%D9%84%D8%B7%D9%87%D9%8A/99.png'
      ]
    },
    'athar-art': {
      title: 'أثر للرسم التشكيلي — Fine Arts & Visual Expression',
      titleAr: 'أثر للرسم التشكيلي — فنون تشكيلية وتعبير بصري',
      images: [
        'assets/%D8%A3%D8%AB%D8%B1%20%D9%84%D9%84%D8%B1%D8%B3%D9%85%20%D8%A7%D9%84%D8%AA%D8%B4%D9%83%D9%8A%D9%84%D9%8A/%D8%A3%D8%AB%D8%B1%20%D9%84%D9%84%D8%B1%D8%B3%D9%85%20%D8%A7%D9%84%D8%AA%D8%B4%D9%83%D9%8A%D9%84%D9%8A.ai1%20%5BRecovered%5D1111.jpg'
      ]
    },
    'company-profile': {
      title: 'Company & Corporate Profile Design',
      titleAr: 'بروفايلات الشركات والملفات التعريفية',
      images: [
        'assets/Company%20and%20Corporate%20Profile%20Design/IMG-20260305-WA0043.jpg',
        'assets/Company%20and%20Corporate%20Profile%20Design/IMG-20260423-WA0006.jpg',
        'assets/Company%20and%20Corporate%20Profile%20Design/IMG-20260604-WA0024.jpg',
        'assets/Company%20and%20Corporate%20Profile%20Design/IMG-20260604-WA0025.jpg',
        'assets/Company%20and%20Corporate%20Profile%20Design/IMG-20260608-WA0004.jpg'
      ]
    },
    'packaging': {
      title: 'Packaging & Product Labels Design',
      titleAr: 'تصميم التغليف والعبوات والملصقات التجارية',
      images: [
        'assets/Packaging/file_00000000d0ec81f78671a8cd9e681bc4.png',
        'assets/Packaging/IMG-20251012-WA0002.jpg',
        'assets/Packaging/IMG-20251226-WA0036.jpg',
        'assets/Packaging/IMG-20260114-WA0007(1).jpg',
        'assets/Packaging/IMG-20260313-WA0049.jpg',
        'assets/Packaging/IMG-20260404-WA0033.jpg',
        'assets/Packaging/IMG-20260919-WA0039.jpg'
      ]
    },
    'logo-showcase': {
      title: 'Logo Design & Brand Marks Showcase',
      titleAr: 'معرض تصميم الشعارات والعلامات التجارية',
      images: [
        'assets/Logo/%D9%85%D9%84%D9%81%20%D8%A7%D8%B9%D9%85%D8%A7%D9%84%20%D8%A7%D9%84%D8%B4%D8%B9%D8%A7%D8%B1%D8%A7%D8%AA11111111.png'
      ]
    },
    'infographic': {
      title: 'Infographics & Data Visualization',
      titleAr: 'تصميم الإنفوجرافيك والمعلومات البصرية',
      images: [
        'assets/Infographic/%D8%A3%D9%86%D9%81%D9%88%D8%AC%D8%B1%D8%A7%D9%81%D9%8A%D9%83.jpg',
        'assets/Infographic/%D8%A7%D9%86%D9%81%D9%88%D8%AC%D8%B1%D8%A7%D9%81%D9%8A%D9%83%202.jpg',
        'assets/Infographic/121.png',
        'assets/Infographic/IMG-20260209-WA0029.jpg',
        'assets/Infographic/IMG-20261014-WA0034.jpg'
      ]
    },
    'social-advertising': {
      title: 'Social Media Advertising & Posters',
      titleAr: 'إعلانات وبوسترات السوشيال ميديا',
      images: [
        'assets/Social%20Media%20Advertising/%D8%A8%D9%88%D8%B3%D8%AA%D8%B1%204%20%D8%A7%D9%84%D8%A7%D8%AE%D9%8A%D8%B1.jpg',
        'assets/Social%20Media%20Advertising/121.png',
        'assets/Social%20Media%20Advertising/IMG-20260209-WA0029.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260221-WA0107.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260327-WA0052.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260331-WA0009.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260404-WA0029.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260404-WA0035.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260904-WA0019(1).jpg',
        'assets/Social%20Media%20Advertising/IMG-20260927-WA0013.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260927-WA0015.jpg',
        'assets/Social%20Media%20Advertising/IMG-20260927-WA0016.jpg',
        'assets/Social%20Media%20Advertising/IMG-20261014-WA0034.jpg',
        'assets/Social%20Media%20Advertising/%D8%A7%D9%8A%D9%81%D9%88%D8%B1%D8%A7%204.jpg2.jpg',
        'assets/Social%20Media%20Advertising/%D8%A7%D9%8A%D9%81%D9%88%D8%B1%D8%A7%20%D8%A8%D9%88%D8%B3%D8%AA%D8%B1%20%D9%821.jpg',
        'assets/Social%20Media%20Advertising/%D8%A8%D9%88%D8%B3%D8%AA%D8%B1%202.jpg',
        'assets/Social%20Media%20Advertising/%D8%A8%D9%88%D8%B3%D8%AA%D8%B1%203.jpg',
        'assets/Social%20Media%20Advertising/%D8%A8%D9%88%D8%B3%D8%AA%D8%B11%20%D9%88%D8%A7%D9%84%D8%A7%D8%AE%D9%8A%D8%B1.jpg',
        'assets/Social%20Media%20Advertising/%D8%B9%D8%B1%D8%B6.jpg',
        'assets/Social%20Media%20Advertising/%E2%80%8F%E2%80%8F-%20%D9%86%D8%B3%D8%AE%D8%A9.jpg',
        'assets/Social%20Media%20Advertising/%E2%80%8F%E2%80%8F%D8%A7%D9%8A%D9%81%D9%88%D8%B1%D8%A7%204%20-%20%D9%86%D8%B3%D8%AE%D8%A9.psd0000000000.jpg'
      ]
    },
    'menu-design': {
      title: 'Restaurant & Cafe Menu Design',
      titleAr: 'تصميم قوائم الطعام والمنيو للمطاعم والكافيهات',
      images: [
        'assets/%D9%85%D9%86%D9%8A%D9%88/NOLA1.png',
        'assets/%D9%85%D9%86%D9%8A%D9%88/NOLA2.png',
        'assets/%D9%85%D9%86%D9%8A%D9%88/IMG-20260402-WA0018.jpg',
        'assets/%D9%85%D9%86%D9%8A%D9%88/IMG-20260403-WA0004.jpg',
        'assets/%D9%85%D9%86%D9%8A%D9%88/IMG-20261005-WA0043.jpg'
      ]
    },
    'my-thoughts': {
      title: 'My Thoughts — Conceptual Art & Typography',
      titleAr: 'خواطر — تصاميم فكرية ومفاهيم بصرية ملهمة',
      images: [
        'assets/My%20thoughts/1793185480848.jpg',
        'assets/My%20thoughts/1793185268644.jpg',
        'assets/My%20thoughts/1793185277530.jpg',
        'assets/My%20thoughts/1793185330610.jpg',
        'assets/My%20thoughts/1793185339953.jpg',
        'assets/My%20thoughts/1793185376066.jpg',
        'assets/My%20thoughts/1793185404285.jpg',
        'assets/My%20thoughts/1793185421108.jpg',
        'assets/My%20thoughts/1793185434664.jpg',
        'assets/My%20thoughts/1793185447630.jpg',
        'assets/My%20thoughts/1793185454098.jpg',
        'assets/My%20thoughts/1793185489691.jpg',
        'assets/My%20thoughts/1793185494870.jpg',
        'assets/My%20thoughts/1793185502857.jpg',
        'assets/My%20thoughts/1793185508718.jpg',
        'assets/My%20thoughts/1793185521765.jpg',
        'assets/My%20thoughts/1793185533094.jpg',
        'assets/My%20thoughts/IMG-20260808-WA0005.jpg',
        'assets/My%20thoughts/IMG-20260808-WA0006.jpg',
        'assets/My%20thoughts/IMG-20260808-WA0007.jpg',
        'assets/My%20thoughts/IMG-20260808-WA0008.jpg',
        'assets/My%20thoughts/IMG-20260808-WA0009.jpg'
      ]
    }
  };

  const galleryModal = document.getElementById('project-gallery-modal');
  const galleryBackdrop = document.getElementById('gallery-backdrop');
  const galleryCloseBtn = document.getElementById('gallery-close-btn');
  const galleryPrevBtn = document.getElementById('gallery-prev-btn');
  const galleryNextBtn = document.getElementById('gallery-next-btn');
  const galleryMainImg = document.getElementById('gallery-main-img');
  const galleryTitle = document.getElementById('gallery-modal-title');
  const galleryCounter = document.getElementById('gallery-counter');
  const galleryThumbsTrack = document.getElementById('gallery-thumbs-track');
  const galleryThumbsContainer = document.getElementById('gallery-thumbs-container');

  let activeGalleryProject = null;
  let activeImageIndex = 0;

  const renderGalleryImage = (index) => {
    if (!activeGalleryProject || !activeGalleryProject.images[index]) return;
    activeImageIndex = index;
    const imgSrc = activeGalleryProject.images[index];
    
    if (galleryMainImg) {
      galleryMainImg.style.opacity = '0';
      galleryMainImg.style.transform = 'scale(0.98)';
      setTimeout(() => {
        galleryMainImg.src = imgSrc;
        const currentLang = htmlRoot.getAttribute('lang') || 'ar';
        const displayTitle = (currentLang === 'ar' && activeGalleryProject.titleAr) ? activeGalleryProject.titleAr : activeGalleryProject.title;
        galleryMainImg.alt = `${displayTitle} - Image ${index + 1}`;
        galleryMainImg.style.opacity = '1';
        galleryMainImg.style.transform = 'scale(1)';
      }, 150);
    }

    if (galleryCounter) {
      galleryCounter.textContent = `${index + 1} / ${activeGalleryProject.images.length}`;
    }

    if (galleryThumbsTrack) {
      const thumbs = galleryThumbsTrack.querySelectorAll('.gallery-thumb');
      thumbs.forEach((th, i) => {
        if (i === index) {
          th.classList.add('active');
          th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          th.classList.remove('active');
        }
      });
    }
  };

  const openGalleryModal = (projectId, startIndex = 0) => {
    const proj = PROJECT_GALLERIES[projectId];
    if (!proj || !proj.images || proj.images.length === 0) return;

    activeGalleryProject = proj;
    activeImageIndex = startIndex;

    if (galleryTitle) {
      const currentLang = htmlRoot.getAttribute('lang') || 'ar';
      galleryTitle.textContent = (currentLang === 'ar' && proj.titleAr) ? proj.titleAr : proj.title;
    }

    const hasMultiple = proj.images.length > 1;
    if (galleryPrevBtn) galleryPrevBtn.style.display = hasMultiple ? 'flex' : 'none';
    if (galleryNextBtn) galleryNextBtn.style.display = hasMultiple ? 'flex' : 'none';
    if (galleryThumbsContainer) galleryThumbsContainer.style.display = hasMultiple ? 'block' : 'none';

    if (galleryThumbsTrack) {
      galleryThumbsTrack.innerHTML = '';
      if (hasMultiple) {
        proj.images.forEach((imgUrl, i) => {
          const thumbBtn = document.createElement('button');
          thumbBtn.type = 'button';
          thumbBtn.className = `gallery-thumb ${i === startIndex ? 'active' : ''}`;
          thumbBtn.setAttribute('aria-label', `View image ${i + 1}`);
          thumbBtn.innerHTML = `<img src="${imgUrl}" alt="Thumbnail ${i + 1}" loading="lazy">`;
          thumbBtn.addEventListener('click', () => {
            renderGalleryImage(i);
          });
          galleryThumbsTrack.appendChild(thumbBtn);
        });
      }
    }

    renderGalleryImage(startIndex);

    if (galleryModal) {
      galleryModal.classList.add('open');
      galleryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      galleryCloseBtn?.focus();
    }
  };

  const closeGalleryModal = () => {
    if (!galleryModal) return;
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const nextGalleryImage = () => {
    if (!activeGalleryProject || activeGalleryProject.images.length <= 1) return;
    const nextIdx = (activeImageIndex + 1) % activeGalleryProject.images.length;
    renderGalleryImage(nextIdx);
  };

  const prevGalleryImage = () => {
    if (!activeGalleryProject || activeGalleryProject.images.length <= 1) return;
    const prevIdx = (activeImageIndex - 1 + activeGalleryProject.images.length) % activeGalleryProject.images.length;
    renderGalleryImage(prevIdx);
  };

  galleryCloseBtn?.addEventListener('click', closeGalleryModal);
  galleryBackdrop?.addEventListener('click', closeGalleryModal);
  galleryNextBtn?.addEventListener('click', nextGalleryImage);
  galleryPrevBtn?.addEventListener('click', prevGalleryImage);

  document.addEventListener('keydown', (e) => {
    if (galleryModal?.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeGalleryModal();
      } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
      } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
      }
    }
  });

  document.querySelectorAll('.open-gallery-click').forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const pId = wrap.getAttribute('data-project-id');
      if (pId) openGalleryModal(pId);
    });
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pId = wrap.getAttribute('data-project-id');
        if (pId) openGalleryModal(pId);
      }
    });
  });

  document.querySelectorAll('.open-gallery-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project-id');
      if (pId) openGalleryModal(pId);
    });
  });

  /* --------------------------------------------------------------------------
     8. PLACEHOLDER DIALOG & SOCIAL PLACEHOLDER HANDLERS
     -------------------------------------------------------------------------- */
  const placeholderModal = document.getElementById('placeholder-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalTagDisplay = document.getElementById('modal-tag-display');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');

  const openPlaceholderModal = (tagText, titleText) => {
    if (!placeholderModal) return;
    if (modalTagDisplay) modalTagDisplay.textContent = tagText;
    if (modalTitle && titleText) modalTitle.textContent = titleText;
    if (modalDesc) {
      modalDesc.innerHTML = `This project card is currently set to the placeholder:`;
    }
    placeholderModal.classList.add('open');
    placeholderModal.setAttribute('aria-hidden', 'false');
    modalActionBtn?.focus();
  };

  const closePlaceholderModal = () => {
    if (!placeholderModal) return;
    placeholderModal.classList.remove('open');
    placeholderModal.setAttribute('aria-hidden', 'true');
  };

  modalCloseBtn?.addEventListener('click', closePlaceholderModal);
  modalBackdrop?.addEventListener('click', closePlaceholderModal);
  modalActionBtn?.addEventListener('click', closePlaceholderModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && placeholderModal?.classList.contains('open')) {
      closePlaceholderModal();
    }
  });

  // Attach to placeholder project links
  const placeholderLinks = document.querySelectorAll('.placeholder-link');
  placeholderLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectName = link.getAttribute('data-project') || 'Selected Project';
      const placeholderUrl = link.getAttribute('data-url') || '[ADD PROJECT URL]';
      openPlaceholderModal(placeholderUrl, `${projectName} — Showcase Link`);
    });
  });

  // Attach to placeholder social links
  const placeholderSocials = document.querySelectorAll('.placeholder-social');
  placeholderSocials.forEach((social) => {
    social.addEventListener('click', (e) => {
      const url = social.getAttribute('data-url') || '';
      if (url.startsWith('[ADD') || social.getAttribute('href') === '#contact') {
        e.preventDefault();
        const platform = social.getAttribute('data-platform') || 'Social Profile';
        showToast(`${platform} profile link will be activated once your verified handle is provided.`);
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. COPY EMAIL TO CLIPBOARD
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailDisplay = document.getElementById('email-display');

  if (copyEmailBtn && emailDisplay) {
    copyEmailBtn.addEventListener('click', () => {
      const emailText = emailDisplay.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(emailText)
          .then(() => {
            showToast(`Email copied to clipboard (${emailText})`);
          })
          .catch(() => {
            showToast('Could not copy automatically');
          });
      } else {
        showToast('Clipboard access not supported in this browser');
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. FLOATING BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      document.getElementById('hero')?.focus();
    });
  }

  /* --------------------------------------------------------------------------
     11. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  function showToast(message, duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent); flex-shrink: 0;">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, duration);
  }

  // Basic HTML escape helper to prevent injection in simulated feedback
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
