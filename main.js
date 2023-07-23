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
    var datamin=0;
    var datamax;
    
    // dwq
    var data = getData();// 存输入数据的二维数组
    var padding=100;
    // x0,y1
    //   |
    // x0,y0------x1,y0
    var x0=padding,y0=canvas.height-padding,x1=canvas.width-padding,y1=padding;
    var delta=(x1-x0)*1.0/data.length;// 点之间的距离
    var first=x0+delta/2; // 第一个点的位置
    drawAxis(canvas,ctx,x0,y0,x1,y1,data.length,data,delta,first);
    
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

function drawAxis(canvas,ctx,x0,y0,x1,y1,numOfData,data,delta,first)
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
    ctx.textAlign="center";
    for(let i=1;i<=numOfData;i++)
    {
        ctx.moveTo(x0+i*delta+0.5,y0+0.5);
        ctx.lineTo(x0+i*delta+0.5,y0+8.5);
        ctx.stroke();
        ctx.fillText(data[i-1][0],first+(i-1)*delta+0.5,y0+20.5);
    }
}
// dwq

// cz

// cz

// gff

// gff