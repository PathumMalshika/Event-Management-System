const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#06060a;--bg2:#0c0c12;--bg3:#111118;
  --surf:#14141c;--surf2:#1c1c26;--surf3:#222230;
  --b1:rgba(255,255,255,0.06);--b2:rgba(255,255,255,0.1);--b3:rgba(255,255,255,0.16);
  --tx:#eeecf5;--tx2:#8886a0;--tx3:#5a5870;
  --amber:#e8a230;--amber2:#f5c060;--ag:rgba(232,162,48,0.22);
  --teal:#26c99a;--tg:rgba(38,201,154,0.15);
  --rose:#f0556a;--rg:rgba(240,85,106,0.15);
  --blue:#5b8ef5;--blg:rgba(91,142,245,0.15);
  --violet:#9b6ef5;--vlg:rgba(155,110,245,0.15);
  --r:12px;--r2:8px;
  --sidebar:240px;
  --nav:58px;
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--tx);min-height:100vh;overflow:hidden;}
button,input,select,textarea{font-family:inherit;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:var(--b3);}

/* ─ LAYOUT ─ */
.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden;}
.body-wrap{display:flex;flex:1;overflow:hidden;}
.sidebar{
  width:var(--sidebar);flex-shrink:0;
  background:var(--bg2);border-right:1px solid var(--b1);
  display:flex;flex-direction:column;overflow:hidden;
  transition:width .28s cubic-bezier(.4,0,.2,1);
}
.sidebar.collapsed{width:58px;}
.main-area{flex:1;overflow-y:auto;display:flex;flex-direction:column;}
.page-content{flex:1;padding:2rem;max-width:1200px;width:100%;}

/* ─ TOPNAV ─ */
.topnav{
  height:var(--nav);flex-shrink:0;
  background:rgba(6,6,10,.9);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--b1);
  display:flex;align-items:center;gap:1rem;padding:0 1.5rem;
  position:sticky;top:0;z-index:100;
}
.nav-brand{display:flex;align-items:center;gap:9px;flex-shrink:0;}
.brand-gem{
  width:30px;height:30px;border-radius:8px;flex-shrink:0;
  background:linear-gradient(135deg,var(--amber),var(--amber2));
  display:flex;align-items:center;justify-content:center;
  font-size:13px;box-shadow:0 0 14px var(--ag);
}
.brand-name{font-family:'Fraunces',serif;font-size:1rem;font-weight:800;letter-spacing:-.025em;}
.brand-name b{color:var(--amber);}
.nav-search{
  flex:1;max-width:360px;margin:0 1rem;
  display:flex;align-items:center;gap:8px;
  background:var(--surf);border:1px solid var(--b2);border-radius:100px;
  padding:7px 14px;
}
.nav-search input{background:none;border:none;outline:none;color:var(--tx);font-size:.82rem;width:100%;}
.nav-search input::placeholder{color:var(--tx3);}
.nav-right-cluster{display:flex;align-items:center;gap:8px;margin-left:auto;}
.icon-circle{
  width:34px;height:34px;border-radius:9px;
  background:var(--surf);border:1px solid var(--b2);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .18s;flex-shrink:0;position:relative;
}
.icon-circle:hover{background:var(--surf2);border-color:var(--b3);}
.icon-circle svg{width:16px;height:16px;stroke:var(--tx2);transition:stroke .18s;}
.icon-circle:hover svg,.icon-circle.active svg{stroke:var(--tx);}
.icon-circle.active{background:rgba(232,162,48,.1);border-color:rgba(232,162,48,.35);}
.badge-dot{
  position:absolute;top:-4px;right:-4px;
  width:17px;height:17px;border-radius:50%;
  background:var(--rose);color:#fff;font-size:.58rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  border:2px solid var(--bg);
}
.nav-avatar{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--amber),var(--amber2));
  display:flex;align-items:center;justify-content:center;
  font-size:.72rem;font-weight:700;color:#000;cursor:pointer;flex-shrink:0;
}

