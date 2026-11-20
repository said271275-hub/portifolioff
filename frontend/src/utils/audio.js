/**
 * Futbol audio effektlari generatori (Web Audio API).
 * - Sukut bo'yicha MUTED (foydalanuvchi o'zi yoqadi)
 * - prefers-reduced-motion qo'llab-quvvatlanadi
 * - localStorage'da holat saqlanadi
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class SoundController {
  constructor() {
    this.ctx = null;
    // Sukut bo'yicha MUTED — foydalanuvchi o'zi yoqadi
    const saved = localStorage.getItem('portfolio_sound');
    this.isMuted = saved !== null ? saved === 'true' : true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('portfolio_sound', String(this.isMuted));
    return this.isMuted;
  }

  // To'p tepilishi — "Thump"
  playKick() {
    if (this.isMuted || prefersReducedMotion()) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (_e) {}
  }

  // Hakam hushtagi
  playWhistle() {
    if (this.isMuted || prefersReducedMotion()) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2600, now);
      osc1.frequency.setValueAtTime(2800, now + 0.08);
      osc1.frequency.setValueAtTime(2600, now + 0.16);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2850, now + 0.4);
      gain2.gain.setValueAtTime(0.3, now + 0.4);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.4);
      osc2.stop(now + 0.65);
    } catch (_e) {}
  }

  // Gol quvonchi
  playGoalCheer() {
    if (this.isMuted || prefersReducedMotion()) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [440, 554, 659, 880];

      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.5);
      });
    } catch (_e) {}
  }
}

export const sounds = new SoundController();
