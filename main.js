//CZ
const SINGLE_COLOR_FILL=1;
const GRADIENT_FILL=2;
const TEXTURE_FILL=3;
//CZ

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
    // dwq
    let table = document.getElementById("dataInputTable");
    table.addEventListener("input",table_input);
    let tableAdd = document.getElementById("tableAddButton");
    tableAdd.addEventListener("click",table_add_row);
    let tableRemove = document.getElementById("tableSubButton");
    tableRemove.addEventListener("click",table_remove_row);
    // dwq

    // gff
    let styleOfLineSelector = document.getElementById('styleOfLineSelector');      
    styleOfLineSelector.addEventListener('change', changeStyleOfLine);
    let widthOfLineSelector = document.getElementById('widthOfLineSelector');      
    widthOfLineSelector.addEventListener('change', changeWidthOfLine);
    let styleOfPointSelector = document.getElementById('styleOfPointSelector');      
    styleOfPointSelector.addEventListener('change', changeStyleOfPoint);
    let sizeOfPointSelector = document.getElementById('sizeOfPointSelector');      
    sizeOfPointSelector.addEventListener('change', changeSizeOfPoint);
    let styleOfRatioSelector = document.getElementById('styleOfRatioSelector');      
    styleOfRatioSelector.addEventListener('change', changeStyleOfRatio);
    let sizeOfRatioSelector = document.getElementById('sizeOfRatioSelector');      
    sizeOfRatioSelector.addEventListener('change', changeSizeOfRatio);
    let lineChartCheckbox = document.getElementById('lineChartCheckbox');
    lineChartCheckbox.addEventListener('change',changeLineChart);
    // gff
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
    
    //cz
    this.styleOfRectangle=1;

    //cz
    
    // dwq
    // x0,y1
    //   |
    // x0,y0------x1,y0
    this.padding=150;
    this.x0=this.padding,this.y0=this.canvas.height-this.padding,this.x1=this.canvas.width-this.padding,this.y1=this.padding;
    this.delta;// 点之间的距离
    this.first; // 第一个点的位置
    this.mindata;// 最小刻度
    this.dnum;// y轴单位刻度数值的增长
    this.dh; // y轴刻度间隔像素
    this.data = new Array();// 存输入数据的二维数组
    this.kedushu;// 刻度数
    this.getData();
    
    this.axisColor = "blue";
    //dwq
    // gff
    // 线
    this.styleOfLine = "solidLine";
    this.widthOfLine = 10;
    this.colorOfLine = [247,202,201];
    // 点
    this.styleOfPoint ="roundPoint";
    this.sizeOfPoint = 24;
    this.colorOfPoint = [145,168,208];
    // 文本
    this.styleOfRatio = "Arial";
    this.sizeOfRatio = 40;
    this.colorOfRatio = [145,168,208];
    // 折线图是否显示
    this.lineChartVisible = true;
    // gff
}
params.paint = function() 
{
    //dwq
    this.drawAxis();
    this.darwScaleLine();
    // dwq

    // cz
    this.drawHistogram();
    // cz

    // gff
    if(this.lineChartVisible === true){
        this.drawLineChart();
    }
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
    this.data = [];
    // 读数据
    for(let i=0;i<table.children.length;i++)
    {
        let row = new Array(2);
        row[0] = parseFloat(table.children[i].children[0].innerHTML);
        row[1] = parseFloat(table.children[i].children[1].innerHTML);
        this.data.push(row);
    }
    // 自适应
    this.delta = (this.x1-this.x0)*1.0/this.data.length;
    this.first = this.x0+this.delta/2;
    let maxdata = this.data[0][1],mindata = this.data[0][1];
    for(let i=0;i<this.data.length;i++)
    {
        if(this.data[i][1]<mindata)
            mindata = this.data[i][1];
        if(this.data[i][1]>maxdata)
            maxdata = this.data[i][1];
    }
    let span = maxdata-mindata;
    if(span < 10)
    {
        this.kedushu = span+3;
        this.dnum = 1;
    }
    else
    {
        this.dnum = ~~((span/8)/5)*5+5;// 刻度数为8时，dnum最接近的5的倍数
        this.kedushu = span/this.dnum + 3;
    }
    this.dh = (this.y0-this.y1-20)/(this.kedushu-1);
    this.mindata = mindata-this.dnum;
    if(this.mindata < 0)
        this.mindata = 0;
    console.log(this.mindata);
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
    ctx.fillStyle = "black";
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
    let now = this.mindata;
    for(let i=1;i<= this.kedushu;i++)
    {
        ctx.moveTo(x0,y0-(i-1)*this.dh);
        ctx.lineTo(x0-10,y0-(i-1)*this.dh);
        ctx.stroke();
        ctx.fillText(now,x0-30,y0-(i-1)*this.dh+15);
        now += this.dnum;
    }
}
params.repaint = function()
{
    this.ctx.clearRect(0,0,params.canvas.width,params.canvas.height);
    this.paint();
}
// 输入表格事件
function table_input(event)
{
    params.getData();
    params.repaint();
}
// 表格加行事件
function table_add_row()
{
    let body = document.getElementById("dataInputTableBody");
    let newrow = document.createElement('tr');
    let year = document.createElement('td');
    year.innerHTML = 2023;
    year.setAttribute('contenteditable',true);
    newrow.appendChild(year);
    let num = document.createElement('td');
    num.innerHTML = body.children[0].children[1].innerHTML;
    num.setAttribute('contenteditable',true);
    newrow.appendChild(num);
    body.appendChild(newrow);
    params.getData();
    params.repaint();
}
function table_remove_row()
{
    let body = document.getElementById("dataInputTableBody");
    if(body.children.length <= 1)
    {
        alert("行数已达最少，不能再减少行数了！");
        return;
    }
    let row = body.children[body.children.length-1];
    row.remove();
    params.getData();
    params.repaint();
}
// dwq

