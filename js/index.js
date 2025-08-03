"use strict"

const icon = document.querySelector('.icon-menu');
icon.addEventListener('click', function () {
    document.documentElement.classList.toggle('menu-open');
});

document.addEventListener('click', documentAction)

function documentAction(e) {
    const targetElement = e.target

    if (targetElement.closest("[class*='menu__link']")) {
        if (document.documentElement.classList.contains('menu-open')) {
            document.documentElement.classList.remove('menu-open')
        }
        const link = targetElement.closest("[class*='menu__link']")
        const goto = link.dataset.goto
        const gotoElement = document.querySelector(goto)

        if (gotoElement) {
            gotoElement.scrollIntoView({
                behavior: "smooth"
            })
        }
        e.preventDefault()
    }
}
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && window.translations && window.translations[lang][titleEl.dataset.i18n]) {
        titleEl.textContent = window.translations[lang][titleEl.dataset.i18n];
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (el.tagName === "TITLE") return;
        if (window.translations && window.translations[lang][key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = window.translations[lang][key];
            } else {
                el.innerHTML = window.translations[lang][key];
            }
        }
    });
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.setAttribute('aria-current', btn.dataset.lang === lang ? "true" : "false");
    });
}
document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

setLanguage(localStorage.getItem('lang') || 'uk');