/* ─ SIDEBAR ─ */
.sb-top{padding:12px 10px 8px;display:flex;align-items:center;justify-content:space-between;}
.sb-toggle{background:none;border:none;cursor:pointer;padding:6px;border-radius:7px;color:var(--tx3);transition:all .18s;}
.sb-toggle:hover{background:var(--b1);color:var(--tx);}
.sb-toggle svg{width:16px;height:16px;display:block;}
.sb-label{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);padding:6px 8px 4px;white-space:nowrap;overflow:hidden;}
.sidebar.collapsed .sb-label{opacity:0;}
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:8px 9px;border-radius:9px;cursor:pointer;
  transition:all .18s;color:var(--tx2);font-size:.84rem;font-weight:500;
  white-space:nowrap;overflow:hidden;position:relative;
}
.sb-item:hover{background:var(--b1);color:var(--tx);}
.sb-item.active{background:rgba(232,162,48,.1);color:var(--amber);}
.sb-item.active .sb-icon{color:var(--amber);}
.sb-icon{width:17px;height:17px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:15px;}
.sb-text{flex:1;overflow:hidden;text-overflow:ellipsis;}
.sidebar.collapsed .sb-text,.sidebar.collapsed .sb-label{display:none;}
.sb-pip{width:5px;height:5px;border-radius:50%;background:var(--rose);flex-shrink:0;animation:pip .8s ease infinite alternate;}
.sidebar.collapsed .sb-pip{position:absolute;top:7px;right:7px;}
.sb-divider{height:1px;background:var(--b1);margin:6px 10px;}

/* ─ SERVICE HEADER ─ */
.svc-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.8rem;gap:1rem;flex-wrap:wrap;}
.svc-eyebrow{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);margin-bottom:.4rem;}
.svc-title{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
.svc-sub{font-size:.85rem;color:var(--tx2);margin-top:.35rem;}

/* ─ STATS ROW ─ */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:1.8rem;}
.stat-tile{background:var(--surf);border:1px solid var(--b1);border-radius:var(--r);padding:1.1rem 1.2rem;transition:border-color .2s;}
.stat-tile:hover{border-color:var(--b2);}
.st-icon{font-size:1.3rem;margin-bottom:.6rem;}
.st-val{font-family:'Fraunces',serif;font-size:1.7rem;font-weight:800;line-height:1;}
.st-lbl{font-size:.74rem;color:var(--tx2);margin-top:3px;}
.st-delta{font-size:.7rem;margin-top:5px;}
.delta-up{color:var(--teal);}
.delta-dn{color:var(--rose);}

/* ─ CARD ─ */
.card{background:var(--surf);border:1px solid var(--b1);border-radius:var(--r);overflow:hidden;}
.card-head{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--b1);}
.card-head-title{font-family:'Fraunces',serif;font-size:.95rem;font-weight:700;}
.card-head-actions{display:flex;align-items:center;gap:8px;}

/* ─ TABLE ─ */
.tbl{width:100%;border-collapse:collapse;}
.tbl th{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tx3);padding:10px 14px;border-bottom:1px solid var(--b1);text-align:left;white-space:nowrap;}
.tbl td{padding:11px 14px;border-bottom:1px solid var(--b1);font-size:.835rem;vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tbody tr{transition:background .15s;cursor:default;}
.tbl tbody tr:hover td{background:rgba(255,255,255,0.02);}
.tbl-scroll{overflow-x:auto;}

/* ─ BADGES ─ */
.badge{display:inline-flex;align-items:center;gap:4px;font-size:.66rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:6px;white-space:nowrap;}
.badge::before{content:'';width:5px;height:5px;border-radius:50%;}
.b-green{background:var(--tg);color:var(--teal);}  .b-green::before{background:var(--teal);}
.b-amber{background:rgba(232,162,48,.12);color:var(--amber);} .b-amber::before{background:var(--amber);}
.b-rose{background:var(--rg);color:var(--rose);}   .b-rose::before{background:var(--rose);}
.b-blue{background:var(--blg);color:var(--blue);}  .b-blue::before{background:var(--blue);}
.b-violet{background:var(--vlg);color:var(--violet);} .b-violet::before{background:var(--violet);}
.b-gray{background:rgba(255,255,255,.07);color:var(--tx2);} .b-gray::before{background:var(--tx3);}

/* ─ BUTTONS ─ */
.btn{display:inline-flex;align-items:center;gap:6px;font-size:.82rem;font-weight:600;padding:8px 16px;border-radius:9px;border:none;cursor:pointer;transition:all .18s;white-space:nowrap;}
.btn-primary{background:var(--amber);color:#000;box-shadow:0 0 16px var(--ag);}
.btn-primary:hover{background:var(--amber2);transform:translateY(-1px);}
.btn-ghost{background:none;border:1px solid var(--b2);color:var(--tx);}
.btn-ghost:hover{background:var(--b1);border-color:var(--b3);}
.btn-danger{background:none;border:1px solid rgba(240,85,106,.3);color:var(--rose);}
.btn-danger:hover{background:var(--rg);}
.btn-sm{padding:5px 11px;font-size:.76rem;}
.btn-icon{width:30px;height:30px;border-radius:7px;padding:0;background:none;border:1px solid var(--b1);color:var(--tx2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .18s;font-size:.9rem;}
.btn-icon:hover{background:var(--b1);color:var(--tx);border-color:var(--b2);}
.btn-icon.edit:hover{background:var(--blg);color:var(--blue);border-color:rgba(91,142,245,.3);}
.btn-icon.del:hover{background:var(--rg);color:var(--rose);border-color:rgba(240,85,106,.3);}
.btn-icon.view:hover{background:var(--tg);color:var(--teal);border-color:rgba(38,201,154,.3);}
.action-btns{display:flex;align-items:center;gap:5px;}

/* ─ FORM ─ */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;}
.fg{display:flex;flex-direction:column;gap:5px;}
.fg.full{grid-column:1/-1;}
.fl{font-size:.75rem;font-weight:600;color:var(--tx2);letter-spacing:.02em;}
.fi,.fs,.fta{background:var(--bg3);border:1px solid var(--b2);border-radius:9px;color:var(--tx);font-size:.855rem;padding:9px 12px;outline:none;transition:border-color .18s;width:100%;}
.fi:focus,.fs:focus,.fta:focus{border-color:var(--amber);}
.fs option{background:var(--bg2);}
.fta{resize:vertical;min-height:90px;line-height:1.55;}
.fi::placeholder{color:var(--tx3);}

/* ─ MODAL ─ */
.overlay{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeIn .2s ease;}
.modal{background:var(--surf);border:1px solid var(--b2);border-radius:16px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.6);animation:slideUp .22s ease;}
.modal-lg{max-width:720px;}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--b1);position:sticky;top:0;background:var(--surf);z-index:2;}
.modal-title{font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;}
.modal-close{background:none;border:none;cursor:pointer;color:var(--tx2);font-size:1.1rem;padding:4px;border-radius:6px;transition:all .18s;}
.modal-close:hover{background:var(--b1);color:var(--tx);}
.modal-body{padding:1.5rem;}
.modal-foot{display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:1rem 1.5rem;border-top:1px solid var(--b1);position:sticky;bottom:0;background:var(--surf);}

