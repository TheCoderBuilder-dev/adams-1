/* ============================================
   ADAMS ARCADE — INTERACTIVE SCRIPTS
   Kenya's First Shopping Centre Since 1952
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================
    // CUSTOM CURSOR
    // ============================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Cursor follows immediately
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX - 6 + 'px';
            cursor.style.top = cursorY - 6 + 'px';
            
            // Follower is delayed
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX - 20 + 'px';
            follower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .hscroll-card, .bento-item, .shop-item, .cat-tab');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'scale(1.5)';
                follower.style.opacity = '0.5';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'scale(1)';
                follower.style.opacity = '1';
            });
        });
    }
    
    // ============================
    // LOADER
    // ============================
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
    
    // ============================
    // MENU OVERLAY
    // ============================
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (menuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking links
        const menuLinks = menuOverlay.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // ============================
    // SIDE NAVIGATION
    // ============================
    const sections = document.querySelectorAll('.section[data-section]');
    const dots = document.querySelectorAll('.dot');
    const navLabel = document.querySelector('.nav-label');
    const navCurrent = document.querySelector('.current');
    
    const sectionNames = {
        'opening': 'Welcome',
        'story': 'Heritage',
        'explore': 'Directory',
        'community': 'Community',
        'find-us': 'Find Us'
    };
    
    function updateNav(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        const sectionId = sections[index]?.dataset.section;
        if (navLabel && sectionNames[sectionId]) {
            navLabel.textContent = sectionNames[sectionId];
        }
        
        if (navCurrent) {
            navCurrent.textContent = String(index + 1).padStart(2, '0');
        }
    }
    
    // Scroll detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                updateNav(index);
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => observer.observe(section));
    
    // Dot click navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            sections[i]?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // ============================
    // CATEGORY TABS (Explore Section)
    // ============================
    const catTabs = document.querySelectorAll('.cat-tab');
    const scrollTracks = document.querySelectorAll('.hscroll-track, .shop-grid, .office-showcase');
    
    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding track
            const category = tab.dataset.category;
            scrollTracks.forEach(track => {
                if (track.dataset.category === category) {
                    track.classList.remove('hidden');
                } else {
                    track.classList.add('hidden');
                }
            });
        });
    });
    
    // ============================
    // HORIZONTAL SCROLL ENHANCEMENT
    // ============================
    const hscrollWrappers = document.querySelectorAll('.hscroll-track');
    
    hscrollWrappers.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
        
        // Wheel scroll horizontal
        track.addEventListener('wheel', (e) => {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        }, { passive: false });
    });
    
    // ============================
    // SCROLL ANIMATIONS
    // ============================
    const animateElements = document.querySelectorAll('.story-content, .bento-item, .contact-block, .office-card');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(el);
    });
    
    // ============================
    // TIMELINE MINI HOVER
    // ============================
    const tlItems = document.querySelectorAll('.tl-item');
    
    tlItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            tlItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Set first as active
    if (tlItems.length > 0) {
        tlItems[0].classList.add('active');
    }
    
    // ============================
    // BENTO GRID PARALLAX
    // ============================
    const bentoImages = document.querySelectorAll('.bento-item[style*="background-image"]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        bentoImages.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const yPos = (rect.top - window.innerHeight / 2) * 0.1;
                item.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
            }
        });
    });
    
    // ============================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================
    // MAP INTERACTION
    // ============================
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', () => {
            mapContainer.querySelector('iframe').style.filter = 'grayscale(0%) contrast(1)';
        });
        
        mapContainer.addEventListener('mouseleave', () => {
            mapContainer.querySelector('iframe').style.filter = 'grayscale(80%) contrast(1.1)';
        });
    }
    
    // ============================
    // TITLE ANIMATION ON LOAD
    // ============================
    const megaTitle = document.querySelector('.mega-title');
    
    if (megaTitle) {
        megaTitle.querySelectorAll('.word').forEach((word, i) => {
            word.style.animationDelay = `${i * 0.15 + 1.5}s`;
        });
    }
    
    // ============================
    // COUNTER ANIMATION
    // ============================
    const counters = document.querySelectorAll('.stat-num, .stat-big .num');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
                const suffix = entry.target.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = target / 50;
                const duration = 2000 / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.ceil(current) + suffix;
                        setTimeout(updateCounter, duration);
                    } else {
                        entry.target.textContent = target + suffix;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ============================
    // CONSOLE BRANDING
    // ============================
    console.log(
        '%c ADAMS ARCADE %c Kenya\'s First Shopping Centre Since 1952 ',
        'background: #c9a227; color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold;',
        'background: #0d1b2a; color: #fff; padding: 10px 20px; font-size: 12px;'
    );
    
});

// ============================
// PRELOAD CRITICAL IMAGES
// ============================
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800',
        'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();
