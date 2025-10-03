// Ultra-Modern Portfolio JavaScript
// Advanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCustomCursor();
    initNavigation();
    initThemeToggle();
    initSoundToggle();
    initTypewriter();
    initGlitchEffect();
    initMorphingShape();
    initStatsCounter();
    initSkillsSpheres();
    initProjectCards();
    initTimelineAnimation();
    initContactForm();
    initParticleSystem();
    initScrollAnimations();
    initKeyboardNavigation();
    initPerformanceOptimizations();
});

// Global variables
let soundEnabled = true;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Custom Cursor System
function initCustomCursor() {
    if (isReducedMotion) return;
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    // Smooth trail animation
    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        cursorTrail.style.left = trailX - 3 + 'px';
        cursorTrail.style.top = trailY - 3 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Interactive cursor effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-sphere');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.mixBlendMode = 'screen';
            playSound('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.mixBlendMode = 'difference';
        });
    });
}

// Navigation System
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                playSound('click');
            }
        });
    });
    
    // Active section detection
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === `#${sectionId}`) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Theme Toggle System
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-switcher');
    let isDark = true;
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.style.transition = 'all 0.5s ease';
        
        if (isDark) {
            document.documentElement.style.setProperty('--bg-darker', '#000000');
            document.documentElement.style.setProperty('--bg-dark', '#0a0a0a');
            themeToggle.innerHTML = '<span class="theme-icon">🌓</span>';
        } else {
            document.documentElement.style.setProperty('--bg-darker', '#1a1a1a');
            document.documentElement.style.setProperty('--bg-dark', '#2a2a2a');
            themeToggle.innerHTML = '<span class="theme-icon">🌞</span>';
        }
        
        playSound('switch');
    });
}

// Sound Toggle System
function initSoundToggle() {
    const soundToggle = document.querySelector('.sound-toggle');
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.innerHTML = soundEnabled ? 
            '<span class="sound-icon">🔊</span>' : 
            '<span class="sound-icon">🔇</span>';
        
        if (soundEnabled) {
            playSound('enable');
        }
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const text = typewriterElement.getAttribute('data-text');
    let index = 0;
    let isDeleting = false;
    
    function typeWriter() {
        if (isReducedMotion) {
            typewriterElement.textContent = text;
            return;
        }
        
        const currentText = isDeleting ? 
            text.substring(0, index--) : 
            text.substring(0, index++);
        
        typewriterElement.textContent = currentText;
        
        let timeout = isDeleting ? 50 : 150;
        
        if (!isDeleting && index === text.length) {
            timeout = 2000;
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            timeout = 500;
        }
        
        setTimeout(typeWriter, timeout);
    }
    
    setTimeout(typeWriter, 1000);
}

// Glitch Effect Enhancement
function initGlitchEffect() {
    if (isReducedMotion) return;
    
    const glitchElement = document.querySelector('.hero-name');
    
    function triggerGlitch() {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitchShake 0.5s ease-in-out';
        }, 10);
    }
    
    // Random glitch triggers
    setInterval(() => {
        if (Math.random() < 0.1) {
            triggerGlitch();
            playSound('glitch');
        }
    }, 3000);
}

// 3D Morphing Shape
function initMorphingShape() {
    if (isReducedMotion) return;
    
    const morphingShape = document.querySelector('.morphing-shape');
    let rotationX = 0;
    let rotationY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        rotationY = (e.clientX - centerX) * 0.02;
        rotationX = (e.clientY - centerY) * -0.02;
        
        morphingShape.style.transform = `
            translateY(${Math.sin(Date.now() * 0.001) * 10}px) 
            rotateX(${rotationX}deg) 
            rotateY(${rotationY}deg)
        `;
    });
    
    // Interactive shape morphing
    morphingShape.addEventListener('click', () => {
        const shapes = ['50%', '0%', '25% 75%', '50%'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const shapeInner = morphingShape.querySelector('.shape-inner');
        
        shapeInner.style.borderRadius = randomShape;
        playSound('morph');
        
        setTimeout(() => {
            shapeInner.style.borderRadius = '50%';
        }, 2000);
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
    
    function animateStats() {
        statItems.forEach((item, index) => {
            const target = parseInt(item.getAttribute('data-target'));
            const numberElement = item.querySelector('.stat-number');
            const suffix = item.querySelector('.stat-suffix').textContent;
            let current = 0;
            
            const increment = target / 50;
            
            setTimeout(() => {
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                        playSound('complete');
                    }
                    numberElement.textContent = Math.floor(current);
                }, 50);
            }, index * 200);
        });
    }
}

// Skills Spheres Interaction
function initSkillsSpheres() {
    const skillSpheres = document.querySelectorAll('.skill-sphere');
    
    skillSpheres.forEach((sphere, index) => {
        const level = parseInt(sphere.getAttribute('data-level'));
        const ring = sphere.querySelector('.sphere-ring');
        
        // Set ring animation based on skill level
        if (ring) {
            ring.style.animationDelay = `${index * 0.2}s`;
        }
        
        sphere.addEventListener('mouseenter', () => {
            if (!isReducedMotion) {
                sphere.style.transform = `scale(1.1) rotateY(${Math.random() * 360}deg)`;
            }
            playSound('skill');
        });
        
        sphere.addEventListener('mouseleave', () => {
            sphere.style.transform = 'scale(1) rotateY(0deg)';
        });
        
        sphere.addEventListener('click', () => {
            showSkillDetails(sphere);
        });
    });
}

