import * as service from "../services/userService.js";

export async function getAll(req,res) {
    try {
        const users = await service.getAllUsers();
        console.log(JSON.stringify(users, null, 2));
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const user = await service.getUserById(req.params.id);
        if(!user)
            return res.status(404).json({error: "Utilisateur non trouvé"});
        res.json(user);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function update(req,res) {
    try {
        const user = await service.updateUser(req.params.id, req.body);
        if(!user)
            return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(user);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function patch(req,res) {
    try {
        const user = await service.patchUser(req.params.id, req.body);
        if(!user)
            return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(user);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}