/* ============================================
   RaapTech LLC - Website JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Utility: Throttled Scroll Handler
    // ============================================
    /** @type {Array<function(): void>} */
    var scrollCallbacks = [];
    var ticking = false;

    /**
     * Registers a callback to run on scroll, throttled via requestAnimationFrame.
     * @param {function(): void} callback - Function to call on scroll.
     */
    function onScroll(callback) {
        scrollCallbacks.push(callback);
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                var len = scrollCallbacks.length;
                for (var i = 0; i < len; i++) {
                    scrollCallbacks[i]();
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // Header: Scroll Shadow + Hide on Scroll Down
    // ============================================
    var header = document.getElementById('header');
    var lastScrollY = 0;
    var headerHidden = false;

    if (!header) return; // Guard: header must exist

    onScroll(function () {
        var currentScroll = window.pageYOffset;

        // Add shadow after scrolling past threshold
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction (only after hero)
        if (currentScroll > 400) {
            if (currentScroll > lastScrollY && !headerHidden) {
                // Scrolling down — hide
                header.style.transform = 'translateY(-100%)';
                headerHidden = true;
            } else if (currentScroll < lastScrollY && headerHidden) {
                // Scrolling up — show
                header.style.transform = 'translateY(0)';
                headerHidden = false;
            }
        } else {
            header.style.transform = 'translateY(0)';
            headerHidden = false;
        }

        lastScrollY = currentScroll;
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    var mobileToggle = document.getElementById('mobile-toggle');
    var nav = document.getElementById('nav');

    /**
     * Closes the mobile navigation menu.
     */
    function closeMobileMenu() {
        if (mobileToggle && nav) {
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        }
    }

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function () {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
            var isOpen = nav.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            // Lock/unlock body scroll when mobile menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('active') &&
                !nav.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMobileMenu();
                mobileToggle.focus();
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var href = this.getAttribute('href');

            // Logo click (#) scrolls to top
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            var target = document.querySelector(href);

            if (target) {
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Add staggered delay for elements in the same section
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });

    // ============================================
    // Animated Stat Counters
    // ============================================
    var statsAnimated = false;
    var heroStats = document.querySelector('.hero-stats');

    /**
     * Animates a number from 0 to a target value.
     * @param {HTMLElement} element - The DOM element to update.
     * @param {number} target - The target number.
     * @param {string} prefix - Text before the number (e.g. "$").
     * @param {string} suffix - Text after the number (e.g. "+", "%+").
     * @param {number} duration - Animation duration in ms.
     */
    function animateCounter(element, target, prefix, suffix, duration) {
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic for natural deceleration
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            element.textContent = prefix + current + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }

        window.requestAnimationFrame(step);
    }

    if (heroStats) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    var statNumbers = heroStats.querySelectorAll('.stat-number');
                    // Parse each stat and animate
                    // Expected: "20+", "$50K+", "90%+"
                    statNumbers.forEach(function (el) {
                        var text = el.textContent.trim();
                        var prefix = '';
                        var suffix = '';
                        var numStr = text;

                        // Extract prefix ($ etc.)
                        if (numStr.charAt(0) === '$') {
                            prefix = '$';
                            numStr = numStr.substring(1);
                        }

                        // Extract suffix (K+, %+, + etc.)
                        var match = numStr.match(/^(\d+)(.*)/);
                        if (match) {
                            var target = parseInt(match[1], 10);
                            suffix = match[2];
                            animateCounter(el, target, prefix, suffix, 1800);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroStats);
    }

    // ============================================
    // Form Validation Helpers
    // ============================================
    /**
     * Validates an email address format.
     * @param {string} email - The email to validate.
     * @returns {boolean} True if the email format is valid.
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Shows a validation error on a form field.
     * @param {HTMLElement} field - The input element.
     * @param {string} message - The error message to display.
     */
    function showFieldError(field, message) {
        var group = field.closest('.form-group');
        if (!group) return;
        group.classList.add('error');
        var errorEl = group.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.setAttribute('role', 'alert');
            group.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    /**
     * Clears all validation errors from the form.
     * @param {HTMLFormElement} form - The form element.
     */
    function clearFieldErrors(form) {
        form.querySelectorAll('.form-group.error').forEach(function (group) {
            group.classList.remove('error');
            var errorEl = group.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = '';
            }
        });
    }

    /**
     * Validates all required form fields.
     * @param {HTMLFormElement} form - The form to validate.
     * @returns {boolean} True if all fields are valid.
     */
    function validateForm(form) {
        var isValid = true;
        clearFieldErrors(form);

        // Required text fields
        var company = form.querySelector('#company');
        if (!company.value.trim()) {
            showFieldError(company, 'Company name is required.');
            isValid = false;
        }

        var nameField = form.querySelector('#name');
        if (!nameField.value.trim()) {
            showFieldError(nameField, 'Your name is required.');
            isValid = false;
        }

        var email = form.querySelector('#email');
        if (!email.value.trim()) {
            showFieldError(email, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        var size = form.querySelector('#size');
        if (!size.value) {
            showFieldError(size, 'Please select your company size.');
            isValid = false;
        }

        return isValid;
    }

    // ============================================
    // Form Submission Handler
    // ============================================
    var assessmentForm = document.getElementById('assessment-form');
    var formSuccess = document.getElementById('form-success');
    var isSubmitting = false;

    if (assessmentForm) {
        // Clear errors on input
        assessmentForm.querySelectorAll('input, select, textarea').forEach(function (input) {
            input.addEventListener('input', function () {
                var group = this.closest('.form-group');
                if (group) {
                    group.classList.remove('error');
                }
            });
        });

        assessmentForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Prevent double submission
            if (isSubmitting) return;

            // Validate before submitting
            if (!validateForm(this)) {
                // Focus first error field
                var firstError = this.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
                if (firstError) firstError.focus();
                return;
            }

            isSubmitting = true;
            var submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Collect form data
            var formData = {
                company: this.company.value.trim(),
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                phone: this.phone.value.trim(),
                software: this.software.value.trim(),
                size: this.size.value,
                pain: this.pain.value.trim(),
                ai_audit: this.ai_audit.checked,
                submitted_at: new Date().toISOString(),
                source: 'website'
            };

            // ============================================
            // n8n Webhook Integration
            // ============================================
            // Replace this URL with your production n8n webhook URL
            var N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
            var WEBHOOK_PLACEHOLDER = 'YOUR_N8N_WEBHOOK_URL_HERE';
            var FETCH_TIMEOUT_MS = 15000;

            try {
                // Launch mode: block submit if webhook URL is still placeholder
                if (N8N_WEBHOOK_URL === WEBHOOK_PLACEHOLDER) {
                    throw new Error('Webhook URL is not configured.');
                }

                // Send to n8n webhook with timeout
                var controller = new AbortController();
                var timeoutId = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT_MS);

                try {
                    var response = await fetch(N8N_WEBHOOK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error('Server responded with status ' + response.status);
                    }
                } catch (fetchError) {
                    clearTimeout(timeoutId);
                    throw fetchError;
                }

                // Success — show success message
                assessmentForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Optional analytics event (only fires if Plausible is loaded)
                if (typeof window.plausible === 'function') {
                    window.plausible('assessment_form_submitted');
                }

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (error) {
                console.error('Form submission error:', error);

                // Show user-friendly error inline instead of alert
                var errorMessage = 'There was an error submitting your request. ';
                if (error.name === 'AbortError') {
                    errorMessage += 'The request timed out. Please check your connection and try again.';
                } else if (error.message === 'Webhook URL is not configured.') {
                    errorMessage += 'The form is temporarily unavailable. Please contact us directly at TRaap@RaapTech.com';
                } else {
                    errorMessage += 'Please try again or contact us directly at TRaap@RaapTech.com';
                }

                // Show error near submit button
                var errorBanner = assessmentForm.querySelector('.form-error-banner');
                if (!errorBanner) {
                    errorBanner = document.createElement('div');
                    errorBanner.className = 'form-error-banner';
                    errorBanner.setAttribute('role', 'alert');
                    errorBanner.style.cssText = 'background:#FEF2F2;border:1px solid #DC2626;color:#991B1B;padding:12px 16px;border-radius:4px;margin-top:12px;font-size:0.875rem;';
                    submitBtn.parentNode.insertBefore(errorBanner, submitBtn.nextSibling);
                }
                errorBanner.textContent = errorMessage;

                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                isSubmitting = false;
            }
        });
    }

    // ============================================
    // Phone Number Formatting
    // ============================================
    var phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            var value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }

            e.target.value = value;
        });
    }

    // ============================================
    // Active Navigation Highlighting
    // ============================================
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    onScroll(function () {
        var scrollY = window.pageYOffset;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ============================================
    // Parallax Effect on Hero Background
    // ============================================
    var heroBg = document.querySelector('.hero-bg img');

    if (heroBg) {
        onScroll(function () {
            var scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            }
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    var backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);

    onScroll(function () {
        if (window.pageYOffset > window.innerHeight) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Form Field Animations
    // ============================================
    var formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formInputs.forEach(function (input) {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

    // Enforce maxlength on textarea to prevent abuse
    var painTextarea = document.getElementById('pain');
    if (painTextarea && !painTextarea.hasAttribute('maxlength')) {
        painTextarea.setAttribute('maxlength', '2000');
    }

    // ============================================
    // Lazy Loading Images (data-src fallback)
    // ============================================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function (img) {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Console Easter Egg
    // ============================================
    console.log(
        '\n' +
        '    ╔═══════════════════════════════════════╗\n' +
        '    ║         RaapTech LLC                  ║\n' +
        '    ║   AI Solutions for Contractors        ║\n' +
        '    ║                                       ║\n' +
        '    ║   Looking for the source code?        ║\n' +
        '    ║   Let\'s talk: TRaap@RaapTech.com     ║\n' +
        '    ╚═══════════════════════════════════════╝\n'
    );

});

