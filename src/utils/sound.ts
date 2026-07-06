class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSelect() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      // High pitch arpeggio select beep
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio failed', e);
    }
  }

  playImpact() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      // Retro click/thump crash
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(10, now + 0.15);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio failed', e);
    }
  }

  playVictory() {
    try {
      this.init();
      const context = this.ctx;
      if (!context) return;
      const now = context.currentTime;
      
      // Classic ascending level-complete jingle: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = context.createOscillator();
        const gain = context.createGain();
        
        osc.type = 'square';
        osc.connect(gain);
        gain.connect(context.destination);
        
        const noteStart = now + idx * 0.08;
        const noteDuration = 0.18;
        
        osc.frequency.setValueAtTime(freq, noteStart);
        
        gain.gain.setValueAtTime(0.06, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration);
        
        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
      });

    } catch (e) {
      console.warn('Audio failed', e);
    }
  }
}

export const sounds = new SoundManager();
export default sounds;
