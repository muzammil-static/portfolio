// Theme Toggle Function
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme === 'dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
    
    // Update icon
    updateThemeIcon(isDarkMode);
    
    // Add transition animation
    addThemeTransition();
});

function updateThemeIcon(isDarkMode) {
    icon.classList.remove(isDarkMode ? 'fa-moon' : 'fa-sun');
    icon.classList.add(isDarkMode ? 'fa-sun' : 'fa-moon');
}

function addThemeTransition() {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            element.style.transition = '';
        }, 300);
    });
}

// Check system preference on load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    body.classList.toggle('dark-mode', e.matches);
    updateThemeIcon(e.matches);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Handling
const contactForm = document.getElementById('contact-form');
const displayMessage = document.getElementById('display-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Add your form submission logic here
    
    displayMessage.textContent = `Thank you ${name}! Your message has been sent.`;
    displayMessage.style.opacity = '1';
    
    contactForm.reset();
    
    setTimeout(() => {
        displayMessage.style.opacity = '0';
    }, 3000);
});

// Skill Progress Animation
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.progress');
            progress.style.width = progress.dataset.width;
        }
    });
}, observerOptions);

skillCards.forEach(card => observer.observe(card));