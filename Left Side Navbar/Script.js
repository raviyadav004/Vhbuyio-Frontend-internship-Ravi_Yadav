const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const header = document.getElementById("header");
const sidebarLinks = document.querySelectorAll("#sidebarLinks li");

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("sidebar-open");
    openMenu.setAttribute("aria-expanded", "true");
    sidebar.setAttribute("aria-hidden", "false");
    sidebarLinks.forEach((link, i) => {
        setTimeout(() => {
            link.style.opacity = "1";
            link.style.transform = "translateX(0)";
        }, i * 80);
    });
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
    openMenu.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");
    sidebarLinks.forEach(link => {
        link.style.opacity = "0";
        link.style.transform = "translateX(-30px)";
    });
}

openMenu.addEventListener("click", openSidebar);
closeMenu.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeSidebar();
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
});