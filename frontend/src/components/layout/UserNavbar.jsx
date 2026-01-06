import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserNavbar(){
    const { user, logout } = useContext(AuthContext)

    return(
        <nav className="w-[1168px] text-white px-6 py-4 shadow-lg flex justify-between items-center">
            {/* Gauche */}
            <div className="flex items-center space-x-6 pr-2">
                <h1 className="text-xl font-bold tracking-wide">Utilisateur</h1>
            </div>

           <div className="grid grid-cols-2">

                <Link to="/">Sondages</Link>

                {
                    user && (
                        < Link to="/monProfil" className="text-gray-300">
                            Connecté : <strong>{user.username}</strong>
                        </Link>
                    )
                }
            </div>

            {/* Droite */}
            <div className="flex items-center space-x-4">
                <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                    Déconnexion
                </button>
            </div>
        </nav>
    )
}