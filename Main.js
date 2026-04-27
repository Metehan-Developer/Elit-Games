(function() {
    'use strict';

    // ELIT CONFIGURATION
    const config = {
        sColor: "#ffb300",
        logo: "https://i.ibb.co/1fLPnkZK/logo.png",
        maxNotifs: 5
    };

    let activeNotifications = [];

    // 1. BRANDING GUARD (TITLE & ICON)
    // Hem başlığı hem de site logosunu (favicon) saniyede bir kontrol edip sabitler.
    setInterval(() => {
        // Title Lock
        const targetTitle = `Elit Internal | Poxel.io`;
        if (document.title !== targetTitle) document.title = targetTitle;

        // Icon (Favicon) Lock
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'shortcut icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        if (link.href !== config.logo) link.href = config.logo;
    }, 1000);

    // 2. ULTRA LOADER (PREMIUM PULSE)
    function createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'elit-loader';
        loader.style = `position:fixed; top:0; left:0; width:100%; height:100%; background:#050505; z-index:2147483647; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Segoe UI',sans-serif; transition:opacity 1s ease;`;

        loader.innerHTML = `
            <div style="position:relative; margin-bottom:40px;">
                <img src="${config.logo}" style="max-width:200px; filter:drop-shadow(0 0 20px ${config.sColor}44); animation:elitPulse 2s infinite ease-in-out;">
            </div>
            <div style="width:320px; height:5px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
                <div id="elit-bar" style="width:0%; height:100%; background:linear-gradient(90deg, transparent, ${config.sColor}); box-shadow:0 0 20px ${config.sColor}; transition:width 0.4s ease-out;"></div>
            </div>
            <div id="elit-status" style="color:#555; margin-top:20px; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:3px;">BRANDING APPLIED...</div>
        `;
        document.body.appendChild(loader);

        let p = 0;
        const intr = setInterval(() => {
            p += Math.random() * 30;
            if (p >= 100) {
                p = 100; clearInterval(intr);
                setTimeout(() => { loader.style.opacity='0'; setTimeout(()=>loader.remove(), 1000); }, 800);
            }
            document.getElementById('elit-bar').style.width = p + "%";
        }, 400);
    }

    // 3. GÖRSEL BİLDİRİM SİSTEMİ (PRO DESIGN)
    function notify(text, type = 'success') {
        if (activeNotifications.length >= config.maxNotifs) {
            const oldest = activeNotifications.shift();
            if (oldest) oldest.remove();
        }

        const color = type === 'success' ? config.sColor : '#ff4444';
        const n = document.createElement('div');
        n.className = 'elit-notif-card';
        n.style = `position:fixed; top:${25 + (activeNotifications.length * 90)}px; right:25px; min-width:340px; background:rgba(10,10,10,0.95); border-left:6px solid ${color}; color:#fff; border-radius:12px; font-family:'Segoe UI',sans-serif; z-index:2147483646; display:flex; align-items:center; box-shadow:0 15px 40px rgba(0,0,0,0.8); backdrop-filter:blur(10px); animation:elitIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; transition: all 0.4s ease; overflow:hidden;`;

        n.innerHTML = `
            <div style="background:${color}15; padding:22px; display:flex; align-items:center; justify-content:center; border-right:1px solid rgba(255,255,255,0.05);">
                <span style="color:${color}; font-size:24px; font-weight:900;">!</span>
            </div>
            <div style="padding:0 25px; flex:1;">
                <div style="font-weight:800; font-size:15px; letter-spacing:0.5px;">${text}</div>
                <div style="font-size:10px; color:#555; margin-top:2px; font-weight:600;">ELIT DEVELOPERS LAB</div>
            </div>
            <div style="padding:15px; cursor:pointer; color:#444; font-size:18px; transition:0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#444'" onclick="this.parentElement.remove()">✕</div>
        `;

        document.body.appendChild(n);
        activeNotifications.push(n);

        setTimeout(() => {
            if(n.parentNode) {
                n.style.transform = 'translateX(120%)';
                n.style.opacity = '0';
                setTimeout(() => {
                    n.remove();
                    activeNotifications = activeNotifications.filter(i => i !== n);
                    repositionNotifs();
                }, 400);
            }
        }, 4500);
    }

    function repositionNotifs() {
        activeNotifications.forEach((n, i) => {
            n.style.top = `${25 + (i * 90)}px`;
        });
    }

    // 4. ANIMASYONLAR
    const addStyles = () => {
        if(document.getElementById('elit-styles')) return;
        const s = document.createElement('style');
        s.id = 'elit-styles';
        s.textContent = `
            @keyframes elitPulse { 0%{transform:scale(1);opacity:0.8;} 50%{transform:scale(1.05);opacity:1;} 100%{transform:scale(1);opacity:0.8;} }
            @keyframes elitIn { from{transform:translateX(110%);opacity:0;} to{transform:translateX(0);opacity:1;} }
        `;
        document.head.appendChild(s);
    };

    // 5. START UP
    const boot = () => {
        addStyles();
        createLoadingScreen();
        const check = setInterval(() => {
            if(document.querySelector('canvas')) {
                clearInterval(check);
                setTimeout(() => {
                    notify("Elit İnternal Started");
                }, 2000);
            }
        }, 500);
    };

    if(document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);

})();
