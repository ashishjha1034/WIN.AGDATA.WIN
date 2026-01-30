/**
 * API Configuration
 * Change these values to match your backend environment
 */
export const API_CONFIG = {
    // Backend base URL - Change this to match your backend server
    baseUrl: 'https://localhost:7113',
    // API version
    apiVersion: 'api',
    // Endpoints
    endpoints: {
        auth: {
            login: '/login',
            logout: '/logout',
            register: '/register',
            refreshToken: '/refresh-token',
            validateToken: '/validate',
            profile: '/profile'
        },
        users: {
            base: '/users',
            profile: '/profile',
            points: '/points',
            deactivate: '/deactivate',
            activate: '/activate'
        },
        products: {
            base: '/products',
            categories: '/categories',
            details: '/details'
        },
        admin: {
            base: '/admin',
            users: '/users',
            stats: '/stats',
            adjustPoints: '/adjust-points',
            redemptions: '/redemptions'
        }
    },
    // Get full API URL
    getApiUrl() {
        return `${this.baseUrl}/${this.apiVersion}`;
    },
    // Get full endpoint URL
    getEndpointUrl(section, endpoint) {
        const api = this.getApiUrl();
        const sectionEndpoints = this.endpoints[section];
        if (!sectionEndpoints) {
            console.warn(`Section '${section}' not found in API_CONFIG`);
            return api;
        }
        const endpointPath = sectionEndpoints[endpoint];
        if (!endpointPath) {
            console.warn(`Endpoint '${endpoint}' not found in section '${section}'`);
            return api;
        }
        return `${api}${sectionEndpoints.base || ''}${endpointPath}`;
    }
};
//# sourceMappingURL=api.config.js.map