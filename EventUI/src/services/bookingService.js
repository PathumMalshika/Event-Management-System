 import api from "./api";

 export const getBookings = () => {
   return api.get("/bookings");
 };

 export const getBookingsByUser = (userId) => {
   return api.get(`/bookings/user/${userId}`);
 };

 export const createBooking = (booking) => {
   return api.post("/bookings", booking);
 };


 export const updateBooking = (bookingId, updates) => {
   return api.put(`/bookings/${bookingId}`, updates);
 };

 export const deleteBooking = (bookingId) => {
   return api.delete(`/bookings/${bookingId}`);
 };