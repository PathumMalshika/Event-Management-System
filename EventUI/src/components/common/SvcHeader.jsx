import Icons from "../../utils/icons";

export function SvcHeader({ eyebrow, title, sub, action }) {
  return (
    <div className="svc-header">
      <div>
        <div className="svc-eyebrow">{eyebrow}</div>
        <h1 className="svc-title">{title}</h1>
        {sub && <p className="svc-sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function ConfirmDialog({ title, body, icon, onConfirm, onCancel, danger = true }) {
  return (
    <>
      <div className="modal-head">
        <span className="modal-title">{title}</span>
        <button className="modal-close" onClick={onCancel}>{Icons.close}</button>
      </div>
      <div className="modal-body" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
        <div className="confirm-icon">{icon || "⚠️"}</div>
        <div className="confirm-title">{title}</div>
        <div className="confirm-body">{body}</div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className={`btn ${danger ? "btn-danger" : "btn-primary"}`} onClick={onConfirm}>
          {danger ? "Delete" : "Confirm"}
        </button>
      </div>
    </>
  );
}
