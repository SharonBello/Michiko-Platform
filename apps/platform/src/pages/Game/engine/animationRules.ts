// animationRules.ts
// Maps game events + NPC role/context to the right animation
// Add new animations here as you get more GLB files

import type { NPC } from '@michiko/types';

// ── All available animations in X_Bot.glb ────────────────────
export const ANIMS = {
    idle: 'anim_idle',
    talking: 'anim_talking',
    thinking: 'anim_thinking',
    wave: 'anim_standing_greeting',
    victory: 'anim_victory',
    victoryIdle: 'anim_victory_idle',
    happy: 'anime_happy',
    joyJump: 'anime_joy_jump',
    clap: 'anim_standing_clap',
    disappointed: 'anim_disappointed',
    shrug: 'anim_shrugging',
    point: 'anim_pointing',
    nodYes: 'anim_head_nod_yes',
    shakeNo: 'anim_shaking_head_no',
    lookAround: 'anim_look_around',
    thoughtfulNod: 'anim_thoughtful_head_nod',
    bow: 'anim_quick_formal_bow',
    bowInformal: 'anim_quick_informal_bow',
    salute: 'anim_salute',
    blowKiss: 'anim_blow_kiss',
    cheering: 'anim_cheering',
    crying: 'anim_crying',
    hipHopDance: 'anim_hip_hop_dancing',
    stepDance: 'anim_step_hip_hop_dance',
    walking: 'anim_walking',
    running: 'anim_running',
} as const;

export type AnimName = typeof ANIMS[keyof typeof ANIMS];

// ── Game events the engine can trigger ───────────────────────
export type GameEvent =
    | 'game_start'          // scene loads, NPC appears
    | 'player_nearby'       // player walks close
    | 'player_far'          // player walks away
    | 'npc_clicked'         // player clicks NPC, dialogue opens
    | 'dialogue_open'       // dialogue panel is showing
    | 'dialogue_close'      // dialogue panel closes
    | 'question_open'       // question overlay appears
    | 'answer_correct'      // player answered correctly
    | 'answer_wrong'        // player answered wrong
    | 'answer_partial'      // close but not quite
    | 'hint_requested'      // player asks for a hint
    | 'game_complete'       // all questions done
    | 'scene_transition'    // moving to next scene
    | 'idle'                // back to default state
    | 'npc_speaking'        // NPC is actively narrating
    | 'npc_waiting'         // NPC waiting for player action
    | 'player_correct_streak'  // 3+ correct in a row
    | 'player_wrong_streak';   // 3+ wrong in a row

// ── Animation rule definition ─────────────────────────────────
interface AnimRule {
    anim: AnimName;
    loop: boolean;
    weight?: number; // for weighted random selection
}

// ── Pick from weighted options ────────────────────────────────
function pick(options: AnimRule[]): AnimRule {
    if (options.length === 1) return options[0]!;
    const total = options.reduce((s, o) => s + (o.weight ?? 1), 0);
    let rand = Math.random() * total;
    for (const opt of options) {
        rand -= opt.weight ?? 1;
        if (rand <= 0) return opt;
    }
    return options[options.length - 1]!;
}

