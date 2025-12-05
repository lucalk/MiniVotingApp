const baseUrl = "http://localhost:3000/polls"

// Retourne tous les sondages
export async function findAll(){
    const response = await fetch(baseUrl)
    if(!response.ok) throw new Error("Erreur lors de la récupération des sondages")
    return response.json()
}

// Retourne tous les sondages avec options
export async function findAllWithOptions(){
    const response = await fetch(`${baseUrl}/all`)
    if(!response.ok) throw new Error("Erreur lors de la récupération des sondages")
    return response.json()
}

// Retourne un sondage
export async function findOne(id){
   const response = await fetch(`${baseUrl}/${id}`)
   if(!response.ok) throw new Error("Erreur lors du chargement du sondage")
   return response.json()
}

// Créer un sondage
export async function create(data){
    const response = await fetch(`${baseUrl}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(!response.ok) throw new Error("Erreur lors de la création du sondage")
    return response.json()
}

// Maj d'un sondage
export async function update(id,data){
    const response = await fetch(`${baseUrl}/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(!response.ok) throw new Error("Erreur lors de la maj du sondage")
    return response.json()
}

// Supprimer un sondage
export async function remove(id){
    const response = await fetch(`${baseUrl}/${id}`,{
        method: "DELETE",
    })
    if(!response.ok) throw new Error("Erreur lors de la suppréssion du sondage")
    return response.json()
}

// Voter
export async function vote(optionId){
    const response = await fetch(`${baseUrl}/vote`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({optionId})
    })
    if(!response.ok) throw new Error("Erreur lors du vote")
    return response.json()
}