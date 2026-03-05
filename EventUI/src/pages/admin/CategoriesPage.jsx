import { SvcHeader, ConfirmDialog } from "../../components/common/SvcHeader";
import { statusBadge } from "../../utils/helpers";
import Icons from "../../utils/icons";
import { uid } from "../../data/mockData";

export default function CategoriesPage({ data, setData, addToast, openModal, closeModal, searchQ }) {
  const cats = data.categories.filter(c =>
    c.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  const deleteCat = (id) => openModal({
    content: (
      <ConfirmDialog title="Delete Category" body="Removing a category will not affect existing events, but new events can't use it." icon="🗑️"
        onConfirm={() => { setData(d => ({ ...d, categories: d.categories.filter(c => c.id !== id) })); addToast("Category deleted.", "info"); closeModal(); }}
        onCancel={closeModal}
      />
    ),
  });

  const openForm = (cat = null) => {
    let form = cat
      ? { ...cat }
      : { name: "", icon: "🎯", color: "#5b8ef5", status: "active" };

    const save = () => {
      if (!form.name) { addToast("Category name required.", "error"); return; }
      if (cat) {
        setData(d => ({ ...d, categories: d.categories.map(c => c.id === cat.id ? { ...c, ...form } : c) }));
        addToast("Category updated.");
      } else {
        setData(d => ({ ...d, categories: [...d.categories, { ...form, id: uid(), events: 0 }] }));
        addToast("Category created.");
      }
      closeModal();
    };

    openModal({
      content: (
        <>
          <div className="modal-head">
            <span className="modal-title">{cat ? "Edit Category" : "Create Category"}</span>
            <button className="modal-close" onClick={closeModal}>{Icons.close}</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="fg"><label className="fl">Category Name</label><input className="fi" defaultValue={form.name} onChange={e => form.name = e.target.value} placeholder="e.g. Music" /></div>
              <div className="fg"><label className="fl">Icon (emoji)</label><input className="fi" defaultValue={form.icon} onChange={e => form.icon = e.target.value} placeholder="🎷" /></div>
              <div className="fg">
                <label className="fl">Color</label>
                <input className="fi" type="color" defaultValue={form.color} onChange={e => form.color = e.target.value} style={{ padding: "5px", cursor: "pointer" }} />
              </div>
              <div className="fg">
                <label className="fl">Status</label>
                <select className="fs" defaultValue={form.status} onChange={e => form.status = e.target.value}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{cat ? "Save Changes" : "Create"}</button>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <SvcHeader
        eyebrow="Category Service" title="Categories" sub="Manage event categories and their icons."
        action={<button className="btn btn-primary" onClick={() => openForm()}>{Icons.plus} Add Category</button>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, marginBottom: "1.5rem" }}>
        {cats.map(c => (
          <div key={c.id} className="card" style={{ padding: "1.2rem", borderColor: c.status === "inactive" ? "var(--b1)" : c.color + "44" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".8rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                {c.icon}
              </div>
              <span className={`badge ${statusBadge(c.status)}`}>{c.status}</span>
            </div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "1rem", marginBottom: 3 }}>{c.name}</div>
            <div style={{ fontSize: ".75rem", color: "var(--tx2)" }}>{c.events} events</div>
            <div style={{ height: 3, background: c.color + "22", borderRadius: 2, marginTop: ".8rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(c.events / 15 * 100, 100)}%`, background: c.color, borderRadius: 2 }} />
            </div>
            <div className="action-btns" style={{ marginTop: ".8rem" }}>
              <button className="btn-icon edit" onClick={() => openForm(c)}>{Icons.edit}</button>
              <button className="btn-icon del"  onClick={() => deleteCat(c.id)}>{Icons.trash}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
