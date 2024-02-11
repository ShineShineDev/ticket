import { BASE_URL } from '@/config';
import authHeader from './auth-header';

class RoleService {
    constructor() {
        this.fetchLoading = false;
        this.roles = [];
        this.permissions = [];
    }

    async fetchRoles() {
        const ROLES_URL = `${BASE_URL}/api/roles`;

        try {
            this.fetchLoading = true;
            const response = await fetch(ROLES_URL, {
                headers: authHeader(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.roles = data;
            console.log('Role API response:', data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            this.fetchLoading = false;
        }
    }

    async fetchPermissions() {
        const PERMISSIONS_URL = `${BASE_URL}/api/permissions`;

        try {
            this.fetchLoading = true;
            const response = await fetch(PERMISSIONS_URL, {
                headers: authHeader(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.permissions = data;
            console.log('Permissions API response:', data);
        } catch (error) {
            console.error('Error fetching Permissions:', error);
        } finally {
            this.fetchLoading = false;
        }
    }
}

export default new RoleService();
