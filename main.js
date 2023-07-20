window.onload = () => {
    let buts = document.getElementsByClassName("sidenav-button");
    for (let but of buts) {
        but.addEventListener("click", sidenavbut_clicked);
    }
    buts = document.getElementsByClassName("sidenav-button-clicked");
    for (let but of buts) {
        but.addEventListener("click", sidenavbut_clicked);
    }
    // dwq

    // dwq

    // cz

    // cz

    // gff

    // gff
}
// 侧边栏导航按钮点击事件
function sidenavbut_clicked() {
    let buts = document.getElementsByClassName("sidenav-button-clicked");
    for (let but of buts) {
        but.className = "sidenav-button";
    }
    this.className = "sidenav-button-clicked";
}
// dwq

// dwq

// cz

// cz

// gff

// gff