// cz
params.drawHistogram=function()
{
    //(x0,y0)为原点的横纵坐标
    //delta为两个点的间距
    var ctx = this.ctx,x0 = this.x0,y0 = this.y0,delta = this.delta,dh = this.dh,dnum = this.dnum,styleOfRectangle=this.styleOfRectangle,data=this.data;
    styleOfRectangle=3;
    //绘制矩形
    if(styleOfRectangle!=TEXTURE_FILL)
    {
        for(var i=0;i<data.length;i++)
        {
            ctx.beginPath();
        
            //绘制柱状图
            var recWidth=delta/3;
            var recHeight = data[i][1]/dnum*dh;
            var recX=x0+delta/3+delta*i;
            var recY=y0;

            if(styleOfRectangle==SINGLE_COLOR_FILL)//单色填充
            {
                var color = "#0000FF";
                ctx.fillStyle=color; 
                ctx.fillRect(recX,recY,recWidth,-recHeight);
            }
            else if(styleOfRectangle==GRADIENT_FILL)//渐变填充
            {
                var color1="rgba(240,250,40,1)";
                var color2="rgba(82,67,192,1)";
                let grad=ctx.createLinearGradient(recX+recWidth, recY, recX+recWidth, recY-recHeight);
                grad.addColorStop(0, color1);//设置渐变颜色
                grad.addColorStop(1, color2);
                ctx.fillStyle = grad;//设置fillStyle为当前的渐变对象
                ctx.fillRect(recX,recY,recWidth,-recHeight);//绘制渐变图形
            }

            //执行绘画
            ctx.stroke();
        }
    }
    else if(styleOfRectangle==TEXTURE_FILL)//纹理填充
    {
        var img = new Image();
        img.src = "./img/DK.png";//切换纹理样式
        img.onload = function(){
            class rectangle_diy {
                constructor(x,y,width,height) {
                  this.x = x;
                  this.y = y;
                  this.width=width;
                  this.height=height;
                }
              }
            const rectangles = [];
            for(let i=0;i<data.length;i++)
            {
                const rect=new rectangle_diy(x0+delta/3+delta*i,y0,delta/3,-data[i][1]/dnum*dh);
                rectangles.push(rect);
            }
            rectangles.forEach(rect => {
                // 开始绘制一个矩形路径
                ctx.beginPath();
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
        
                // 创建纹理填充样式
                const pattern = ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
        
                //绘制矩形
                ctx.fill();
            });
        }
    }

    //绘制文字
    for(var i=0;i<this.data.length;i++)
    {
        ctx.beginPath();
        
        var recWidth=delta/3;
        var recHeight = data[i][1]/dnum*dh;
        var recX=x0+delta/3+delta*i;
        var recY=y0;

        var color = "#0000FF";
        ctx.fillStyle=color; 
        ctx.font="35px scans-serif";
        var text=data[i][1];
        var textWidth=ctx.measureText(text).width;//获取文本宽度
        ctx.fillText(text,recX+delta/6-textWidth/2,recY-recHeight-10,recWidth);//显示数值，-5

    }
}
// cz

