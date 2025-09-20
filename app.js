// Enhanced Tech Portfolio Interactive Features - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Smooth Scrolling Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    const heroBtn = document.querySelector('.hero-btn');
    const heroBtnSecondary = document.querySelector('.hero-btn-secondary');
    
    // Fix navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix hero buttons
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const expertiseSection = document.querySelector('#expertise');
            if (expertiseSection) {
                const offsetTop = expertiseSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (heroBtnSecondary) {
        heroBtnSecondary.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Enhanced Notification System - Define First
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.enhanced-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `enhanced-notification ${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const notificationStyle = document.createElement('style');
            notificationStyle.id = 'notification-styles';
            notificationStyle.textContent = `
                .enhanced-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--color-teal-400), var(--color-teal-500));
                    color: var(--color-slate-900);
                    padding: var(--space-16) var(--space-20);
                    border-radius: var(--radius-lg);
                    font-weight: var(--font-weight-medium);
                    z-index: 9999;
                    animation: notificationSlideIn 0.4s ease-out, notificationFadeOut 0.4s ease-out 4.6s;
                    box-shadow: 0 15px 30px rgba(var(--color-teal-400-rgb), 0.4);
                    display: flex;
                    align-items: center;
                    gap: var(--space-12);
                    max-width: 400px;
                    border: 1px solid rgba(var(--color-teal-300-rgb), 0.5);
                }
                
                .enhanced-notification.error {
                    background: linear-gradient(135deg, var(--color-red-400), var(--color-red-500));
                    box-shadow: 0 15px 30px rgba(var(--color-red-400-rgb), 0.4);
                }
                
                .notification-icon {
                    font-size: var(--font-size-xl);
                    flex-shrink: 0;
                }
                
                .notification-content {
                    flex: 1;
                }
                
                .notification-message {
                    margin: 0;
                    font-size: var(--font-size-sm);
                    line-height: var(--line-height-normal);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--color-slate-900);
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    padding: var(--space-4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    opacity: 0.7;
                }
                
                .notification-close:hover {
                    opacity: 1;
                    background: rgba(0, 0, 0, 0.1);
                    transform: scale(1.1);
                }
                
                @keyframes notificationSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes notificationFadeOut {
                    to { opacity: 0; transform: translateX(100%); }
                }
                
                @media (max-width: 768px) {
                    .enhanced-notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(notificationStyle);
        }
        
        document.body.appendChild(notification);
        
        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
        }
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Enhanced Contact Modal - Define Second
    function showEnhancedContactModal() {
        // Remove existing modal if any
        const existingModal = document.querySelector('.enhanced-contact-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'enhanced-contact-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">🚀</div>
                    <div class="modal-title-section">
                        <h3>Let's Build Something Amazing Together</h3>
                        <p>Transform your business with cutting-edge IoT solutions</p>
                    </div>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-features">
                        <div class="modal-feature">
                            <div class="feature-icon">⚡</div>
                            <div class="feature-text">
                                <h4>Rapid Prototyping</h4>
                                <p>From concept to working prototype in weeks</p>
                            </div>
                        </div>
                        <div class="modal-feature">
                            <div class="feature-icon">🌐</div>
                            <div class="feature-text">
                                <h4>Scalable Solutions</h4>
                                <p>Enterprise-ready systems with global deployment capability</p>
                            </div>
                        </div>
                        <div class="modal-feature">
                            <div class="feature-icon">🔧</div>
                            <div class="feature-text">
                                <h4>Full Support</h4>
                                <p>24/7 monitoring, maintenance, and technical support</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-services">
                        <h4>Featured Solutions</h4>
                        <div class="service-highlights">
                            <div class="service-highlight">
                                <span class="service-name">Smart Agriculture (Remotewell)</span>
                                <span class="service-benefit">40% Water Savings</span>
                            </div>
                            <div class="service-highlight">
                                <span class="service-name">HVAC Control (AIRWISE)</span>
                                <span class="service-benefit">30% Energy Reduction</span>
                            </div>
                            <div class="service-highlight">
                                <span class="service-name">Fire Detection (Firesense)</span>
                                <span class="service-benefit">99.9% Accuracy</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-methods">
                        <div class="contact-method premium">
                            <div class="method-icon">📧</div>
                            <div class="method-text">
                                <div class="method-label">Email Consultation</div>
                                <div class="method-value">[Professional Email Available]</div>
                                <div class="method-desc">Get detailed project analysis and proposals</div>
                            </div>
                        </div>
                        <div class="contact-method premium">
                            <div class="method-icon">💼</div>
                            <div class="method-text">
                                <div class="method-label">LinkedIn Connect</div>
                                <div class="method-value">[Professional Profile Available]</div>
                                <div class="method-desc">Connect for industry insights and collaboration</div>
                            </div>
                        </div>
                        <div class="contact-method premium">
                            <div class="method-icon">🏢</div>
                            <div class="method-text">
                                <div class="method-label">Enterprise Solutions</div>
                                <div class="method-value">OLIVE TS - Rawalpindi, Pakistan</div>
                                <div class="method-desc">Full-scale enterprise IoT implementation</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-cta">
                        <button class="btn btn--primary modal-btn-primary">Schedule Free Consultation</button>
                        <button class="btn btn--outline modal-btn-secondary">Download Portfolio</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add enhanced modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const modalStyle = document.createElement('style');
            modalStyle.id = 'modal-styles';
            modalStyle.textContent = `
                .enhanced-contact-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: modalFadeIn 0.4s ease-out;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    background: linear-gradient(135deg, var(--color-charcoal-800), var(--color-slate-900));
                    border: 1px solid rgba(var(--color-teal-400-rgb), 0.3);
                    border-radius: var(--radius-lg);
                    padding: 0;
                    max-width: 700px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: modalSlideIn 0.4s ease-out;
                    position: relative;
                    z-index: 1;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }
                
                .modal-header {
                    display: flex;
                    align-items: center;
                    gap: var(--space-16);
                    padding: var(--space-24);
                    border-bottom: 1px solid rgba(var(--color-teal-400-rgb), 0.2);
                    background: rgba(var(--color-teal-400-rgb), 0.05);
                }
                
                .modal-icon {
                    font-size: var(--font-size-4xl);
                    flex-shrink: 0;
                }
                
                .modal-title-section h3 {
                    color: var(--color-teal-300);
                    margin: 0 0 var(--space-8) 0;
                    font-size: var(--font-size-xl);
                }
                
                .modal-title-section p {
                    color: var(--color-gray-400);
                    margin: 0;
                    font-size: var(--font-size-sm);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: var(--color-gray-300);
                    font-size: var(--font-size-2xl);
                    cursor: pointer;
                    padding: 0;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    margin-left: auto;
                    flex-shrink: 0;
                }
                
                .modal-close:hover {
                    background: rgba(var(--color-red-400-rgb), 0.2);
                    color: var(--color-red-400);
                    transform: scale(1.1);
                }
                
                .modal-body {
                    padding: var(--space-24);
                }
                
                .modal-features {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-16);
                    margin-bottom: var(--space-24);
                }
                
                .modal-feature {
                    display: flex;
                    align-items: center;
                    gap: var(--space-16);
                    padding: var(--space-16);
                    background: rgba(var(--color-teal-400-rgb), 0.08);
                    border: 1px solid rgba(var(--color-teal-400-rgb), 0.2);
                    border-radius: var(--radius-base);
                    transition: all 0.3s ease;
                }
                
                .modal-feature:hover {
                    background: rgba(var(--color-teal-400-rgb), 0.12);
                    transform: translateX(5px);
                }
                
                .feature-icon {
                    font-size: var(--font-size-2xl);
                    flex-shrink: 0;
                }
                
                .feature-text h4 {
                    color: var(--color-gray-200);
                    margin: 0 0 var(--space-4) 0;
                    font-size: var(--font-size-base);
                }
                
                .feature-text p {
                    color: var(--color-gray-400);
                    margin: 0;
                    font-size: var(--font-size-sm);
                }
                
                .modal-services {
                    margin-bottom: var(--space-24);
                    padding: var(--space-20);
                    background: rgba(var(--color-orange-400-rgb), 0.05);
                    border-radius: var(--radius-base);
                    border: 1px solid rgba(var(--color-orange-400-rgb), 0.2);
                }
                
                .modal-services h4 {
                    color: var(--color-orange-400);
                    margin: 0 0 var(--space-16) 0;
                    font-size: var(--font-size-lg);
                    text-align: center;
                }
                
                .service-highlights {
                    display: grid;
                    gap: var(--space-12);
                }
                
                .service-highlight {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-12);
                    background: rgba(var(--color-slate-900-rgb), 0.3);
                    border-radius: var(--radius-sm);
                    border: 1px solid rgba(var(--color-orange-400-rgb), 0.2);
                }
                
                .service-name {
                    color: var(--color-gray-200);
                    font-weight: var(--font-weight-medium);
                }
                
                .service-benefit {
                    color: var(--color-orange-400);
                    font-weight: var(--font-weight-semibold);
                    font-size: var(--font-size-sm);
                }
                
                .contact-methods {
                    display: grid;
                    gap: var(--space-16);
                    margin-bottom: var(--space-24);
                }
                
                .contact-method.premium {
                    background: rgba(var(--color-teal-400-rgb), 0.1);
                    border: 1px solid rgba(var(--color-teal-400-rgb), 0.3);
                    border-radius: var(--radius-base);
                    padding: var(--space-16);
                    display: flex;
                    align-items: flex-start;
                    gap: var(--space-16);
                    transition: all 0.3s ease;
                }
                
                .contact-method.premium:hover {
                    background: rgba(var(--color-teal-400-rgb), 0.15);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(var(--color-teal-400-rgb), 0.2);
                }
                
                .method-icon {
                    font-size: var(--font-size-2xl);
                    flex-shrink: 0;
                }
                
                .method-label {
                    font-size: var(--font-size-base);
                    color: var(--color-teal-300);
                    font-weight: var(--font-weight-semibold);
                    margin-bottom: var(--space-4);
                }
                
                .method-value {
                    color: var(--color-gray-200);
                    font-weight: var(--font-weight-medium);
                    margin-bottom: var(--space-4);
                    font-size: var(--font-size-sm);
                }
                
                .method-desc {
                    color: var(--color-gray-400);
                    font-size: var(--font-size-sm);
                    margin: 0;
                }
                
                .modal-cta {
                    display: flex;
                    gap: var(--space-16);
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .modal-btn-primary, .modal-btn-secondary {
                    padding: var(--space-12) var(--space-24);
                    border-radius: var(--radius-base);
                    font-weight: var(--font-weight-medium);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes modalSlideIn {
                    from { transform: translateY(-30px) scale(0.95); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                
                @keyframes modalFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        width: 95%;
                        max-height: 95vh;
                    }
                    
                    .modal-header {
                        flex-direction: column;
                        text-align: center;
                        gap: var(--space-12);
                    }
                    
                    .modal-close {
                        position: absolute;
                        top: var(--space-16);
                        right: var(--space-16);
                        margin: 0;
                    }
                    
                    .modal-cta {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(modalStyle);
        }
        
        // Enhanced modal event handlers
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const primaryBtn = modal.querySelector('.modal-btn-primary');
        const secondaryBtn = modal.querySelector('.modal-btn-secondary');
        
        function closeModal() {
            if (modal && modal.parentNode) {
                modal.style.animation = 'modalFadeOut 0.3s ease-out';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', () => {
                closeModal();
                setTimeout(() => showNotification('Consultation request submitted! We\'ll contact you within 24 hours.'), 300);
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => {
                closeModal();
                setTimeout(() => showNotification('Portfolio download started! Check your downloads folder.'), 300);
            });
        }
        
        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    // Enhanced Contact Button Interactions - Fixed
    function setupContactButtons() {
        // Setup all contact-related buttons
        const contactSelectors = [
            '.contact-cta .btn',
            '.service-btn',
            '.modal-btn-primary',
            '.modal-btn-secondary'
        ];
        
        contactSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(btn => {
                // Remove existing listeners to prevent duplicates
                btn.removeEventListener('click', handleContactButtonClick);
                // Add new listener
                btn.addEventListener('click', handleContactButtonClick);
            });
        });
        
        function handleContactButtonClick(e) {
            e.preventDefault();
            
            // Create enhanced ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Handle button actions based on text content
            const buttonText = this.textContent.trim();
            
            setTimeout(() => {
                if (buttonText.includes('Start a Project') || 
                    buttonText.includes('Start Project') || 
                    buttonText.includes('Schedule Consultation') || 
                    buttonText.includes('Get Consultation') ||
                    buttonText.includes('Contact Us')) {
                    console.log('Opening contact modal for:', buttonText);
                    showEnhancedContactModal();
                } else if (buttonText.includes('Download Portfolio') || 
                          buttonText.includes('Download Resume')) {
                    showNotification('Portfolio download initiated! Check your downloads folder.');
                } else if (buttonText.includes('Learn More')) {
                    showNotification('Technical documentation will be shared via email!');
                } else if (buttonText.includes('Schedule Free Consultation')) {
                    // This is handled by the modal
                    return;
                }
            }, 100);
        }
    }
    
    // Add ripple animation styles
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // Setup contact buttons after DOM is ready
    setupContactButtons();
    
    // Enhanced Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animations for achievement cards
                if (entry.target.classList.contains('achievements-grid')) {
                    animateCounters();
                }
                
                // Trigger hero stats animation
                if (entry.target.classList.contains('hero-stats')) {
                    animateHeroStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const sectionsToObserve = document.querySelectorAll('.section, .expertise-card, .project-card, .highlight-card, .achievement-card, .service-card, .dept-card, .hero-stats, .achievements-grid');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
    
    // Add enhanced animation styles
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease-out;
            }
            
            .section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .expertise-card, .project-card, .service-card, .achievement-card {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
                transition: all 0.6s ease-out;
            }
            
            .expertise-card.animate-in, .project-card.animate-in, .service-card.animate-in, .achievement-card.animate-in {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            
            .highlight-card, .dept-card {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s ease-out;
            }
            
            .highlight-card.animate-in, .dept-card.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Enhanced Counter Animations
    function animateCounters() {
        const achievementMetrics = document.querySelectorAll('.achievement-metric');
        
        achievementMetrics.forEach(metric => {
            const text = metric.textContent;
            const isPercentage = text.includes('%');
            const isDollar = text.includes('$');
            const isDecimal = text.includes('.');
            
            let finalValue;
            let suffix = '';
            
            if (isDollar) {
                finalValue = parseFloat(text.replace('$', '').replace('M+', ''));
                suffix = 'M+';
            } else if (isPercentage) {
                finalValue = parseFloat(text.replace('%', ''));
                suffix = '%';
            } else if (isDecimal) {
                finalValue = parseFloat(text);
                suffix = '';
            } else {
                finalValue = parseInt(text.replace(/\D/g, ''));
                suffix = text.replace(/\d/g, '');
            }
            
            let currentValue = 0;
            const increment = finalValue / 60;
            const duration = 2000;
            const stepTime = duration / 60;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(counter);
                }
                
                let displayValue;
                if (isDollar) {
                    displayValue = '$' + currentValue.toFixed(1) + suffix;
                } else if (isDecimal) {
                    displayValue = currentValue.toFixed(1) + suffix;
                } else {
                    displayValue = Math.floor(currentValue) + suffix;
                }
                
                metric.textContent = displayValue;
            }, stepTime);
        });
    }
    
    // Hero Stats Animation
    function animateHeroStats() {
        const heroStatNumbers = document.querySelectorAll('.hero-stat .stat-number');
        
        heroStatNumbers.forEach(stat => {
            const text = stat.textContent;
            const isDecimal = text.includes('.');
            const finalValue = parseFloat(text);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(counter);
                }
                
                if (isDecimal) {
                    stat.textContent = currentValue.toFixed(1);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 40);
        });
    }
    
    // Enhanced Testimonial Carousel
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        testimonialBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }
    
    testimonialBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Enhanced Particle System
    function createEnhancedParticles() {
        const particleContainer = document.querySelector('.particles');
        if (!particleContainer) return;
        
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        const particleCount = 75;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size and type
            const size = Math.random() * 4 + 1;
            const particleType = Math.random();
            
            // Different particle colors based on type
            let color;
            if (particleType < 0.6) {
                color = `rgba(31, 184, 205, ${Math.random() * 0.6 + 0.2})`; // Teal
            } else if (particleType < 0.8) {
                color = `rgba(230, 129, 97, ${Math.random() * 0.5 + 0.3})`; // Orange
            } else {
                color = `rgba(245, 245, 245, ${Math.random() * 0.3 + 0.1})`; // White
            }
            
            // Random animation duration
            const duration = Math.random() * 25 + 15;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                animation: particleFloat ${duration}s infinite linear ${delay}s;
                pointer-events: none;
            `;
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Enhanced particle animation
    if (!document.querySelector('#particle-styles')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-styles';
        particleStyle.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: scale(1);
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-20vh) translateX(${Math.random() * 400 - 200}px) rotate(360deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    createEnhancedParticles();
    
    // Recreate particles periodically
    setInterval(createEnhancedParticles, 25000);
    
    // Enhanced Hover Effects for Cards
    const allCards = document.querySelectorAll('.expertise-card, .project-card, .service-card, .achievement-card, .highlight-card, .dept-card, .testimonial-card, .contact-highlight, .contact-item');
    
    function addAdvancedHoverEffect(cards) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add enhanced glow effect
                this.style.boxShadow = '0 25px 50px rgba(31, 184, 205, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                
                // Enhanced transform
                if (this.classList.contains('service-card') && this.classList.contains('featured')) {
                    this.style.transform = 'scale(1.05) translateY(-10px) rotateX(2deg)';
                } else if (this.classList.contains('project-card') && this.classList.contains('featured')) {
                    this.style.transform = 'translateY(-12px) rotateY(2deg) scale(1.02)';
                } else {
                    this.style.transform = 'translateY(-8px) rotateX(3deg) scale(1.02)';
                }
                
                // Enhanced icon animation
                const icon = this.querySelector('.card-icon, .service-icon, .highlight-icon, .dept-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                }
                
                // Tech stack animation
                const techItems = this.querySelectorAll('.tech-item, .tech-tag');
                techItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(-3px) scale(1.05)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.transform = '';
                
                const icon = this.querySelector('.card-icon, .service-icon, .highlight-icon, .dept-icon');
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Reset tech stack animation
                const techItems = this.querySelectorAll('.tech-item, .tech-tag');
                techItems.forEach(item => {
                    item.style.transform = '';
                });
            });
        });
    }
    
    addAdvancedHoverEffect(allCards);
    
    // Enhanced Parallax Effect
    function initEnhancedParallax() {
        const hero = document.querySelector('.hero');
        const heroGraphics = document.querySelector('.hero-graphics');
        const sections = document.querySelectorAll('.section');
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Hero parallax
            if (hero && heroGraphics) {
                const heroHeight = hero.offsetHeight;
                const scrollPercent = scrolled / heroHeight;
                
                if (scrollPercent <= 1) {
                    heroGraphics.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 - scrollPercent * 0.1})`;
                    heroGraphics.style.opacity = 1 - scrollPercent * 0.6;
                }
            }
            
            // Section parallax
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                if (elementTop < windowHeight && elementTop > -elementHeight) {
                    const translateY = (elementTop - windowHeight / 2) * 0.05;
                    section.style.transform = `translateY(${translateY}px)`;
                }
            });
            
            ticking = false;
        }
        
        function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestParallaxUpdate);
        updateParallax(); // Initial call
    }
    
    initEnhancedParallax();
    
    // Enhanced scroll effects
    let scrollTicking = false;
    
    function updateEnhancedScrollEffects() {
        const scrollTop = window.pageYOffset;
        
        // Enhanced navigation background
        const nav = document.querySelector('.nav');
        if (nav) {
            const opacity = Math.min(scrollTop / 100, 0.95);
            const blur = Math.min(scrollTop / 50, 15);
            nav.style.backgroundColor = `rgba(var(--color-slate-900-rgb), ${opacity})`;
            nav.style.backdropFilter = `blur(${blur}px)`;
            
            if (scrollTop > 50) {
                nav.style.borderBottom = '1px solid rgba(var(--color-teal-400-rgb), 0.4)';
            } else {
                nav.style.borderBottom = '1px solid rgba(var(--color-teal-300-rgb), 0.2)';
            }
        }
        
        scrollTicking = false;
    }
    
    function requestEnhancedScrollUpdate() {
        if (!scrollTicking) {
            requestAnimationFrame(updateEnhancedScrollEffects);
            scrollTicking = true;
        }
    }
    
    window.addEventListener('scroll', requestEnhancedScrollUpdate);
    
    // Initialize enhanced scroll effects
    updateEnhancedScrollEffects();
    
    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Animate project visual SVG elements
            const svg = this.querySelector('.project-visual svg');
            if (svg) {
                const animatableElements = svg.querySelectorAll('circle, rect, line, path');
                animatableElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.transition = 'all 0.3s ease';
                        element.style.opacity = element.style.opacity === '0.5' ? '1' : '0.8';
                        element.style.transform = 'scale(1.05)';
                    }, index * 50);
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const svg = this.querySelector('.project-visual svg');
            if (svg) {
                const animatableElements = svg.querySelectorAll('circle, rect, line, path');
                animatableElements.forEach(element => {
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '';
                });
            }
        });
    });
    
    // Re-setup contact buttons after any dynamic content changes
    const observer2 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setupContactButtons();
            }
        });
    });
    
    observer2.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Initialize on load
    updateActiveNav();
    updateEnhancedScrollEffects();
    
    console.log('🚀 Enhanced Inaamul Haq Mansoor Portfolio Loaded Successfully!');
    console.log('💡 All interactive features initialized');
    console.log('🎨 Enhanced animations ready');
    console.log('📱 Responsive design active');
    console.log('⚡ Performance optimized');
    console.log('✅ Contact modal functionality fixed');
    
    // Performance monitoring
    if (window.performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`⏱️ Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }, 0);
        });
    }
});