function showSkillDetails(sphere) {
    const skillName = sphere.getAttribute('data-skill');
    const level = sphere.getAttribute('data-level');
    const category = sphere.getAttribute('data-category');
    
    // Create temporary tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <h4>${skillName}</h4>
        <p>Proficiency: ${level}%</p>
        <p>Category: ${category}</p>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        background: var(--glass-bg);
        backdrop-filter: blur(var(--blur-amount));
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 1rem;
        color: var(--color-white);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = sphere.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
    
    playSound('info');
}

// Project Cards Interaction
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            if (isReducedMotion) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                translateY(-20px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                ${card.classList.contains('featured') ? 'scale(1.1)' : ''}
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured') ? 
                'scale(1.05)' : 'scale(1)';
        });
        
        // Project modal
        card.addEventListener('click', () => {
            showProjectModal(index);
            playSound('open');
        });
        
        // Button interactions
        const demoBtn = card.querySelector('.demo-btn');
        const codeBtn = card.querySelector('.code-btn');
        
        if (demoBtn) {
            demoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playSound('demo');
                // In a real implementation, this would open the demo
                showNotification('Demo would open in a new tab');
            });
        }
        
        if (codeBtn) {
            codeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playSound('code');
                // In a real implementation, this would open GitHub
                showNotification('GitHub repository would open');
            });
        }
    });
}

// Project Modal System
function showProjectModal(projectIndex) {
    const projects = [
        {
            title: "Neural Network Visualizer",
            description: "Interactive 3D visualization of neural networks with real-time data flow animation",
            details: "This project showcases the power of Three.js and WebGL to create immersive data visualizations. The neural network comes alive with particle-based data flow, interactive node exploration, and real-time learning visualization.",
            technologies: ["Three.js", "React", "WebGL", "D3.js", "TensorFlow.js"],
            features: [
                "Real-time neural network training visualization",
                "Interactive 3D node exploration",
                "Particle-based data flow animation", 
                "Custom shader effects for enhanced visuals",
                "Performance optimized for 60fps rendering"
            ]
        },
        {
            title: "Holographic Dashboard",
            description: "Futuristic data dashboard with glassmorphism and holographic UI elements",
            details: "A cutting-edge dashboard interface that combines glassmorphism design principles with holographic UI elements. Built with modern CSS techniques and interactive animations.",
            technologies: ["React", "CSS3", "Chart.js", "GSAP", "Framer Motion"],
            features: [
                "Glassmorphism design implementation",
                "Real-time data visualization",
                "Smooth micro-interactions",
                "Responsive holographic effects",
                "Advanced CSS animations"
            ]
        },
        {
            title: "Morphing E-commerce",
            description: "E-commerce platform with shape-shifting product displays and micro-interactions",
            details: "An innovative e-commerce platform that reimagines product showcasing through morphing displays and engaging micro-interactions. Every interaction feels magical and purposeful.",
            technologies: ["Next.js", "Stripe", "Framer Motion", "GraphQL", "Shopify"],
            features: [
                "Shape-shifting product galleries",
                "Advanced micro-interactions",
                "Seamless checkout experience",
                "Real-time inventory updates",
                "Mobile-optimized interface"
            ]
        }
    ];
    
    const project = projects[projectIndex];
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = project.title;
    modalContent.innerHTML = `
        <div class="project-modal-content">
            <p class="project-modal-description">${project.details}</p>
            
            <div class="project-modal-section">
                <h4>Technologies Used</h4>
                <div class="tech-tags-modal">
                    ${project.technologies.map(tech => `<span class="tech-tag-modal">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-modal-section">
                <h4>Key Features</h4>
                <ul class="features-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-modal-actions">
                <button class="modal-btn demo-btn-modal">View Live Demo</button>
                <button class="modal-btn code-btn-modal">View Source Code</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Modal event listeners
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modalClose.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', closeProjectModal);
    
    document.addEventListener('keydown', handleModalKeydown);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeydown);
    playSound('close');
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
}

