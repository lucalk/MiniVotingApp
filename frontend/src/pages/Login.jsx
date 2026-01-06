import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login(){
    const { login } = useContext(AuthContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        setError("")

        try{
            await login(email, password)
        }catch(error){
            setError("Identifiants incorrects")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center text-white">
            <form onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-xl w-full max-w-sm space-y-4"
            >
                <h1 className="text-xl font-bold">Connexion</h1>

                {error && <p className="text-red-400">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded text-black"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}                
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 rounded text-black"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}                
                />

                <button className="w-full bg-blue-600 p-2 rounded">Se connecter</button>
            </form>
        </div>
    )
}