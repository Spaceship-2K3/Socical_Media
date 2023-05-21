const settingMenu = document.querySelector(".settings-menu");
const btnDark = document.querySelector("#dark-btn");
function settingsMenuToggle() {
    settingMenu.classList.toggle("settings-menu-height");
}

btnDark.addEventListener("click", function (event) {
    event.target.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");
});
