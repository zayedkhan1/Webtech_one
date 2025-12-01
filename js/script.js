// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Initialize donor data if not exists
    if (!localStorage.getItem('donors')) {
        const initialDonors = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '(555) 123-4567',
                bloodType: 'A+',
                location: 'New York, NY',
                lastDonation: '2023-05-15'
            },
            {
                id: 2,
                name: 'Maria Garcia',
                email: 'maria.garcia@example.com',
                phone: '(555) 234-5678',
                bloodType: 'O-',
                location: 'Los Angeles, CA',
                lastDonation: '2023-06-20'
            },
            {
                id: 3,
                name: 'David Johnson',
                email: 'david.johnson@example.com',
                phone: '(555) 345-6789',
                bloodType: 'B+',
                location: 'Chicago, IL',
                lastDonation: '2023-04-10'
            },
            {
                id: 4,
                name: 'Sarah Williams',
                email: 'sarah.williams@example.com',
                phone: '(555) 456-7890',
                bloodType: 'AB+',
                location: 'Houston, TX',
                lastDonation: '2023-07-05'
            }
        ];
        localStorage.setItem('donors', JSON.stringify(initialDonors));
    }
    
    // Load donors on donor list page
    if (window.location.pathname.includes('donor-list.html')) {
        loadDonors();
    }
    
    // Form validation for donor registration
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateDonorForm()) {
                registerDonor();
            }
        });
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
});

// Form Validation Functions
function validateDonorForm() {
    let isValid = true;
    
    // Reset error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone.value.trim()) {
        showError('phoneError', 'Please enter your phone number');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate blood type
    const bloodType = document.getElementById('bloodType');
    if (!bloodType.value) {
        showError('bloodTypeError', 'Please select your blood type');
        isValid = false;
    }
    
    // Validate location
    const location = document.getElementById('location');
    if (!location.value.trim()) {
        showError('locationError', 'Please enter your location');
        isValid = false;
    }
    
    return isValid;
}

function validateContactForm() {
    let isValid = true;
    
    // Reset error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Validate name
    const name = document.getElementById('contactName');
    if (!name.value.trim()) {
        showError('contactNameError', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('contactEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('contactEmailError', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('contactEmailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('messageError', 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Donor Registration
function registerDonor() {
    const formData = {
        id: Date.now(), // Simple ID generation
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        bloodType: document.getElementById('bloodType').value,
        location: document.getElementById('location').value,
        lastDonation: document.getElementById('lastDonation').value || 'Never',
        registrationDate: new Date().toISOString().split('T')[0]
    };
    
    // Get existing donors from localStorage
    const donors = JSON.parse(localStorage.getItem('donors')) || [];
    
    // Add new donor
    donors.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('donors', JSON.stringify(donors));
    
    // Show success message
    alert('Thank you for registering as a blood donor! Your information has been saved.');
    
    // Reset form
    document.getElementById('donorForm').reset();
    
    // Redirect to donor list page
    setTimeout(() => {
        window.location.href = 'donor-list.html';
    }, 1000);
}

// Load and Display Donors
function loadDonors() {
    const donors = JSON.parse(localStorage.getItem('donors')) || [];
    const donorList = document.getElementById('donorList');
    
    if (donors.length === 0) {
        donorList.innerHTML = '<p class="no-donors">No donors registered yet.</p>';
        return;
    }
    
    let donorHTML = '';
    
    donors.forEach(donor => {
        donorHTML += `
            <div class="donor-card">
                <h3 class="donor-name">${donor.name}</h3>
                <p class="donor-info"><strong>Blood Type:</strong> <span class="blood-type">${donor.bloodType}</span></p>
                <p class="donor-info"><strong>Location:</strong> ${donor.location}</p>
                <p class="donor-info"><strong>Email:</strong> ${donor.email}</p>
                <p class="donor-info"><strong>Phone:</strong> ${donor.phone}</p>
                <p class="donor-info"><strong>Last Donation:</strong> ${donor.lastDonation}</p>
            </div>
        `;
    });
    
    donorList.innerHTML = donorHTML;
}

// Contact Form Submission
function submitContactForm() {
    // In a real application, this would send data to a server
    // For now, we'll just show a success message
    
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    document.getElementById('contactForm').reset();
}