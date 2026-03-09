import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, loadingMessage, setLoadingMessage } = context


    const handleLogin = async ({ email, password }) => {
        setLoadingMessage("Logging you in...")
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
            return false
        } catch (err) {
            console.error("Login error:", err)
            alert(err.response?.data?.message || "Login failed. Please try again.")
            return false
        } finally {
            setLoading(false)
            setLoadingMessage("")
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoadingMessage("Creating your account...")
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
            return false
        } catch (err) {
            console.error("Registration error:", err)
            alert(err.response?.data?.message || "Registration failed. Please try again.")
            return false
        } finally {
            setLoading(false)
            setLoadingMessage("")
        }
    }

    const handleLogout = async () => {
        setLoadingMessage("Logging you out...")
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
            setLoadingMessage("")
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            setLoadingMessage("Verifying your session...")
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // User is not logged in, this is expected for anonymous users
                setUser(null)
            } finally {
                setLoading(false)
                setLoadingMessage("")
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, loadingMessage, handleRegister, handleLogin, handleLogout }
}