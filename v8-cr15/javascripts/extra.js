// Mimic the onetrust style insert

window.addEventListener("load", (_) => {
    
    let style = document.querySelector("#onetrust-style");
    
    if (!style) {
        style = document.createElement("style");
        style.id = "onetrust-style";
        document.head.insertAdjacentElement("beforeend", style);
    }
    
    //style.innerHTML = "*, html, body { background-color: #000 !important; color: #fff !important; }"
})

// Fix the removed style tag

let __gStyles;

// Subscribe to the document$ to know that there was a site reload
// Restore the removed style from the global variable
window.document$.subscribe(function() {
    if (!__gStyles) return;
    if (document.head.querySelector("#onetrust-style")) return;
    document.head.insertAdjacentElement("beforeend", __gStyles);
})

// Subscribe to the location$ to know that the location change was invoked
// On first location change get the style (it's not removed yet) and assign it to the global variable
window.location$.subscribe(function() {
    let style = document.head.querySelector("#onetrust-style");
    if (!style) return;
    if (__gStyles) return;
    __gStyles = style;
})