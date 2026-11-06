/* ==========================================================================
   ADVANCED CSS3 & RESPONSIVE ARCHITECTURE - INTERACTIVE LAB & TUTORIAL
   Handles:
   1. Live CSS Grid Line Overlay Debugger
   2. Dynamic Accent Theme Switcher
   3. Real-time Viewport & Breakpoint Resolution Tracker
   4. Interactive Flexbox Alignment Playground
   5. Task Tutorial Modal with Multimedia Chapters & Code Walkthrough
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Viewport & Breakpoint Resolution HUD
    const viewportResSpan = document.getElementById('viewport-res');
    const breakpointPill = document.getElementById('breakpoint-tag');

    function updateViewportHUD() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        if (viewportResSpan) {
            viewportResSpan.textContent = `${w}px × ${h}px`;
        }

        if (breakpointPill) {
            if (w < 480) {
                breakpointPill.textContent = 'Mobile (<480px)';
                breakpointPill.className = 'hud-pill';
            } else if (w < 768) {
                breakpointPill.textContent = 'Phablet (480-768px)';
                breakpointPill.className = 'hud-pill';
            } else if (w < 1024) {
                breakpointPill.textContent = 'Tablet (768-1024px)';
                breakpointPill.className = 'hud-pill';
            } else if (w < 1280) {
                breakpointPill.textContent = 'Desktop (1024-1280px)';
                breakpointPill.className = 'hud-pill success';
            } else {
                breakpointPill.textContent = 'Ultra-Wide (1280px+)';
                breakpointPill.className = 'hud-pill success';
            }
        }
    }

    window.addEventListener('resize', updateViewportHUD, { passive: true });
    updateViewportHUD();

    // 2. CSS Grid Lines Debugger Toggle
    const gridToggleBtn = document.getElementById('toggle-grid-lines');
    if (gridToggleBtn) {
        gridToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('grid-debug-active');
            const isActive = document.body.classList.contains('grid-debug-active');
            gridToggleBtn.classList.toggle('active', isActive);
            
            const btnText = gridToggleBtn.querySelector('span');
            if (btnText) {
                btnText.textContent = isActive ? 'Grid Lines: ON' : 'Grid Lines: OFF';
            }

            if (window.showToast) {
                window.showToast(isActive ? 'CSS Grid Overlay Activated' : 'CSS Grid Overlay Deactivated');
            }
        });
    }

    // 3. Dynamic Accent Color Switcher
    const accentPills = document.querySelectorAll('.accent-pill');
    const savedAccent = localStorage.getItem('portfolio-accent') || 'blue';
    setAccent(savedAccent);

    accentPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const accent = pill.getAttribute('data-accent');
            setAccent(accent);
        });
    });

    function setAccent(accent) {
        document.documentElement.setAttribute('data-accent', accent);
        localStorage.setItem('portfolio-accent', accent);
        accentPills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-accent') === accent);
        });
    }

    // 4. CSS Architecture Lab Tabs Navigation
    const labTabs = document.querySelectorAll('.lab-tab-btn');
    const labPanels = document.querySelectorAll('.lab-tab-panel');

    labTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            labTabs.forEach(t => t.classList.remove('active'));
            labPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 5. Interactive Flexbox Playground
    const flexBoxDemo = document.getElementById('flexbox-demo-box');
    const flexJustifySelect = document.getElementById('flex-justify-select');
    const flexAlignSelect = document.getElementById('flex-align-select');
    const flexWrapSelect = document.getElementById('flex-wrap-select');

    function updateFlexDemo() {
        if (!flexBoxDemo) return;
        if (flexJustifySelect) flexBoxDemo.style.justifyContent = flexJustifySelect.value;
        if (flexAlignSelect) flexBoxDemo.style.alignItems = flexAlignSelect.value;
        if (flexWrapSelect) flexBoxDemo.style.flexWrap = flexWrapSelect.value;
    }

    if (flexJustifySelect) flexJustifySelect.addEventListener('change', updateFlexDemo);
    if (flexAlignSelect) flexAlignSelect.addEventListener('change', updateFlexDemo);
    if (flexWrapSelect) flexWrapSelect.addEventListener('change', updateFlexDemo);

    // 6. Interactive Task Tutorial Dialog (<dialog id="tutorial-modal">)
    const tutorialModal = document.getElementById('tutorial-modal');
    const openTutorialBtns = document.querySelectorAll('.open-tutorial-btn');
    const closeTutorialBtn = document.getElementById('close-tutorial-btn');

    window.openTutorialModal = function() {
        if (!tutorialModal) return;
        if (typeof tutorialModal.showModal === 'function') {
            tutorialModal.showModal();
        } else {
            tutorialModal.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';
    };

    window.closeTutorialModal = function() {
        if (!tutorialModal) return;
        if (typeof tutorialModal.close === 'function') {
            tutorialModal.close();
        } else {
            tutorialModal.removeAttribute('open');
        }
        document.body.style.overflow = '';
    };

    openTutorialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openTutorialModal();
        });
    });

    if (closeTutorialBtn) {
        closeTutorialBtn.addEventListener('click', closeTutorialModal);
    }

    if (tutorialModal) {
        tutorialModal.addEventListener('click', (e) => {
            const rect = tutorialModal.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                                rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                closeTutorialModal();
            }
        });

        tutorialModal.addEventListener('close', () => {
            document.body.style.overflow = '';
        });
    }

    // 7. Tutorial Chapters Switcher & Video Simulation
    const chapterBtns = document.querySelectorAll('.chapter-nav-btn');
    const chapterPanels = document.querySelectorAll('.chapter-content-panel');
    const videoTitle = document.getElementById('tutorial-video-title');
    const videoProgress = document.getElementById('tutorial-video-progress');

    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chapterBtns.forEach(b => b.classList.remove('active'));
            chapterPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const chapterIndex = btn.getAttribute('data-chapter');
            const targetPanel = document.getElementById(`chapter-panel-${chapterIndex}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            const titles = [
                "Module 1: CSS Grid Two-Dimensional Layout Architecture",
                "Module 2: Localized Component Alignment with Flexbox",
                "Module 3: Mobile-First Cascading Media Queries",
                "Module 4: Dynamic Theme Engine with CSS Custom Properties"
            ];
            const progressPercentages = [25, 50, 75, 100];

            if (videoTitle) videoTitle.textContent = titles[chapterIndex - 1] || titles[0];
            if (videoProgress) videoProgress.style.width = `${progressPercentages[chapterIndex - 1] || 25}%`;
        });
    });

    // 8. Copy Code Snippet Utility
    window.copyCodeSnippet = function(codeId) {
        const codeElement = document.getElementById(codeId);
        if (!codeElement) return;
        const text = codeElement.innerText || codeElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
            if (window.showToast) {
                window.showToast('Code snippet copied to clipboard!');
            }
        });
    };
});
