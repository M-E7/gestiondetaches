// Wait for DOM Content to Load
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    animateOnScroll();
    
    // Navbar Scroll Effect
    navbarScrollEffect();
    
    // Initialize Testimonials Carousel
    initTestimonialsCarousel();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Modal Video
    initModalVideo();
});

// Animate elements when they come into view
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    // Initial check for elements in view
    checkElementsInView(animatedElements);
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        checkElementsInView(animatedElements);
    });
}

// Check if elements are in viewport and add animation classes
function checkElementsInView(elements) {
    elements.forEach(function(element, index) {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
            element.classList.add(`delay-${index % 3 + 1}`);
        }
    });
}

// Navbar scroll effect
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
    });
}

// Initialize Testimonials Carousel using jQuery for Bootstrap
function initTestimonialsCarousel() {
    if (typeof $ !== 'undefined') {
        $('#testimonials-carousel').carousel({
            interval: 5000,
            pause: 'hover'
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize modal video player for the demo button
function initModalVideo() {
    const demoButton = document.querySelector('.hero-btns .btn-outline-secondary');
    
    if (demoButton) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal element
            const modalHTML = `
                <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="videoModalLabel">TaskFlow Demo</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- Placeholder for video -->
                                <div class="ratio ratio-16x9">
                                    <img src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="img-fluid" alt="TaskFlow Demo">
                                    <div class="video-play-overlay">
                                        <i class="fas fa-play-circle"></i>
                                    </div>
                                </div>
                                <p class="text-center mt-3">Vidéo de démonstration de TaskFlow</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Append modal to body
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Initialize and show the modal
            const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
            videoModal.show();
            
            // Remove modal from DOM when hidden
            document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        });
    }
}

// Form validation for newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Success - would normally submit to server
                showToast('Merci pour votre inscription !', 'success');
                emailInput.value = '';
            } else {
                // Error
                showToast('Veuillez entrer une adresse email valide', 'error');
                emailInput.focus();
            }
        });
    }
});

// Validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Show toast notification
function showToast(message, type) {
    // Create toast element
    const toastHTML = `
        <div class="toast-notification ${type}">
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    // Add toast to body
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    
    // Get the toast
    const toast = document.querySelector('.toast-notification');
    
    // Show toast
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove toast after 3 seconds
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add toast styles
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-notification.success {
        background-color: #10b981;
    }
    
    .toast-notification.error {
        background-color: #ef4444;
    }
    
    .video-play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }
    
    .video-play-overlay i {
        font-size: 5rem;
        color: white;
        opacity: 0.8;
        transition: all 0.3s ease;
    }
    
    .video-play-overlay:hover {
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
    
    .video-play-overlay:hover i {
        opacity: 1;
        transform: scale(1.1);
    }
`;

document.head.appendChild(toastStyle);

// Add counter animation to highlight statistics
document.addEventListener('DOMContentLoaded', function() {
    // Add statistic counters if needed
    const counterSection = document.createElement('section');
    counterSection.className = 'counter-section bg-white py-5';
    counterSection.innerHTML = `
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3 col-6 mb-4 mb-md-0">
                    <div class="counter" data-target="10000">0</div>
                    <h3>Utilisateurs</h3>
                </div>
                <div class="col-md-3 col-6 mb-4 mb-md-0">
                    <div class="counter" data-target="500000">0</div>
                    <h3>Tâches créées</h3>
                </div>
                <div class="col-md-3 col-6">
                    <div class="counter" data-target="98">0</div>
                    <h3>% Satisfaction</h3>
                </div>
                <div class="col-md-3 col-6">
                    <div class="counter" data-target="15">0</div>
                    <h3>Pays</h3>
                </div>
            </div>
        </div>
    `;
    
    // Insert counter section before testimonials
    const testimonialSection = document.querySelector('.testimonials-section');
    if (testimonialSection) {
        testimonialSection.parentNode.insertBefore(counterSection, testimonialSection);
    }
    
    // Add counter styles
    const counterStyle = document.createElement('style');
    counterStyle.textContent = `
        .counter-section {
            padding: 80px 0;
        }
        
        .counter {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .counter-section h3 {
            font-size: 1.2rem;
            color: var(--secondary-color);
            font-weight: 500;
        }
    `;
    document.head.appendChild(counterStyle);
    
    // Initialize counters
    initCounters();
});

// Counter animation function
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const counterOptions = {
        threshold: 0.8
    };
    
    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const speed = Math.floor(1000 / (target / 100));
                
                const updateCount = () => {
                    const increment = target / 100;
                    
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.floor(count).toLocaleString();
                        setTimeout(updateCount, speed);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}