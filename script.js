// Batcave Control Panel - Interactive JavaScript

class BatcaveControlPanel {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    init() {
        // Initialize time display
        this.updateTime();
        this.updateLastUpdate();
        
        // Initialize camera feeds
        this.initializeCameraFeeds();
        
        // Initialize system monitors
        this.initializeSystemMonitors();
        
        // Add startup animation
        this.startupAnimation();
    }

    setupEventListeners() {
        // Control buttons
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleControlButton(e));
        });

        // Weapon buttons
        document.querySelectorAll('.weapon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleWeaponButton(e));
        });

        // Camera feeds
        document.querySelectorAll('.camera-feed').forEach(feed => {
            feed.addEventListener('click', (e) => this.handleCameraClick(e));
        });

        // Case items
        document.querySelectorAll('.case-item').forEach(caseItem => {
            caseItem.addEventListener('click', (e) => this.handleCaseClick(e));
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    updateLastUpdate() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const lastUpdateElement = document.getElementById('last-update');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = timeString;
        }
    }

    startRealTimeUpdates() {
        // Update time every second
        setInterval(() => {
            this.updateTime();
        }, 1000);

        // Update last update every 30 seconds
        setInterval(() => {
            this.updateLastUpdate();
        }, 30000);

        // Simulate system monitor updates
        setInterval(() => {
            this.updateSystemMonitors();
        }, 5000);

        // Simulate camera feed changes
        setInterval(() => {
            this.rotateCameraFeeds();
        }, 8000);

        // Simulate case updates
        setInterval(() => {
            this.updateCaseStatus();
        }, 15000);
    }

    initializeCameraFeeds() {
        const feeds = document.querySelectorAll('.camera-feed');
        feeds.forEach((feed, index) => {
            // Add random activity indicators
            if (Math.random() > 0.5) {
                feed.classList.add('active');
            }
            
            // Add different radar patterns
            const radar = feed.querySelector('.radar-scan');
            if (radar) {
                radar.style.animationDelay = `${index * 0.5}s`;
            }
        });
    }

    initializeSystemMonitors() {
        // Initialize with random values
        this.updateSystemMonitors();
    }

    updateSystemMonitors() {
        const monitors = document.querySelectorAll('.monitor-item');
        monitors.forEach(monitor => {
            const progressFill = monitor.querySelector('.progress-fill');
            const valueSpan = monitor.querySelector('span:last-child');
            
            if (progressFill && valueSpan) {
                const newValue = Math.floor(Math.random() * 40) + 30; // 30-70%
                progressFill.style.width = `${newValue}%`;
                valueSpan.textContent = `${newValue}%`;
                
                // Add pulse effect
                progressFill.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    progressFill.style.animation = '';
                }, 500);
            }
        });
    }

    rotateCameraFeeds() {
        const feeds = document.querySelectorAll('.camera-feed');
        feeds.forEach(feed => {
            // Randomly toggle active state
            if (Math.random() > 0.7) {
                feed.classList.toggle('active');
            }
        });
    }

    updateCaseStatus() {
        const cases = document.querySelectorAll('.case-item');
        const statuses = ['ACTIVE', 'INVESTIGATING', 'SOLVED', 'CLOSED'];
        
        cases.forEach(caseItem => {
            const statusSpan = caseItem.querySelector('.case-status');
            if (statusSpan && Math.random() > 0.8) {
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                statusSpan.textContent = newStatus;
                
                // Add update animation
                statusSpan.style.animation = 'blink 0.3s ease-in-out';
                setTimeout(() => {
                    statusSpan.style.animation = '';
                }, 300);
            }
        });
    }

    handleControlButton(event) {
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        // Remove active class from all buttons in the same group
        const buttonGroup = button.parentElement;
        buttonGroup.querySelectorAll('.control-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Add click effect
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Handle different button types
        if (icon.classList.contains('fa-play')) {
            this.playSurveillance();
        } else if (icon.classList.contains('fa-pause')) {
            this.pauseSurveillance();
        } else if (icon.classList.contains('fa-expand')) {
            this.expandView();
        }
    }

    handleWeaponButton(event) {
        const button = event.currentTarget;
        const weaponName = button.querySelector('span').textContent;
        
        // Add activation effect
        button.style.background = 'var(--neon-blue)';
        button.style.color = 'var(--primary-bg)';
        button.style.boxShadow = 'var(--shadow-neon)';
        
        // Show weapon activation message
        this.showNotification(`WEAPON ACTIVATED: ${weaponName}`, 'weapon');
        
        // Reset button after 1 second
        setTimeout(() => {
            button.style.background = '';
            button.style.color = '';
            button.style.boxShadow = '';
        }, 1000);
    }

    handleCameraClick(event) {
        const feed = event.currentTarget;
        
        // Toggle active state
        feed.classList.toggle('active');
        
        // Add click effect
        feed.style.transform = 'scale(0.98)';
        setTimeout(() => {
            feed.style.transform = '';
        }, 200);
        
        // Show camera info
        const cameraLabel = feed.querySelector('.camera-label').textContent;
        this.showNotification(`CAMERA SELECTED: ${cameraLabel}`, 'camera');
    }

    handleCaseClick(event) {
        const caseItem = event.currentTarget;
        const caseId = caseItem.querySelector('.case-id').textContent;
        const caseTitle = caseItem.querySelector('.case-title').textContent;
        
        // Add click effect
        caseItem.style.background = 'rgba(0, 255, 255, 0.2)';
        setTimeout(() => {
            caseItem.style.background = '';
        }, 500);
        
        // Show case details
        this.showNotification(`CASE DETAILS: ${caseId} - ${caseTitle}`, 'case');
    }

    handleKeyboardShortcuts(event) {
        switch(event.key.toLowerCase()) {
            case '1':
                this.activateWeapon('GRAPPLING HOOK');
                break;
            case '2':
                this.activateWeapon('ELECTROSHOCK');
                break;
            case '3':
                this.activateWeapon('SMOKE BOMBS');
                break;
            case '4':
                this.activateWeapon('ARMOR PLATING');
                break;
            case 's':
                this.toggleSurveillance();
                break;
            case 'r':
                this.refreshData();
                break;
        }
    }

    activateWeapon(weaponName) {
        const weaponBtn = Array.from(document.querySelectorAll('.weapon-btn'))
            .find(btn => btn.querySelector('span').textContent === weaponName);
        
        if (weaponBtn) {
            weaponBtn.click();
        }
    }

    toggleSurveillance() {
        const playBtn = document.querySelector('.control-btn .fa-play').parentElement;
        const pauseBtn = document.querySelector('.control-btn .fa-pause').parentElement;
        
        if (playBtn.classList.contains('active')) {
            pauseBtn.click();
        } else {
            playBtn.click();
        }
    }

    refreshData() {
        this.updateSystemMonitors();
        this.updateCaseStatus();
        this.showNotification('DATA REFRESHED', 'system');
    }

    playSurveillance() {
        this.showNotification('SURVEILLANCE ACTIVATED', 'system');
        // Add visual feedback to camera feeds
        document.querySelectorAll('.camera-feed').forEach(feed => {
            feed.style.borderColor = 'var(--neon-green)';
            feed.style.boxShadow = 'var(--shadow-green)';
        });
    }

    pauseSurveillance() {
        this.showNotification('SURVEILLANCE PAUSED', 'system');
        // Remove visual feedback from camera feeds
        document.querySelectorAll('.camera-feed').forEach(feed => {
            feed.style.borderColor = '';
            feed.style.boxShadow = '';
        });
    }

    expandView() {
        this.showNotification('EXPANDING VIEW', 'system');
        // Add fullscreen effect
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--panel-bg);
            border: 1px solid var(--neon-blue);
            color: var(--text-primary);
            padding: 1rem;
            border-radius: 6px;
            box-shadow: var(--shadow-neon);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'Orbitron', monospace;
            font-size: 0.9rem;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'weapon': return 'crosshairs';
            case 'camera': return 'eye';
            case 'case': return 'folder';
            case 'system': return 'cog';
            default: return 'info-circle';
        }
    }

    startupAnimation() {
        // Add startup sequence
        const panels = document.querySelectorAll('.panel');
        panels.forEach((panel, index) => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                panel.style.transition = 'all 0.5s ease-out';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Add logo animation
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                logo.style.transition = 'all 0.8s ease-out';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
            }, 1000);
        }
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the Batcave Control Panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BatcaveControlPanel();
});

// Add some ambient effects
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle background animation
    const body = document.body;
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.1) % 360;
        body.style.background = `
            linear-gradient(135deg, 
                hsl(${hue}, 10%, 4%) 0%, 
                hsl(${hue}, 5%, 2%) 50%, 
                hsl(${hue}, 10%, 1%) 100%)
        `;
    }, 10000); // Very slow color shift
    
    // Add mouse trail effect for high-tech feel
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.6;
            transition: opacity 0.5s ease-out;
        `;
        
        document.body.appendChild(dot);
        mouseTrail.push(dot);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldDot = mouseTrail.shift();
            if (oldDot.parentElement) {
                oldDot.style.opacity = '0';
                setTimeout(() => {
                    if (oldDot.parentElement) {
                        oldDot.parentElement.removeChild(oldDot);
                    }
                }, 500);
            }
        }
    });
});