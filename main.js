window.onload = () => {
    // 侧边栏导航按钮添加事件
    let buts = document.getElementsByClassName("sidenav-button");
    for (let but of buts) {
        but.addEventListener("click", sidenavbut_clicked);
    }
    buts = document.getElementsByClassName("sidenav-button-clicked");
    for (let but of buts) {
        but.addEventListener("click", sidenavbut_clicked);
    }
    // 用canvas绘制图表
    var canvas = document.getElementById("canvas");
    canvas.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartheight').trim());
    canvas.width = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartwidth').trim());
    var ctx = canvas.getContext('2d');
    
    // dwq
    var data = getData();// 存输入数据的二维数组
    var padding=100;
    drawAxis(canvas,ctx,padding,canvas.height-padding,canvas.width-padding,padding,data.length,data);
    
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
function getData()
{
    return [[2019,2],[2020,3],[2021,5],[2022,4]];
}
// x0,y1
//   |
// x0,y0------x1,y0
function drawAxis(canvas,ctx,x0,y0,x1,y1,numOfData,data)
{
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth=1;    
    ctx.moveTo(x0+0.5,y0+0.5);
    ctx.lineTo(x0+0.5,y1+0.5);
    ctx.stroke();
    ctx.moveTo(x0+0.5,y0+0.5);
    ctx.lineTo(x1+0.5,y0+0.5);
    ctx.stroke();
    let delta=(x1-x0)*1.0/numOfData;
    ctx.textAlign="center";
    for(let i=1;i<=numOfData;i++)
    {
        ctx.moveTo(x0+i*delta+0.5,y0+0.5);
        ctx.lineTo(x0+i*delta+0.5,y0+8.5);
        ctx.stroke();
        ctx.fillText(data[i-1][0],x0+(i-0.5)*delta+0.5,y0+20.5);
    }
}
// dwq

// cz

// cz

// gff

// gff