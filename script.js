document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let currentWishIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                updateActiveSection(sectionIndex);
                entry.target.classList.add('in-view');

                // Trigger specific animations
                if (sectionIndex === 1) animateMemoryCards();
                if (sectionIndex === 2) animateWishCards();
                if (sectionIndex === 3) animateFarewellContent();
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    function updateActiveSection(index) {
        if (index !== currentSection) {
            currentSection = index;
            setActiveNav(index);
        }
    }

    // Initialize navigation
    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(index);
        });
    });

    // Initialize wishes section
    function initializeWishes() {
        const wishes = document.querySelectorAll('.wish-card');
        const indicators = document.querySelectorAll('.indicator');
        
        if (wishes.length > 0) {
            wishes[0].classList.add('active');
        }
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }
    }

    // Call initialization
    initializeWishes();

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    function setActiveNav(index) {
        navItems.forEach(item => item.classList.remove('active'));
        navItems[index].classList.add('active');

        // Update scroll indicator
        const scrollDots = document.querySelectorAll('.scroll-dot');
        scrollDots.forEach(dot => dot.classList.remove('active'));
        if (scrollDots[index]) {
            scrollDots[index].classList.add('active');
        }
    }

    // Initialize scroll indicator
    const scrollDots = document.querySelectorAll('.scroll-dot');
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSection(index);
        });
    });

    // Memory cards animation
    function animateMemoryCards() {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Wish cards animation
    function animateWishCards() {
        const wishes = document.querySelectorAll('.wish-card');
        const indicators = document.querySelectorAll('.indicator');
        
        // Reset all wishes
        wishes.forEach((wish, index) => {
            wish.classList.remove('active');
            if (index === 0) {
                wish.classList.add('active');
            }
        });

        // Reset indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === 0) {
                indicator.classList.add('active');
            }
        });

        currentWishIndex = 0;
    }

    // Farewell content animation
    function animateFarewellContent() {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.style.opacity = '0.8';
                heart.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    // Wish navigation functions
    window.changeWish = function(direction) {
        const wishes = document.querySelectorAll('.wish-card');
        const indicators = document.querySelectorAll('.indicator');

        wishes[currentWishIndex].classList.remove('active');
        indicators[currentWishIndex].classList.remove('active');

        currentWishIndex += direction;
        if (currentWishIndex >= wishes.length) currentWishIndex = 0;
        if (currentWishIndex < 0) currentWishIndex = wishes.length - 1;

        wishes[currentWishIndex].classList.add('active');
        indicators[currentWishIndex].classList.add('active');
    };

    window.showWish = function(index) {
        const wishes = document.querySelectorAll('.wish-card');
        const indicators = document.querySelectorAll('.indicator');

        wishes[currentWishIndex].classList.remove('active');
        indicators[currentWishIndex].classList.remove('active');

        currentWishIndex = index;
        wishes[currentWishIndex].classList.add('active');
        indicators[currentWishIndex].classList.add('active');
    };

    // Photo frame interaction
    const photoFrame = document.getElementById('photoFrame');
    if (photoFrame) {
        photoFrame.addEventListener('click', function() {
            // Create sparkle effect
            createSparkleEffect(this);

            // Play gentle sound effect
            playGentleChime();

            // Temporary celebration animation
            this.style.animation = 'none';
            this.style.transform = 'scale(1.15) rotateY(360deg)';
            this.style.transition = 'transform 1.5s ease-out';

            setTimeout(() => {
                this.style.animation = 'floatPhoto 6s ease-in-out infinite';
                this.style.transform = 'scale(1)';
            }, 1500);
        });
    }

    // Start journey button
    const startBtn = document.getElementById('startJourney');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // Navigate to memories section
            scrollToSection(1);

            // Create gentle particle effect
            createGentleParticles();

            // Change button text
            this.textContent = 'Beginning Our Journey...';
            this.style.background = 'linear-gradient(135deg, #4a90e2, #7b68ee)';

            setTimeout(() => {
                this.textContent = 'Journey Started ✨';
            }, 2000);
        });
    }

    // Final goodbye button
    const finalBtn = document.getElementById('finalGoodbye');
    if (finalBtn) {
        finalBtn.addEventListener('click', function() {
            createFinalFarewell();
            this.style.display = 'none';
        });
    }

    // Music note functionality
    const musicNote = document.getElementById('musicNote');
    if (musicNote) {
        musicNote.addEventListener('click', function() {
            playBirthdayMelody();
            this.style.animation = 'none';
            this.style.transform = 'scale(1.3) rotate(360deg)';
            this.style.transition = 'transform 1s ease-out';

            setTimeout(() => {
                this.style.animation = 'subtlePulse 2s infinite';
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    }

    // Audio functions
    let audioContext;

    function initAudio() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
            }
        }
    }

    function playNote(frequency, duration, volume = 0.2) {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }

    function playGentleChime() {
        initAudio();
        const notes = [523, 659, 784]; // C, E, G
        notes.forEach((note, index) => {
            setTimeout(() => {
                playNote(note, 800, 0.15);
            }, index * 200);
        });
    }

    function playBirthdayMelody() {
        initAudio();
        const melody = [
            {freq: 264, duration: 400}, // C
            {freq: 264, duration: 400}, // C
            {freq: 297, duration: 800}, // D
            {freq: 264, duration: 800}, // C
            {freq: 352, duration: 800}, // F
            {freq: 330, duration: 1600}, // E
        ];

        let currentTime = 0;
        melody.forEach(note => {
            setTimeout(() => {
                playNote(note.freq, note.duration, 0.1);
            }, currentTime);
            currentTime += note.duration;
        });
    }

    // Visual effects
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#f4d03f';
            sparkle.style.borderRadius = '50%';
            sparkle.style.boxShadow = '0 0 10px #f4d03f';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';

            const angle = (i * 45) * Math.PI / 180;
            const distance = 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';

            document.body.appendChild(sparkle);

            sparkle.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`, opacity: 1, offset: 0.7 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1200,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }
    }

    function createGentleParticles() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
                particle.style.position = 'fixed';
                particle.style.fontSize = '1.5rem';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';

                document.body.appendChild(particle);

                particle.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                    { transform: 'translateY(-200px) rotate(180deg)', opacity: 1, offset: 0.3 },
                    { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
                ], {
                    duration: 4000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }, i * 300);
        }
    }

    function createFinalFarewell() {
        // Show final message
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(26, 26, 46, 0.95);
                backdrop-filter: blur(20px);
                padding: 60px;
                border-radius: 25px;
                text-align: center;
                box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 10000;
                color: #f8f9fa;
                max-width: 500px;
                animation: fadeInScale 1s ease-out;
            ">
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2.5rem; 
                    background: linear-gradient(135deg, #8b5a96, #d4568c, #f4d03f); 
                    -webkit-background-clip: text; 
                    -webkit-text-fill-color: transparent; 
                    margin-bottom: 30px;
                    font-weight: 500;
                ">Until We Meet Again</h3>
                <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 30px; color: #e9ecef; font-weight: 300;">
                    Your love has been sent to the stars, where it will shine eternally. Though our paths may diverge, the memories we've shared will light up the darkest nights.
                </p>
                <p style="font-size: 1rem; color: #adb5bd; font-style: italic; margin-bottom: 30px;">
                    "Some people come into our lives and quickly go. Some stay for a while and leave footprints on our hearts." ✨
                </p>
                <button onclick="this.parentElement.parentElement.remove()" 
                    style="
                        background: linear-gradient(135deg, #8b5a96, #d4568c);
                        color: white;
                        border: none;
                        padding: 15px 35px;
                        border-radius: 50px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    "
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'"
                >
                    Forever in My Heart 💖
                </button>
            </div>
        `;

        document.body.appendChild(message);

        // Create gentle floating hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 200);
        }

        // Play gentle farewell melody
        setTimeout(() => {
            playBirthdayMelody();
        }, 1000);
    }

    function createFloatingHeart() {
        const hearts = ['💖', '💕', '💗', '💝', '💞'];
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = '1.8rem';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';

        document.body.appendChild(heart);

        heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: 'translateY(-100px) rotate(180deg)', opacity: 1, offset: 0.3 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 5000 + Math.random() * 2000,
            easing: 'ease-out'
        }).onfinish = () => heart.remove();
    }

    // Initialize audio on first interaction
    document.addEventListener('click', function initAudioOnClick() {
        initAudio();
        document.removeEventListener('click', initAudioOnClick);
    }, { once: true });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });

    // Add fade in animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Auto-play entrance animation for floating elements
    setTimeout(() => {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.opacity = '1';
            }, index * 100);
        });
    }, 500);

    // Smooth parallax effect on scroll
    let ticking = false;

    function updateParallax() {
        const scrollTop = window.pageYOffset;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            const yPos = -(scrollTop * speed);

            // Apply subtle parallax to section backgrounds
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const parallaxElements = section.querySelectorAll('.parallax-content');
                parallaxElements.forEach(element => {
                    element.style.transform = `translate3d(0, ${yPos * 0.1}px, 0)`;
                });
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
});