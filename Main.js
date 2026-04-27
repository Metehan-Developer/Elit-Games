/* ELIT INTERNAL - ULTIMATE ALL-IN-ONE 
    Author: ElitHan (Elit Developers Lab)
*/

(function() {
    'use strict';

    const sColor = "#ffcc00"; // Elit Sarı
    const errColor = "#ff4444";
    
    // 1. BİLDİRİM SİSTEMİ (Sağ Üst)
    function showNotify(text, color = sColor) {
        const n = document.createElement('div');
        n.style = `position:fixed; top:20px; right:20px; background:rgba(0,0,0,0.8); color:${color}; 
                   padding:12px 25px; border-left:4px solid ${color}; border-radius:8px; font-weight:bold; 
                   z-index:1000000; font-family:sans-serif; box-shadow:0 4px 15px rgba(0,0,0,0.5);`;
        n.innerText = text;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }

    // 2. EKRAN LOG SİSTEMİ (Sol Alt)
    function screenLog(msg) {
        let container = document.getElementById('elit-logger');
        if (!container) {
            container = document.createElement('div');
            container.id = 'elit-logger';
            container.style = "position:fixed; bottom:20px; left:20px; z-index:999999; font-family:monospace; font-size:12px;";
            document.body.appendChild(container);
        }
        const log = document.createElement('div');
        log.style = `color:${sColor}; background:rgba(0,0,0,0.6); margin-top:5px; padding:5px 10px; border-radius:4px;`;
        log.innerText = `> ${msg}`;
        container.appendChild(log);
        setTimeout(() => log.remove(), 5000);
    }

    // 3. F12 & KONSOL KORUMASI (Anti-Tamper)
    window.addEventListener('keydown', (e) => {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C"))) {
            showNotify("BLOCKED BY ELITHAN", errColor);
        }
    });

    setInterval(() => {
        const before = new Date().getTime();
        debugger;
        const after = new Date().getTime();
        if (after - before > 100) {
            document.body.innerHTML = `<div style="background:#111; color:red; height:100vh; display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-size:30px; font-weight:bold;">BLOCKED BY ELITHAN</div>`;
        }
    }, 100);

    // 4. FETCH HOOK (PREMIUM & PROFILE)
    const a = ['cHJlbWl1bUVuZHM=', 'OTk5OS0xMi0zMFQwMDoyMzo1OS45OTla', 'L3Byb2ZpbGU='];
    const originalFetch = window.fetch;
    window.fetch = async (i, t) => {
        let r = await originalFetch(i, t);
        let u = typeof i == 'string' ? i : i.url;
        if (u.includes(atob(a[2]))) {
            let d = await r.json();
            d[atob(a[0])] = atob(a[1]);
            screenLog("Premium Data Patched!");
            return new Response(JSON.stringify(d), r);
        }
        return r;
    };

    // 5. BAŞLIK KİLİDİ
    const tText = "Elit Internal";
    document.title = tText;
    Object.defineProperty(document, 'title', { get: () => tText, set: () => {}, configurable: false });

    // 6. MODERN SARI PANEL (Corner Radius & Styles)
    const style = document.createElement('style');
    style.innerHTML = `
        #elit-panel { position:fixed; top:150px; left:50px; width:240px; background:rgba(15,15,15,0.98); 
                      border:1px solid ${sColor}; border-radius:15px; color:white; font-family:sans-serif; 
                      z-index:999998; display:none; overflow:hidden; box-shadow:0 0 25px rgba(255,204,0,0.15); }
        #elit-head { background:${sColor}; color:#000; padding:12px; font-weight:bold; text-align:center; cursor:move; border-radius:14px 14px 0 0; }
        .elit-body { padding:15px; }
        .item { display:flex; justify-content:space-between; margin-bottom:10px; align-items:center; }
        .tgl { cursor:pointer; width:40px; height:20px; background:#333; border-radius:10px; position:relative; transition:0.3s; }
        .tgl:before { content:''; position:absolute; width:16px; height:16px; background:#fff; border-radius:50%; top:2px; left:2px; transition:0.3s; }
        input:checked + .tgl { background:${sColor}; }
        input:checked + .tgl:before { left:22px; }
        input { display:none; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'elit-panel';
    panel.innerHTML = `
        <div id="elit-head">ELIT INTERNAL</div>
        <div class="elit-body">
            <div class="item"><span>Visuals</span><label><input type="checkbox"><div class="tgl"></div></label></div>
            <div class="item"><span>Aimbot</span><label><input type="checkbox"><div class="tgl"></div></label></div>
            <div class="item"><span>No Recoil</span><label><input type="checkbox"><div class="tgl"></div></label></div>
            <div class="item"><span>Auto Farm</span><label><input type="checkbox"><div class="tgl"></div></label></div>
        </div>
    `;
    document.body.appendChild(panel);

    // Sürükleme Mantığı
    let drag = false, x, y;
    document.getElementById('elit-head').onmousedown = (e) => { drag = true; x = e.pageX - panel.offsetLeft; y = e.pageY - panel.offsetTop; };
    document.onmouseup = () => drag = false;
    document.onmousemove = (e) => { if(drag) { panel.style.left = (e.pageX - x)+'px'; panel.style.top = (e.pageY - y)+'px'; } };

    // INSERT Tuşu ile Aç/Kapat
    window.onkeydown = (e) => { if(e.key === "Insert") panel.style.display = panel.style.display === "none" ? "block" : "none"; };

    // BAŞLANGIÇ
    try {
        indexedDB.deleteDatabase("UnityCache");
        screenLog("UnityCache Cleaned");
        showNotify("Elit Internal: Started");
    } catch(e) {
        showNotify("Elit Internal: Fail!", errColor);
    }

})();
