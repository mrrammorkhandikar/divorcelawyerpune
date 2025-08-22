// Advanced Animations for Lawyers Website

// Animation controller
class AnimationController {
    constructor() {
        this.animatedElements = new Set();
        this.intersectionObserver = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
        this.setupTextAnimations();
        this.setupLoadingAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observe all elements with animation classes
        const elements = document.querySelectorAll('.animate-on-scroll, .fade-in, .slide-in, .scale-in');
        elements.forEach(el => this.intersectionObserver.observe(el));
    }

    animateElement(element) {
        if (this.animatedElements.has(element)) return;
        
        this.animatedElements.add(element);
        
        const animationType = this.getAnimationType(element);
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
            element.classList.add('animated');
            this.triggerCustomAnimation(element, animationType);
        }, delay);
    }

    getAnimationType(element) {
        if (element.classList.contains('fade-in')) return 'fadeIn';
        if (element.classList.contains('slide-in')) return 'slideIn';
        if (element.classList.contains('scale-in')) return 'scaleIn';
        if (element.classList.contains('bounce-in')) return 'bounceIn';
        return 'default';
    }

    triggerCustomAnimation(element, type) {
        switch (type) {
            case 'fadeIn':
                element.style.animation = 'fadeIn 0.8s ease-out forwards';
                break;
            case 'slideIn':
                const direction = element.dataset.direction || 'left';
                element.style.animation = `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} 0.8s ease-out forwards`;
                break;
            case 'scaleIn':
                element.style.animation = 'scaleIn 0.6s ease-out forwards';
                break;
            case 'bounceIn':
                element.style.animation = 'bounceIn 1s ease-out forwards';
                break;
        }
    }

    setupScrollAnimations() {
        // Parallax scrolling effects
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Sticky elements
        const stickyElements = document.querySelectorAll('.sticky');
        
        window.addEventListener('scroll', () => {
            stickyElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const threshold = element.dataset.threshold || 100;
                
                if (rect.top <= threshold) {
                    element.classList.add('stuck');
                } else {
                    element.classList.remove('stuck');
                }
            });
        });
    }

    setupHoverAnimations() {
        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card, 'serviceCardHover');
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card, 'serviceCardHover');
            });
        });

        // Team member hover effects
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                this.addHoverEffect(member, 'teamMemberHover');
            });
            
            member.addEventListener('mouseleave', () => {
                this.removeHoverEffect(member, 'teamMemberHover');
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addHoverEffect(button, 'buttonHover');
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeHoverEffect(button, 'buttonHover');
            });
        });
    }

    addHoverEffect(element, effectType) {
        element.classList.add(`hover-${effectType}`);
        
        // Add ripple effect for buttons
        if (effectType === 'buttonHover') {
            this.createRippleEffect(element);
        }
    }

    removeHoverEffect(element, effectType) {
        element.classList.remove(`hover-${effectType}`);
    }

    createRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupParallaxEffects() {
        // Hero section parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }

        // Background parallax
        const backgrounds = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            backgrounds.forEach(bg => {
                const speed = bg.dataset.speed || 0.3;
                const yPos = scrolled * speed;
                bg.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupTextAnimations() {
        // Text reveal animations
        const textElements = document.querySelectorAll('.text-reveal');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });

        // Typewriter effect
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            this.typewriterEffect(element);
        });
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                element.style.borderRight = 'none';
            }
        }, 100);
    }

    setupLoadingAnimations() {
        // Page load animations
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });

        // Loading spinner
        const loadingSpinners = document.querySelectorAll('.loading-spinner');
        
        loadingSpinners.forEach(spinner => {
            this.animateSpinner(spinner);
        });
    }

    animatePageLoad() {
        const elements = document.querySelectorAll('.page-load-animation');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 200);
        });
    }

    animateSpinner(spinner) {
        let rotation = 0;
        
        const animate = () => {
            rotation += 10;
            spinner.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Counter animation with easing
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.startValue = 0;
        this.isAnimating = false;
    }

    start() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.startTime = performance.now();
        this.startValue = parseInt(this.element.textContent) || 0;
        
        this.animate();
    }

    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        // Easing function (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(this.startValue + (this.target - this.startValue) * easedProgress);
        this.element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.isAnimating = false;
            this.element.textContent = this.target;
        }
    }
}

// Smooth scroll with easing
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            });
        });
    }

    scrollToElement(element, duration = 1000) {
        const targetPosition = element.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Particle system for background effects
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleSize: options.particleSize || 2,
            particleColor: options.particleColor || '#ffffff',
            particleSpeed: options.particleSpeed || 1,
            ...options
        };
        
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${this.options.particleSize}px;
                height: ${this.options.particleSize}px;
                background: ${this.options.particleColor};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                pointer-events: none;
            `;
            
            this.resetParticle(particle);
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    resetParticle(particle) {
        const containerRect = this.container.getBoundingClientRect();
        particle.style.left = Math.random() * containerRect.width + 'px';
        particle.style.top = containerRect.height + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    }

    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            if (rect.top < -10) {
                this.resetParticle(particle);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    const animationController = new AnimationController();
    
    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();
    
    // Initialize counter animations
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const counterAnimation = new CounterAnimation(counter, target);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counterAnimation.start();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Initialize particle system for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new ParticleSystem(heroSection, {
            particleCount: 30,
            particleSize: 3,
            particleColor: 'rgba(255, 255, 255, 0.3)',
            particleSpeed: 0.5
        });
    }
    
    // Add CSS for new animations
    this.addAnimationStyles();
});

// Add additional CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Ripple effect */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Particle animation */
        .particle {
            animation: float-up linear infinite;
        }
        
        @keyframes float-up {
            to {
                transform: translateY(-100vh);
            }
        }
        
        /* Sticky animation */
        .sticky {
            transition: all 0.3s ease;
        }
        
        .sticky.stuck {
            position: fixed;
            top: 80px;
            z-index: 100;
        }
        
        /* Text reveal animation */
        .text-reveal span {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: text-reveal 0.6s ease-out forwards;
        }
        
        @keyframes text-reveal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Typewriter effect */
        .typewriter {
            overflow: hidden;
            white-space: nowrap;
        }
        
        /* Page load animation */
        .page-load-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .page-load-animation.loaded {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Hover effects */
        .service-card.hover-serviceCardHover {
            transform: translateY(-15px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .team-member.hover-teamMemberHover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .btn.hover-buttonHover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
    `;
    
    document.head.appendChild(style);
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        CounterAnimation,
        SmoothScroll,
        ParticleSystem
    };
}
