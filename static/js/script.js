// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optional: reveal only once
        }
    });
}, {
    threshold: 0.1
});

reveals.forEach(reveal => {
    observer.observe(reveal);
});

// Typing effect
const typingTarget = document.querySelector('.typing-text');
const typingPhrases = [
    "Hi, I'm Prince Vaishya",
    "Aspiring Data Scientist",
    "Machine Learning Enthusiast",
    "Loves Solving Problems"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const currentPhrase = typingPhrases[phraseIndex];
    const currentText = currentPhrase.substring(0, charIndex);

    typingTarget.textContent = currentText;

    if (!isDeleting && charIndex < currentPhrase.length) {
        charIndex++;
        setTimeout(typeLoop, 80);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeLoop, 30);
    } else {
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingTarget.classList.add('active');  // Fade in after typing is done
        }

        isDeleting = !isDeleting;
        if (!isDeleting) {
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        }
        setTimeout(typeLoop, 800); // Reduced delay between phrases
    }
}

window.addEventListener('DOMContentLoaded', typeLoop);
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active-link");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active-link");
        }
    });
});


const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
        backToTopBtn.style.opacity = 1;
    } else {
        backToTopBtn.style.opacity = 0;
        setTimeout(() => {
            if (window.scrollY <= 300) backToTopBtn.style.display = "none";
        }, 300);
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const targetWidth = progress.getAttribute('data-progress');
            progress.style.width = targetWidth;
            observer.unobserve(progress);
        }
    });
}, {
    threshold: 0.6
});

progressBars.forEach(bar => progressObserver.observe(bar));


document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.closest('.project-card').querySelector('.project-details');
        const isVisible = details.style.display === 'block';

        // Hide others
        document.querySelectorAll('.project-details').forEach(d => d.style.display = 'none');

        // Toggle current
        details.style.display = isVisible ? 'none' : 'block';
    });
});

const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('header nav ul');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburger.classList.toggle('active');
});


const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = window.innerWidth;
    const logicalHeight = document.getElementById('home').offsetHeight;

    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = logicalWidth + 'px';
    canvas.style.height = logicalHeight + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(dpr, dpr);

    width = logicalWidth;
    height = logicalHeight;

}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const numStars = 100;
const stars = [];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5
    });
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);

    // Draw stars
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    // Draw lines between close stars
    for (let i = 0; i < numStars; i++) {
        for (let j = i + 1; j < numStars; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
                ctx.stroke();
            }
        }
    }

    // Update positions
    for (let star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
    }

    requestAnimationFrame(drawStars);
}

drawStars();


// Close hamburger menu when any link is clicked
document.querySelectorAll('header nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Close only on mobile view
            navUl.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const targetWidth = progress.getAttribute('data-progress'); // Get the data-progress attribute
                progress.style.width = targetWidth; // Set the width of the progress bar
                observer.unobserve(progress); // Stop observing once the animation is triggered
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the progress bar is visible
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        formStatus.textContent = "Sending...";
        formStatus.style.color = "blue";

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "green";
                contactForm.reset();
            } else {
                formStatus.textContent = "Error: " + (result.error || "Failed to send message.");
                formStatus.style.color = "red";
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = "An error occurred. Please try again.";
            formStatus.style.color = "red";
        }
    });
}


