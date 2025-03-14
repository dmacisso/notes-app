import { account } from './appwrite';

//* bring in the ID object from the SDK needed to register and create a user.
import { ID } from 'react-native-appwrite';

// an auth object with methods.
const authService = {
  // Register a user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      console.log('Registration failed. Please try again', error);

      return {
        error: error.message || 'Registration failed. Please try again',
      };
    }
  },
  // Login a user
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        error:
          error.message ||
          'Login failed. Please check credentials and try again',
      };
    }
  },
  // Get logged in user
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // Logout user
  async logout() {
    try {
      await account.deleteSession('current'); //* This will delete the current session
    } catch (error) {
      return {
        error: error.message || 'Logout failed. Please check try again',
      };
    }
  },
};

export default authService;
