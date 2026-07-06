// --- PORTFOLIO INTERACTIVE SCRIPTS ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initTypingEffect();
    initActiveNavTracking();
    initSkillsAnimation();
});

// --- THEME SWAPPER (LIGHT / DARK) ---
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Dark mode is default
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
}

// --- MOBILE HAMBURGER MENU ---
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking links
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// --- AUTO TYPING EFFECT ---
function initTypingEffect() {
    const textElement = document.getElementById('roleText');
    const words = [
        "Senior .NET Programmer",
        "Team Lead",
        "Full-Stack Developer",
        "AI Integration Specialist"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of the word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// --- ACTIVE NAVIGATION TRACKING & ACCESSIBILITY ---
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies central viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// --- TRIGGER SKILL BAR FILL ON SCROLL ---
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                observer.unobserve(bar); // Stop observing after animation completes
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// --- PROJECT & WORK DATA FOR MODAL ---
const projectData = {
    1: {
        title: "AOC India (Philips)",
        role: "Senior Programmer & Team Lead",
        duration: "1.5 Years",
        environment: "C#, SQL Server 2021, JS, 3-Tier Architecture, DevExpress BI",
        summary: "Led the software engineering of an international Customer Relationship Management (CRM), Warehouse, and Inventory Management system deployed across Philips divisions in India and Malaysia. Oversaw requirements, team collaboration, and implementation of high-performance components.",
        bullets: [
            "Coordinated requirements analysis, structural database designs, coding, unit testing, and production deployment of new modules.",
            "Architected secure SOAP and REST APIs to handle internal and external systems integrations (e.g., third-party systems & shipping platforms).",
            "Guided the database engineering team in query optimizations, indexing, and transactional integrity checks inside SQL Server 2021.",
            "Designed and built visual dashboards and operational reports using DevExpress BI components to analyze key performance indicators (KPIs).",
            "Developed and integrated AI-based automation components, including chatbots, text-to-speech processing tools, IVR interfaces, and an automatic email reader tool for automated ticket routing."
        ]
    },
    2: {
        title: "Merchant Management System (MMS)",
        role: "Senior Programmer",
        duration: "1.5 Years",
        environment: "C#, SQL Server 2019, JS, 3-Tier Architecture, SOAP/REST APIs",
        summary: "Built and managed transactional modules for a high-volume Merchant Management System. Designed payment gateway pipelines linking banking terminals with digital accounts.",
        bullets: [
            "Programmed merchant payment processor software handling integrations with SBI and Axis swipe devices.",
            "Engineered flexible REST and SOAP API endpoints consumed by merchant client portals.",
            "Built windows background services and custom asynchronous message queues to process ledger updates and email triggers under heavy transactional load.",
            "Maintained strict data compliance standards and managed SQL server transaction logs for database consistency."
        ]
    },
    3: {
        title: "Service CRM",
        role: "Junior Programmer",
        duration: "1.5 Years",
        environment: "C#, SQL Server 2016, JS, 3-Tier Architecture, Google Maps API",
        summary: "Developed features for a customer service CRM focused on managing ATM services, ticket tracking, contract calculations, and technician dispatch systems.",
        bullets: [
            "Collaborated on core business logic layers in C# matching client specifications.",
            "Developed responsive front-end views using JavaScript, jQuery, and Bootstrap stylesheets.",
            "Integrated Google Maps Web API for locating engineer coordinates and geo-tagging ATM service points.",
            "Designed custom layouts for tracking SLA metrics, RMA dispatch tracking, and PDF ticketing reports."
        ]
    }
};

const workData = {
    'lead': {
        title: "Senior Dot Net Programmer & Team Lead",
        company: "Cogent Innovations Pvt Ltd, Chennai",
        duration: "Dec 2021 – Present (4.5 Years)",
        summary: "Serving as a lead technical coordinator, bridging client needs with developer execution. Responsible for project execution, code review, design patterns, and deployment pipelines.",
        bullets: [
            "Spearheading development and support teams for client-facing CRM, payments, and supply chain software.",
            "Ensured strict adherence to clean 3-tier architecture patterns, SOLID programming principles, and database normalization rules.",
            "Provided instant support and resolutions for production incidents, database failures, and third-party API disconnects.",
            "Delivered robust documentation and API guidelines for developers and business integration managers."
        ]
    }
};

// --- MODAL UTILITY FUNCTIONS ---
const modal = document.getElementById('detailModal');
const modalInner = document.getElementById('modalInnerContent');

function openProjectModal(id) {
    const data = projectData[id];
    if (!data) return;

    modalInner.innerHTML = `
        <div class="modal-header">
            <h3>${data.title}</h3>
            <div class="modal-subheader">
                <span><i class="fa-solid fa-user-tie"></i> ${data.role}</span>
                <span><i class="fa-solid fa-clock"></i> ${data.duration}</span>
            </div>
        </div>
        <div class="modal-body">
            <p>${data.summary}</p>
            <div>
                <h4 class="modal-section-title">Environment & Tech Stack</h4>
                <p><code>${data.environment}</code></p>
            </div>
            <div>
                <h4 class="modal-section-title">Key Responsibilities & Contributions</h4>
                <ul class="modal-list">
                    ${data.bullets.map(b => `<li><span>${b}</span></li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function openWorkModal(key) {
    const data = workData[key];
    if (!data) return;

    modalInner.innerHTML = `
        <div class="modal-header">
            <h3>${data.title}</h3>
            <div class="modal-subheader">
                <span><i class="fa-solid fa-building"></i> ${data.company}</span>
                <span><i class="fa-solid fa-calendar-days"></i> ${data.duration}</span>
            </div>
        </div>
        <div class="modal-body">
            <p>${data.summary}</p>
            <div>
                <h4 class="modal-section-title">Major Core Contributions</h4>
                <ul class="modal-list">
                    ${data.bullets.map(b => `<li><span>${b}</span></li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// --- MOCK CONTACT FORM SUBMISSION ---
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const statusDiv = document.getElementById('formStatus');
    
    // Simple verification check
    if (!name || !email) {
        statusDiv.className = 'form-status';
        statusDiv.textContent = 'Please fill out all required fields.';
        statusDiv.style.color = '#ef4444';
        statusDiv.style.display = 'block';
        return;
    }

    // Simulate submission progress
    statusDiv.className = 'form-status';
    statusDiv.style.color = 'var(--text-secondary)';
    statusDiv.textContent = 'Sending message...';
    statusDiv.style.display = 'block';

    setTimeout(() => {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you at ${email}.`;
        document.getElementById('contactForm').reset();
    }, 1200);
}
