var params =new Object();
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
    params.constructor();
    params.paint();
}
params.constructor = function()
{
    // 用canvas绘制图表
    this.canvas = document.getElementById("canvas");
    canvas.height = 2*parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartheight').trim());
    canvas.width = 2*parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chartwidth').trim());
    canvas.style.width = (canvas.width/2)+"px";
    canvas.style.height = (canvas.height/2)+"px";
    this.ctx = canvas.getContext('2d');
    
    
    // dwq
    this.data = new Array();// 存输入数据的二维数组
    this.getData();
    this.datamin = Math.max(this.data);
    this.datamax = Math.min(this.data);
    this.padding=150;
    // x0,y1
    //   |
    // x0,y0------x1,y0
    this.x0=this.padding,this.y0=this.canvas.height-this.padding,this.x1=this.canvas.width-this.padding,this.y1=this.padding;
    this.delta=(this.x1-this.x0)*1.0/this.data.length;// 点之间的距离
    this.first=this.x0+this.delta/2; // 第一个点的位置
    this.dh = (this.y0-this.y1-20)/6; // y轴刻度间隔像素
    this.dnum = 1;// y轴单位刻度数值的增长
    this.axisColor = "blue";
}
params.paint = function() 
{
    this.drawAxis();
    this.darwScaleLine();
    
    // dwq

    // cz
    this.drawHistogram();
    // cz

    // gff
    this.shapeOfPoint = 1;
    this.sizeOfPoint = 10;
    this.styleOfLine = 1;
    this.drawLineChart();
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
params.getData = function()
{
    let table = document.getElementById("dataInputTableBody");
    for(let i=0;i<table.children.length;i++)
    {
        let row = new Array(2);
        row[0] = table.children[i].children[0].innerHTML;
        row[1] = table.children[i].children[1].innerHTML;
        this.data.push(row);
    }
}

params.drawAxis = function()
{
    let ctx=this.ctx,x0=this.x0,y0=this.y0,y1=this.y1,x1=this.x1;
    ctx.strokeStyle = this.axisColor;
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
params.darwScaleLine = function()
{
    let ctx=this.ctx,x0=this.x0,y0=this.y0,y1=this.y1,x1=this.x1,delta=this.delta;
    ctx.strokeStyle = this.axisColor;
    ctx.textAlign="center";
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.font = "30px Microsoft YaHei";
    for(let i=1;i<=this.data.length;i++)
    {
        ctx.moveTo(x0+i*delta,y0);
        ctx.lineTo(x0+i*delta,y0+15);
        ctx.stroke();
        ctx.fillText(this.data[i-1][0],this.first+(i-1)*delta,y0+40);
    }
    for(let i=1;i<=6;i++)
    {
        ctx.moveTo(x0,y0-i*this.dh);
        ctx.lineTo(x0-10,y0-i*this.dh);
        ctx.stroke();
        ctx.fillText(i*this.dnum,x0-30,y0-i*this.dh+15);
    }
}
// dwq

// cz
params.drawHistogram = function()
{
    //(x0,y0)为原点的横纵坐标
    //delta为两个点的间距
    var ctx = this.ctx,x0 = this.x0,y0 = this.y0,delta = this.delta,dh = this.dh,dnum = this.dnum;
    var color=["#FF8C00","#0000FF","#7FFF00","#FF0000"];
    for(var i=0;i<this.data.length;i++)
    {
        ctx.beginPath();
        //var color = "#0000FF";//指定颜色
        ctx.fillStyle=color[i]; 

        //绘制柱状图
        var recWidth=delta/3;
        var height = this.data[i][1]/dnum*dh;
        var recX=x0+delta/3+delta*i;
        var recY=y0;
        ctx.fillRect(recX,recY,recWidth,-height);
        ctx.font="35px scans-serif";

        //绘制文本
        var text=this.data[i][1];
        var textWidth=ctx.measureText(text).width;//获取文本宽度
        ctx.fillText(text,recX+delta/6-textWidth/2,recY-height-10,recWidth);//显示数值，-5
        
    }
    //执行绘画
    ctx.stroke();
}
// cz

// gff
params.drawLineChart = function (){
    let ctx = this.ctx,y0 = this.y0,y1 = this.y1,dh = this.dh,dnum = this.dnum,data = this.data,numOfData = this.data.length,delta = this.delta,first = this.first,shapeOfPoint = this.shapeOfPoint,sizeOfPoint = this.sizeOfPoint;
    // 坐标轴的高（因为纵轴还没有刻度所以暂时先用这个定一下位置，之后可以删掉）
    const chartHeight = y1 - y0;
    
    ctx.imageSmoothingEnabled = true;

    // 画线
    ctx.beginPath();
    // 虚线
    if(styleOfLine === 1){
        ctx.setLineDash([5, 5]);
    }
    for(let i = 0; i < numOfData; i++){
        const red = 247;
        const green = 202;
        const blue = 201;
        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.lineWidth = 5;
        const x = first + i * delta;
        const y = y0-(data[i][1]/dnum*dh)*1.25;
        if(i === 0){
            ctx.moveTo(x,y);
        }
        else{
            ctx.lineTo(x,y);
        }
    }
    ctx.stroke();

    // 画点
    ctx.beginPath();
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y0-(data[i][1]/dnum*dh)*1.25;
        const red = 145;
        const green = 168;
        const blue = 208;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        // 圆
        if(shapeOfPoint === 1){
            ctx.beginPath();
            ctx.arc(x,y,sizeOfPoint,0,2*Math.PI);
            ctx.fill();
        }
        // 方
        else if(shapeOfPoint === 2){
            ctx.beginPath();
            ctx.rect(x-sizeOfPoint/2,y-sizeOfPoint/2,sizeOfPoint,sizeOfPoint);
            ctx.fill();
        }
    }

    // 占比文本
    var sum = 0;
    for(let i = 0; i < numOfData; i++){
        sum = sum + data[i][1];
    }
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y0-(data[i][1]/dnum*dh)*1.25;
        var ratio = data[i][1]/sum*100;
        var text = ratio.toFixed(2)+'%';
        ctx.fillText(text,x,y-30);    
    }
}
// gff