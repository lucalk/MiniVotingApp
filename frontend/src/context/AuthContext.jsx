import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const navigate = useNavigate()

    const [user,setUser] = useState(()=> {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    const [token,setToken] = useState(()=> {
        return localStorage.getItem('token') || null
    })

    // Login
    async function login(email, password){
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })


        if(!response.ok){
            throw new Error("Identifians incorrects")
        }

        const data = await response.json()

        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)

        // Redirection selon le role
        if(data.user.role === "BOSS" || data.user.role === "ADMIN") navigate ("/admin")
        else navigate('/')
    }

    // Logout
    function logout() {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/connexion")
    }

    // Vérification expiration du token
    const verifyTokenExpiration = () => {
        if(!token){
            logout()
            return false
        }

        try{
            const payloadBase64 = token.split('.')[1]
            const payload = JSON.parse(atob(payloadBase64))

            if(Date.now() >= payload.exp * 1000 ){
                logout()
                return false
            }
        }catch(error){
            logout()
            return false
        }
    }

    // Vérification au démarrage
    useEffect(()=>{
        verifyTokenExpiration()
    },[])
    // Vérification au changement du token
    useEffect(()=>{
        verifyTokenExpiration()
    },[token])

    return(
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}