/* ─ FILTER BAR ─ */
.filter-bar{display:flex;align-items:center;gap:8px;margin-bottom:1.2rem;flex-wrap:wrap;}
.chip{font-size:.76rem;font-weight:500;padding:5px 13px;border-radius:100px;background:var(--surf);border:1px solid var(--b1);color:var(--tx2);cursor:pointer;transition:all .18s;white-space:nowrap;}
.chip:hover{border-color:var(--b2);color:var(--tx);}
.chip.active{background:rgba(232,162,48,.1);border-color:rgba(232,162,48,.35);color:var(--amber);}
.search-wrap{display:flex;align-items:center;gap:7px;background:var(--surf);border:1px solid var(--b1);border-radius:100px;padding:6px 13px;flex:1;min-width:160px;max-width:280px;}
.search-wrap input{background:none;border:none;outline:none;color:var(--tx);font-size:.82rem;width:100%;}
.search-wrap input::placeholder{color:var(--tx3);}

/* ─ NOTIFICATION PANEL ─ */
.notif-panel{position:fixed;top:var(--nav);right:0;width:340px;height:calc(100vh - var(--nav));background:var(--bg2);border-left:1px solid var(--b1);display:flex;flex-direction:column;z-index:200;transform:translateX(100%);transition:transform .28s cubic-bezier(.4,0,.2,1);box-shadow:-16px 0 40px rgba(0,0,0,.4);}
.notif-panel.open{transform:translateX(0);}
.np-head{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.2rem;border-bottom:1px solid var(--b1);}
.np-title{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;}
.np-tabs{display:flex;border-bottom:1px solid var(--b1);}
.np-tab{flex:1;padding:9px;font-size:.75rem;font-weight:600;color:var(--tx2);cursor:pointer;text-align:center;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .18s;}
.np-tab.active{color:var(--amber);border-color:var(--amber);}
.np-list{flex:1;overflow-y:auto;padding:6px;}
.np-item{display:flex;gap:10px;padding:10px;border-radius:9px;cursor:pointer;transition:background .15s;position:relative;margin-bottom:2px;}
.np-item:hover{background:var(--b1);}
.np-item.unread{background:rgba(232,162,48,.04);}
.np-item.unread::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--amber);border-radius:0 2px 2px 0;}
.np-ico{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0;}
.np-info{flex:1;min-width:0;}
.np-name{font-size:.8rem;font-weight:600;line-height:1.3;}
.np-body{font-size:.72rem;color:var(--tx2);margin-top:2px;line-height:1.45;}
.np-time{font-size:.67rem;color:var(--tx3);margin-top:4px;display:flex;align-items:center;gap:4px;}
.unread-pip{width:5px;height:5px;border-radius:50%;background:var(--amber);}
.np-foot{padding:.75rem 1rem;border-top:1px solid var(--b1);display:flex;gap:8px;}
.np-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--tx2);gap:.5rem;}
.np-empty-ico{font-size:2.2rem;}
.np-empty-txt{font-size:.82rem;}

