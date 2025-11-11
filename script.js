// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

// ===== Background Music Control =====
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
const musicIconMuted = document.querySelector('.music-icon-muted');
let isPlaying = false;

if (bgMusic && musicToggle && musicIcon && musicIconMuted) {
    // Set volume to 1%
    bgMusic.volume = 0.01;
    
    // Try to play music on page load
    window.addEventListener('load', () => {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.style.display = 'block';
            musicIconMuted.style.display = 'none';
            musicToggle.classList.remove('muted');
        }).catch(() => {
            // Auto-play blocked, user needs to click
            isPlaying = false;
            musicIcon.style.display = 'none';
            musicIconMuted.style.display = 'block';
            musicToggle.classList.add('muted');
        });
    });

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.style.display = 'none';
            musicIconMuted.style.display = 'block';
            musicToggle.classList.add('muted');
            isPlaying = false;
        } else {
            bgMusic.play();
            musicIcon.style.display = 'block';
            musicIconMuted.style.display = 'none';
            musicToggle.classList.remove('muted');
            isPlaying = true;
        }
    });
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!e.target.closest('#navMenu') && !e.target.closest('#menuToggle')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function activateNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavOnScroll);

// ===== Smooth Scroll =====
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Remove active class from all items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Close mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ===== Particles Canvas =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
}

// ===== Hero Buttons Actions =====
const btnPrimary = document.querySelector('.btn-primary');
const btnOutline = document.querySelector('.btn-outline');

if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        const abilitiesSection = document.querySelector('#abilities');
        if (abilitiesSection) {
            abilitiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (btnOutline) {
    btnOutline.addEventListener('click', () => {
        alert('🎬 سيتم قريباً إطلاق فيديو تقديمي للبطل!');
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll(
    '.ability-card-modern, .gallery-item, .stat-card, .info-card, .story-quote'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===== Stat Bars Animation =====
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBars = entry.target.querySelectorAll('.stat-bar');
            statBars.forEach(bar => {
                const width = bar.style.getPropertyValue('--stat-width');
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statObserver.observe(statsSection);
}

// ===== Theme Toggle (Optional Feature) =====
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Future: Add light/dark theme toggle
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 600);
    });
}

// ===== Ability Cards Interactive =====
const abilityCards = document.querySelectorAll('.ability-card-modern');

abilityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
    
    card.addEventListener('click', function() {
        const abilityName = this.querySelector('.ability-name').textContent;
        const abilityDesc = this.querySelector('.ability-desc').textContent;
        
        // Create modal-like effect
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// ===== Gallery Items Hover Effect =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Future: Add lightbox functionality
            console.log('Gallery item clicked:', img.alt);
        }
    });
});

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // You can add a progress bar element if needed
    // progressBar.style.width = scrollProgress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== Parallax Effect for Hero Image =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// ===== Role Tags Animation =====
const roleTags = document.querySelectorAll('.role-tag');

roleTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const icon = this.querySelector('svg');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
        }
    });
    
    tag.addEventListener('mouseleave', function() {
        const icon = this.querySelector('svg');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

// ===== Console Easter Egg =====
console.log('%c🎮 مرحباً بك في صفحة شين زاو! 🎮', 'color: #d4af37; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c⚔️ هل أنت مستعد للمعركة؟', 'color: #0ea5e9; font-size: 16px; font-weight: bold;');
console.log('%cتصميم حديث وعصري من إبداعنا', 'color: #a0a0a0; font-size: 14px; font-style: italic;');

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based functions here
}, 10));

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = getCurrentSection();
        const allSections = Array.from(sections);
        const currentIndex = allSections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < allSections.length - 1) {
            e.preventDefault();
            allSections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            allSections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const scrollY = window.pageYOffset + window.innerHeight / 2;
    let current = sections[0];
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop) {
            current = section;
        }
    });
    
    return current;
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ الموقع جاهز للاستخدام!');
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== Tabs Functionality =====
// Support for both old and new tab systems
const tabBtns = document.querySelectorAll('.tab-btn, .tab-btn-new');
const tabPanels = document.querySelectorAll('.tab-panel, .tab-panel-new');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked button and corresponding panel
            btn.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== Interactive Abilities System =====
const abilityIconBtns = document.querySelectorAll('.ability-icon-btn');
const abilityDetails = document.querySelectorAll('.ability-detail');

