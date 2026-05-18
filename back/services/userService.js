import Bar from "../models/bar.js";
import User from "../models/user.js";

export async function getAllUsers() {
    return User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Bar,
                as: "bar",
                attributes: ['id', 'name']
            }
        ]
    });
}

export async function getUserById(id) {
    return User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Bar,
                as: "bar",
                attributes: ['id', 'name']
            }
        ]
    });
}

export async function updateUser(id, data) {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    if(!user) {
        throw new Error("Utilisateur introuvable");
    };
    await user.update(data);
    return user;
}

export async function patchUser(id, data) {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    if(!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (typeof data.active === "boolean") {
        user.active = data.active;
    }
    
    await user.update(data);
    return user;
}