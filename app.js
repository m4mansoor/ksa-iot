// IoT Presentation Application JavaScript - Fixed Navigation

class IoTPresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 20;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.createSlideIndicators();
        this.bindEvents();
        this.updateUI();
        this.showLoadingComplete();
    }
    
    cacheElements() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideIndicators = document.getElementById('slideIndicators');
        this.currentSlideDisplay = document.getElementById('current-slide');
        this.totalSlidesDisplay = document.getElementById('total-slides');
        
        if (!this.slides.length) {
            console.error('No slides found');
            return;
        }
        
        this.totalSlides = this.slides.length;
        if (this.totalSlidesDisplay) {
            this.totalSlidesDisplay.textContent = this.totalSlides;
        }
        
        console.log(`Found ${this.totalSlides} slides`);
    }
    
    createSlideIndicators() {
        if (!this.slideIndicators) return;
        
        this.slideIndicators.innerHTML = '';
        
        for (let i = 1; i <= this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === 1 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', i);
            indicator.setAttribute('aria-label', `Go to slide ${i}`);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            
            this.slideIndicators.appendChild(indicator);
        }
        
        console.log(`Created ${this.totalSlides} slide indicators`);
    }
    
    bindEvents() {
        // Navigation buttons with improved event handling
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Previous button clicked');
                this.previousSlide();
            });
            
            this.prevBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.previousSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                this.nextSlide();
            });
            
            this.nextBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        // Slide indicators - use event delegation with improved handling
        if (this.slideIndicators) {
            this.slideIndicators.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const indicator = e.target.closest('.indicator');
                if (indicator) {
                    const slideNum = parseInt(indicator.getAttribute('data-slide'));
                    console.log(`Indicator clicked for slide ${slideNum}`);
                    if (slideNum && slideNum >= 1 && slideNum <= this.totalSlides) {
                        this.goToSlide(slideNum);
                    }
                }
            });
            
            this.slideIndicators.addEventListener('keydown', (e) => {
                const indicator = e.target.closest('.indicator');
                if (indicator && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    const slideNum = parseInt(indicator.getAttribute('data-slide'));
                    if (slideNum && slideNum >= 1 && slideNum <= this.totalSlides) {
                        this.goToSlide(slideNum);
                    }
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe support
        this.bindTouchEvents();
        
        // Button interactions - bind after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.bindButtonEvents();
        }, 100);
    }
    
    bindTouchEvents() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        }, { passive: true });
    }
    
    bindButtonEvents() {
        // CTA Button functionality with improved selector
        const ctaButtons = document.querySelectorAll('.cta-section .btn, .btn[class*="primary"]');
        ctaButtons.forEach(button => {
            if (button.textContent.includes('Schedule') || button.textContent.includes('Assessment')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('CTA button clicked');
                    this.showContactModal();
                });
            }
        });
        
        // Interactive card hover effects
        this.addCardInteractivity();
    }
    
    addCardInteractivity() {
        const interactiveElements = [
            '.solution-card', '.sector-card', '.app-card', 
            '.summary-card', '.reason-item', '.use-case-card',
            '.opp-card', '.cap-card', '.feature-item'
        ];
        
        interactiveElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (!element.style.transition) {
                        element.style.transition = 'all 0.3s ease';
                    }
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });
            });
        });
    }
    
    handleKeyboard(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                this.showQuickNav();
                break;
        }
    }
    
    nextSlide() {
        if (this.isTransitioning || this.currentSlide >= this.totalSlides) {
            console.log('Cannot go to next slide - at end or transitioning');
            return;
        }
        console.log(`Moving to slide ${this.currentSlide + 1}`);
        this.goToSlide(this.currentSlide + 1);
    }
    
    previousSlide() {
        if (this.isTransitioning || this.currentSlide <= 1) {
            console.log('Cannot go to previous slide - at beginning or transitioning');
            return;
        }
        console.log(`Moving to slide ${this.currentSlide - 1}`);
        this.goToSlide(this.currentSlide - 1);
    }
    
    goToSlide(slideNumber) {
        if (this.isTransitioning || 
            slideNumber < 1 || 
            slideNumber > this.totalSlides || 
            slideNumber === this.currentSlide) {
            console.log(`Cannot go to slide ${slideNumber} - invalid or same slide`);
            return;
        }
        
        console.log(`Going to slide ${slideNumber} from ${this.currentSlide}`);
        this.isTransitioning = true;
        
        // Remove active class from current slide
        const currentSlideElement = this.slides[this.currentSlide - 1];
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }
        
        // Add active class to new slide
        const newSlideElement = this.slides[slideNumber - 1];
        if (newSlideElement) {
            newSlideElement.classList.add('active');
            console.log(`Activated slide ${slideNumber}`);
        } else {
            console.error(`Could not find slide element for slide ${slideNumber}`);
        }
        
        this.currentSlide = slideNumber;
        this.updateUI();
        
        setTimeout(() => {
            this.isTransitioning = false;
            console.log(`Transition to slide ${slideNumber} complete`);
        }, 300);
        
        this.trackSlideView(slideNumber);
    }
    
    updateUI() {
        // Update slide counter
        if (this.currentSlideDisplay) {
            this.currentSlideDisplay.textContent = this.currentSlide;
        }
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide <= 1;
            this.prevBtn.style.opacity = this.currentSlide <= 1 ? '0.5' : '1';
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide >= this.totalSlides;
            this.nextBtn.style.opacity = this.currentSlide >= this.totalSlides ? '0.5' : '1';
        }
        
        // Update indicators
        const indicators = this.slideIndicators?.querySelectorAll('.indicator');
        if (indicators) {
            indicators.forEach((indicator, index) => {
                if (index + 1 === this.currentSlide) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.removeAttribute('aria-current');
                }
            });
        }
        
        this.updatePageTitle();
    }
    
    updatePageTitle() {
        const slideTitles = [
            'Industrial IoT Solutions for Al Khobar',
            'Executive Summary',
            'Why Al Khobar First',
            'Market Opportunity',
            'IoT Solutions Portfolio',
            'AirWise - Smart Split AC',
            'AirWise Use Cases',
            'FireSense & IRIS Environmental Monitoring',
            'Data Center Solution Example',
            '4-20mA Sensor Digitization',
            '4-20mA Applications',
            'Energy Management Solutions',
            'Theft Protection System',
            'Target Sectors in Al Khobar',
            'Energy & Services Sector',
            'Logistics & Warehousing',
            'Water & Utilities Focus',
            'Implementation Approach',
            'Custom IoT Development',
            'Next Steps & Contact'
        ];
        
        if (this.currentSlide <= slideTitles.length) {
            document.title = `${slideTitles[this.currentSlide - 1]} | IoT Presentation`;
        }
    }
    
    showLoadingComplete() {
        document.body.classList.add('loaded');
        
        // Smooth entrance animation for first slide
        const firstSlide = document.querySelector('.slide.active');
        if (firstSlide) {
            firstSlide.style.opacity = '0';
            firstSlide.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                firstSlide.style.transition = 'all 0.6s ease-out';
                firstSlide.style.opacity = '1';
                firstSlide.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    showContactModal() {
        console.log('Showing contact modal');
        
        // Remove any existing modals
        const existingModal = document.querySelector('.contact-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modalHTML = `
            <div class="contact-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            ">
                <div class="modal-content" style="
                    background: var(--color-surface);
                    padding: var(--space-32);
                    border-radius: var(--radius-lg);
                    border: 2px solid var(--color-primary);
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    box-shadow: var(--shadow-lg);
                    animation: slideUp 0.3s ease-out;
                ">
                    <h3 style="color: var(--color-primary); margin-bottom: var(--space-16); font-size: var(--font-size-xl);">
                        Ready to Transform Your Operations?
                    </h3>
                    <p style="margin-bottom: var(--space-24); color: var(--color-text); line-height: 1.6;">
                        Contact our Al Khobar IoT specialists for a complimentary site assessment and custom proposal.
                    </p>
                    <div style="margin-bottom: var(--space-24); text-align: left; background: var(--color-bg-1); padding: var(--space-20); border-radius: var(--radius-md);">
                        <p style="margin-bottom: var(--space-12); color: var(--color-text); display: flex; align-items: center; gap: var(--space-8);"><strong style="color: var(--color-primary);">📧</strong> info@iot-solutions.sa</p>
                        <p style="margin-bottom: var(--space-12); color: var(--color-text); display: flex; align-items: center; gap: var(--space-8);"><strong style="color: var(--color-primary);">📱</strong> +966-13-XXX-XXXX</p>
                        <p style="color: var(--color-text); display: flex; align-items: center; gap: var(--space-8); margin: 0;"><strong style="color: var(--color-primary);">📍</strong> Al Khobar, Eastern Province</p>
                    </div>
                    <div style="display: flex; gap: var(--space-12); justify-content: center;">
                        <button class="modal-close-btn btn btn--secondary">
                            Close
                        </button>
                        <button class="modal-cta-btn btn btn--primary">
                            Schedule Assessment
                        </button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Bind close events
        const closeBtn = document.querySelector('.contact-modal .modal-close-btn');
        const ctaBtn = document.querySelector('.contact-modal .modal-cta-btn');
        const modal = document.querySelector('.contact-modal');
        
        const closeModal = () => {
            if (modal) {
                modal.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => modal.remove(), 300);
            }
        };
        
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            });
        }
        
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                alert('Assessment request submitted! We will contact you within 24 hours.');
                closeModal();
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    showQuickNav() {
        const existingModal = document.querySelector('.nav-modal');
        if (existingModal) {
            existingModal.remove();
            return;
        }
        
        const sections = [
            { slide: 1, title: 'Title Slide', icon: '🏠' },
            { slide: 2, title: 'Executive Summary', icon: '📋' },
            { slide: 5, title: 'Solutions Portfolio', icon: '🔧' },
            { slide: 6, title: 'AirWise Solution', icon: '❄️' },
            { slide: 8, title: 'FireSense & IRIS', icon: '🔥' },
            { slide: 10, title: '4-20mA Digitization', icon: '📊' },
            { slide: 12, title: 'Energy Management', icon: '⚡' },
            { slide: 14, title: 'Target Sectors', icon: '🏭' },
            { slide: 18, title: 'Implementation', icon: '🚀' },
            { slide: 20, title: 'Contact', icon: '📞' }
        ];
        
        const navLinks = sections.map(section => `
            <button class="nav-link-btn btn btn--outline" data-slide="${section.slide}" 
                    style="margin-bottom: var(--space-8); display: flex; align-items: center; gap: var(--space-8); width: 100%; justify-content: flex-start;">
                <span style="font-size: 1.2em;">${section.icon}</span>
                <span>Slide ${section.slide}: ${section.title}</span>
            </button>
        `).join('');
        
        const menuHTML = `
            <div class="nav-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            ">
                <div style="
                    background: var(--color-surface);
                    padding: var(--space-32);
                    border-radius: var(--radius-lg);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    border: 2px solid var(--color-primary);
                    animation: slideUp 0.3s ease-out;
                ">
                    <h3 style="color: var(--color-primary); margin-bottom: var(--space-24); text-align: center; font-size: var(--font-size-xl);">
                        Quick Navigation
                    </h3>
                    <div style="margin-bottom: var(--space-24);">
                        ${navLinks}
                    </div>
                    <div style="text-align: center;">
                        <button class="modal-close-btn btn btn--secondary">
                            Close Menu
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // Bind close event
        const closeBtn = document.querySelector('.nav-modal .modal-close-btn');
        const modal = document.querySelector('.nav-modal');
        
        const closeModal = () => {
            if (modal) {
                modal.remove();
            }
        };
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    }
    
    trackSlideView(slideNumber) {
        console.log(`Slide ${slideNumber} viewed`);
        // Analytics could be added here
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing IoT Presentation App');
    window.app = new IoTPresentationApp();
    
    // Global event delegation for navigation links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link-btn') || e.target.closest('.nav-link-btn')) {
            const button = e.target.classList.contains('nav-link-btn') ? e.target : e.target.closest('.nav-link-btn');
            const slideNum = parseInt(button.getAttribute('data-slide'));
            if (slideNum && window.app) {
                window.app.goToSlide(slideNum);
                const modal = document.querySelector('.nav-modal');
                if (modal) modal.remove();
            }
        }
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'f':
                    e.preventDefault();
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch(() => {
                            console.log('Fullscreen not supported');
                        });
                    } else {
                        document.exitFullscreen();
                    }
                    break;
                case 'm':
                    e.preventDefault();
                    if (window.app) {
                        window.app.showQuickNav();
                    }
                    break;
            }
        }
    });
    
    // Performance monitoring
    if (window.performance && window.performance.measure) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Presentation loaded in ${loadTime}ms`);
            }, 0);
        });
    }
    
    // Viewport height adjustment for mobile
    const adjustViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    adjustViewportHeight();
    window.addEventListener('resize', adjustViewportHeight);
    window.addEventListener('orientationchange', adjustViewportHeight);
});

