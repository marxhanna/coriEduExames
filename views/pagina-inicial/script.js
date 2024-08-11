function selectBtn(id) {
    if (document.getElementById(id).classList.contains("selected")) {
        document.getElementById(id).classList.remove("selected");
    }
    else {
        document.getElementById(id).classList.add("selected");
    }
}

window.onload = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.getElementById("promotionApp").style.display = "none";
    }

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

    document.getElementById("installApp").addEventListener("click", async () => {
        

        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    })
}
