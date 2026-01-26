export function validateBar(data) {
  const { name, address, postalCode, city, tel } = data;

  if (!name || name.trim().length < 2 || name.trim().length > 60) {
    return "Le nom du bar doit contenir entre 2 et 60 caractères.";
  }

  if (!address || address.trim().length < 5) {
    return "L'adresse est obligatoire (au moins 5 caractères).";
  }

  if (!postalCode || !/^\d{5}$/.test(postalCode)) {
    return "Le code postal doit contenir 5 chiffres (ex: 75001).";
  }

  if (!city || city.trim().length < 2) {
    return "La ville est obligatoire.";
  }

  if (!tel || !/^(\+33|0)[1-9](\s?\d{2}){4}$/.test(tel)) {
    return "Le numéro de téléphone doit être au format français (ex: 01 23 45 67 89).";
  }

  return null;
}
