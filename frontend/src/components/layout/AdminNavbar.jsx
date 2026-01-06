import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminNavbar(){
    const { user, logout } = useContext(AuthContext)

    return(
        <>
        {
            user.role === "BOSS" ?
            (
                <nav className="w-full text-white px-6 py-4 shadow-lg flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide">BOSS</h1>

                    <Link to="/accueil" className="hover:text-blue-400 transition">
                        Accueil
                    </Link>
                    
                    <Link to="/admin" className="hover:text-blue-400 transition">
                        Sondages
                    </Link>

                    <Link to="/admin/users/allUsers" className="hover:text-blue-400 transition">
                        Utilisateurs
                    </Link>

                    <Link to="/admin/create" className="hover:text-blue-400 transition">
                        Créer un sondage
                    </Link>

                    <Link to="/admin/users/create" className="hover:text-blue-400 transition">
                        Créer un utilisateur
                    </Link>

                    {
                        user && (
                            <p to="/monProfil" className="text-gray-300">
                                Connecté : <strong>{user.username}</strong>
                            </p>
                        )
                    }
    
                    <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                        Déconnexion
                    </button>
                </nav>
            ) : (
                <nav className="w-full text-white px-6 py-4 shadow-lg flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide">ADMIN</h1>

                    <Link to="/accueil" className="hover:text-blue-400 transition">
                        Accueil
                    </Link>
                    
                    <Link to="/admin" className="hover:text-blue-400 transition">
                         Sondages
                    </Link>

                    <Link to="/admin/create" className="hover:text-blue-400 transition">
                        Créer un sondage
                    </Link>

                    {
                        user && (
                            < Link to="/profil" className="text-gray-300">
                                Connecté : <strong>{user.username}</strong>
                            </Link>
                        )
                    } 

                    <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                        Déconnexion
                    </button>
                </nav>
            )
        }
        </>
    )
}