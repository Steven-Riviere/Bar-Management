import Paiement from "../models/paiement";

export async function getAllPaiements() {
    return Paiement.findAll({
        where: { active: true }
    });
}


export async function getPaiementById(id) {
    return Paiement.findByPk(id);
}

export async function createPaiement(data) {
    return Paiement.create(data);
}

export async function updatePaiement(id, data) {
    const paiement = await Paiement.findByPk(id);
    if(!paiement) return null;
    
    await paiement.update(data);
    return paiement;
}