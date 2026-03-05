import { useState } from "react";

const CREDS = {
  ADMIN:    { email: "admin@demo.com",    pass: "admin123",    name: "Admin User" },
  CUSTOMER: { email: "customer@demo.com", pass: "customer123", name: "Saman Perera" },
};

export default function LoginPage({ onLogin }) {
  const [role,  setRole]  = useState("ADMIN");
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  const submit = () => {
    const c = CREDS[role];
    if (email === c.email && pass === c.pass) {
      onLogin({ name: c.name, role });
    } else {
      setErr(`Hint: ${c.email} / ${c.pass}`);
    }
  };

  const switchRole = (r) => {
    setRole(r);
    setErr("");
    setEmail("");
    setPass("");
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="brand-gem">✦</div>
          <span className="brand-name" style={{ fontSize: "1.15rem" }}>
            Event<b>Master</b>
          </span>
        </div>

        <div className="login-title">Welcome Back</div>
        <div className="login-sub">Sign in to your EventMaster account.</div>

        <div className="role-pills">
          {["ADMIN", "CUSTOMER"].map(r => (
            <button
              key={r}
              className={`r-pill${role === r ? " active" : ""}`}
              onClick={() => switchRole(r)}
            >
              {r === "ADMIN" ? "⚙️ Admin" : "🎟️ Customer"}
            </button>
          ))}
        </div>

        {err && <div className="login-hint">{err}</div>}

        <div className="form-spacer">
          <label className="fl" style={{ display: "block", marginBottom: 5 }}>Email</label>
          <input
            className="fi"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            placeholder={CREDS[role].email}
          />
        </div>

        <div className="form-spacer">
          <label className="fl" style={{ display: "block", marginBottom: 5 }}>Password</label>
          <input
            className="fi"
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setErr(""); }}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && submit()}
          />
        </div>

        <button className="btn btn-primary btn-full" onClick={submit}>
          Sign In →
        </button>

        <div className="login-link">
          New here?{" "}
          <span onClick={() => { switchRole("CUSTOMER"); setEmail("customer@demo.com"); setPass("customer123"); }}>
            Try customer demo
          </span>
        </div>
      </div>
    </div>
  );
}
