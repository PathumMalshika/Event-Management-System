import { useState, useCallback, useEffect } from "react";

// Styles & data
import styles      from "./styles/global.js";
import { INIT_DATA } from "./data/mockData.js";
import Icons       from "./utils/icons.js";

// Layout
import TopNav      from "./components/layout/TopNav.jsx";
import Sidebar     from "./components/layout/Sidebar.jsx";
import NotifPanel  from "./components/layout/NotifPanel.jsx";

// Auth
import LoginPage   from "./pages/LoginPage.jsx";

// Admin pages
import DashboardPage     from "./pages/admin/DashboardPage.jsx";
import UsersPage         from "./pages/admin/UsersPage.jsx";
import EventsPage        from "./pages/admin/EventsPage.jsx";
import VenuesPage        from "./pages/admin/VenuesPage.jsx";
import TicketsPage       from "./pages/admin/TicketsPage.jsx";
import BookingsPage      from "./pages/admin/BookingsPage.jsx";
import PaymentsPage      from "./pages/admin/PaymentsPage.jsx";
import CategoriesPage    from "./pages/admin/CategoriesPage.jsx";
import NotificationsPage from "./pages/admin/NotificationsPage.jsx";
import FeedbackPage      from "./pages/admin/FeedbackPage.jsx";
import CheckInPage       from "./pages/admin/CheckInPage.jsx";

// Customer pages
import BrowseEventsPage  from "./pages/customer/BrowseEventsPage.jsx";
import {
  MyBookingsPage,
  MyPaymentsPage,
  MyFeedbackPage,
  MyNotificationsPage,
  MyProfilePage,
} from "./pages/customer/CustomerPages.jsx";

// API services
import * as notifService from "./services/notificationService.js";

