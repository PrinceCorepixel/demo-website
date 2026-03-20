document.getElementById('consultationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation / feedback
    const email = this.querySelector('input[type="email"]').value;

    alert(`Thank you! A consultation request has been sent for ${email}.`);
    this.reset();
});

// Scroll Animations & Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Observer setup for fade up animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateSelectors = [
        '.hero-text-col h1',
        '.hero-text-col p',
        '.hero-text-col .btn',
        '.floating-card',
        '.strategy-section .container.text-center',
        '.grid-item',
        '.empower-image-wrapper',
        '.empower-section h2',
        '.empower-section p',
        '.empower-divider',
        '.empower-section .btn',
        '.stat-card',
        '.challenges-image-wrapper',
        '.challenges-content-card',
        '.ticker-wrapper',
        '.industries-section',
        '.industries-image-wrapper',
        '.testimonials-section',
        '.testimonial-box',
        '.cta-collaborate-section',
        '.site-footer',
        '.footer-col',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
    ];

    const elementsToAnimate = document.querySelectorAll(animateSelectors.join(', '));

    // Add base transition class and observe
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('fade-in-up');
        // Stagger grid items animations for a cascading effect
        if (el.classList.contains('grid-item')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        } else if (el.closest('.empower-section') && !el.classList.contains('empower-image-wrapper')) {
            // Slight stagger for empower text section items
            el.style.transitionDelay = `${(index % 5) * 0.15}s`;
        }
        observer.observe(el);
    });

    // Count up animation observer
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // ms
                const stepTime = Math.abs(Math.floor(duration / target));
                let current = 0;

                const timer = setInterval(() => {
                    current += 1;
                    entry.target.innerText = current;
                    if (current === target) {
                        clearInterval(timer);
                    }
                }, stepTime);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const countUpElements = document.querySelectorAll('.count-up');
    countUpElements.forEach(el => countUpObserver.observe(el));

    // Services Slider Logic
    const initServicesSlider = () => {
        const track = document.getElementById('servicesSliderTrack');
        const prevBtn = document.getElementById('servicesPrevBtn');
        const nextBtn = document.getElementById('servicesNextBtn');

        if (track && prevBtn && nextBtn) {
            let currentPos = 0;

            const updateSlider = () => {
                track.style.transform = `translateX(-${currentPos}px)`;
            };

            const slide = (direction) => {
                const cardWrapper = track.querySelector('.service-card-wrapper');
                if (!cardWrapper) return;

                const cardStyle = window.getComputedStyle(cardWrapper);
                const cardWidth = cardWrapper.offsetWidth + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);

                const visibleWidth = track.parentElement.offsetWidth;
                const maxScroll = Math.max(0, track.scrollWidth - visibleWidth);

                if (direction === 'next' && currentPos < maxScroll) {
                    currentPos += cardWidth;
                    if (currentPos > maxScroll) currentPos = maxScroll;
                } else if (direction === 'prev' && currentPos > 0) {
                    currentPos -= cardWidth;
                    if (currentPos < 0) currentPos = 0;
                }
                updateSlider();
            };

            nextBtn.addEventListener('click', () => slide('next'));
            prevBtn.addEventListener('click', () => slide('prev'));

            window.addEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    currentPos = 0;
                    updateSlider();
                } else {
                    const visibleWidth = track.parentElement.offsetWidth;
                    const maxScroll = Math.max(0, track.scrollWidth - visibleWidth);
                    if (currentPos > maxScroll) {
                        currentPos = maxScroll;
                        updateSlider();
                    }
                }
            });
        }
    };
    initServicesSlider();

    // Testimonial Data Slider Logic
    const initTestimonialSlider = () => {
        const tBox = document.getElementById('testimonialBox');
        const tContentBox = document.getElementById('testimonialContentBox');
        const tName = document.getElementById('testimonialName');
        const tRole = document.getElementById('testimonialRole');
        const tQuote = document.getElementById('testimonialQuoteText');

        const prevBtns = document.querySelectorAll('.test-prev');
        const nextBtns = document.querySelectorAll('.test-next');

        const testimonials = [
            {
                name: 'Jonathan Cheng',
                role: 'Merits Health Products Co., Ltd.',
                quote: 'We wanted to send you our deep appreciation for all the hard work you and your team have put in to help us achieve this important milestone! Special thanks to Susan and Vaibhav who have guided us through the process in such a dedicated.'
            },
            {
                name: 'Sarah Jenkins',
                role: 'TechFlow Solutions Inc.',
                quote: 'We would like to express our sincere gratitude for all the incredible effort you and your team have invested to support us in reaching this significant milestone! Special appreciation to Susan and Vaibhav who have supported us throughout the journey in such a committed'
            }
        ];

        if (tBox && tContentBox && prevBtns.length > 0 && nextBtns.length > 0) {
            let currentIndex = 0;

            const updateContent = (index) => {
                tContentBox.style.opacity = '0';
                setTimeout(() => {
                    const data = testimonials[index];
                    tName.textContent = data.name;
                    tRole.textContent = data.role;
                    tQuote.textContent = data.quote;
                    tContentBox.style.opacity = '1';
                }, 300); // Wait for fade out
            };

            nextBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    updateContent(currentIndex);
                });
            });

            prevBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    updateContent(currentIndex);
                });
            });
        }
    };
    initTestimonialSlider();
});