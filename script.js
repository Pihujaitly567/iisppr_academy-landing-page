document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. LOADING SCREEN =====
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2800);
    });
    // Fallback: hide loader after 4s max
    setTimeout(() => { loadingScreen.classList.add('hidden'); }, 4000);

    // ===== 2. HERO IMAGE SLIDESHOW =====
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(parseInt(dot.dataset.slide));
            startSlideshow();
        });
    });

    if (slides.length > 0) startSlideshow();

    // ===== 3. NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Scroll to top button
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 4. MOBILE MENU TOGGLE =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ===== 5. SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ===== 6. SMOOTH FAQ ACCORDION =====
    const details = document.querySelectorAll('details');
    details.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            details.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });

    // ===== 7. TILT CARD EFFECT =====
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ===== 8. MAGNETIC BUTTON EFFECT =====
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ===== 9. CUSTOM CURSOR GLOW =====
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        // Show immediately if mouse is already in window
        cursorGlow.style.opacity = '1';
    }
});
