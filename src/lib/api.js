// This API file simulates backend operations since 'backendRequired' is false.
// Data is managed in App.jsx's state and passed down to components.
// No actual network requests are made here.

// The 'api' object is kept for structural consistency but its methods
// are not used directly by child components in this client-side only setup.
// Instead, state management functions are passed via props.
export const api = {
  async list(resource) {
    // In a real scenario, this would fetch from a backend.
    // Here, App.jsx manages the main state.
    console.warn(`API.list called for ${resource}, but data is managed client-side.`);
    return [];
  },
  async create(resource, data) {
    // In a real scenario, this would post to a backend.
    // Here, App.jsx manages the main state.
    console.warn(`API.create called for ${resource}, but data is managed client-side.`);
    return { id: `mock-${Date.now()}`, ...data };
  }
};
