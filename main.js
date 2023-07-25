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
    
    // dwq
    // 输入表格相关事件
    let table = document.getElementsByClassName("dataInputContent");
    for(let content of table)
    {
        console.log(content);
        content.addEventListener("input",table_input);
    }
    let tableAdd = document.getElementById("tableAddButton");
    tableAdd.addEventListener("click",table_add_row);
    let tableRemove = document.getElementById("tableSubButton");
    tableRemove.addEventListener("click",table_remove_row);
    let mycb = document.getElementById("mycb");
    mycb.addEventListener("rgbchange",(e)=>{
        let test = document.getElementById("colorTest");
        test.style.background = e.detail;
    })
    let dataInputCheckBox = document.getElementsByClassName("dataInputCheckBox");
    for(let box of dataInputCheckBox)
    {
        box.checked=true;
        box.addEventListener("change",table_check);
    }
    // dwq
    
    // gff
    let styleOfLineSelector = document.getElementById('styleOfLineSelector');      
    styleOfLineSelector.addEventListener('change', changeStyleOfLine);
    let widthOfLineSelector = document.getElementById('widthOfLineSelector');      
    widthOfLineSelector.addEventListener('change', changeWidthOfLine);
    let colorOfLineSelector= document.getElementById("lineColorBoard");
    colorOfLineSelector.addEventListener("rgbchange",changeColorOfLine);

    let styleOfPointSelector = document.getElementById('styleOfPointSelector');      
    styleOfPointSelector.addEventListener('change', changeStyleOfPoint);
    let sizeOfPointSelector = document.getElementById('sizeOfPointSelector');      
    sizeOfPointSelector.addEventListener('change', changeSizeOfPoint);
    let colorOfPointSelector= document.getElementById("pointColorBoard");
    colorOfPointSelector.addEventListener("rgbchange",changeColorOfPoint);
    
    let styleOfRatioSelector = document.getElementById('styleOfRatioSelector');      
    styleOfRatioSelector.addEventListener('change', changeStyleOfRatio);
    let sizeOfRatioSelector = document.getElementById('sizeOfRatioSelector');      
    sizeOfRatioSelector.addEventListener('change', changeSizeOfRatio);
    let lineChartCheckbox = document.getElementById('lineChartCheckbox');
    lineChartCheckbox.addEventListener('change',changeLineChart);
    let colorOfRatioSelector= document.getElementById("ratioColorBoard");
    colorOfRatioSelector.addEventListener("rgbchange",changeColorOfRatio);
    let numInput = document.getElementById('numInput');
    numInput.addEventListener('input',changeNum);
    
    // 监听鼠标中轮滚动事件
    let canvasContainer = document.getElementById('chartContent');
    canvasContainer.addEventListener('wheel',handleWheel);
    // gff


    //cz
    let histogramCheckbox = document.getElementById('histogramCheckbox');
    histogramCheckbox.addEventListener('change',changeHistogram);
    let styleOfTextSelector = document.getElementById('styleOfTextSelector');      
    styleOfTextSelector.addEventListener('change', changeStyleOfText);
    let sizeOfTextSelector = document.getElementById('sizeOfTextSelector');      
    sizeOfTextSelector.addEventListener('change', changeSizeOfText);

    // 柱状图矩形侧边栏按钮添加事件
    let rectangleButs = document.getElementsByClassName("sidenavRectangle-button");
    for (let but of rectangleButs) {
        but.addEventListener("click", sidenavRectanglebut_clicked);
    }
    rectangleButs = document.getElementsByClassName("sidenavRectangle-button-clicked");
    for (let but of rectangleButs) {
        but.addEventListener("click", sidenavRectanglebut_clicked);
    }
    //改变矩形单色
    //打开单色界面
    let singleColorSelector_shift=document.getElementById("singleColorNav");
    singleColorSelector_shift.addEventListener("click",rectangleStyleToSingle);
    //变色
    let singleColorSelector_rgbchange= document.getElementById("singleColor");
    singleColorSelector_rgbchange.addEventListener("rgbchange",(e)=>{
        params.styleOfRectangle=1;
        params.singleColor = e.detail;
        params.repaint();
    })
    //渐变
    //打开渐变界面
    let gradientColorSelector_shift=document.getElementById("gradientColorNav");
    gradientColorSelector_shift.addEventListener("click",rectangleStyleToGradient);
    //变色
    let gradientColorSelector1_rgbchange= document.getElementById("gradientColor1");
    gradientColorSelector1_rgbchange.addEventListener("rgbchange",(e)=>{
        params.styleOfRectangle=2;
        params.gradientColor1 = e.detail;
        params.repaint();
    })
    let gradientColorSelector2_rgbchange= document.getElementById("gradientColor2");
    gradientColorSelector2_rgbchange.addEventListener("rgbchange",(e)=>{
        params.styleOfRectangle=2;
        params.gradientColor2 = e.detail;
        params.repaint();
    })
    //纹理填充
    //打开纹理界面
    let textureColorSelector_shift=document.getElementById("textureColorNav");
    textureColorSelector_shift.addEventListener("click",rectangleStyleToTexture);


    //cz
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
    
    //cz
    this.styleOfRectangle=1;
    // 柱状图是否显示
    this.histogramVisible = true;
    //矩形
    this.singleColor="#0000FF";
    this.gradientColor1="orange";
    this.gradientColor2="black";
    this.reader = new FileReader();

    
    // 文本
    this.styleOfText = "Arial";
    this.sizeOfText = 40;
    this.colorOfText = [145,168,208];

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
    
    this.axisColor = "gray";
    //dwq
    // gff
    // 线
    this.styleOfLine = "solidLine";
    this.widthOfLine = 10;
    this.colorOfLine = "#f7cac9";
    // 点
    this.styleOfPoint ="roundPoint";
    this.sizeOfPoint = 24;
    this.colorOfPoint = "#91a8d0";
    // 文本
    this.styleOfRatio = "Arial";
    this.sizeOfRatio = 40;
    this.colorOfRatio = "#91a8d0";
    this.decimalNum = 2;
    // 折线图是否显示
    this.lineChartVisible = true;
    // 初始缩放比例
    this.scale = 1.0; 
    // gff
}
params.paint = function() 
{
    //dwq
    this.drawAxis();
    this.darwScaleLine();
    // dwq

    // gff
    if(this.lineChartVisible === true){
        this.drawLineChart();
    }
    // gff

    // cz
    if(this.histogramVisible === true)
    {
        this.drawHistogram();
    }
    // cz
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
        let now = table.children[i];
        if(now.children[2].children[0].checked==false)
            continue;
        let row = new Array(2);
        row[0] = parseFloat(now.children[0].innerHTML);
        row[1] = parseFloat(now.children[1].innerHTML);
        if(!row[0])
            row[0]=0;
        if(!row[1])
            row[1]=0;
        this.data.push(row);
    }
    // 自适应
    // x轴
    if(this.data.length>=10)
    {
        let root = document.querySelector(':root');
        this.canvas.width = 1400 + (this.data.length-9)*100;
        canvas.style.width = (700 + (this.data.length-9)*50)+"px";
        root.style.setProperty('--chartwidth',this.canvas.width/2+'px');
        this.x1 = this.canvas.width-this.padding;
    }
    this.delta = (this.x1-this.x0)*1.0/this.data.length;
    this.first = this.x0+this.delta/2;
    let maxdata = this.data[0][1],mindata = this.data[0][1];
    // y轴
    for(let i=0;i<this.data.length;i++)
    {
        if(this.data[i][1]<mindata)
            mindata = this.data[i][1];
        if(this.data[i][1]>maxdata)
            maxdata = this.data[i][1];
    }
    let span = maxdata-mindata;
    if(span <= 10)
    {
        this.kedushu = span+3;
        this.dnum = 1;
    }
    else
    {
        this.dnum = ~~((span/8)/5)*5+5;// 刻度数为8时，dnum最接近的5的倍数
        this.kedushu = Math.floor(maxdata/this.dnum)-Math.floor(mindata/this.dnum)+2;
    }
    this.dh = (this.y0-this.y1-20)/(this.kedushu-1);
    this.mindata = mindata-this.dnum;
    if(this.mindata < 0)
        this.mindata = 0;
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
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //this.ctx.clearRect(0,0,params.canvas.width,params.canvas.height);
    this.paint();
}
// 输入表格事件
function table_input(event)
{
    console.log(this);
    params.getData();
    params.repaint();
}
// 表格加行事件
function table_add_row()
{
    let body = document.getElementById("dataInputTableBody");
    const child = body.children[body.children.length-1];
    const clonerow = child.cloneNode(true);
    clonerow.children[0].addEventListener("input",table_input);
    clonerow.children[1].addEventListener("input",table_input);
    clonerow.children[2].children[0].addEventListener("change",table_check);
    body.appendChild(clonerow);
    params.getData();
    params.repaint();
}
// 表格减行事件
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
// 表格筛选事件
function table_check()
{
    
    if(params.data.length == 1 && this.checked == false)
    {
        this.checked = true;
        alert("已经是最后一组数据，不能再减少了！");
        return;
    }
    params.getData();
    params.repaint();
}
// dwq

