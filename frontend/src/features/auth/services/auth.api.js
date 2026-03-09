import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

// Suppress console errors for expected 401 responses on auth check
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Suppress 401 errors for getMe endpoint (expected for non-logged-in users)
        if (error.config?.url?.includes('/api/auth/get-me') && error.response?.status === 401) {
            // Silently reject without logging
            return Promise.reject(error)
        }
        // For other errors, log them normally
        return Promise.reject(error)
    }
)

export async function register({ username, email, password }) {
    const response = await api.post('/api/auth/register', {
        username, email, password
    })
    return response.data
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email, password
    })
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}

// Example in services/auth.api.js
export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me');
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            return { user: null };
        }
        throw error; 
    }
};