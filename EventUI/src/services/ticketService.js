import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8086/ticket-types",
});

const toFrontend = (t) => ({
  id: t.id,
  event: t.eventName,
  type: t.type,
  price: t.price,
  qty: t.quantity,
  sold: t.sold ?? 0,
  status: t.status ?? "active",
});

const toBackend = (t) => ({
  eventName: t.event,
  type: t.type,
  price: t.price,
  quantity: t.qty,
  sold: t.sold ?? 0,
  status: t.status ?? "active",
});

export const ticketService = {
  async getAll() {
    const { data } = await API.get("/");
    return data.map(toFrontend);
  },

  async create(ticket) {
    const { data } = await API.post("/", toBackend(ticket));
    return toFrontend(data);
  },

  async update(id, ticket) {
    const { data } = await API.put(`/${id}`, toBackend(ticket));
    return toFrontend(data);
  },

  async remove(id) {
    await API.delete(`/${id}`);
  },
};
