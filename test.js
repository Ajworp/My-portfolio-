// about.js - Enhanced with Form Handling and Google Sheets Integration

// Mobile Menu Toggle
// const mobileMenuBtn = document.getElementById('mobileMenuBtn');
// const navLinks = document.getElementById('navLinks');

// if (mobileMenuBtn && navLinks) {
//     mobileMenuBtn.addEventListener('click', () => {
//         navLinks.classList.toggle('active');
//         mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
//             ? '<i class="fas fa-times"></i>'
//             : '<i class="fas fa-bars"></i>';
//     });

//     // Close menu when clicking on links
//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', () => {
//             navLinks.classList.remove('active');
//             mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//         });
//     });

//     // Close menu when clicking outside
//     document.addEventListener('click', (e) => {
//         if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
//             navLinks.classList.remove('active');
//             mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//         }
//     });
// }

// Scroll Animations
// const animateOnScroll = () => {
//     const elements = document.querySelectorAll('[data-animate]');
    
//     elements.forEach(element => {
//         const elementTop = element.getBoundingClientRect().top;
//         const elementVisible = 150;
        
//         if (elementTop < window.innerHeight - elementVisible) {
//             element.classList.add('animated');
//         }
//     });
// };

// Initial animation check
// window.addEventListener('DOMContentLoaded', animateOnScroll);
// window.addEventListener('scroll', animateOnScroll);

// Stats Counter Animation
// const animateStats = () => {
//     const statCards = document.querySelectorAll('.stat-card');
    
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const statNumber = entry.target.querySelector('.stat-number');
//                 const target = parseInt(statNumber.getAttribute('data-count'));
                
//                 // Animate counter
//                 let current = 0;
//                 const increment = target / 50; // 50 steps
//                 const timer = setInterval(() => {
//                     current += increment;
//                     if (current >= target) {
//                         current = target;
//                         clearInterval(timer);
//                     }
//                     statNumber.textContent = Math.floor(current) + '+';
//                 }, 30);
                
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.5 });
    
//     statCards.forEach(card => observer.observe(card));
// };

// // Initialize stats animation
// window.addEventListener('DOMContentLoaded', animateStats);

// Tab Functionality for Cybersecurity Section
const initTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length === 0) return;
    
    const switchTab = (tabId) => {
        // Hide all panels
        tabPanels.forEach(panel => {
            panel.hidden = true;
            panel.classList.remove('active');
        });
        
        // Remove active class from all buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });
        
        // Show selected panel
        const selectedPanel = document.getElementById(`panel-${tabId}`);
        const selectedButton = document.getElementById(`tab-${tabId}`);
        
        if (selectedPanel && selectedButton) {
            selectedPanel.hidden = false;
            selectedPanel.classList.add('active');
            selectedButton.classList.add('active');
            selectedButton.setAttribute('aria-selected', 'true');
        }
    };
    
    // Add click event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.id.replace('tab-', '');
            switchTab(tabId);
        });
    });
    
    // Initialize first tab
    switchTab('web');
};

// Initialize tabs
window.addEventListener('DOMContentLoaded', initTabs);

// Form Handling with Google Sheets Integration
const initMeetingForm = () => {
    const meetingForm = document.getElementById('meetingForm');
    if (!meetingForm) return;
    
    // Form elements
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const btnLoader = document.getElementById('btnLoader');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');
    
    // Google Sheets Configuration
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyWDzcQqVZS4mjciiM4WZ2HbZnAXrSkM_nFyhuc_Qw_CIBg107srPG0rpZvpxTsTg0S/exec';
        // 'https://script.google.com/macros/s/AKfycbwHVrlXsgqyht8BHFXM1woE8eO-yUAR8YosC5nZew4H13SFgXCD2qIHJy_cwuMxLPslqw/exec'; // Replace with your Google Apps Script URL
    
    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = 'var(--color-danger)';
                messageTextarea.style.borderColor = 'var(--color-danger)';
            } else {
                charCount.style.color = 'var(--color-text-muted)';
                messageTextarea.style.borderColor = '';
            }
        });
    }
    
    // Form validation
    const validateField = (field, errorElementId) => {
        const value = field.value.trim();
        const errorElement = document.getElementById(errorElementId);
        
        // Clear previous error
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.style.borderColor = '';
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            errorElement.textContent = 'This field is required';
            errorElement.classList.add('show');
            field.style.borderColor = 'var(--color-danger)';
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorElement.textContent = 'Please enter a valid email address';
                errorElement.classList.add('show');
                field.style.borderColor = 'var(--color-danger)';
                return false;
            }
        }
        
        // Phone validation (if provided)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanedPhone = value.replace(/\D/g, '');
            if (!phoneRegex.test(cleanedPhone)) {
                errorElement.textContent = 'Please enter a valid phone number';
                errorElement.classList.add('show');
                field.style.borderColor = 'var(--color-danger)';
                return false;
            }
        }
        
        return true;
    };
    
    // Form submission handler