if (abilityIconBtns.length > 0) {
    abilityIconBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetAbility = btn.getAttribute('data-ability');
            
            // Remove active from all buttons
            abilityIconBtns.forEach(b => b.classList.remove('active'));
            
            // Remove active from all ability details
            abilityDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');
            
            // Show corresponding ability detail with animation
            const targetDetail = document.querySelector(`[data-ability-content="${targetAbility}"]`);
            if (targetDetail) {
                setTimeout(() => {
                    targetDetail.classList.add('active');
                    
                    // Play video if exists
                    const video = targetDetail.querySelector('video');
                    if (video) {
                        video.currentTime = 0;
                        video.play();
                    }
                }, 50);
            }
        });
    });
    
    // Auto-play first ability video on load
    const firstAbilityVideo = document.querySelector('.ability-detail.active video');
    if (firstAbilityVideo) {
        firstAbilityVideo.play();
    }
}

// ===== Story Navigation System =====
const storyNavBtns = document.querySelectorAll('.story-nav-btn-side');
const storyChapters = document.querySelectorAll('.story-chapter-content');

if (storyNavBtns.length > 0) {
    storyNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetChapter = btn.getAttribute('data-chapter');
            
            // Remove active from all buttons
            storyNavBtns.forEach(b => b.classList.remove('active'));
            
            // Remove active from all chapters
            storyChapters.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');
            
            // Add active to target chapter
            const targetChapterElement = document.getElementById(targetChapter);
            if (targetChapterElement) {
                targetChapterElement.classList.add('active');
                
                // Smooth scroll to content
                targetChapterElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// ===== Comic Video Modal with Plyr =====
const episodeCards = document.querySelectorAll('.episode-card');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalBackdrop = document.querySelector('.modal-backdrop');
const nextEpisodeOverlay = document.getElementById('nextEpisodeOverlay');
const nextEpisodeTitle = document.getElementById('nextEpisodeTitle');
const playNextEpisode = document.getElementById('playNextEpisode');
const countdownNumber = document.getElementById('countdownNumber');

let player = null;
let currentEpisodeIndex = -1;
let countdownInterval = null;
let autoplayTimeout = null;

// Load completed episodes from localStorage
let completedEpisodes = JSON.parse(localStorage.getItem('completedEpisodes') || '[]');

console.log('تحميل الحلقات المكتملة:', completedEpisodes);

const episodes = [
    {
        title: 'Spirit Blossom Beyond: Pilgrimage',
        video: 'comic/Spirit Blossom Beyond： Pilgrimage l Motion Comic – League of Legends.mp4'
    },
    {
        title: 'Spirit Blossom Beyond: The Devoted Shrine Maiden',
        video: 'comic/Spirit Blossom Beyond： The Devoted Shrine Maiden l Motion Comic – League of Legends.mp4'
    },
    {
        title: 'Trials of Twilight: The Warning',
        video: 'comic/Trials of Twilight： The Warning l Motion Comic – League of Legends.mp4'
    }
];

// Update episode cards based on completion
function updateEpisodeCards() {
    episodeCards.forEach((card, index) => {
        const episodeNum = parseInt(card.getAttribute('data-episode'));
        console.log(`الحلقة ${episodeNum}:`, episodeNum === 0 || completedEpisodes.includes(episodeNum - 1) ? 'مفتوحة' : 'مقفلة');
        
        if (episodeNum === 0 || completedEpisodes.includes(episodeNum - 1)) {
            card.classList.remove('locked');
            card.classList.add('unlocked');
        } else {
            card.classList.add('locked');
            card.classList.remove('unlocked');
        }
    });
}

// Update cards on page load
updateEpisodeCards();

// Add reset function for testing (accessible via browser console)
window.resetEpisodeProgress = function() {
    localStorage.removeItem('completedEpisodes');
    completedEpisodes = [];
    updateEpisodeCards();
    console.log('تم إعادة تعيين التقدم - جميع الحلقات مقفلة باستثناء الأولى');
};

console.log('لإعادة تعيين التقدم، استخدم: resetEpisodeProgress()');

if (episodeCards.length > 0) {
    episodeCards.forEach((card) => {
        card.addEventListener('click', () => {
            // Check if episode is locked
            if (card.classList.contains('locked')) {
                console.log('الحلقة مقفلة - يجب إكمال الحلقة السابقة أولاً');
                
                // Add shake animation
                card.classList.add('shake');
                setTimeout(() => {
                    card.classList.remove('shake');
                }, 300);
                
                return; // Don't do anything if locked
            }
            
            const episodeIndex = parseInt(card.getAttribute('data-episode'));
            currentEpisodeIndex = episodeIndex;
            console.log('تشغيل الحلقة:', episodeIndex);
            playEpisode(episodeIndex);
        });
    });
}

function playEpisode(index) {
    const videoSrc = episodes[index].video;
    modalVideo.querySelector('source').src = videoSrc;
    modalVideo.load();
    
    // Initialize Plyr if not already initialized
    if (!player) {
        player = new Plyr('#modalVideo', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
            quality: { default: 1080, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
            i18n: {
                restart: 'إعادة التشغيل',
                play: 'تشغيل',
                pause: 'إيقاف مؤقت',
                mute: 'كتم الصوت',
                unmute: 'إلغاء الكتم',
                volume: 'مستوى الصوت',
                speed: 'السرعة',
                normal: 'عادي',
                quality: 'الجودة',
                settings: 'الإعدادات',
                enterFullscreen: 'ملء الشاشة',
                exitFullscreen: 'إلغاء ملء الشاشة'
            }
        });
        
        // Listen to timeupdate event
        player.on('timeupdate', handleTimeUpdate);
        
        // Listen to ended event to mark episode as completed
        player.on('ended', () => {
            markEpisodeCompleted(currentEpisodeIndex);
        });
    }
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    hideNextEpisodeOverlay();
}

function markEpisodeCompleted(episodeIndex) {
    if (!completedEpisodes.includes(episodeIndex)) {
        completedEpisodes.push(episodeIndex);
        localStorage.setItem('completedEpisodes', JSON.stringify(completedEpisodes));
        console.log('تم حفظ الحلقة المكتملة:', episodeIndex, 'القائمة الكاملة:', completedEpisodes);
        updateEpisodeCards();
    }
}

function handleTimeUpdate() {
    if (!player) return;
    
    const duration = player.duration;
    const currentTime = player.currentTime;
    const timeRemaining = duration - currentTime;
    
    // Mark as completed if 95% watched
    if (currentTime / duration >= 0.95 && !completedEpisodes.includes(currentEpisodeIndex)) {
        markEpisodeCompleted(currentEpisodeIndex);
    }
    
    // Show next episode overlay in last 20 seconds
    if (timeRemaining <= 20 && timeRemaining > 0 && currentEpisodeIndex < episodes.length - 1) {
        if (!nextEpisodeOverlay.classList.contains('show')) {
            showNextEpisodeOverlay();
            startCountdown(Math.floor(timeRemaining));
        }
    }
}

function showNextEpisodeOverlay() {
    const nextIndex = currentEpisodeIndex + 1;
    if (nextIndex < episodes.length) {
        nextEpisodeTitle.textContent = episodes[nextIndex].title;
        nextEpisodeOverlay.classList.add('show');
    }
}

function hideNextEpisodeOverlay() {
    nextEpisodeOverlay.classList.remove('show');
    clearCountdown();
}

function startCountdown(seconds) {
    clearCountdown();
    
    let count = seconds;
    countdownNumber.textContent = count;
    
    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumber.textContent = count;
        } else {
            clearCountdown();
            playNextEpisodeAuto();
        }
    }, 1000);
}

function clearCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    if (autoplayTimeout) {
        clearTimeout(autoplayTimeout);
        autoplayTimeout = null;
    }
}

function playNextEpisodeAuto() {
    const nextIndex = currentEpisodeIndex + 1;
    if (nextIndex < episodes.length) {
        currentEpisodeIndex = nextIndex;
        playEpisode(nextIndex);
    }
}

if (playNextEpisode) {
    playNextEpisode.addEventListener('click', () => {
        clearCountdown();
        playNextEpisodeAuto();
    });
}

// Close video when clicking on backdrop (outside video area)
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeVideoModal);
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    hideNextEpisodeOverlay();
    if (player) {
        player.pause();
    }
    document.body.style.overflow = '';
}

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('حدث خطأ:', e.error);
});

// ===== Service Worker Registration (Optional) =====
if ('serviceWorker' in navigator) {
    // Future: Add PWA support
    // navigator.serviceWorker.register('/sw.js');
}

