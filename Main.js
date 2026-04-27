/* ELIT INTERNAL - FORCE INJECTION SYSTEM
   CSP & CORS BYPASS ENABLED
*/

(async function() {
    'use strict';

    // 1. GÜVENLİK VE HAZIRLIK
    const sColor = "#ffb300";
    const tT = "Elit Internal | Poxel.io";
    
    // Sayfa başlığını anında kilitle
    const lockTitle = () => {
        document.title = tT;
        Object.defineProperty(document, 'title', { get: () => tT, set: () => {}, configurable: false });
    };
    lockTitle();

    // 2. FETCH HOOK (PREMIUM PATCH) - Bunu en tepede çalıştırıyoruz
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

    // 3. UI OLUŞTURUCU (DOM hazır olmasa bile zorla ekler)
    const injectUI = () => {
        if (document.getElementById('elit-p')) return;

        const style = document.createElement('style');
        style.textContent = `
            #elit-p { position:fixed; top:100px; left:100px; width:600px; height:400px; background:#0a0a0a; 
                      border:1px solid #ffb300; border-radius:15px; color:#fff; font-family:sans-serif; 
                      z-index:2147483647; display:none; flex-direction:row; box-shadow:0 0 30px rgba(0,0,0,0.9); }
            #elit-tb { width:160px; background:#111; border-right:1px solid #222; display:flex; flex-direction:column; padding:20px 0; border-radius:15px 0 0 15px; }
            #elit-title { color:#ffb300; font-weight:bold; text-align:center; margin-bottom:20px; cursor:move; }
            .e-tab { padding:12px 20px; cursor:pointer; color:#888; font-size:14px; transition:0.2s; }
            .e-tab.active { color:#ffb300; background:rgba(255,179,0,0.1); border-left:3px solid #ffb300; }
            #elit-c { flex:1; padding:25px; overflow-y:auto; }
            .e-page { display:none; }
            .e-page.active { display:block; }
            .e-row { display:flex; justify-content:space-between; background:#161616; padding:12px; border-radius:8px; margin-bottom:8px; border:1px solid #222; }
            .e-sw { width:40px; height:20px; background:#333; border-radius:10px; position:relative; cursor:pointer; }
            .e-sw:before { content:''; position:absolute; width:16px; height:16px; background:#fff; border-radius:50%; top:2px; left:2px; transition:0.3s; }
            input:checked + .e-sw { background:#ffb300; }
            input:checked + .e-sw:before { left:22px; }
            input { display:none; }
        `;
        document.documentElement.appendChild(style);

        const p = document.createElement('div');
        p.id = 'elit-p';
        p.innerHTML = `
            <div id="elit-tb">
                <div id="elit-title">ELITHAN</div>
                <div class="e-tab active" data-page="aim">Aimbot</div>
                <div class="e-tab" data-page="vis">Visuals</div>
                <div class="e-tab" data-page="exp">Exploits</div>
            </div>
            <div id="elit-c">
                <div class="e-page active" id="aim">
                    <h3 style="color:#ffb300">Combat</h3>
                    <div class="e-row"><span>Enable Aimbot</span><label><input type="checkbox"><div class="e-sw"></div></label></div>
                    <div class="e-row"><span>Silent Aim</span><label><input type="checkbox"><div class="e-sw"></div></label></div>
                </div>
                <div class="e-page" id="vis">
                    <h3 style="color:#ffb300">ESP</h3>
                    <div class="e-row"><span>Box ESP</span><label><input type="checkbox" checked><div class="e-sw"></div></label></div>
                </div>
                <div class="e-page" id="exp">
                    <h3 style="color:#ffb300">Misc</h3>
                    <div class="e-row"><span>Speed Hack</span><label><input type="checkbox"><div class="e-sw"></div></label></div>
                </div>
            </div>
        `;
        document.documentElement.appendChild(p);

        // Tab Mantığı
        document.querySelectorAll('.e-tab').forEach(t => {
            t.onclick = () => {
                document.querySelectorAll('.e-tab, .e-page').forEach(el => el.classList.remove('active'));
                t.classList.add('active');
                document.getElementById(t.dataset.page).classList.add('active');
            };
        });

        // Sürükleme
        let d = false, x, y;
        document.getElementById('elit-title').onmousedown = (e) => { d = true; x = e.pageX - p.offsetLeft; y = e.pageY - p.offsetTop; };
        document.onmouseup = () => d = false;
        document.onmousemove = (e) => { if(d) { p.style.left = (e.pageX - x)+'px'; p.style.top = (e.pageY - y)+'px'; } };
    };

    // 4. KONTROL DÖNGÜSÜ (Insert ve Enjeksiyon Kontrolü)
    window.addEventListener('keydown', (e) => {
        if (e.key === "Insert") {
            const p = document.getElementById('elit-p');
            if(p) p.style.display = p.style.display === "none" ? "flex" : "none";
        }
    });

    // İnjekti başlat (Sayfa yüklense de yüklenmese de dene)
    if (document.body) injectUI();
    else {
        const obs = new MutationObserver(() => {
            if (document.body) { injectUI(); obs.disconnect(); }
        });
        obs.observe(document.documentElement, {childList: true});
    }

    console.log("%c[Elit Internal] Injected Successfully!", "color:#ffb300; font-weight:bold;");
})();
