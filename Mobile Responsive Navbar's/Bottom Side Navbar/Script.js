const openMenu = document.getElementById("openMenu");
const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");
const closeSheet = document.getElementById("closeSheet");
const sheetLinks = document.querySelectorAll("#sheetLinks li");

function openBottomSheet() {
    bottomSheet.classList.add("active");
    overlay.classList.add("active");
    bottomSheet.setAttribute("aria-hidden", "false");
    sheetLinks.forEach((link, i) => {
        setTimeout(() => {
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
        }, i * 80);
    });
}

function closeBottomSheet() {
    bottomSheet.classList.remove("active");
    overlay.classList.remove("active");
    bottomSheet.setAttribute("aria-hidden", "true");

    sheetLinks.forEach(link => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
    });
}

openMenu.addEventListener("click", openBottomSheet);
closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeBottomSheet();
});

let startY = 0;
bottomSheet.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

bottomSheet.addEventListener("touchmove", e => {
    const moveY = e.touches[0].clientY - startY;
    if (moveY > 0) bottomSheet.style.transform = `translateY(${moveY}px)`;
});

bottomSheet.addEventListener("touchend", e => {
    const endY = e.changedTouches[0].clientY - startY;
    if (endY > 80) {
        closeBottomSheet();
    } else {
        bottomSheet.style.transform = `translateY(0)`;
    }
});