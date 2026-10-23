(function () {
  function init() {
    if (!document.body) return setTimeout(init, 10);

    /* ================= STYLE ================= */
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
      }

      /* ===== TOPBAR ===== */
      .g-topbar {
        height: 55px;
        background: inherit;
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        position: relative;
        z-index: 10000;
        margin: calc(-1 * var(--page-pad, 12px)) calc(-1 * var(--page-pad, 12px)) 12px;
      }

      .g-title {
        margin-left: 15px;
        font-size: 17px;
        font-weight: 500;
        color: black;
        transition: color 0.1s ease;
      }

      .g-title.active {
        color: white;
      }

      .g-menu-btn {
        width: 42px;
        height: 38px;
        background: none !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .g-menu-btn svg { transition: opacity 0.15s; }
      .g-menu-btn:hover svg { opacity: 0.5; }

      .g-menu-btn.active svg rect { fill: #fff; }

      /* ===== DRAWER ===== */
      .g-drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100%;
        background: #1c1c1c;
        color: #fff;
        padding: 70px 0 20px 0;
        box-sizing: border-box;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 9999;
      }

      .g-drawer.open {
        transform: translateX(0);
      }

      .g-drawer h3 {
        padding: 0 20px;
        margin-bottom: 15px;
        font-weight: 500;
      }

      .g-drawer a {
        display: block;
        /* Độ hẹp/dày (chiều đứng) mỗi nút lấy từ biến --pad-y,
           mặc định 14px nếu không set */
        padding: var(--pad-y, 14px) 20px;
        font-size: 16px;
        color: #ddd;
        text-decoration: none;
        transition: background 0.2s, color 0.2s;
      }

      .g-drawer a:hover {
        background: rgba(255,255,255,0.08);
        color: #fff;
      }

      .g-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.35);
        opacity: 0;
        pointer-events: none;
        transition: 0.3s;
        z-index: 9998;
      }

      .g-overlay.show {
        opacity: 1;
        pointer-events: all;
      }
    `;
    document.head.appendChild(style);

    /* ================= TOPBAR ================= */
    const topbar = document.createElement("div");
    topbar.className = "g-topbar";

    const btn = document.createElement("button");
    btn.className = "g-menu-btn";
    btn.innerHTML = `<svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0"  width="20" height="2" rx="1" fill="#000"/>
      <rect x="0" y="6"  width="20" height="2" rx="1" fill="#000"/>
      <rect x="0" y="12" width="20" height="2" rx="1" fill="#000"/>
    </svg>`;

    const title = document.createElement("div");
    title.className = "g-title";
    title.innerText = document.title;

    topbar.appendChild(btn);
    topbar.appendChild(title);
    document.body.prepend(topbar);

    /* ================= DRAWER ================= */
    const drawer = document.createElement("div");
    drawer.className = "g-drawer";

    const heading = document.createElement("h3");
    heading.innerText = "Menu";
    drawer.appendChild(heading);

     const BTN_PAD_Y = 12;

    const links = [
      { href: "/",         label: "Home" },
      { href: "/chatbot",  label: "ChatBot" },
      { href: "/asm",      label: "ROP Compiler" },
      { href: "/decomp",   label: "ROP Decompiler" },
      { href: "/emu",      label: "Casio Emulator" },
      { href: "/spell",    label: "Spell Tool" },
      { href: "/imgtobm",  label: "Image to Hex" },
      { href: "/pixel",    label: "Pixel Draw" },
      { href: "/ld-gen",   label: "line_draw Editor" },
    ];

    links.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.href;
      a.innerText = item.label;
      a.style.setProperty("--pad-y", BTN_PAD_Y + "px");
      drawer.appendChild(a);
    });

    const overlay = document.createElement("div");
    overlay.className = "g-overlay";

    document.body.appendChild(drawer);
    document.body.appendChild(overlay);

    /* ================= LOGIC ================= */

    function toggleDrawer() {
      drawer.classList.toggle("open");
      overlay.classList.toggle("show");
      title.classList.toggle("active");
      btn.classList.toggle("active");
    }

    btn.addEventListener("click", toggleDrawer);
    overlay.addEventListener("click", toggleDrawer);
  }

  init();
})(); 