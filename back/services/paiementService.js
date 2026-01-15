import Paiement from "../models/paiement";

export async function getAllPayments() {
    return Paiement.findAll({
        where: { active: true }
    });
}


export async function getPaymentById(id) {
    return Paiement.findByPk(id);
}

export async function createPayment(data) {
    return Paiement.create(data);
}

export async function updatePayment(id, data) {
    const payment = await Paiement.findByPk(id);
    if(!payment) return null;
    
    await payment.update(data);
    return payment;
}

export async function disablePayment(id) {
  const payment = await Paiement.findByPk(id);
  if (!payment) return null;
  payment.active = false;

  await payment.save();
  return payment;
}

export async function enablePayment(id) {
  const payment = await Paiement.findByPk(id);
  if (!payment) return null;
  payment.active = true;

  await payment.save();
  return payment;
}