export default function App() {
  const [authUser,          setAuthUser] = useState(null);
  const [page,              setPage]     = useState("dashboard");
  const [data,              setData]     = useState(INIT_DATA);
  const [sidebarCollapsed,  setSC]       = useState(false);
  const [notifOpen,         setNO]       = useState(false);
  const [notifTab,          setNT]       = useState("all");
  const [toasts,            setToasts]   = useState([]);
  const [modal,             setModal]    = useState(null);
  const [searchQ,           setSearchQ]  = useState("");

  // ── Fetch notifications on app load ───────────────────────
  useEffect(() => {
    if (authUser) {
      fetchNotifications();
    }
  }, [authUser]);

  const fetchNotifications = async () => {
    try {
      let notifications = [];
      if (authUser?.role === "ADMIN") {
        // Admin sees all notifications
        const response = await notifService.getNotifications();
        notifications = response.data;
      } else if (authUser?.name) {
        // Customer sees only their notifications - map name to ID
        const user = INIT_DATA.users.find(u => u.name === authUser.name);
        if (user?.id) {
          const response = await notifService.getNotificationsByUser(user.id);
          notifications = response.data;
        }
      }
      setData(d => ({ ...d, notifications }));
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Keep mock data as fallback
    }
  };

  // ── Toast helper ──────────────────────────────────────────
  const addToast = useCallback((msg, type = "success") => {
    const id   = Date.now();
    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
    setToasts(t => [...t, { id, msg, type, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  // ── Modal helpers ─────────────────────────────────────────
  const openModal  = (m) => setModal(m);
  const closeModal = ()  => setModal(null);

  // ── Derived state ─────────────────────────────────────────
  const unread  = data.notifications.filter(n => !n.read).length;
  const isAdmin = authUser?.role === "ADMIN";

  // ── Navigation items ──────────────────────────────────────
  const adminNavItems = [
    { key: "dashboard",     label: "Dashboard",     icon: Icons.dashboard },
    { key: "users",         label: "Users",         icon: Icons.users,      badge: data.users.filter(u => u.status === "inactive").length || null },
    { key: "events",        label: "Events",        icon: Icons.events },
    { key: "venues",        label: "Venues",        icon: Icons.venues },
    { key: "tickets",       label: "Tickets",       icon: Icons.tickets },
    { key: "bookings",      label: "Bookings",      icon: Icons.bookings,   badge: data.bookings.filter(b => b.status === "pending").length || null },
    { key: "payments",      label: "Payments",      icon: Icons.payments,   badge: data.payments.filter(p => p.status === "pending").length || null },
    { key: "categories",    label: "Categories",    icon: Icons.categories },
    { key: "notifications", label: "Notifications", icon: Icons.notifs,     badge: unread || null },
    { key: "feedback",      label: "Feedback",      icon: Icons.feedback,   badge: data.feedback.filter(f => f.status === "pending").length || null },
    { key: "checkin",       label: "Check-In",      icon: Icons.checkin },
  ];

  const customerNavItems = [
    { key: "c-home",          label: "Browse Events",  icon: Icons.events },
    { key: "c-bookings",      label: "My Bookings",    icon: Icons.bookings,  badge: data.bookings.filter(b => b.user === "Saman Perera" && b.status === "pending").length || null },
    { key: "c-payments",      label: "My Payments",    icon: Icons.payments },
    { key: "c-feedback",      label: "My Reviews",     icon: Icons.feedback },
    { key: "c-notifications", label: "Notifications",  icon: Icons.notifs,    badge: unread || null },
    { key: "c-profile",       label: "My Profile",     icon: Icons.users },
  ];

  const navItems = isAdmin ? adminNavItems : customerNavItems;

  // ── Login guard ───────────────────────────────────────────
  if (!authUser) {
    return (
      <>
        <style>{styles}</style>
        <LoginPage
          onLogin={(u) => {
            setAuthUser(u);
            setPage(u.role === "ADMIN" ? "dashboard" : "c-home");
            addToast(`Welcome back, ${u.name}! 👋`);
          }}
        />
      </>
    );
  }

  // ── Shared context passed to every page ───────────────────
  const ctx = { data, setData, addToast, openModal, closeModal, authUser, searchQ };

  return (
    <>
      <style>{styles}</style>

      <div className="shell">
        {/* ── Top Navigation ── */}
        <TopNav
          authUser={authUser}
          isAdmin={isAdmin}
          unread={unread}
          notifOpen={notifOpen}
          setNO={setNO}
          sidebarCollapsed={sidebarCollapsed}
          searchQ={searchQ}
          setSearchQ={setSearchQ}
          onLogout={() => setAuthUser(null)}
        />

        <div className="body-wrap">
          {/* ── Sidebar ── */}
          <Sidebar
            navItems={navItems}
            page={page}
            setPage={(p) => { setPage(p); setSearchQ(""); }}
            collapsed={sidebarCollapsed}
            setCollapsed={setSC}
            onLogout={() => setAuthUser(null)}
          />

          {/* ── Main content ── */}
          <div className="main-area">
            <div className="page-content">

              {/* Admin pages */}
              {page === "dashboard"     && <DashboardPage     {...ctx} />}
              {page === "users"         && <UsersPage         {...ctx} />}
              {page === "events"        && <EventsPage        {...ctx} />}
              {page === "venues"        && <VenuesPage        {...ctx} />}
              {page === "tickets"       && <TicketsPage       {...ctx} />}
              {page === "bookings"      && <BookingsPage      {...ctx} />}
              {page === "payments"      && <PaymentsPage      {...ctx} />}
              {page === "categories"    && <CategoriesPage    {...ctx} />}
              {page === "notifications" && <NotificationsPage {...ctx} />}
              {page === "feedback"      && <FeedbackPage      {...ctx} />}
              {page === "checkin"       && <CheckInPage       {...ctx} />}

              {/* Customer pages */}
              {page === "c-home"          && <BrowseEventsPage     {...ctx} />}
              {page === "c-bookings"      && <MyBookingsPage        {...ctx} />}
              {page === "c-payments"      && <MyPaymentsPage        {...ctx} />}
              {page === "c-feedback"      && <MyFeedbackPage        {...ctx} />}
              {page === "c-notifications" && <MyNotificationsPage   {...ctx} />}
              {page === "c-profile"       && <MyProfilePage         {...ctx} />}

            </div>
          </div>

          {/* ── Notification slide panel ── */}
          <NotifPanel
            open={notifOpen}
            onClose={() => setNO(false)}
            notifications={data.notifications}
            setData={setData}
            addToast={addToast}
            notifTab={notifTab}
            setNT={setNT}
          />
        </div>
      </div>

      {/* ── Global modal ── */}
      {modal && (
        <div className="overlay" onClick={closeModal}>
          <div className={`modal${modal.lg ? " modal-lg" : ""}`} onClick={e => e.stopPropagation()}>
            {modal.content}
          </div>
        </div>
      )}

      {/* ── Toast stack ── */}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast t-${t.type}`}>
            <span className="toast-icon">{t.icon}</span>
            <span className="toast-msg">{t.msg}</span>
          </div>
        ))}
      </div>
    </>
  );
}