// Utility functions for presentation management
const PresentationUtils = {
    printSummary() {
        const slides = document.querySelectorAll('.slide h1');
        const summary = Array.from(slides).map((slide, index) => 
            `${index + 1}. ${slide.textContent}`
        ).join('\n');
        
        console.log('Presentation Summary:\n' + summary);
        return summary;
    },
    
    exportSlideContent(slideNumber) {
        const slide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
        if (!slide) return '';
        
        return slide.textContent.trim();
    },
    
    startAutoAdvance(intervalSeconds = 30) {
        if (window.autoAdvanceInterval) {
            clearInterval(window.autoAdvanceInterval);
        }
        
        window.autoAdvanceInterval = setInterval(() => {
            if (window.app && window.app.getCurrentSlide() < window.app.getTotalSlides()) {
                window.app.nextSlide();
            } else {
                clearInterval(window.autoAdvanceInterval);
            }
        }, intervalSeconds * 1000);
    },
    
    stopAutoAdvance() {
        if (window.autoAdvanceInterval) {
            clearInterval(window.autoAdvanceInterval);
            window.autoAdvanceInterval = null;
        }
    }
};

// Make utilities globally accessible
window.PresentationUtils = PresentationUtils;

// Add some helpful console messages
console.log('IoT Presentation loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('  Arrow keys / Space: Navigate slides');
console.log('  Home/End: Go to first/last slide');
console.log('  Escape: Quick navigation menu');
console.log('  Ctrl/Cmd + F: Toggle fullscreen');
console.log('  Ctrl/Cmd + M: Quick navigation');
console.log('Use PresentationUtils for additional features.');
