/**
 * Event-related models and interfaces
 * Used for Event Management admin module
 * Aligned with backend DTOs and changelog v2026.01.20
 */
// Computed property helper
export function getRemainingPoints(event) {
    return (event.totalPointsPool || 0) - (event.distributedPoints || 0);
}
//# sourceMappingURL=event.models.js.map