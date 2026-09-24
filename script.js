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
            document.querySelector('.timer-title').innerText = "Time since we said Yes:";
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createFloatingItems();
    startTimer();

    // Autoplay workaround for browsers that block it
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.volume = 0.5; // Soft volume
        // Try to play immediately (might be blocked)
        audio.play().catch(e => {
            // If blocked, wait for the first user interaction
            document.body.addEventListener('click', () => {
                audio.play();
            }, { once: true });
            document.body.addEventListener('touchstart', () => {
                audio.play();
            }, { once: true });
        });
    }
});
