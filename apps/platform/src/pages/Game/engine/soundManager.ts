import * as BABYLON from '@babylonjs/core';

/**
 * Maps environment types to ambient track filenames.
 * Place audio files in /public/audio/
 */
const AMBIENT_TRACKS: Record<string, string> = {
    // Science
    laboratory: 'ambient_science.mp3',
    space_station: 'ambient_space.mp3',
    observatory: 'ambient_space.mp3',
    // Medieval / Fantasy
    medieval_castle: 'ambient_medieval.mp3',
    medieval_village: 'ambient_medieval.mp3',
    enchanted_forest: 'ambient_fantasy.mp3',
    dragon_lair: 'ambient_fantasy.mp3',
    // Ancient
    mesopotamia: 'ambient_ancient.mp3',
    egyptian_pyramid: 'ambient_ancient.mp3',
    roman_colosseum: 'ambient_ancient.mp3',
    // Nature / Exploration
    jungle_temple: 'ambient_jungle.mp3',
    rainforest_canopy: 'ambient_jungle.mp3',
    underwater: 'ambient_underwater.mp3',
    coral_reef: 'ambient_underwater.mp3',
    arctic: 'ambient_wind.mp3',
    // Contemporary
    contemporary_city: 'ambient_city.mp3',
    cyberpunk_city: 'ambient_city.mp3',
    news_room: 'ambient_city.mp3',
    // Art / Literature
    library: 'ambient_library.mp3',
    renaissance_studio: 'ambient_classical.mp3',
    // War
    war_trenches: 'ambient_war.mp3',
    ancient_battlefield: 'ambient_war.mp3',
    // Default
    default: 'ambient_default.mp3',
};

const SFX: Record<string, string> = {
    correct: 'sfx_correct.mp3',
    wrong: 'sfx_wrong.mp3',
    streak: 'sfx_streak.mp3',
    dialogue: 'sfx_dialogue_open.mp3',
    complete: 'sfx_complete.mp3',
    pickup: 'sfx_pickup.mp3',
};

export class SoundManager {
    private scene: BABYLON.Scene;
    private ambient: BABYLON.Sound | null = null;
    private sfxCache: Map<string, BABYLON.Sound> = new Map();
    private environment: string;
    private muted: boolean = false;

    constructor(scene: BABYLON.Scene, environment: string) {
        this.scene = scene;
        this.environment = environment;
    }

    /** Start ambient music for the current environment.
     *  Browsers block audio until a user gesture — we listen for the first
     *  click/keydown on the canvas and start then. */
    startAmbient(): void {
        const track = AMBIENT_TRACKS[this.environment] ?? AMBIENT_TRACKS['default']!;
        const path = `/audio/${track}`;

        this.ambient = new BABYLON.Sound(
            'ambient',
            path,
            this.scene,
            null,   // don't autoplay on load
            { loop: true, autoplay: false, volume: 0.35 }
        );

        // Play on first user interaction (satisfies browser autoplay policy)
        const startOnGesture = () => {
            this.ambient?.play();
            window.removeEventListener('click', startOnGesture);
            window.removeEventListener('keydown', startOnGesture);
        };
        window.addEventListener('click', startOnGesture, { once: true });
        window.addEventListener('keydown', startOnGesture, { once: true });
    }

    /** Play a one-shot SFX */
    playSFX(name: keyof typeof SFX): void {
        if (this.muted) return;
        const file = SFX[name];
        if (!file) return;

        // Reuse cached sound if already loaded
        if (this.sfxCache.has(name)) {
            this.sfxCache.get(name)!.play();
            return;
        }

        const sound = new BABYLON.Sound(
            `sfx_${name}`,
            `/audio/${file}`,
            this.scene,
            () => sound.play(),
            { volume: 0.7, loop: false, autoplay: false }
        );
        this.sfxCache.set(name, sound);
    }

    /** Fade ambient out and stop */
    stopAmbient(fadeDuration = 1500): void {
        if (!this.ambient) return;
        const start = this.ambient.getVolume();
        const startT = performance.now();
        const tick = () => {
            const t = (performance.now() - startT) / fadeDuration;
            if (t >= 1) { this.ambient?.stop(); return; }
            this.ambient?.setVolume(start * (1 - t));
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    setMuted(muted: boolean): void {
        this.muted = muted;
        if (muted) {
            this.ambient?.setVolume(0);
        } else {
            this.ambient?.setVolume(0.35);
        }
    }

    dispose(): void {
        this.ambient?.dispose();
        this.sfxCache.forEach(s => s.dispose());
        this.sfxCache.clear();
    }
}