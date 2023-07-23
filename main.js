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
    canvas.height = 2*parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartheight').trim());
    canvas.width = 2*parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartwidth').trim());
    canvas.style.width = (canvas.width/2)+"px";
    canvas.style.height = (canvas.height/2)+"px";
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
    ctx.imageSmoothingEnabled = true;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth=2;    
    ctx.moveTo(x0,y0);
    ctx.lineTo(x0,y1);
    ctx.stroke();// y轴
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1+10,y0+0);
    ctx.stroke();// x轴
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.moveTo(x0,y1);
    ctx.lineTo(x0-6,y1+8);
    ctx.stroke();
    ctx.moveTo(x0,y1);
    ctx.lineTo(x0+6,y1+8);
    ctx.stroke();
    ctx.moveTo(x1+10,y0);
    ctx.lineTo(x1-8+10,y0+6);
    ctx.stroke();
    ctx.moveTo(x1+10,y0);
    ctx.lineTo(x1-8+10,y0-6);
    ctx.stroke();
    // 标签和刻度
    ctx.textAlign="center";
    ctx.beginPath();
    ctx.lineWidth=1;
    for(let i=1;i<=numOfData;i++)
    {
        ctx.moveTo(x0+i*delta,y0);
        ctx.lineTo(x0+i*delta,y0+8);
        ctx.stroke();
        ctx.fillText(data[i-1][0],first+(i-1)*delta,y0+20);
    }
}
// dwq

// cz

// cz

// gff

// gff