// cz
params.drawHistogram=function()
{
    //(x0,y0)为原点的横纵坐标
    //delta为两个点的间距
    let x0 = this.x0;
    let ctx = this.ctx;
    let y0 = this.y0;
    let dh = this.dh;
    let dnum = this.dnum;
    let data = this.data;
    let delta = this.delta;
    let mindata = this.mindata;

    // 矩形相关的参数
    let styleOfRectangle=this.styleOfRectangle;
    let singleColor=this.singleColor;
    let gradientColor1=this.gradientColor1;
    let gradientColor2=this.gradientColor2;
    
    // 文本相关的参数
    let styleOfText = this.styleOfText;
    let sizeOfText= this.sizeOfText;
    let colorOfText=this.colorOfText;
    
    //绘制矩形
    if(styleOfRectangle!=TEXTURE_FILL)
    {
        for(var i=0;i<data.length;i++)
        {
            ctx.beginPath();
        
            //绘制柱状图
            var recWidth=delta/3;
            var recHeight = (data[i][1]-mindata)/dnum*dh;
            var recX=x0+delta/3+delta*i;
            var recY=y0;

            if(styleOfRectangle==SINGLE_COLOR_FILL)//单色填充
            {
                ctx.fillStyle=singleColor; 
                ctx.fillRect(recX,recY,recWidth,-recHeight);
            }
            else if(styleOfRectangle==GRADIENT_FILL)//渐变填充
            {
                //var color1="rgba(240,250,40,1)";
                //var color2="rgba(82,67,192,1)";
                let grad=ctx.createLinearGradient(recX+recWidth, recY, recX+recWidth, recY-recHeight);
                grad.addColorStop(0,gradientColor2);//设置渐变颜色
                grad.addColorStop(1,gradientColor1);
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
        img.src = document.getElementById('image').src;//切换纹理样式
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
                let rect=new rectangle_diy(x0+delta/3+delta*i,y0,delta/3,(data[i][1]-mindata)/dnum*dh);
                rectangles.push(rect);
            }
            rectangles.forEach(rect => {
                ctx.beginPath();
                ctx.rect(rect.x, rect.y, rect.width, -rect.height);
        
                // 创建纹理填充样式
                const pattern = ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
                ctx.fill();
            });
        }
    }

    
    
    // //绘制文字
    for(var i=0;i<this.data.length;i++)
    {
        ctx.beginPath();
        
        var recWidth=delta/3;
        var recHeight = (data[i][1]-mindata)/dnum*dh;
        var recX=x0+delta/3+delta*i;
        var recY=y0;

        ctx.font = `${sizeOfText}px ${styleOfText}`;
        ctx.fillStyle = `rgb(${colorOfText[0]}, ${colorOfText[1]}, ${colorOfText[2]})`;
        var text=data[i][1];
        //var textWidth=ctx.measureText(text).width;//获取文本宽度
        //ctx.fillText(text,recX+delta/6-textWidth/2,recY-recHeight-10,recWidth);//显示数值，-5
        ctx.fillText(text,recX+delta/6,recY-recHeight-10);//显示数值，-5

    }
 
}
//切换至单色模式
function rectangleStyleToSingle()
{
    params.styleOfRectangle=1;
    params.repaint();
}
//切换至渐变模式
function rectangleStyleToGradient()
{
    params.styleOfRectangle=2;
    params.repaint();
}
//切换至纹理模式
function rectangleStyleToTexture()
{
    params.styleOfRectangle=3;
    params.repaint();
}
//预览纹理图片
function selectImage(file) {
    if (!file.files || !file.files[0]) {
        return;
    }
    params.reader = new FileReader();
    params.reader.onload = function (evt) {
        document.getElementById('image').src = evt.target.result;
        params.repaint();
    }
    params.reader.readAsDataURL(file.files[0]);
}

