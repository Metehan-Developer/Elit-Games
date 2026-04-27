// --- [Elit Internal] Veri Manipülasyonu ve Başlık Kilidi ---

(function(a) {
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
        let response = await originalFetch(input, init);
        let url = typeof input === 'string' ? input : input.url;
        
        // Profil verilerini yakala ve değiştir (/profile)
        if (url.includes(atob(a[2]))) {
            let data = await response.json();
            // Premium bitiş tarihini 9999 yılına çeker
            data[atob(a[0])] = atob(a[1]);
            return new Response(JSON.stringify(data), response);
        }
        return response;
    };
})(['cHJlbWl1bUVuZHM=', 'OTk5OS0xMi0zMFQwMDoyMzo1OS45OTla', 'L3Byb2ZpbGU=']);

// Başlık Kilitleyici (Sekme ismini "Elit Internal" yapar ve değiştirilmesini engeller)
(function(titleText) {
    document.title = titleText;
    Object.defineProperty(document, 'title', {
        get: function() { return titleText; },
        set: function() { }, // Değiştirmeye çalışan olursa engeller
        configurable: false
    });
    
    // Zorlayıcı kontrol (Bazı oyunlar title'ı sürekli günceller, biz geri alırız)
    setInterval(function() {
        if (document.title !== titleText) document.title = titleText;
    }, 10);
})("Elit Internal | Poxel.io");

console.log("%c[Elit Internal] Fetch Hook & Title Lock Active!", "color: #00ffff; font-weight: bold;");
