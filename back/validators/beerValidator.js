export function validateBeer(data) {
    const { name, description, degree, price} = data;

    if (!name || name.trim().length < 2 || name.trim().length > 60) {
        return "Le nom de la bière doit contenir entre 2 et 60 caractères.";
    }

    if(description && description.length > 250) {
        return "La description ne doit pas dépasser 250 caractères.";
    }

    if(degree === undefined || isNaN(degree) || degree <0 || degree >20) {
        return "Le degré d'alcool doit être un nombre entre 0 et 20.";
    }

    if(price === undefined || isNaN(price) || price <0) {
        return "Le prix doit être un nombre positif.";
    }

    return null;
}