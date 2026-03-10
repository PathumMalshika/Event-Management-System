import api from "./api";

// CREATE - Process a new payment
export const processPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments", paymentData);  
    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

// READ - Get all payments
export const getAllPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error) {
    console.error("Error fetching all payments:", error);
    throw error;
  }
};

// READ - Get payment by ID
export const getPaymentById = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
};

// READ - Get payment status by ID
export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}/status`);
    return response.data;
  } catch (error) {   
    console.error("Error fetching payment status:", error);
    throw error;
  }
};

// UPDATE - Update payment details
export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await api.put(`/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};

// DELETE - Delete a payment
export const deletePayment = async (paymentId) => {
  try {
    const response = await api.delete(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};

