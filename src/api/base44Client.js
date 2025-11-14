import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6910d93b40ba68c83ed675f0", 
  requiresAuth: true // Ensure authentication is required for all operations
});