function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .project-modal-content {
            line-height: 1.6;
        }
        .project-modal-description {
            margin-bottom: 2rem;
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .project-modal-section {
            margin-bottom: 2rem;
        }
        .project-modal-section h4 {
            color: var(--neon-cyan);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        .tech-tags-modal {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .tech-tag-modal {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            color: var(--neon-pink);
        }
        .features-list {
            list-style: none;
            padding: 0;
        }
        .features-list li {
            position: relative;
            padding-left: 2rem;
            margin-bottom: 0.8rem;
            opacity: 0.9;
        }
        .features-list li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: var(--neon-green);
        }
        .project-modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        .modal-btn {
            padding: 0.8rem 1.5rem;
            border: 1px solid var(--glass-border);
            border-radius: 25px;
            background: var(--glass-bg);
            color: var(--color-white);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .demo-btn-modal:hover {
            background: var(--neon-cyan);
            color: var(--bg-darker);
        }
        .code-btn-modal:hover {
            background: var(--neon-pink);
            color: var(--bg-darker);
        }
    `;
    document.head.appendChild(styles);
}

// Timeline Animation
function initTimelineAnimation() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    playSound('timeline');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        timelineObserver.observe(card);
    });
}

// Contact Form Enhancement
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!validateForm(data)) {
            showNotification('Please fill in all fields correctly', 'error');
            playSound('error');
            return;
        }
        
        // Simulate form submission
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        
        // Add loading animation
        if (!isReducedMotion) {
            submitBtn.style.animation = 'pulse 1s ease-in-out infinite';
        }
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            playSound('success');
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
            playSound('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = 'Send Message';
            submitBtn.style.animation = '';
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(data) {
    const { name, email, subject, message } = data;
    return name && email && subject && message && isValidEmail(email);
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (!value) {
        isValid = false;
    } else if (field.type === 'email' && !isValidEmail(value)) {
        isValid = false;
    }
    
    field.classList.toggle('error', !isValid);
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Particle System
function initParticleSystem() {
    if (isReducedMotion) return;
    
    const particleContainer = document.querySelector('.particle-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.5;
        `;
        
        resetParticle(particle);
        particleContainer.appendChild(particle);
        animateParticle(particle);
    }
    
    function resetParticle(particle) {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
    }
    
    function animateParticle(particle) {
        const speed = Math.random() * 2 + 1;
        const drift = Math.random() * 2 - 1;
        
        function update() {
            const currentTop = parseFloat(particle.style.top);
            const currentLeft = parseFloat(particle.style.left);
            
            particle.style.top = (currentTop - speed) + 'px';
            particle.style.left = (currentLeft + drift) + 'px';
            
            if (currentTop < -10) {
                resetParticle(particle);
            }
            
            requestAnimationFrame(update);
        }
        
        update();
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glassmorphism-card, .stat-item, .skill-sphere, .project-card, .experience-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) scale(0.9)';
        element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        scrollObserver.observe(element);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (e.ctrlKey) {
                    e.preventDefault();
                    scrollToSection('prev');
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey) {
                    e.preventDefault();
                    scrollToSection('next');
                }
                break;
            case ' ':
                if (e.target === document.body) {
                    e.preventDefault();
                    const morphingShape = document.querySelector('.morphing-shape');
                    if (morphingShape) {
                        morphingShape.click();
                    }
                }
                break;
        }
    });
}

function scrollToSection(direction) {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
    });
    
    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;
        
        if (direction === 'next') {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        sections[targetIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        playSound('navigate');
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollPosition();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Intersection Observer for performance
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                element.classList.add('in-view');
            } else {
                element.classList.remove('in-view');
            }
        });
    });
    
    document.querySelectorAll('.skill-sphere, .project-card').forEach(el => {
        performanceObserver.observe(el);
    });
}

function updateScrollPosition() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.mesh-gradient');
    
    if (parallax && !isReducedMotion) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Sound System
function playSound(type) {
    if (!soundEnabled) return;
    
    // Create audio context for synthetic sounds
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = window.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Sound parameters based on type
    const sounds = {
        hover: { frequency: 800, duration: 0.1, type: 'sine' },
        click: { frequency: 1000, duration: 0.15, type: 'square' },
        switch: { frequency: 600, duration: 0.2, type: 'triangle' },
        glitch: { frequency: 200, duration: 0.3, type: 'sawtooth' },
        morph: { frequency: 400, duration: 0.5, type: 'sine' },
        complete: { frequency: 1200, duration: 0.3, type: 'sine' },
        skill: { frequency: 900, duration: 0.2, type: 'triangle' },
        open: { frequency: 700, duration: 0.25, type: 'sine' },
        close: { frequency: 500, duration: 0.2, type: 'sine' },
        success: { frequency: 1500, duration: 0.4, type: 'sine' },
        error: { frequency: 300, duration: 0.4, type: 'square' },
        navigate: { frequency: 1100, duration: 0.15, type: 'triangle' }
    };
    
    const sound = sounds[type] || sounds.click;
    
    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + sound.duration);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + sound.duration);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--glass-bg);
        backdrop-filter: blur(var(--blur-amount));
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--color-white);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--neon-green)';
        notification.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--neon-pink)';
        notification.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.3)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            showNotification('Portfolio loaded slower than expected. Some animations may be reduced.', 'info');
        }
    });
}

// Initialize additional features on interaction
document.addEventListener('click', initAudioContext, { once: true });
document.addEventListener('touchstart', initAudioContext, { once: true });

function initAudioContext() {
    if (window.audioContext && window.audioContext.state === 'suspended') {
        window.audioContext.resume();
    }
}

// Export functions for potential external use
window.portfolioAPI = {
    playSound,
    showNotification,
    toggleTheme: () => document.querySelector('.theme-switcher').click(),
    toggleSound: () => document.querySelector('.sound-toggle').click(),
    scrollToSection
};