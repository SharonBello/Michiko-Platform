import { libraryEnvironmentV2 } from './library_v2';
import { romanColosseumV2 } from './roman_colosseum_v2';
import { medievalCastleV2 } from './medieval_castle_v2';
import { scienceLabV2 } from './science_lab_v2';
import { spaceStationV2 } from './space_station_v2';
import type { EnvironmentConfigV2 } from '@michiko/types';

// Export individual configs so they can be imported directly if needed
export {
  libraryEnvironmentV2,
  romanColosseumV2,
  medievalCastleV2,
  scienceLabV2,
  spaceStationV2
};

/**
 * All V2 environments indexed by ID
 */
export const ENVIRONMENTS_V2: Record<string, EnvironmentConfigV2> = {
  library: libraryEnvironmentV2,
  roman_colosseum: romanColosseumV2,
  medieval_castle: medievalCastleV2,
  science_lab: scienceLabV2,
  space_station: spaceStationV2,
};

/**
 * Get environment by ID
 */
export function getEnvironmentV2(id: string): EnvironmentConfigV2 | undefined {
  return ENVIRONMENTS_V2[id];
}

/**
 * Match environment based on topic keywords
 */
export function matchEnvironmentV2(topic: string): EnvironmentConfigV2 {
  const topicLower = (topic || "").toLowerCase();
  const words = topicLower.split(/\s+/);

  // Default to Library if no match is found
  let bestMatch: EnvironmentConfigV2 = libraryEnvironmentV2;
  let bestScore = 0;

  for (const env of Object.values(ENVIRONMENTS_V2)) {
    let score = 0;

    // Check keywords
    for (const word of words) {
      if (env.topicKeywords && env.topicKeywords.some(kw => kw.includes(word) || word.includes(kw))) {
        score++;
      }
      // Check tags
      if (env.tags && env.tags.some(tag => tag.includes(word) || word.includes(tag))) {
        score += 0.5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = env;
    }
  }

  return bestMatch;
}

/**
 * List of all environment IDs
 */
export const ENVIRONMENT_IDS_V2 = Object.keys(ENVIRONMENTS_V2);