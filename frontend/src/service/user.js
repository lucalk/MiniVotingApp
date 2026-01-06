const baseUrl = "http://localhost:3000/users"
const token = localStorage.getItem("token")

// Retourne tous les utilisateurs
export async function findAll(){
    const response = await fetch(baseUrl,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(!response.ok) throw new Error("Erreur lors de la récupération de tous les utilisateurs")
    return response.json()
}

// Maj utilisateur
export async function update(id, data){
    const response = await fetch(`${baseUrl}/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.message)
    }
    return response.json()
}

// Retourne un utilisateur
export async function findOne(id){
    const response = await fetch(`${baseUrl}/${id}`,{
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
        },
    })
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.message)
    }
    return response.json()
}

// Supprimer un utilisateur
export async function remove(id){
    const response = await fetch(`${baseUrl}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.message)
    }
    return response.json()
}

export async function create(data){
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.message)
    }
    return response.json()
}

export async function getUser(id){
    const response = await fetch(`${baseUrl}/profil/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.message)
    }
    return response.json()
}