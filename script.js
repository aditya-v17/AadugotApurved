console.log("script.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
});


function initCountdown() {
        const weddingDate = new Date("2026-02-06T12:11:00");

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        function updateCountdown() {
          const now = new Date().getTime();
          const diff = weddingDate.getTime() - now;

          console.log("in update countdown Diff:", diff);
      
          if (diff <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
          }
      
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
      
          daysEl.textContent = days;
          hoursEl.textContent = String(hours).padStart(2, "0");
          minutesEl.textContent = String(minutes).padStart(2, "0");
          secondsEl.textContent = String(seconds).padStart(2, "0");
        }
      
        updateCountdown();
        setInterval(updateCountdown, 1000);
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    const heroSection = document.querySelector('.hero-section .hero-content');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('fade-in');
        }, 200);
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`);
        
        form.reset();
    });
}

function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('#navbar a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--grey-blue)';
            }
        });
        
        lastScroll = currentScroll;
    });
}

document.querySelector('.btn-calendar')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const title = 'Wedding of Apurva & Aditya';
    const startDate = '20251231T150000';
    const endDate = '20251231T230000';
    const details = 'Join us for our wedding celebration!';
    const location = '[Venue Name and Address]';
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

/* ===== Share Your Photos helper (copy + UX) ===== */
(function () {
    const copyBtn = document.getElementById('copyLinkBtn');
    const uploadInput = document.getElementById('uploadLink');
    const openBtn = document.getElementById('openUploadBtn');
    if (!copyBtn || !uploadInput || !openBtn) return;
  
    // copy to clipboard
    copyBtn.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(uploadInput.value);
        // small transient feedback
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = orig, 1500);
      } catch (err) {
        // fallback
        uploadInput.select();
        try {
          document.execCommand('copy');
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = orig, 1500);
        } catch (e) {
          alert('Copy failed — please copy the link manually.');
        }
      }
    });
  
    // open upload link in new tab (value-driven)
    openBtn.addEventListener('click', function (e) {
      // make sure the anchor points to the input value (keeps them in sync)
      openBtn.href = uploadInput.value;
    });
  })();
  