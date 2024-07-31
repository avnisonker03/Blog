import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


//quality code

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                const loginResult = await this.login({ email, password });
                return loginResult; // Return session and user data
            }
        } catch (err) {
            throw err;
        }
    }
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.account.get(); 
            // Retrieve user data after login
            return { session, user };
        } catch (err) {
            throw err;
        }
    }
    

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            throw err;
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (err) {
            throw err;
        }
    }

     // Method to send password reset email
     async sendPasswordReset(email) {
        try {
            await this.account.createRecovery(
                email,
                'http://localhost:5173/reset-password' // URL to handle the password reset completion
            );
            console.log('Password reset email sent');
        } catch (err) {
            throw err;
        }
    }
    // Method to complete password reset
    async completePasswordReset(userId, secret, newPassword) {
        try {
            await this.account.updateRecovery(userId, secret, newPassword, newPassword);
            console.log('Password reset successfully');
        } catch (err) {
            throw err;
        }
    }


}

const authService = new AuthService();

export default authService