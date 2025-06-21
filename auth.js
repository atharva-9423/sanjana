
// Password authentication system
class PasswordAuth {
    constructor() {
        this.correctPassword = '02/01/2025';
        this.isAuthenticated = this.checkAuthentication();
        this.init();
    }

    checkAuthentication() {
        return false; // Always require authentication
    }

    init() {
        if (!this.isAuthenticated) {
            this.showPasswordPrompt();
        }
    }

    showPasswordPrompt() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'password-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #000000 0%, #1c1c1e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(20px);
        `;

        // Create password form
        const passwordContainer = document.createElement('div');
        passwordContainer.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(40px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 24px;
            padding: 60px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            width: 90%;
        `;

        passwordContainer.innerHTML = `
            <div style="margin-bottom: 30px;">
                <h2 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2.5rem;
                    background: linear-gradient(135deg, #af52de, #ff2d92, #ff9f0a);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                    font-weight: 500;
                ">🔒 Protected</h2>
                <p style="
                    color: #8e8e93;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    font-weight: 300;
                ">This special birthday message is protected. Please enter the password to continue.</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <input 
                    type="date" 
                    id="password-input" 
                    style="
                        width: 100%;
                        padding: 16px 20px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        background: rgba(255, 255, 255, 0.05);
                        color: white;
                        font-size: 1rem;
                        text-align: center;
                        outline: none;
                        transition: all 0.3s ease;
                        color-scheme: dark;
                    "
                />
                <div style="
                    margin-top: 10px;
                    color: #8e8e93;
                    font-size: 0.9rem;
                    text-align: center;
                ">
                    Format: DD/MM/YYYY
                </div>
            </div>
            
            <button 
                id="submit-password" 
                style="
                    background: linear-gradient(135deg, #af52de, #ff2d92);
                    color: white;
                    border: none;
                    padding: 16px 32px;
                    font-size: 1rem;
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    font-weight: 600;
                    width: 100%;
                    box-shadow: 0 8px 32px rgba(175, 82, 222, 0.3);
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 48px rgba(175, 82, 222, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 32px rgba(175, 82, 222, 0.3)'"
            >
                Enter
            </button>
            
            <div id="error-message" style="
                color: #ff453a;
                margin-top: 20px;
                font-size: 0.9rem;
                display: none;
            "></div>
            
            <div style="
                margin-top: 30px;
                color: #8e8e93;
                font-size: 0.85rem;
                font-style: italic;
            ">
                💡 Hint: Remembar the day when we first Kissed in early 2025...
            </div>
        `;

        overlay.appendChild(passwordContainer);
        document.body.appendChild(overlay);

        // Add event listeners
        const passwordInput = document.getElementById('password-input');
        const submitButton = document.getElementById('submit-password');
        const errorMessage = document.getElementById('error-message');

        // Focus input
        setTimeout(() => passwordInput.focus(), 100);

        // Add input styling
        passwordInput.addEventListener('focus', function() {
            this.style.borderColor = 'rgba(175, 82, 222, 0.5)';
            this.style.boxShadow = '0 0 20px rgba(175, 82, 222, 0.2)';
        });

