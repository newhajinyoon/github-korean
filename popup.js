document.addEventListener('DOMContentLoaded', () => {
    const sourceButton = document.getElementById('source');
    const contactButton = document.getElementById('contact');
    const donateButton = document.getElementById('donate');
    const resetBtn = document.getElementById('reset-settings');
    
    const toggleTranslation = document.getElementById('setting-translation');
    const toggleDevTerms = document.getElementById('setting-devterms');
    const toggleParticles = document.getElementById('setting-particles');
    const toggleLogs = document.getElementById('setting-logs');

    const defaultSettings = {
        useTranslation: true,
        useDevTerms: false,
        useParticles: true,
        useLogs: false
    };

    chrome.storage.local.get(defaultSettings, (items) => {
        toggleTranslation.checked = items.useTranslation;
        toggleDevTerms.checked = items.useDevTerms;
        toggleParticles.checked = items.useParticles;
        toggleLogs.checked = items.useLogs;
    });

    toggleTranslation.addEventListener('change', (e) => {
        chrome.storage.local.set({ useTranslation: e.target.checked });
    });

    toggleDevTerms.addEventListener('change', (e) => {
        chrome.storage.local.set({ useDevTerms: e.target.checked });
    });

    toggleParticles.addEventListener('change', (e) => {
        chrome.storage.local.set({ useParticles: e.target.checked });
    });

    toggleLogs.addEventListener('change', (e) => {
        chrome.storage.local.set({ useLogs: e.target.checked });
    });

    resetBtn.addEventListener('click', () => {
        chrome.storage.local.set(defaultSettings, () => {
            toggleTranslation.checked = defaultSettings.useTranslation;
            toggleDevTerms.checked = defaultSettings.useDevTerms;
            toggleParticles.checked = defaultSettings.useParticles;
            toggleLogs.checked = defaultSettings.useLogs;
        });
    });

    donateButton.addEventListener('click', () => {
        window.open('https://im.jinyoon.kr/donate', '_blank');
    });

    sourceButton.addEventListener('click', () => {
        window.open('https://github.com/newhajinyoon/github-korean', '_blank');
    });

    contactButton.addEventListener('click', () => {
        window.open('https://discord.gg/URbAPkxJuN', '_blank');
    });
});