// js/particles.js

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mode = 'ambient'; // ambient, confetti, fireworks, none
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        if (!this.reducedMotion) {
            this.loop();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setMode(mode) {
        if (this.reducedMotion && mode !== 'none') return;
        this.mode = mode;
        if (mode === 'ambient' && this.particles.length === 0) {
            this.spawnAmbient();
        } else if (mode === 'confetti') {
            this.spawnConfetti();
        } else if (mode === 'fireworks') {
            this.spawnFireworks();
        } else if (mode === 'none') {
            this.particles = [];
        }
    }

    spawnAmbient() {
        for (let i = 0; i < 15; i++) {
            this.particles.push(this.createAmbientParticle());
        }
    }

    createAmbientParticle(yOffset = 0) {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + Math.random() * 200 + yOffset,
            size: Math.random() * 4 + 2,
            speedY: Math.random() * -0.5 - 0.2,
            speedX: Math.random() * 0.4 - 0.2,
            type: Math.random() > 0.5 ? 'heart' : 'sparkle',
            color: Math.random() > 0.5 ? 'rgba(255, 179, 209, 0.4)' : 'rgba(255, 255, 255, 0.6)',
            life: 1
        };
    }

    spawnConfetti() {
        const colors = ['#FFB3D1', '#A98BF0', '#A9D9F7', '#A8EAD1', '#FFE08A'];
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2 + 100,
                size: Math.random() * 8 + 4,
                speedY: Math.random() * -15 - 5,
                speedX: Math.random() * 20 - 10,
                gravity: 0.4,
                drag: 0.96,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                type: 'rect',
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1
            });
        }
        
        // Return to ambient after 4 seconds
        setTimeout(() => {
            if (this.mode === 'confetti') this.setMode('ambient');
        }, 4000);
    }

    spawnFireworks() {
        const colors = ['#FFB3D1', '#A98BF0', '#A9D9F7', '#A8EAD1', '#FFE08A'];
        
        const burst = (x, y) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 80; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 6 + 2;
                this.particles.push({
                    x, y,
                    size: Math.random() * 3 + 1,
                    speedX: Math.cos(angle) * speed,
                    speedY: Math.sin(angle) * speed,
                    gravity: 0.05,
                    drag: 0.98,
                    type: 'circle',
                    color: color,
                    life: 1,
                    decay: Math.random() * 0.02 + 0.01
                });
            }
        };

        burst(this.canvas.width * 0.3, this.canvas.height * 0.4);
        setTimeout(() => burst(this.canvas.width * 0.7, this.canvas.height * 0.3), 500);
        setTimeout(() => burst(this.canvas.width * 0.5, this.canvas.height * 0.2), 1200);
        setTimeout(() => burst(this.canvas.width * 0.2, this.canvas.height * 0.5), 1800);
        setTimeout(() => burst(this.canvas.width * 0.8, this.canvas.height * 0.5), 2500);
    }

    drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.fill();
    }

    drawStar(ctx, x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(x + Math.cos((18 + i * 72) / 180 * Math.PI) * size,
                       y - Math.sin((18 + i * 72) / 180 * Math.PI) * size);
            ctx.lineTo(x + Math.cos((54 + i * 72) / 180 * Math.PI) * (size/2),
                       y - Math.sin((54 + i * 72) / 180 * Math.PI) * (size/2));
        }
        ctx.closePath();
        ctx.fill();
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.gravity !== undefined) p.speedY += p.gravity;
            if (p.drag !== undefined) {
                p.speedX *= p.drag;
                p.speedY *= p.drag;
            }
            if (p.rotation !== undefined) p.rotation += p.rotationSpeed;
            if (p.decay !== undefined) p.life -= p.decay;

            if (p.y > this.canvas.height + 50 || p.life <= 0) {
                if (this.mode === 'ambient') {
                    this.particles[i] = this.createAmbientParticle(-50);
                } else {
                    this.particles.splice(i, 1);
                }
                continue;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            if (p.rotation) this.ctx.rotate(p.rotation * Math.PI / 180);
            
            this.ctx.fillStyle = p.color;
            if (p.life < 1) this.ctx.globalAlpha = p.life;

            if (p.type === 'heart') {
                this.drawHeart(this.ctx, 0, 0, p.size);
            } else if (p.type === 'sparkle') {
                this.drawStar(this.ctx, 0, 0, p.size);
            } else if (p.type === 'rect') {
                this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            } else if (p.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        requestAnimationFrame(() => this.loop());
    }
}

window.Particles = new ParticleSystem();
