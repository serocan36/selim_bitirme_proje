/* 
    PREMIUM INTERACTION ENGINE
    Optimized by Senior Frontend Architect
*/

document.addEventListener('DOMContentLoaded', () => {
    const UI = {
        header: document.getElementById('main-nav-header'),
        mobileToggle: document.getElementById('mobile-nav-toggle'),
        navMenu: document.getElementById('main-navigation'),
        backToTop: document.getElementById('scroll-to-top'),
        fadeElems: document.querySelectorAll('.fade-in')
    };

    // 1. Optimized Scroll Handler
    let isScrolling = false;
    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollPos = window.scrollY;

                // Header State
                if (scrollPos > 60) {
                    UI.header.classList.add('scrolled');
                } else {
                    if (!document.body.classList.contains('internal-page')) {
                        UI.header.classList.remove('scrolled');
                    }
                }

                // Back to Top State
                if (scrollPos > 600) {
                    UI.backToTop.classList.add('show');
                } else {
                    UI.backToTop.classList.remove('show');
                }

                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Premium Animation Observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    UI.fadeElems.forEach(el => animationObserver.observe(el));

    // 3. Smooth Interactions
    if (UI.mobileToggle) {
        UI.mobileToggle.addEventListener('click', () => {
            UI.navMenu.classList.toggle('active');
            UI.mobileToggle.classList.toggle('active');
            document.body.style.overflow = UI.navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    if (UI.backToTop) {
        UI.backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Link Highlight Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    // 5. Cookie Consent System
    const initCookieConsent = () => {
        if (!localStorage.getItem('cookie-consent')) {
            const popup = document.createElement('div');
            popup.className = 'cookie-popup show';
            popup.innerHTML = `
                <div class="cookie-content">
                    <p>Size daha iyi bir deneyim sunabilmek için çerezler kullanıyoruz. Detaylı bilgi için 
                    <a href="cerez-tercihleri.html">Çerez Politikamızı</a> inceleyebilirsiniz.</p>
                </div>
                <div class="cookie-actions">
                    <button class="btn btn-secondary btn-sm" id="cookie-reject">Reddet</button>
                    <button class="btn btn-sm" id="cookie-accept">Kabul Et</button>
                </div>
            `;
            document.body.appendChild(popup);

            document.getElementById('cookie-accept').addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                popup.classList.remove('show');
            });

            document.getElementById('cookie-reject').addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'rejected');
                popup.classList.remove('show');
            });
        }
    };
    initCookieConsent();

    // 6. KVKK Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const kvkkCheck = document.getElementById('kvkk-consent');
            if (kvkkCheck && !kvkkCheck.checked) {
                e.preventDefault();
                alert('Devam etmek için KVKK Aydınlatma Metni\'ni onaylamanız gerekmektedir.');
            }
        });
    }
});
