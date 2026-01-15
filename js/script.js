/* ================================
   PORTFOLIO - MAIN JAVASCRIPT
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initLanguageToggle();
    initScrollAnimations();
    initContactForm();
    initScrollIndicator();
});

/* ================================
   NAVIGATION
   ================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('ph-list');
        icon.classList.toggle('ph-x');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('ph-list');
            icon.classList.remove('ph-x');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ================================
   LANGUAGE TOGGLE
   ================================ */
function initLanguageToggle() {
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    let currentLang = 'es';

    langEs.addEventListener('click', () => switchLanguage('es'));
    langEn.addEventListener('click', () => switchLanguage('en'));

    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update button states
        langEs.classList.toggle('active', lang === 'es');
        langEn.classList.toggle('active', lang === 'en');

        // Update all translatable elements
        document.querySelectorAll('[data-es][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Handle elements with icons
                const icon = element.querySelector('i');
                if (icon) {
                    element.innerHTML = '';
                    element.appendChild(icon);
                    element.appendChild(document.createTextNode(' ' + text));
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder-es][data-placeholder-en]').forEach(input => {
            input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
        });

        // Update page title and meta
        if (lang === 'en') {
            document.title = 'Mildred Clemente Rios | Full Stack Web Developer';
            document.querySelector('meta[name="description"]').content = 
                'Mildred Clemente Rios - Full Stack Web Developer specialized in HTML, CSS, JavaScript, React, and WordPress. Contact me for your next web project.';
        } else {
            document.title = 'Mildred Clemente Rios | Desarrolladora Web Full Stack';
            document.querySelector('meta[name="description"]').content = 
                'Mildred Clemente Rios - Desarrolladora Web Full Stack especializada en HTML, CSS, JavaScript, React y WordPress. Contáctame para tu próximo proyecto web.';
        }

        // Update html lang attribute
        document.documentElement.lang = lang;
    }
}

/* ================================
   SCROLL ANIMATIONS
   ================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animatableElements = document.querySelectorAll(
        '.skill-card, .project-card, .about-content, .contact-content, .section-header'
    );

    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill progress bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.style.getPropertyValue('--progress');
                }
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => skillObserver.observe(card));
}

/* ================================
   CONTACT FORM
   ================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        const isSpanish = document.documentElement.lang === 'es';
        
        // Get form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        submitBtn.innerHTML = `<i class="ph ph-spinner"></i> ${isSpanish ? 'Enviando...' : 'Sending...'}`;
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        submitBtn.innerHTML = `<i class="ph ph-check-circle"></i> ${isSpanish ? '¡Mensaje Enviado!' : 'Message Sent!'}`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        // Reset form
        form.reset();

        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    function validateForm(data) {
        const isSpanish = document.documentElement.lang === 'es';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name.trim()) {
            showError(isSpanish ? 'Por favor ingresa tu nombre' : 'Please enter your name');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            showError(isSpanish ? 'Por favor ingresa un email válido' : 'Please enter a valid email');
            return false;
        }

        if (!data.subject.trim()) {
            showError(isSpanish ? 'Por favor ingresa un asunto' : 'Please enter a subject');
            return false;
        }

        if (!data.message.trim()) {
            showError(isSpanish ? 'Por favor ingresa un mensaje' : 'Please enter a message');
            return false;
        }

        return true;
    }

    function showError(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.innerHTML = `<i class="ph ph-warning-circle"></i> ${message}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.95rem;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

/* ================================
   SCROLL INDICATOR
   ================================ */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });

        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ================================
   TOAST ANIMATIONS (CSS in JS)
   ================================ */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .ph-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