/* ─ CONFIRM DIALOG ─ */
.confirm-icon{font-size:2.5rem;margin-bottom:.8rem;}
.confirm-title{font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;margin-bottom:.4rem;}
.confirm-body{font-size:.855rem;color:var(--tx2);line-height:1.6;}

/* ─ TOAST ─ */
.toast-stack{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;display:flex;flex-direction:column;gap:8px;pointer-events:none;}
.toast{display:flex;align-items:center;gap:10px;background:var(--surf2);border:1px solid var(--b2);border-radius:11px;padding:11px 16px;box-shadow:0 12px 36px rgba(0,0,0,.5);animation:slideToast .3s ease;font-size:.84rem;pointer-events:all;min-width:260px;max-width:340px;}
.toast-icon{font-size:1.1rem;flex-shrink:0;}
.toast-msg{flex:1;}
.toast.t-success{border-color:rgba(38,201,154,.3);}
.toast.t-error{border-color:rgba(240,85,106,.3);}
.toast.t-info{border-color:rgba(91,142,245,.3);}

/* ─ MISC ─ */
.av{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:#000;flex-shrink:0;}
.prog-bar{height:5px;background:var(--surf2);border-radius:3px;overflow:hidden;}
.prog-fill{height:100%;border-radius:3px;transition:width .6s ease;}
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;color:var(--tx2);gap:.6rem;}
.empty-ico{font-size:2.8rem;}
.empty-title{font-family:'Fraunces',serif;font-size:1.1rem;color:var(--tx);}
.empty-sub{font-size:.83rem;text-align:center;line-height:1.6;}
.dash-grid{display:grid;grid-template-columns:2fr 1fr;gap:1.2rem;}
.activity-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;transition:background .15s;}
.activity-item:hover{background:var(--b1);}
.act-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.act-info{flex:1;}
.act-name{font-size:.82rem;font-weight:500;}
.act-time{font-size:.7rem;color:var(--tx2);}
.act-amount{font-size:.82rem;font-weight:600;color:var(--amber);}
.scan-area{background:var(--bg3);border:2px dashed var(--b2);border-radius:var(--r);padding:2.5rem;text-align:center;margin-bottom:1.5rem;transition:border-color .18s;cursor:pointer;}
.scan-area:hover{border-color:rgba(232,162,48,.4);}
.scan-icon{font-size:3rem;margin-bottom:.8rem;}
.scan-text{font-size:.9rem;color:var(--tx2);}

/* ─ LOGIN ─ */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(232,162,48,.07) 0%,transparent 70%);padding:1.5rem;}
.login-card{background:var(--surf);border:1px solid var(--b2);border-radius:18px;padding:2.5rem;width:100%;max-width:420px;box-shadow:0 32px 80px rgba(0,0,0,.5);}
.login-logo{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:2rem;}
.login-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:800;text-align:center;margin-bottom:.4rem;}
.login-sub{font-size:.84rem;color:var(--tx2);text-align:center;margin-bottom:1.8rem;line-height:1.6;}
.role-pills{display:flex;gap:7px;margin-bottom:1.4rem;}
.r-pill{flex:1;padding:8px;border-radius:9px;font-size:.78rem;font-weight:600;border:1px solid var(--b1);background:none;color:var(--tx2);cursor:pointer;transition:all .18s;}
.r-pill.active{background:rgba(232,162,48,.1);border-color:rgba(232,162,48,.4);color:var(--amber);}
.login-hint{background:rgba(232,162,48,.07);border:1px solid rgba(232,162,48,.2);border-radius:8px;padding:9px 12px;font-size:.76rem;color:var(--amber);margin-bottom:1rem;line-height:1.5;}
.btn-full{width:100%;justify-content:center;padding:12px;font-size:.9rem;border-radius:10px;}
.login-link{text-align:center;font-size:.8rem;color:var(--tx2);margin-top:1rem;}
.login-link span{color:var(--amber);cursor:pointer;font-weight:600;}
.form-spacer{margin-bottom:.9rem;}

/* ─ ANIMATIONS ─ */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideToast{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
@keyframes pip{from{opacity:.6;}to{opacity:1;}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

/* ─ RESPONSIVE ─ */
@media(max-width:900px){
  .stats-row{grid-template-columns:repeat(2,1fr);}
  .dash-grid{grid-template-columns:1fr;}
  .form-grid{grid-template-columns:1fr;}
  .form-grid-3{grid-template-columns:1fr 1fr;}
}
@media(max-width:640px){
  .sidebar{display:none;}
  .stats-row{grid-template-columns:repeat(2,1fr);}
  .page-content{padding:1rem;}
}
`;

export default styles;