// 文本样式更改事件
function changeStyleOfText(){
    params.styleOfText = styleOfTextSelector.value;
    params.repaint();
}
// 文本大小更改事件
function changeSizeOfText(){
    params.sizeOfText = sizeOfTextSelector.value;
    params.repaint();
}
// 文本颜色更改事件

//柱状图隐藏更改事件
function changeHistogram(){
    if(histogramCheckbox.checked){
        params.histogramVisible = false;
        params.repaint();
    }
    else{
        params.histogramVisible = true;
        params.repaint();
    }
}
//柱状图矩形侧边栏按钮点击事件
function sidenavRectanglebut_clicked() {
    let buts = document.getElementsByClassName("sidenavRectangle-button-clicked");
    for (let but of buts) {
        but.className = "sidenavRectangle-button";
    }
    this.className = "sidenavRectangle-button-clicked";
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
    let mindata = this.mindata;

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
    let decimalNum = this.decimalNum;
    
    ctx.imageSmoothingEnabled = true;
    // 画线
    ctx.beginPath();
    
    if(styleOfLine === "dottedLine"){
        ctx.setLineDash([20, 10]);
        for(let i = 0; i < numOfData; i++){
            ctx.strokeStyle = colorOfLine;
            ctx.lineWidth = widthOfLine;
            const x = first + i * delta;
            const y = y0-((data[i][1]-mindata)/dnum*dh)*1.2;
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
            ctx.strokeStyle = colorOfLine;
            ctx.lineWidth = widthOfLine;
            const x = first + i * delta;
            const y = y0-((data[i][1]-mindata)/dnum*dh)*1.2;
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
        const y = y0-((data[i][1]-mindata)/dnum*dh)*1.2;
        ctx.fillStyle = colorOfPoint;
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
        const y = y0-((data[i][1]-mindata)/dnum*dh)*1.2;
        var ratio = data[i][1]/sum*100;
        var text = ratio.toFixed(decimalNum)+'%';
        ctx.font = `${sizeOfRatio}px ${styleOfRatio}`;
        ctx.fillStyle = colorOfRatio;
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
function changeColorOfLine(event){
    params.colorOfLine = event.detail;
    params.repaint();
}
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
function changeColorOfPoint(event){
    params.colorOfPoint = event.detail;
    params.repaint();
}

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
function changeColorOfRatio(event){
    params.colorOfRatio = event.detail;
    params.repaint();
}

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
// 保留小数位数更改事件
function changeNum(event){
    params.decimalNum =  parseInt(event.target.value);
    params.repaint();
}

// 鼠标中轮滚动响应
function handleWheel(event){
    let canvasContainer = document.getElementById('chartContent');
    let canvas = document.getElementById('canvas');
    let chart = document.getElementById('chart');    
    const scaleStep = 0.1; // 缩放步长

    event.preventDefault(); // 阻止页面滚动

    // 根据滚轮的deltaY值判断滚动方向
    if (event.deltaY < 0) {
        params.scale += scaleStep; // 向前滚动，增大缩放比例，放大
    } 
    else if(event.deltaY > 0){
        params.scale -= scaleStep; // 向后滚动，减小缩放比例，缩小
    }
    // 缩放比例限制
    if (params.scale < 0.5) {
        params.scale = 0.5;
    }
    if (params.scale > 1.8) {
        params.scale = 1.8;
    }

    // 计算Canvas缩放后的宽高
    const canvasWidth = 700 * params.scale;
    const canvasHeight = 500 * params.scale;
    
    // 外部div缩放
    canvasContainer.style.transform = `scale(${params.scale})`;
    canvasContainer.style.transformOrigin = '50% 50%';

    // 设置Canvas的宽高以保持相对大小
    params.canvas.width = canvasWidth * 2;
    params.canvas.height = canvasHeight * 2;
    params.canvas.style.width = canvasWidth;
    params.canvas.style.height = canvasHeight;
     // 清空画布
    params.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // canvas缩放
    params.ctx.save();
    params.ctx.scale(params.scale, params.scale);

    // 设置canvasContainer的位置以确保图在中心
    // 中心点的坐标感觉应该是用chart的长宽动态确定的，但是不知道为什么会乱飞所以先设成固定的、、、
    const centerX = chart.clientWidth/2; // 中心点x坐标
    const centerY = chart.clientHeight/2; // 中心点y坐标
    const containerX = centerX - parseFloat(params.canvas.style.width)/2;
    const containerY = centerY - parseFloat(params.canvas.style.height)/2;
    canvasContainer.style.left = `${containerX}px`;
    canvasContainer.style.top = `${containerY}px`;

    params.repaint();
    params.ctx.restore();
}
// gff