// gff
params.drawLineChart = function (){
    let ctx = this.ctx;
    let y0 = this.y0;
    let dh = this.dh;
    let dnum = this.dnum;
    let data = this.data;
    let numOfData = this.data.length;
    let delta = this.delta;
    let first = this.first;
    let minidata = this.mindata;

    // 线相关的参数
    let styleOfLine = this.styleOfLine;
    let widthOfLine = this.widthOfLine;
    let colorOfLine = this.colorOfLine;
    // 点相关的参数
    let styleOfPoint = this.styleOfPoint
    let sizeOfPoint = this.sizeOfPoint;
    let colorOfPoint = this.colorOfPoint;
    // 文本相关的参数
    let styleOfRatio = this.styleOfRatio;
    let sizeOfRatio = this.sizeOfRatio;
    let colorOfRatio = this.colorOfRatio;
    
    ctx.imageSmoothingEnabled = true;
    // 画线
    ctx.beginPath();
    
    if(styleOfLine === "dottedLine"){
        ctx.setLineDash([20, 10]);
        for(let i = 0; i < numOfData; i++){
            ctx.strokeStyle = `rgb(${colorOfLine[0]}, ${colorOfLine[1]}, ${colorOfLine[2]})`;
            ctx.lineWidth = widthOfLine;
            const x = first + i * delta;
            const y = y0-((data[i][1]-minidata)/dnum*dh)*1.2;
            if(i === 0){
                ctx.moveTo(x,y);
            }
            else{
                ctx.lineTo(x,y);
            }
        }
        ctx.stroke();
        // 将线段样式改回实线
        ctx.setLineDash([]);
    }
    else if(styleOfLine === "solidLine"){
        for(let i = 0; i < numOfData; i++){
            ctx.strokeStyle = `rgb(${colorOfLine[0]}, ${colorOfLine[1]}, ${colorOfLine[2]})`;
            ctx.lineWidth = widthOfLine;
            const x = first + i * delta;
            const y = y0-((data[i][1]-minidata)/dnum*dh)*1.2;
            if(i === 0){
                ctx.moveTo(x,y);
            }
            else{
                ctx.lineTo(x,y);
            }
        }
        ctx.stroke();
    }

    // 画点
    ctx.beginPath();
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y0-((data[i][1]-minidata)/dnum*dh)*1.2;
        ctx.fillStyle = `rgb(${colorOfPoint[0]}, ${colorOfPoint[1]}, ${colorOfPoint[2]})`;
        // 圆
        if(styleOfPoint === "roundPoint"){
            ctx.beginPath();
            ctx.arc(x,y,sizeOfPoint/2,0,2*Math.PI);
            ctx.fill();
        }
        // 方
        else if(styleOfPoint === "squarePoint"){
            ctx.beginPath();
            ctx.rect(x-sizeOfPoint/2,y-sizeOfPoint/2,sizeOfPoint,sizeOfPoint);
            ctx.fill();
        }
    }

    // 占比文本
    ctx.beginPath();
    var sum = 0;
    for(let i = 0; i < numOfData; i++){
        sum = sum + parseFloat(data[i][1]);
    }
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y0-((data[i][1]-minidata)/dnum*dh)*1.2;
        var ratio = data[i][1]/sum*100;
        var text = ratio.toFixed(2)+'%';
        ctx.font = `${sizeOfRatio}px ${styleOfRatio}`;
        ctx.fillStyle = `rgb(${colorOfRatio[0]}, ${colorOfRatio[1]}, ${colorOfRatio[2]})`;
        ctx.fillText(text,x,y-30);    
    }
}

// 线段样式更改事件
function changeStyleOfLine(){
    params.styleOfLine = styleOfLineSelector.value;
    params.repaint();
}
// 线段粗细更改事件
function changeWidthOfLine(){
    params.widthOfLine = widthOfLineSelector.value;
    params.repaint();
}
// 线段颜色更改事件

// 点样式更改事件
function changeStyleOfPoint(){
    params.styleOfPoint = styleOfPointSelector.value;
    params.repaint();
}
// 点大小更改事件
function changeSizeOfPoint(){
    params.sizeOfPoint = sizeOfPointSelector.value;
    params.repaint();
}
// 点颜色更改事件

// 文本样式更改事件
function changeStyleOfRatio(){
    params.styleOfRatio = styleOfRatioSelector.value;
    params.repaint();
}
// 文本大小更改事件
function changeSizeOfRatio(){
    params.sizeOfRatio = sizeOfRatioSelector.value;
    params.repaint();
}
// 文本颜色更改事件

// 折线图隐藏更改事件
function changeLineChart(){
    if(lineChartCheckbox.checked){
        params.lineChartVisible = false;
        params.repaint();
    }
    else{
        params.lineChartVisible = true;
        params.repaint();
    }
}
// gff