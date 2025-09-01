// Accessibility enhancements for the blog
(function() {
    'use strict';
    
    // Keyboard navigation for search
    function initializeSearch() {
        const searchIcon = document.querySelector('.search-icon');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.querySelector('#search-input');
        const searchClose = document.querySelector('.search-icon-close');
        
        if (searchIcon && searchBox && searchInput && searchClose) {
            // Handle keyboard events for search icon
            searchIcon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openSearch();
                }
            });
            
            // Handle keyboard events for search close
            searchClose.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeSearch();
                }
            });
            
            // Escape key to close search
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchBox.style.display !== 'none') {
                    closeSearch();
                }
            });
            
            function openSearch() {
                searchBox.style.display = 'block';
                searchIcon.setAttribute('aria-expanded', 'true');
                searchInput.focus();
                // Trap focus in search modal
                document.body.style.overflow = 'hidden';
            }
            
            function closeSearch() {
                searchBox.style.display = 'none';
                searchIcon.setAttribute('aria-expanded', 'false');
                searchIcon.focus();
                document.body.style.overflow = '';
            }
        }
    }
    
    // Mobile menu accessibility
    function initializeMobileMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const menuClose = document.querySelector('.menu-icon-close');
        const nav = document.querySelector('.main-nav');
        
        if (menuIcon && menuClose && nav) {
            // Handle keyboard events for menu toggle
            menuIcon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu();
                }
            });
            
            menuClose.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu();
                }
            });
            
            function toggleMenu() {
                const isOpen = nav.classList.contains('active') || nav.style.display === 'block';
                
                if (isOpen) {
                    nav.style.display = 'none';
                    menuIcon.setAttribute('aria-expanded', 'false');
                    menuIcon.focus();
                } else {
                    nav.style.display = 'block';
                    menuIcon.setAttribute('aria-expanded', 'true');
                    // Focus first menu item
                    const firstMenuItem = nav.querySelector('a[role="menuitem"]');
                    if (firstMenuItem) {
                        firstMenuItem.focus();
                    }
                }
            }
        }
    }
    
    // Back to top button accessibility
    function initializeBackToTop() {
        const backToTop = document.querySelector('.top');
        
        if (backToTop) {
            backToTop.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Make sure it's focusable
            backToTop.setAttribute('tabindex', '0');
        }
    }
    
    // Enhanced focus management
    function initializeFocusManagement() {
        // Add focus-visible support for older browsers
        if (!('focus-visible' in document.createElement('div'))) {
            const focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
            
            document.addEventListener('mousedown', function() {
                document.body.classList.add('using-mouse');
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    document.body.classList.remove('using-mouse');
                }
            });
        }
        
        // Announce page changes to screen readers
        const mainContent = document.querySelector('main, [role="main"]');
        if (mainContent) {
            mainContent.setAttribute('aria-live', 'polite');
        }
    }
    
    // Form accessibility enhancements
    function initializeFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(function(input) {
                // Add proper error handling
                input.addEventListener('invalid', function(e) {
                    const errorMsg = e.target.validationMessage;
                    e.target.setAttribute('aria-describedby', 'error-' + e.target.id);
                    
                    // Create or update error message
                    let errorElement = document.getElementById('error-' + e.target.id);
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.id = 'error-' + e.target.id;
                        errorElement.className = 'error-message sr-only';
                        e.target.parentNode.appendChild(errorElement);
                    }
                    errorElement.textContent = errorMsg;
                    errorElement.setAttribute('aria-live', 'polite');
                });
                
                // Clear errors on valid input
                input.addEventListener('input', function(e) {
                    if (e.target.validity.valid) {
                        const errorElement = document.getElementById('error-' + e.target.id);
                        if (errorElement) {
                            errorElement.textContent = '';
                        }
                        e.target.removeAttribute('aria-describedby');
                    }
                });
            });
        });
    }
    
    // Initialize all accessibility features when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeSearch();
            initializeMobileMenu();
            initializeBackToTop();
            initializeFocusManagement();
            initializeFormAccessibility();
        });
    } else {
        initializeSearch();
        initializeMobileMenu();
        initializeBackToTop();
        initializeFocusManagement();
        initializeFormAccessibility();
    }
})();