// ── Main rules map: event + role → animation ──────────────────
export function getAnimation(
    event: GameEvent,
    npc: NPC,
    context?: {
        streak?: number;   // current correct/wrong streak
        scoreRatio?: number;   // score / maxScore 0-1
        environment?: string;  // e.g. 'roman_colosseum'
        ageGroup?: string;   // e.g. '6-8', '9-12', '13+'
    }
): AnimRule {

    const role = npc.role;
    const env = context?.environment ?? '';
    const ageGroup = context?.ageGroup ?? '';
    const isKids = ageGroup === '6-8' || ageGroup === '7-9';
    const isMilitary = ['war_trenches', 'cold_war_base', 'naval_warship', 'ancient_battlefield'].includes(env);
    const isFormal = ['roman_colosseum', 'greek_temple', 'baroque_palace', 'opera_house', 'monastery'].includes(env);

    switch (event) {

        // ── Game loads ─────────────────────────────────────────
        case 'game_start':
            if (role === 'villain') return { anim: ANIMS.lookAround, loop: false };
            if (isMilitary) return { anim: ANIMS.salute, loop: false };
            if (isFormal) return { anim: ANIMS.bow, loop: false };
            return pick([
                { anim: ANIMS.wave, loop: false, weight: 3 },
                { anim: ANIMS.bowInformal, loop: false, weight: 1 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
            ]);

        // ── Player walks close ─────────────────────────────────
        case 'player_nearby':
            if (role === 'villain') return { anim: ANIMS.lookAround, loop: false };
            if (isMilitary) return { anim: ANIMS.salute, loop: false };
            if (isFormal) return { anim: ANIMS.bow, loop: false };
            if (isKids) return pick([
                { anim: ANIMS.wave, loop: false, weight: 3 },
                { anim: ANIMS.blowKiss, loop: false, weight: 1 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
            ]);
            return pick([
                { anim: ANIMS.wave, loop: false, weight: 4 },
                { anim: ANIMS.bowInformal, loop: false, weight: 1 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
            ]);

        // ── Player walks away ──────────────────────────────────
        case 'player_far':
            return { anim: ANIMS.idle, loop: true };

        // ── NPC clicked, dialogue starts ──────────────────────
        case 'npc_clicked':
        case 'dialogue_open':
        case 'npc_speaking':
            if (role === 'villain') return { anim: ANIMS.talking, loop: true };
            return pick([
                { anim: ANIMS.talking, loop: true, weight: 5 },
                { anim: ANIMS.point, loop: false, weight: 1 },
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 1 },
            ]);

        // ── Dialogue closes ────────────────────────────────────
        case 'dialogue_close':
            return { anim: ANIMS.idle, loop: true };

        // ── Question is showing, waiting for answer ────────────
        case 'question_open':
        case 'npc_waiting':
            if (role === 'villain') return { anim: ANIMS.thinking, loop: true };
            return pick([
                { anim: ANIMS.thinking, loop: true, weight: 3 },
                { anim: ANIMS.lookAround, loop: false, weight: 1 },
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 1 },
            ]);

        // ── Correct answer ─────────────────────────────────────
        case 'answer_correct': {
            const streak = context?.streak ?? 0;

            // On a streak — go bigger
            if (streak >= 3) return pick([
                { anim: ANIMS.joyJump, loop: false, weight: 2 },
                { anim: ANIMS.hipHopDance, loop: false, weight: 1 },
                { anim: ANIMS.cheering, loop: false, weight: 2 },
            ]);

            if (role === 'villain') return pick([
                { anim: ANIMS.nodYes, loop: false, weight: 3 },
                { anim: ANIMS.disappointed, loop: false, weight: 1 }, // villain is upset you got it right
            ]);

            if (isKids) return pick([
                { anim: ANIMS.joyJump, loop: false, weight: 2 },
                { anim: ANIMS.happy, loop: false, weight: 2 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
                { anim: ANIMS.clap, loop: false, weight: 1 },
            ]);

            if (isMilitary) return { anim: ANIMS.salute, loop: false };
            if (isFormal) return { anim: ANIMS.bow, loop: false };

            return pick([
                { anim: ANIMS.victory, loop: false, weight: 3 },
                { anim: ANIMS.happy, loop: false, weight: 2 },
                { anim: ANIMS.clap, loop: false, weight: 2 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
            ]);
        }

        // ── Wrong answer ───────────────────────────────────────
        case 'answer_wrong': {
            const streak = context?.streak ?? 0;

            if (role === 'villain') return pick([
                { anim: ANIMS.hipHopDance, loop: false, weight: 2 }, // villain celebrates
                { anim: ANIMS.cheering, loop: false, weight: 1 },
                { anim: ANIMS.stepDance, loop: false, weight: 1 },
            ]);

            // Struggling player — be more encouraging
            if (streak >= 3) return pick([
                { anim: ANIMS.shrug, loop: false, weight: 1 },
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 2 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
            ]);

            return pick([
                { anim: ANIMS.disappointed, loop: false, weight: 3 },
                { anim: ANIMS.shakeNo, loop: false, weight: 2 },
                { anim: ANIMS.shrug, loop: false, weight: 1 },
                { anim: ANIMS.crying, loop: false, weight: 1 },
            ]);
        }

        // ── Partial/close answer ───────────────────────────────
        case 'answer_partial':
            return pick([
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 3 },
                { anim: ANIMS.shrug, loop: false, weight: 1 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
            ]);

        // ── Hint requested ─────────────────────────────────────
        case 'hint_requested':
            if (role === 'villain') return { anim: ANIMS.shakeNo, loop: false };
            return pick([
                { anim: ANIMS.point, loop: false, weight: 3 },
                { anim: ANIMS.thinking, loop: false, weight: 1 },
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 1 },
            ]);

        // ── Correct streak (3+) ────────────────────────────────
        case 'player_correct_streak':
            if (role === 'villain') return { anim: ANIMS.crying, loop: false };
            return pick([
                { anim: ANIMS.cheering, loop: false, weight: 2 },
                { anim: ANIMS.clap, loop: false, weight: 2 },
                { anim: ANIMS.hipHopDance, loop: false, weight: 1 },
            ]);

        // ── Wrong streak (3+) ──────────────────────────────────
        case 'player_wrong_streak':
            if (role === 'villain') return pick([
                { anim: ANIMS.hipHopDance, loop: false, weight: 2 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
            ]);
            return pick([
                { anim: ANIMS.point, loop: false, weight: 2 },
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 2 },
                { anim: ANIMS.shrug, loop: false, weight: 1 },
            ]);

        // ── Game complete ──────────────────────────────────────
        case 'game_complete': {
            const score = context?.scoreRatio ?? 0.5;

            if (score >= 0.8) return pick([
                { anim: ANIMS.joyJump, loop: false, weight: 2 },
                { anim: ANIMS.hipHopDance, loop: false, weight: 1 },
                { anim: ANIMS.victoryIdle, loop: false, weight: 2 },
            ]);

            if (score >= 0.5) return pick([
                { anim: ANIMS.clap, loop: false, weight: 2 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
                { anim: ANIMS.cheering, loop: false, weight: 1 },
            ]);

            // Low score
            return pick([
                { anim: ANIMS.thoughtfulNod, loop: false, weight: 2 },
                { anim: ANIMS.shrug, loop: false, weight: 1 },
                { anim: ANIMS.nodYes, loop: false, weight: 1 },
            ]);
        }

        // ── Scene transition ───────────────────────────────────
        case 'scene_transition':
            if (isMilitary) return { anim: ANIMS.salute, loop: false };
            if (isFormal) return { anim: ANIMS.bow, loop: false };
            return pick([
                { anim: ANIMS.wave, loop: false, weight: 2 },
                { anim: ANIMS.bowInformal, loop: false, weight: 1 },
            ]);

        // ── Default idle ───────────────────────────────────────
        case 'idle':
        default:
            return { anim: ANIMS.idle, loop: true };
    }
}