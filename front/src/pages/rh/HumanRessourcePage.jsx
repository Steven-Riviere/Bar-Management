import { fetchUsers, patchUser } from "@/api/apiUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HumanRessourcePage = () => {
  
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

  const handleDisable = async (id) => {
        try {
            await patchUser(id, { active: false });

            setUsers(users.map(user =>
                user.id === id
                    ? { ...user, active: false }
                    : user
            ));
        } catch (err) {
            const code = err.response?.data?.code;

            const messages = {
                ACCOUNT_DISABLED: "Votre compte a été désactivé. Veuillez contacter l'administration.",
                INVALID_PASSWORD: "Mot de passe incorrect.",
                USER_NOT_FOUND: "Aucun compte associé à cet email."
            };

            setError(messages[code] || "Erreur de connexion");
            console.error(err);
        }
    };

    const handleEnable = async (id) => {
        try {
            await patchUser(id, { active: true });

            setUsers(users.map(user =>
                user.id === id
                    ? { ...user, active: true }
                    : user
            ));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="p-4">Chargement des utilisateurs...</div>;
    }


    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 transition text-sm"
                >
                    ← Admin Hub
                </button>

                <h1 className="text-2xl font-bold">
                    Gestion RH
                </h1>

                <div className="w-[120px]" />
            </div>

            <div className="overflow-x-auto border rounded-xl shadow">

                <table className="min-w-full bg-white">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Nom</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Rôle</th>
                            <th className="p-3 text-left">Bar</th>
                            <th className="p-3 text-left">Actif</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-100">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">
                                {user.bar?.name || "N/A"}
                                </td>
                                <td className="p-3">{user.active ? "Oui" : "Non"}</td>
                                <td className="p-3">
                                    {user.active ? (
                                        <button
                                            onClick={() => handleDisable(user.id)}
                                            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                                            Désactiver
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEnable(user.id)}
                                            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600">
                                            Activer
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HumanRessourcePage;