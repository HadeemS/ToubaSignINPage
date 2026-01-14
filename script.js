// Web3Forms Configuration
// IMPORTANT: Replace 'YOUR_ACCESS_KEY' with your actual Web3Forms access key
// Get your free access key from: https://web3forms.com
const WEB3FORMS_ACCESS_KEY = 'b403d4b5-f471-4cbd-8114-0643291aa449';

// Form elements
const form = document.getElementById('signInForm');
const submitBtn = document.getElementById('submitBtn');
const btnLoader = document.getElementById('btnLoader');
const successMessage = document.getElementById('successMessage');
const qrToggle = document.getElementById('qrToggle');
const qrContainer = document.getElementById('qrContainer');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeQRCode();
    initializeAnalytics();
});

// Form Initialization
function initializeForm() {
    if (!form) return;

    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Form Validation
function validateField(event) {
    const field = event.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}Error`);

    // Clear previous error
    clearError(event);

    // Validate based on field type
    switch (fieldName) {
        case 'name':
            if (fieldValue.length < 2) {
                showError(errorElement, 'Name must be at least 2 characters');
                return false;
            }
            if (!/^[a-zA-Z\s'-]+$/.test(fieldValue)) {
                showError(errorElement, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                return false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(fieldValue)) {
                showError(errorElement, 'Please enter a valid email address');
                return false;
            }
            break;

        case 'phone':
            // Remove all non-digit characters for validation
            const phoneDigits = fieldValue.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                showError(errorElement, 'Please enter a valid phone number (at least 10 digits)');
                return false;
            }
            // Format phone number
            formatPhoneNumber(field);
            break;
    }

    return true;
}

// Format phone number as user types
function formatPhoneNumber(field) {
    let value = field.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
        field.value = value;
    }
}

// Add phone formatting on input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
}

// Show error message
function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear error message
function clearError(event) {
    const field = event.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Validate entire form
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError(document.getElementById('nameError'), 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(document.getElementById('emailError'), 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        showError(document.getElementById('phoneError'), 'Please enter a valid phone number');
        isValid = false;
    }

    return isValid;
}

// Handle Form Submission
async function handleFormSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        timestamp: new Date().toISOString(),
        page: window.location.href
    };

    // Prepare data for Web3Forms
    const web3formsData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Client Sign-In: ${formData.name}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Client Sign-In Details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTimestamp: ${formData.timestamp}\nPage: ${formData.page}`,
        from_name: formData.name
    };

    try {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(web3formsData)
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            showSuccessMessage();
            
            // Track successful submission
            trackEvent('form_submission', 'success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error to user
        alert('Sorry, there was an error submitting your information. Please try again or contact us directly.');
        
        // Track error
        trackEvent('form_submission', 'error');
    } finally {
        // Remove loading state
        setLoadingState(false);
    }
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Show success message
function showSuccessMessage() {
    successMessage.classList.add('show');
    form.style.display = 'none';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// QR Code Functionality
function initializeQRCode() {
    if (!qrToggle || !qrContainer) return;

    let qrGenerated = false;

    qrToggle.addEventListener('click', function() {
        if (!qrContainer.classList.contains('show')) {
            if (!qrGenerated) {
                generateQRCode();
                qrGenerated = true;
            }
            qrContainer.classList.add('show');
            qrToggle.textContent = 'Hide QR Code';
        } else {
            qrContainer.classList.remove('show');
            qrToggle.textContent = 'Show QR Code';
        }
    });
}

function generateQRCode() {
    const qrcodeDiv = document.getElementById('qrcode');
    if (!qrcodeDiv || typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        return;
    }

    // Clear any existing QR code
    qrcodeDiv.innerHTML = '';

    // Get current page URL
    const currentUrl = window.location.href;

    // Generate QR code
    new QRCode(qrcodeDiv, {
        text: currentUrl,
        width: 200,
        height: 200,
        colorDark: '#2c2c2c',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Track QR code generation
    trackEvent('qr_code', 'generated');
}

// Simple Analytics (Zero-Cost Solution)
function initializeAnalytics() {
    // Track page view
    trackEvent('page_view', 'loaded');

    // Track form interactions
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            trackEvent('form_field', 'focused', this.name);
        });
    });

    // Track button clicks
    if (qrToggle) {
        qrToggle.addEventListener('click', function() {
            trackEvent('qr_toggle', 'clicked');
        });
    }
}

// Simple event tracking using localStorage and console
// For production, you could integrate with Google Analytics (free) or Plausible Analytics (free tier)
function trackEvent(category, action, label = '') {
    const eventData = {
        category,
        action,
        label,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };

    // Log to console (can be removed in production)
    console.log('Event tracked:', eventData);

    // Store in localStorage (simple analytics storage)
    try {
        const analytics = JSON.parse(localStorage.getItem('salon_analytics') || '[]');
        analytics.push(eventData);
        
        // Keep only last 100 events to prevent storage bloat
        if (analytics.length > 100) {
            analytics.shift();
        }
        
        localStorage.setItem('salon_analytics', JSON.stringify(analytics));
    } catch (e) {
        console.error('Analytics storage error:', e);
    }

    // Optional: Send to external analytics service
    // Example: Google Analytics (free)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label
    //     });
    // }
}

// Export analytics data (helper function for viewing analytics)
window.exportAnalytics = function() {
    try {
        const analytics = JSON.parse(localStorage.getItem('salon_analytics') || '[]');
        const dataStr = JSON.stringify(analytics, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `salon-analytics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error('Export error:', e);
    }
};

// Check if Web3Forms access key is configured
if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY') {
    console.warn('⚠️ Web3Forms access key not configured! Please update script.js with your access key from https://web3forms.com');
}

