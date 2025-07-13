document.addEventListener('DOMContentLoaded', function() {
    
    // Hero slider functionality
    initHeroSlider();
    
    // Initialize counter animations
    initCounterAnimations();
    

});
/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        // Add scroll class on page load if not at top
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        
        // Add/remove scroll class on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}



/**
 * Initialize hero slider functionality
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Move to next slide
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) newIndex = 0;
        showSlide(newIndex);
    }
    
    // Move to previous slide
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slideCount - 1;
        showSlide(newIndex);
    }
    
    // Add event listeners to controls
    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide();
        resetSlideInterval();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide();
        resetSlideInterval();
    });
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Automatic slide rotation
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Start automatic rotation
    startSlideInterval();
    
    // Pause rotation on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startSlideInterval);
    }
}

/**
 * Initialize counter animations
 */
function initCounterAnimations() {
    // Counter animation function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                if (counter) {
                    const finalValue = parseInt(counter.textContent);
                    
                    // Reset counter and animate
                    counter.textContent = '0';
                    animateCounter(counter, 0, finalValue, 2000);
                    
                    // Add animation class
                    counter.classList.add('counter-animated');
                    
                    // Stop observing this element
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all job cards (with delay to ensure DOM is ready)
    setTimeout(() => {
        document.querySelectorAll('.job').forEach(job => {
            observer.observe(job);
        });
    }, 100);
}



