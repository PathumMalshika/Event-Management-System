let _uid = 100;
export const uid = () => ++_uid;

export const INIT_DATA = {
  users: [
    { id:1, name:"Saman Perera",      email:"saman@demo.com",   role:"CUSTOMER",  status:"active",   phone:"+94 77 123 4567", joined:"Jan 2026", avatar:"#26c99a" },
    { id:2, name:"Dilini Rathnayake", email:"dilini@demo.com",  role:"ORGANIZER", status:"active",   phone:"+94 71 234 5678", joined:"Nov 2025", avatar:"#e85f9f" },
    { id:3, name:"Roshan Kumar",      email:"roshan@demo.com",  role:"CUSTOMER",  status:"inactive", phone:"+94 76 345 6789", joined:"Feb 2026", avatar:"#5b8ef5" },
    { id:4, name:"Asha Mendis",       email:"asha@demo.com",    role:"ATTENDEE",  status:"active",   phone:"+94 70 456 7890", joined:"Mar 2026", avatar:"#f0a500" },
    { id:5, name:"Admin User",        email:"admin@demo.com",   role:"ADMIN",     status:"active",   phone:"+94 11 000 0000", joined:"Sep 2025", avatar:"#9b6ef5" },
  ],
  events: [
    { id:1, title:"Colombo Jazz Festival",   category:"Music",   venue:"Viharamahadevi Park", date:"Mar 15 2026", time:"7:00 PM",  status:"published", capacity:500, sold:452, organizer:"Dilini R." },
    { id:2, title:"Digital Futures Summit",  category:"Tech",    venue:"BMICH Colombo 7",     date:"Mar 22 2026", time:"9:00 AM",  status:"published", capacity:300, sold:288, organizer:"Dilini R." },
    { id:3, title:"Monsoon Food Carnival",   category:"Food",    venue:"Race Course Ground",  date:"Apr 2 2026",  time:"12:00 PM", status:"draft",     capacity:800, sold:0,   organizer:"Saman P." },
    { id:4, title:"Kandyan Dance Gala",      category:"Culture", venue:"Nelum Pokuna Theatre",date:"Apr 10 2026", time:"6:30 PM",  status:"published", capacity:200, sold:170, organizer:"Dilini R." },
    { id:5, title:"Trail Run – Knuckles",    category:"Sports",  venue:"Knuckles Range",      date:"Apr 18 2026", time:"5:30 AM",  status:"published", capacity:100, sold:45,  organizer:"Roshan K." },
    { id:6, title:"Photography Masterclass", category:"Art",     venue:"Gallery 678",         date:"May 3 2026",  time:"10:00 AM", status:"cancelled", capacity:30,  sold:22,  organizer:"Asha M." },
  ],
  venues: [
    { id:1, name:"Viharamahadevi Park",  city:"Colombo",   capacity:5000, type:"Outdoor", status:"available", contact:"parks@cmc.lk" },
    { id:2, name:"BMICH",                city:"Colombo 7", capacity:1200, type:"Indoor",  status:"available", contact:"info@bmich.lk" },
    { id:3, name:"Nelum Pokuna Theatre", city:"Colombo 7", capacity:1300, type:"Indoor",  status:"booked",    contact:"np@culture.lk" },
    { id:4, name:"Race Course Ground",   city:"Colombo 7", capacity:8000, type:"Outdoor", status:"available", contact:"rc@sports.lk" },
    { id:5, name:"Gallery 678",          city:"Colombo 3", capacity:80,   type:"Gallery", status:"available", contact:"info@gallery678.lk" },
    { id:6, name:"Knuckles Range",       city:"Kandy",     capacity:200,  type:"Outdoor", status:"available", contact:"trail@knuckles.lk" },
  ],
  tickets: [
    { id:1, event:"Colombo Jazz Festival",  type:"VIP",     price:8500,  qty:50,  sold:48,  status:"active" },
    { id:2, event:"Colombo Jazz Festival",  type:"Regular", price:2500,  qty:450, sold:404, status:"active" },
    { id:3, event:"Digital Futures Summit", type:"VIP",     price:12000, qty:30,  sold:30,  status:"sold_out" },
    { id:4, event:"Digital Futures Summit", type:"Regular", price:5000,  qty:270, sold:258, status:"active" },
    { id:5, event:"Kandyan Dance Gala",     type:"VIP",     price:7000,  qty:30,  sold:25,  status:"active" },
    { id:6, event:"Trail Run – Knuckles",   type:"Regular", price:3000,  qty:100, sold:45,  status:"active" },
  ],
  bookings: [
    { id:"BK-001", user:"Saman Perera", event:"Colombo Jazz Festival",  date:"Mar 1 2026",  tickets:2, total:5000, status:"confirmed", payment:"paid" },
    { id:"BK-002", user:"Asha Mendis",  event:"Digital Futures Summit", date:"Mar 5 2026",  tickets:1, total:5000, status:"confirmed", payment:"paid" },
    { id:"BK-003", user:"Roshan Kumar", event:"Kandyan Dance Gala",     date:"Mar 8 2026",  tickets:2, total:7000, status:"pending",   payment:"pending" },
    { id:"BK-004", user:"Saman Perera", event:"Trail Run – Knuckles",   date:"Mar 10 2026", tickets:1, total:3000, status:"confirmed", payment:"paid" },
    { id:"BK-005", user:"Asha Mendis",  event:"Colombo Jazz Festival",  date:"Mar 12 2026", tickets:3, total:7500, status:"cancelled", payment:"refunded" },
  ],
  payments: [
    { id:"PAY-001", booking:"BK-001", user:"Saman Perera", amount:5000, method:"Card",   status:"completed", date:"Mar 1 2026" },
    { id:"PAY-002", booking:"BK-002", user:"Asha Mendis",  amount:5000, method:"Card",   status:"completed", date:"Mar 5 2026" },
    { id:"PAY-003", booking:"BK-003", user:"Roshan Kumar", amount:7000, method:"Cash",   status:"pending",   date:"Mar 8 2026" },
    { id:"PAY-004", booking:"BK-004", user:"Saman Perera", amount:3000, method:"Online", status:"completed", date:"Mar 10 2026" },
    { id:"PAY-005", booking:"BK-005", user:"Asha Mendis",  amount:7500, method:"Card",   status:"refunded",  date:"Mar 12 2026" },
  ],
  categories: [
    { id:1, name:"Music",   icon:"🎷", events:12, color:"#26c99a", status:"active" },
    { id:2, name:"Tech",    icon:"💻", events:8,  color:"#5b8ef5", status:"active" },
    { id:3, name:"Food",    icon:"🍜", events:15, color:"#e8a230", status:"active" },
    { id:4, name:"Culture", icon:"💃", events:6,  color:"#e85f9f", status:"active" },
    { id:5, name:"Sports",  icon:"🏃", events:9,  color:"#f0556a", status:"active" },
    { id:6, name:"Art",     icon:"🎨", events:4,  color:"#9b6ef5", status:"inactive" },
  ],
  notifications: [
    { id:1, title:"Booking Confirmed",   body:"BK-001 confirmed for Colombo Jazz Festival.",  time:"2 min ago",  read:false, type:"booking",  icon:"🎟️", iconBg:"rgba(38,201,154,.15)",  iconColor:"#26c99a" },
    { id:2, title:"Event Tomorrow!",     body:"Digital Futures Summit starts at 9:00 AM.",    time:"1 hr ago",   read:false, type:"reminder", icon:"⏰", iconBg:"rgba(232,162,48,.12)",  iconColor:"#e8a230" },
    { id:3, title:"New User Registered", body:"Asha Mendis just created an account.",         time:"3 hrs ago",  read:false, type:"system",   icon:"👤", iconBg:"rgba(155,110,245,.15)", iconColor:"#9b6ef5" },
    { id:4, title:"Payment Received",    body:"Rs 5,000 received for booking BK-002.",         time:"5 hrs ago",  read:true,  type:"payment",  icon:"💳", iconBg:"rgba(91,142,245,.15)",  iconColor:"#5b8ef5" },
    { id:5, title:"Venue Booked",        body:"Nelum Pokuna Theatre reserved for Apr 10.",     time:"Yesterday",  read:true,  type:"venue",    icon:"📍", iconBg:"rgba(240,85,106,.15)",  iconColor:"#f0556a" },
    { id:6, title:"Feedback Received",   body:"New 5-star review on Colombo Jazz Festival.",  time:"2 days ago", read:true,  type:"feedback", icon:"💬", iconBg:"rgba(232,162,48,.12)",  iconColor:"#e8a230" },
  ],
  feedback: [
    { id:1, user:"Saman Perera", event:"Colombo Jazz Festival",  rating:5, comment:"Absolutely magical! World-class lineup.",          status:"published", date:"Feb 20 2026" },
    { id:2, user:"Asha Mendis",  event:"Digital Futures Summit", rating:4, comment:"Great keynotes, sessions ran a bit long.",         status:"published", date:"Feb 18 2026" },
    { id:3, user:"Roshan Kumar", event:"Kandyan Dance Gala",     rating:5, comment:"Cultural masterpiece. Highly recommended.",        status:"published", date:"Feb 15 2026" },
    { id:4, user:"Saman Perera", event:"Trail Run – Knuckles",   rating:3, comment:"Beautiful route but poor organisation.",           status:"pending",   date:"Mar 1 2026" },
  ],
  checkins: [
    { id:1, user:"Saman Perera", event:"Colombo Jazz Festival",  checkinTime:"Mar 15, 7:02 PM", method:"QR",     status:"present" },
    { id:2, user:"Asha Mendis",  event:"Digital Futures Summit", checkinTime:"Mar 22, 8:58 AM", method:"Manual", status:"present" },
    { id:3, user:"Roshan Kumar", event:"Kandyan Dance Gala",     checkinTime:"Apr 10, 6:35 PM", method:"QR",     status:"present" },
    { id:4, user:"Dilini R.",    event:"Colombo Jazz Festival",  checkinTime:"—",               method:"—",      status:"absent" },
  ],
};
