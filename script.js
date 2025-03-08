// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get current year for the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change the hamburger to X
            const spans = this.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
                spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for animation
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For quote
                if (entry.target.classList.contains('quote')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // For step cards with delay
                if (entry.target.classList.contains('step-card')) {
                    const step = entry.target.getAttribute('data-step');
                    const delay = step * 150;
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.quote, .step-card').forEach(el => {
        observer.observe(el);
    });
    
    // Book tilt effect
    const bookImages = document.querySelectorAll('.book-image');
    
    bookImages.forEach(book => {
        book.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            const img = this.querySelector('img');
            img.style.transform = `rotate(${xPercent * 10}deg) translateY(${yPercent * -5}px) scale(1.05)`;
        });
        
        book.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'rotate(0) translateY(0) scale(1)';
        });
    });
    
    // Initialize animations
    function initAnimations() {
        // For growth cards
        const growthCards = document.querySelectorAll('.growth-card');
        growthCards.forEach(card => {
            const delay = card.getAttribute('data-delay') || 0;
            card.style.setProperty('--delay', delay);
        });
    }
    
    initAnimations();
});