        passwordInput.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.boxShadow = 'none';
        });

        // Handle password submission
        const checkPassword = () => {
            const enteredDate = passwordInput.value;
            
            // Convert YYYY-MM-DD to DD/MM/YYYY format
            let formattedDate = '';
            if (enteredDate) {
                const dateParts = enteredDate.split('-');
                if (dateParts.length === 3) {
                    formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                }
            }
            
            if (formattedDate === this.correctPassword) {
                // Correct password (no session storage)
                
                // Success animation
                passwordContainer.style.transform = 'scale(1.05)';
                passwordContainer.style.background = 'rgba(0, 255, 0, 0.1)';
                
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'scale(0.95)';
                    overlay.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        this.showSplashScreen();
                    }, 500);
                }, 1000);
                
            } else {
                // Wrong password
                errorMessage.textContent = 'Incorrect password. Please try again.';
                errorMessage.style.display = 'block';
                
                // Shake animation
                passwordContainer.style.animation = 'shake 0.5s ease-in-out';
                passwordInput.style.borderColor = '#ff453a';
                passwordInput.value = '';
                
                setTimeout(() => {
                    passwordContainer.style.animation = '';
                    passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    errorMessage.style.display = 'none';
                }, 2000);
            }
        };

        submitButton.addEventListener('click', checkPassword);
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });

        // Add shake animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }

    showSplashScreen() {
        // Create splash screen overlay
        const splashOverlay = document.createElement('div');
        splashOverlay.id = 'splash-overlay';
        splashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 1s ease-out;
        `;

        splashOverlay.innerHTML = `
            <!-- Animated Background Particles -->
            <div id="particles-container" style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            "></div>

            <!-- Main Content -->
            <div style="
                text-align: center;
                z-index: 2;
                transform: translateY(30px);
                opacity: 0;
                animation: fadeInUp 1.5s ease-out 0.5s forwards;
            ">
                <!-- Sanjana's Name with elegant styling -->
                <h1 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 4rem;
                    background: linear-gradient(135deg, #af52de, #ff2d92, #ff9f0a);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                    animation: gradientShift 3s ease-in-out infinite;
                ">Sanjana</h1>

                <p style="
                    font-size: 1.3rem;
                    color: #e9ecef;
                    margin-bottom: 50px;
                    font-weight: 300;
                    opacity: 0.9;
                ">A Special Birthday Journey Awaits</p>

                <!-- Loading Animation -->
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 30px;
                ">
                    <div class="loading-container" style="
                        display: flex;
                        gap: 8px;
                        align-items: center;
                    ">
                        <div class="loading-dot" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #af52de, #ff2d92);
                            animation: loadingBounce 1.4s ease-in-out infinite both;
                        "></div>
                        <div class="loading-dot" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #ff2d92, #ff9f0a);
                            animation: loadingBounce 1.4s ease-in-out 0.2s infinite both;
                        "></div>
                        <div class="loading-dot" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #ff9f0a, #af52de);
                            animation: loadingBounce 1.4s ease-in-out 0.4s infinite both;
                        "></div>
                    </div>
                </div>

                <p style="
                    font-size: 1rem;
                    color: #8e8e93;
                    font-weight: 300;
                    opacity: 0;
                    animation: fadeIn 1s ease-out 1.5s forwards;
                ">Preparing your special experience...</p>
            </div>

            <!-- Floating Hearts -->
            <div id="floating-hearts" style="
                position: absolute;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
            "></div>
        `;

        document.body.appendChild(splashOverlay);

        // Add CSS animations
        const splashStyle = document.createElement('style');
        splashStyle.textContent = `
            @keyframes loadingBounce {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1.2);
                    opacity: 1;
                }
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }

            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes heartFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100px) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(splashStyle);

        // Create animated particles
        this.createSplashParticles();

        // Create floating hearts
        this.createSplashHearts();

        // Remove splash screen after 4 seconds
        setTimeout(() => {
            splashOverlay.style.opacity = '0';
            setTimeout(() => {
                if (splashOverlay.parentElement) {
                    document.body.removeChild(splashOverlay);
                    document.head.removeChild(splashStyle);
                }
            }, 1000);
        }, 4000);
    }

    createSplashParticles() {
        const container = document.getElementById('particles-container');
        const particles = ['✨', '⭐', '💫', '🌟'];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 1.5 + 1}rem;
                    left: ${Math.random() * 100}%;
                    animation: particleFloat ${Math.random() * 3 + 4}s linear infinite;
                    pointer-events: none;
                `;
                container.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentElement) {
                        particle.remove();
                    }
                }, 7000);
            }, i * 200);
        }
    }

    createSplashHearts() {
        const container = document.getElementById('floating-hearts');
        const hearts = ['💖', '💕', '💗', '💝', '💞'];

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 1 + 1.5}rem;
                    left: ${Math.random() * 100}%;
                    animation: heartFloat ${Math.random() * 2 + 5}s linear infinite;
                    pointer-events: none;
                    opacity: 0.7;
                `;
                container.appendChild(heart);

                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentElement) {
                        heart.remove();
                    }
                }, 7000);
            }, i * 300);
        }
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PasswordAuth();
});