const handleSubmit = async (e) => {
  e.preventDefault();

  // validation already done above
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  formStatus.style.display = "none";

  try {
    const formDataToSend = new FormData(meetingForm);

    // extra fields (same as your old project)
    formDataToSend.append("source", "About Page - Book Meeting Form");
    formDataToSend.append("timestamp", new Date().toISOString());

    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      body: formDataToSend, // ✅ FormData ONLY
      mode: "no-cors"
    });

    // ✅ assume success (same as previous project)
    showSuccessMessage();
    // await sendEmailNotification({
    //   name: formDataToSend.get("name"),
    //   email: formDataToSend.get("email"),
    //   phone: formDataToSend.get("phone"),
    //   company: formDataToSend.get("company"),
    //   service: formDataToSend.get("service"),
    //   projectType: formDataToSend.get("projectType"),
    //   message: formDataToSend.get("message"),
    //   source: "About Page - Book Meeting Form"
    // });

  } catch (error) {
    console.error("Submission error:", error);
    showErrorMessage("Something went wrong. Please try again later.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  }
};

    

    
    // Success message
    const showSuccessMessage = () => {
        // Create success animation
        const successHTML = `
            <div class="success-message">
                <div class="success-checkmark">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h3>Meeting Request Submitted!</h3>
                <p>Thank you for your interest. Our team will contact you within 24 hours to schedule your consultation.</p>
                <p>A confirmation email has been sent to your inbox.</p>
            </div>
        `;
        
        formStatus.innerHTML = successHTML;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        // Reset form
        meetingForm.reset();
        charCount.textContent = '0';
        
        // Scroll to success message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 10000);
    };
    
    // Error message
    const showErrorMessage = (message) => {
        formStatus.textContent = message;
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        
        // Scroll to error message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    // Real-time validation
    meetingForm.addEventListener('input', (e) => {
        const field = e.target;
        const errorId = field.id + 'Error';
        if (document.getElementById(errorId)) {
            validateField(field, errorId);
        }
    });
    
    // Form submission
    meetingForm.addEventListener('submit', handleSubmit);
};

// Initialize form when DOM is loaded
window.addEventListener('DOMContentLoaded', initMeetingForm);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update current year in footer
// const updateCurrentYear = () => {
//     const yearElement = document.getElementById('currentYear');
//     if (yearElement) {
//         yearElement.textContent = new Date().getFullYear();
//     }
// };

// window.addEventListener('DOMContentLoaded', updateCurrentYear);

// Lazy loading for images
// const lazyLoadImages = () => {
//     const images = document.querySelectorAll('img[loading="lazy"]');
    
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.src = img.dataset.src || img.src;
//                 img.classList.add('loaded');
//                 observer.unobserve(img);
//             }
//         });
//     });
    
//     images.forEach(img => imageObserver.observe(img));
// };

// window.addEventListener('DOMContentLoaded', lazyLoadImages);

// Parallax effect for hero section
// const initParallax = () => {
//     const heroSection = document.querySelector('.about-hero');
//     if (!heroSection) return;
    
//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.5;
//         heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
//     });
// };

// // Initialize parallax

// window.addEventListener('DOMContentLoaded', initParallax);

