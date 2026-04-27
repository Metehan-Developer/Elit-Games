/* ELIT INTERNAL - ADVANCED BLACK & GOLD UI
    Author: ElitHan
    UI Style: Tabbed, Modern, Draggable
*/

(function() {
    'use strict';

    // -- [Ayarlar & Renkler] --
    const sColor = "#ffb300"; // Canlı Gold/Sarı
    const sColorD = "#cc8e00"; // Koyu Sarı (Hover)
    const bgColor = "#0a0a0a"; // Çok Koyu Arka Plan
    const secColor = "#141414"; // İkincil Koyu (Tab Bar)
    const errColor = "#ff3333"; // Hata Kırmızısı

    // 1. [BİLDİRİM SİSTEMİ (Sağ Üst)]
    function sNotify(t, c = sColor) {
        const n = document.createElement('div');
        n.style = `position:fixed; top:20px; right:20px; background:rgba(0,0,0,0.9); color:${c}; 
                   padding:15px 30px; border-radius:10px; font-weight:bold; z-index:1000000; 
                   font-family:'Segoe UI',Tahoma,sans-serif; box-shadow:0 6px 20px rgba(255,179,0,0.2); 
                   border:1px solid ${bgColor};`;
        n.innerText = t;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3500);
    }

    // 2. [F12 & KONSOL KORUMASI]
    window.addEventListener('keydown', (e) => {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C"))) {
            sNotify("Blocked, errColor);
        }
    });
    setInterval(() => {
        const b = new Date().getTime();
        (function(){}.constructor('\x64\x65\x62\x75\x67\x67\x65\x72')()); // Gizli debugger
        const a = new Date().getTime();
        if (a - b > 100) { sNotify("DEBUGGER DETECTED - SYSTEM PANIC", errColor); }
    }, 200);

    // 3. [FETCH HOOK (PREMIUM PATCH)]
    const pha = ['cHJlbWl1bUVuZHM=', 'OTk5OS0xMi0zMFQwMDoyMzo1OS45OTla', 'L3Byb2ZpbGU='];
    const oFetch = window.fetch;
    window.fetch = async (i, t) => {
        let r = await oFetch(i, t);
        let u = typeof i == 'string' ? i : i.url;
        if (u.includes(atob(pha[2]))) {
            let d = await r.json();
            d[atob(pha[0])] = atob(pha[1]);
            return new Response(JSON.stringify(d), r);
        }
        return r;
    };

    // 4. [BAŞLIK KİLİDİ]
    const tT = "Elit Internal | Poxel.io";
    document.title = tT;
    Object.defineProperty(document, 'title', { get: () => tT, set: () => {}, configurable: false });

    // 5. [PREMIUM UI - CSS]
    const style = document.createElement('style');
    style.innerHTML = `
        /* Ana Panel */
        #elit-p { position:fixed; top:120px; left:80px; width:650px; height:420px; background:${bgColor}; 
                  border:1px solid #1a1a1a; border-radius:18px; color:#fff; font-family:'Segoe UI',sans-serif; 
                  z-index:999998; display:none; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.8); 
                  display:flex; transition: transform 0.2s ease-out; }
        
        /* Sol Tab Bar */
        #elit-tb { width:170px; background:${secColor}; border-right:1px solid #1a1a1a; 
                   display:flex; flex-direction:column; padding-top:20px; }
        #elit-title { color:${sColor}; font-weight:bold; font-size:18px; text-align:center; 
                     padding-bottom:30px; letter-spacing:1px; cursor:move; }
        
        .e-tab { padding:15px 25px; cursor:pointer; color:#bbb; font-size:14px; 
                 border-left:3px solid transparent; transition:0.2s; display:flex; align-items:center; }
        .e-tab:hover { color:#fff; background:rgba(255,255,255,0.02); }
        .e-tab.active { color:${sColor}; border-left-color:${sColor}; background:rgba(255,179,0,0.05); }
        .e-icon { margin-right:12px; font-size:16px; width:20px; text-align:center; }
        
        /* Sağ İçerik Alanı */
        #elit-c { flex:1; padding:30px; overflow-y:auto; }
        .e-page { display:none; }
        .e-page.active { display:block; }
        .e-p-title { font-size:22px; font-weight:bold; color:#fff; margin-bottom:10px; }
        .e-p-sub { font-size:12px; color:#666; margin-bottom:25px; text-transform:uppercase; letter-spacing:1px; }

        /* Modern Öğeler (Switch, Slider vs.) */
        .e-row { display:flex; justify-content:space-between; align-items:center; 
                 background:#111; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #1a1a1a; }
        .e-l { font-size:14px; color:#eee; }
        .e-sub-l { font-size:11px; color:#666; display:block; margin-top:2px; }

        /* Custom Switch */
        .e-sw { cursor:pointer; width:45px; height:24px; background:#222; border-radius:12px; 
                position:relative; transition:0.3s; border:1px solid #333; }
        .e-sw:before { content:''; position:absolute; width:18px; height:18px; background:#888; 
                       border-radius:50%; top:2px; left:3px; transition:0.3s; box-shadow:0 2px 5px rgba(0,0,0,0.3); }
        input:checked + .e-sw { background:${sColor}; border-color:${sColor}; }
        input:checked + .e-sw:before { left:22px; background:#fff; }
        input { display:none; }

        /* Custom Slider */
        .e-sl { -webkit-appearance:none; width:120px; height:6px; background:#222; border-radius:3px; outline:none; }
        .e-sl::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; background:${sColor}; 
                                     border-radius:50%; cursor:pointer; transition:0.2s; box-shadow:0 0 10px rgba(255,179,0,0.5); }
        .e-sl::-webkit-slider-thumb:hover { background:${sColorD}; transform:scale(1.1); }
        
        #elit-f { position:absolute; bottom:15px; left:170px; right:0; text-align:center; 
                  font-size:11px; color:#333; font-family:monospace; }
    `;
    document.head.appendChild(style);

    // 6. [PREMIUM UI - HTML DOM]
    const p = document.createElement('div');
    p.id = 'elit-p';
    p.innerHTML = `
        <div id="elit-tb">
            <div id="elit-title">ELITAN</div>
            <div class="e-tab active" data-page="aim"><span class="e-icon">⊕</span> Aimbot</div>
            <div class="e-tab" data-page="vis"><span class="e-icon">👁</span> Visuals</div>
            <div class="e-tab" data-page="exp"><span class="e-icon">⚡</span> Exploits</div>
            <div class="e-tab" data-page="cfg"><span class="e-icon">⚙</span> Config</div>
            <div class="e-tab" data-page="crd"><span class="e-icon">★</span> Credits</div>
        </div>
        <div id="elit-c">
            <div class="e-page active" id="aim">
                <div class="e-p-title">[Aimbot]</div>
                <div class="e-p-sub">Main Combat Settings</div>
                <div class="e-row"><div><span class="e-l">Enable Aimbot</span><span class="e-sub-l">Activate aim assist</span></div><label><input type="checkbox" id="e-aim-en"><div class="e-sw"></div></label></div>
                <div class="e-row"><div><span class="e-l">Aimbot Smooth</span><span class="e-sub-l">Humanize aiming speed</span></div><input type="range" class="e-sl" min="1" max="20" value="5"></div>
                <div class="e-row"><div><span class="e-l">Draw FOV Circle</span><span class="e-sub-l">Show target area</span></div><label><input type="checkbox"><div class="e-sw"></div></label></div>
            </div>
            <div class="e-page" id="vis">
                <div class="e-p-title">[Visuals]</div>
                <div class="e-p-sub">Player ESP & World</div>
                <div class="e-row"><div><span class="e-l">Player ESP</span><span class="e-sub-l">Show enemies through walls</span></div><label><input type="checkbox" checked><div class="e-sw"></div></label></div>
                <div class="e-row"><div><span class="e-l">ESP Boxes</span><span class="e-sub-l">Draw boxes around targets</span></div><label><input type="checkbox"><div class="e-sw"></div></label></div>
                <div class="e-row"><div><span class="e-l">Health Bar</span><span class="e-sub-l">Show player health</span></div><label><input type="checkbox"><div class="e-sw"></div></label></div>
            </div>
            <div class="e-page" id="exp">
                <div class="e-p-title">[Exploits]</div>
                <div class="e-p-sub">Game Manipulations</div>
                <div class="e-row"><div><span class="e-l">No Recoil</span><span class="e-sub-l">Remove weapon recoil</span></div><label><input type="checkbox"><div class="e-sw"></div></label></div>
                <div class="e-row"><div><span class="e-l">Speed Hack</span><span class="e-sub-l">Increase movement speed</span></div><label><input type="checkbox"><div class="e-sw"></div></label></div>
            </div>
            <div class="e-page" id="cfg"><div class="e-p-title">[Config]</div><div class="e-p-sub">Save & Load settings</div></div>
             <div class="e-page" id="crd"><div class="e-p-title">[Credits]</div><div class="e-p-sub">Premium Cheat by ElitHan</div></div>
        </div>
        <div id="elit-f">ver 1.0 | discord.gg/elithan</div>
    `;
    document.body.appendChild(p);

    // 7. [UI LOGIC (Sekme Değiştirme, Sürükleme, INSERT)]
    
    // Sekme Sistemi
    const tabs = document.querySelectorAll('.e-tab');
    const pages = document.querySelectorAll('.e-page');
    tabs.forEach(t => {
        t.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            t.classList.add('active');
            document.getElementById(t.dataset.page).classList.add('active');
        });
    });

    // Sürükleme Mantığı (Sadece Başlık Alanı)
    let d = false, x, y;
    const h = document.getElementById('elit-title');
    h.onmousedown = (e) => { d = true; x = e.pageX - p.offsetLeft; y = e.pageY - p.offsetTop; h.style.cursor = 'grabbing'; };
    document.onmouseup = () => { d = false; h.style.cursor = 'move'; };
    document.onmousemove = (e) => { if(d) { p.style.left = (e.pageX - x)+'px'; p.style.top = (e.pageY - y)+'px'; } };

    // INSERT Tuşu ile Aç/Kapat
    window.addEventListener('keydown', (e) => { if(e.key === "Insert") p.style.display = p.style.display === "none" ? "flex" : "none"; });

    // Başlangıç Bildirimi
    sNotify("Elit Internal: Starting...");

})();
