// Enhanced Effects for Lawyers Website

// Avoid redefining if another script already declared these
if (!window.ParticleSystem) {
    class ParticleSystem {
        constructor(container) {
            this.container = container;
            this.particles = [];
            this.particleCount = 20;
            this.init();
        }

        init() {
            this.createParticles();
            this.animate();
        }

        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                this.container.appendChild(particle);
                this.particles.push(particle);
            }
        }

        animate() {
            this.particles.forEach(particle => {
                particle.style.transform = `translateY(${Math.random() * 20 - 10}px)`;
            });
        }
    }
    window.ParticleSystem = ParticleSystem;
}

class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initTypingEffect();
        this.initProgressBars();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add specific animation classes based on data attributes
                    const animationType = entry.target.dataset.animation;
                    if (animationType) {
                        entry.target.classList.add(animationType);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    initHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add shimmer effect to buttons
        const buttons = document.querySelectorAll('.btn-hover');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('shimmer');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('shimmer');
            });
        });
    }

    initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-animation');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    element.style.width = ((i + 1) / text.length * 100) + '%';
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing after a delay
            setTimeout(typeWriter, 1000);
        });
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            if (fill) {
                const percentage = fill.dataset.percentage || 100;
                fill.style.width = percentage + '%';
            }
        });
    }
}

class ImageLazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

class SmoothScrollEnhanced {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

class CounterAnimationEnhanced {
    constructor() {
        this.init();
    }

    init() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
}

// Initialize all enhanced effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        new ParticleSystem(particlesContainer);
    }

    // Initialize other enhanced effects
    new ParallaxEffect();
    new EnhancedAnimations();
    new ImageLazyLoader();
    new SmoothScrollEnhanced();
    new CounterAnimationEnhanced();

    // Add loading animation
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add cursor trail effect
    let cursorTrail = [];
    const trailLength = 20;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }

        // Create or update trail elements
        cursorTrail.forEach((pos, index) => {
            let trailElement = document.getElementById(`trail-${index}`);
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `trail-${index}`;
                trailElement.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    opacity: ${1 - (index / trailLength)};
                    transform: translate(${pos.x}px, ${pos.y}px);
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(trailElement);
            } else {
                trailElement.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            }
        });
    });
});

// Export classes for potential use in other scripts
window.ParallaxEffect = ParallaxEffect;
window.EnhancedAnimations = EnhancedAnimations;
window.ImageLazyLoader = ImageLazyLoader;
window.SmoothScrollEnhanced = SmoothScrollEnhanced;
window.CounterAnimationEnhanced = CounterAnimationEnhanced;
