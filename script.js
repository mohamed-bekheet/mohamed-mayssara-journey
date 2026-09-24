// Floating Elements Generator Background Effect
function createFloatingItems() {
    const bg = document.querySelector('.background');
    const floatSymbols = ['🤏', '✨', '🙏', '🙆'];
    
    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('float-item');
        
        // Randomize properties
        const randomSymbol = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
        const leftPos = Math.random() * 100;
        const animDuration = 14 + Math.random() * 8; // 14s to 22s
        const opacity = 0.25 + Math.random() * 0.2; // 0.25 to 0.45
        const size = 1.4 + Math.random() * 1; // 1.4rem to 2.4rem
        
        item.innerText = randomSymbol;
        item.style.left = `${leftPos}%`;
        item.style.animationDuration = `${animDuration}s`;
        item.style.opacity = opacity;
        item.style.fontSize = `${size}rem`;
        
        bg.appendChild(item);
        
        // Remove after animation finishes
        setTimeout(() => {
            item.remove();
        }, animDuration * 1000);
    }, 1200); // create a heart every 1.2 seconds
}

// Timer Logic for Qrayt Elfatha
function startTimer() {
    // Qrayt Elfatha Date: September 24, 2026 at midnight
    const startDate = new Date('2026-09-24T00:00:00');

    function updateTimer() {
        const now = new Date();
        let diff = now - startDate;
        
        const isFuture = diff < 0;
        
        if (isFuture) {
            diff = Math.abs(diff); // Countdown
            document.querySelector('.timer-title').innerText = "Time until our special day:";
        } else {
            // Count-up
            document.querySelector('.timer-title').innerText = "Time since my request officially approved:";
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('mins').innerText = String(mins).padStart(2, '0');
        document.getElementById('secs').innerText = String(secs).padStart(2, '0');
    }

    // Call it immediately then set interval
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Tap Confetti Burst
function initConfetti() {
    const confettiEmojis = ['✨', '🙏', '✨', '🙏'];
    const particleCount = 4;

    function burst(x, y) {
        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.classList.add('confetti-particle');
            el.innerText = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];

            // Random direction
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const distance = 60 + Math.random() * 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 30; // slight upward bias
            const rot = (Math.random() - 0.5) * 720;

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.setProperty('--tx', `${tx}px`);
            el.style.setProperty('--ty', `${ty}px`);
            el.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(el);
            setTimeout(() => el.remove(), 1000);
        }
    }

    document.addEventListener('click', (e) => {
        burst(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        burst(touch.clientX, touch.clientY);
    }, { passive: true });
}

// Easter Egg: 5 taps on Milestone 1 card
function initEasterEgg() {
    const card = document.getElementById('milestone-1-card');
    const overlay = document.getElementById('easter-egg');
    if (!card || !overlay) return;

    let tapCount = 0;
    let tapTimer = null;
    let currentSlide = 0;
    const totalSlides = 4;
    const cards = overlay.querySelectorAll('.easter-egg-card');
    const dots = overlay.querySelectorAll('.ee-dot');

    // Count taps on the milestone 1 card
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        tapCount++;
        clearTimeout(tapTimer);

        // Reset tap count if user stops tapping for 2 seconds
        tapTimer = setTimeout(() => { tapCount = 0; }, 2000);

        if (tapCount >= 5) {
            tapCount = 0;
            currentSlide = 0;
            showSlide(0);
            overlay.style.display = 'flex';
            // Trigger reflow then add visible class for animation
            requestAnimationFrame(() => {
                overlay.classList.add('visible');
            });
        }
    });

    function showSlide(index) {
        cards.forEach(c => c.style.display = 'none');
        dots.forEach(d => d.classList.remove('active'));
        cards[index].style.display = 'block';
        // Re-trigger card animation
        cards[index].style.animation = 'none';
        cards[index].offsetHeight; // force reflow
        cards[index].style.animation = '';
        dots[index].classList.add('active');
    }

    // Tap on the overlay container to advance / close
    overlay.querySelector('.easter-egg-container').addEventListener('click', (e) => {
        // Only advance if the user taps precisely on the hint text
        if (!e.target.closest('.ee-hint')) return;
        
        e.stopPropagation();
        currentSlide++;
        if (currentSlide >= totalSlides) {
            // Close the overlay
            overlay.classList.remove('visible');
            setTimeout(() => { overlay.style.display = 'none'; }, 400);
            currentSlide = 0;
        } else {
            showSlide(currentSlide);
        }
    });
}

// Theme Toggle
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const icon = btn.querySelector('.icon');
    
    // Check URL parameters first (e.g. ?theme=light or ?theme=dark)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    
    // URL overrides saved preference
    const initialTheme = urlTheme || localStorage.getItem('theme') || 'dark';
    
    let audioUnlocked = false;

    function updateMusic(isLight, forcePlay = true) {
        const audio = document.getElementById('bg-music');
        if (audio) {
            const newSrc = isLight ? 'lightmusic.mp3' : 'darkmusic.mp3';
            if (!audio.getAttribute('src') || !audio.getAttribute('src').includes(newSrc)) {
                audio.src = newSrc;
            }
            if (forcePlay && audioUnlocked && audio.paused) {
                audio.play().catch(e => console.log('Play blocked:', e));
            }
        }
    }
    
    if (initialTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.textContent = '🌙'; // moon icon for light mode (click to go dark)
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        icon.textContent = '✨';
        localStorage.setItem('theme', 'dark');
    }
    updateMusic(initialTheme === 'light', false);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // This button acts as a user interaction, so we can unlock audio
        audioUnlocked = true;

        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateMusic(isLight, true);
        
        // Animate icon swap
        icon.style.transform = 'rotate(180deg) scale(0)';
        setTimeout(() => {
            icon.textContent = isLight ? '🌙' : '✨';
            icon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createFloatingItems();
    startTimer();
    initConfetti();
    initEasterEgg();
    initThemeToggle();

    // Music Button Logic
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    
    if (audio && musicBtn) {
        audio.volume = 0.5;
        
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            audioUnlocked = true;
            
            if (audio.paused) {
                audio.play().then(() => {
                    musicIcon.textContent = '🔊';
                }).catch(err => console.log('Blocked:', err));
            } else {
                audio.pause();
                musicIcon.textContent = '🎵';
            }
        });
        
        // Optional: Still try to unlock on first document touch if they don't click the button
        const unlockAudio = () => {
            if (audio.paused && !audioUnlocked) {
                audio.play().then(() => {
                    audioUnlocked = true;
                    musicIcon.textContent = '🔊';
                    document.removeEventListener('click', unlockAudio);
                    document.removeEventListener('touchstart', unlockAudio);
                }).catch(err => console.log('Still blocked:', err));
            }
        };
        
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
    }
});
