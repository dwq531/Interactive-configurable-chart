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
    
    
    // dwq
    var data = getData();// 存输入数据的二维数组
    var datamin = Math.max(data);
    var datamax = Math.min(data);
    var padding=150;
    // x0,y1
    //   |
    // x0,y0------x1,y0
    var x0=padding,y0=canvas.height-padding,x1=canvas.width-padding,y1=padding;
    var delta=(x1-x0)*1.0/data.length;// 点之间的距离
    var first=x0+delta/2; // 第一个点的位置
    var dh = (y0-y1-20)/6; // y轴刻度间隔像素
    var dnum = 1;// y轴单位刻度数值的增长
    var axisColor = "blue";
    drawAxis(canvas,ctx,x0,y0,x1,y1,axisColor);
    darwScaleLine(x0,y0,ctx,delta,data,first,dh,dnum);
    
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

function drawAxis(canvas,ctx,x0,y0,x1,y1,color)
{
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth=2;    
    ctx.moveTo(x0,y0);
    ctx.lineTo(x0,y1);
    ctx.stroke();// y轴
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1+20,y0);
    ctx.stroke();// x轴
    // 箭头
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.moveTo(x0,y1);
    ctx.lineTo(x0-12,y1+16);
    ctx.stroke();
    ctx.moveTo(x0,y1);
    ctx.lineTo(x0+12,y1+16);
    ctx.stroke();
    ctx.moveTo(x1+20,y0);
    ctx.lineTo(x1-16+20,y0+12);
    ctx.stroke();
    ctx.moveTo(x1+20,y0);
    ctx.lineTo(x1-16+20,y0-12);
    ctx.stroke();
    // 轴名称
    ctx.textAlign="center";
    ctx.font = "35px Microsoft YaHei";
    ctx.fillText("产量",x0-90,y1+50);
    ctx.fillText("（万吨）",x0-90,y1+100);
    ctx.fillText("年份",x1+50,y0+50);
}
function darwScaleLine(x0,y0,ctx,delta,data,first,dh,dnum,color)
{
    ctx.strokeStyle = color;
    ctx.textAlign="center";
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.font = "30px Microsoft YaHei";
    for(let i=1;i<=data.length;i++)
    {
        ctx.moveTo(x0+i*delta,y0);
        ctx.lineTo(x0+i*delta,y0+15);
        ctx.stroke();
        ctx.fillText(data[i-1][0],first+(i-1)*delta,y0+40);
    }
    for(let i=1;i<=6;i++)
    {
        ctx.moveTo(x0,y0-i*dh);
        ctx.lineTo(x0-10,y0-i*dh);
        ctx.stroke();
        ctx.fillText(i*dnum,x0-30,y0-i*dh+15);
    }
}
// dwq

// cz

// cz

// gff

// gff