// Define animation stages for the application
export enum AnimationStage {
  INITIAL = 0,          // Initial loading stage
  EARTH_ROTATION = 1,   // Earth rotating with company name
  ZOOM_TO_INDIA = 2,    // Camera zooming to India on globe
  INDIA_MARKER = 3,     // Showing India marker
  MAIN_CONTENT = 4      // Main website content visible
}

// Earth texture constants
export const EARTH_RADIUS = 5;
export const EARTH_SEGMENTS = 64;

// Location coordinates
export const LOCATIONS = {
  INDIA: {
    LAT: 20.5937,
    LON: 78.9629,
    LABEL: "INDIA"
  }
};
