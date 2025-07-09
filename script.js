
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Form submission
// const meetingForm = document.getElementById('meetingForm');

// meetingForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     // const formData = new FormData(meetingForm);
//     // try {
//     //     const response = await fetch('https://your-api-endpoint.com/api/schedule-meeting', {
//     //         method: 'POST',
//     //         body: JSON.stringify(Object.fromEntries(formData)),
//     //         headers: { 'Content-Type': 'application/json' }
//     //     });
        
//     //     if (response.ok) {
//     //         window.location.href = '/thank-you.html';
//     //     }
//     // } catch (error) {
//     //     alert('Error submitting form');
//     // }




//     // Get form values
//     // const formData = new FormData(meetingForm);
//     // const data = Object.fromEntries(formData);

//     // Here you would typically send the data to your server
//     console.log('Form submitted:', data);

//     // Show success message (in a real app, you would handle the server response)
//     alert('Thank you for your request! We will contact you shortly to schedule the meeting.');
//     meetingForm.reset();
// });

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px var(--shadow-color)';
    } else {
        header.style.boxShadow = '0 2px 10px var(--shadow-color)';
    }
});

// Enhanced animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced animation on scroll with Intersection Observer
    const animateElements = document.querySelectorAll('[data-animate]');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate');
                
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust trigger point slightly higher
    });

    // Observe all animate elements
    animateElements.forEach(element => {
        observer.observe(element);
        
        // Add delay classes if they exist
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = `${delay * 0.1}s`;
        }
    });

    // Smooth scrolling for anchor links with animation trigger
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Force trigger animation for target section
                setTimeout(() => {
                    const animateElementsInSection = targetElement.querySelectorAll('[data-animate]');
                    animateElementsInSection.forEach(el => {
                        el.classList.add('animate');
                    });
                }, 1000); // Delay slightly to account for scroll time
            }
        });
    });

    // Initial check for elements already in view
    function checkInitialView() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight * 0.8) && 
                rect.bottom >= (window.innerHeight * 0.2)
            );
            
            if (isVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Run initial check after short delay to allow DOM to fully load
    setTimeout(checkInitialView, 300);
});
