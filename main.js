//CZ
const SINGLE_COLOR_FILL=1;
const GRADIENT_FILL=2;
const TEXTURE_FILL=3;
//CZ

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
    drawHistogram(canvas,ctx,x0,y0,delta,data,dh,dnum);
    // cz

    // gff
    var shapeOfPoint = 2;
    var sizeOfPoint = 10;
    drawLineChart(canvas,ctx,x0,y0,x1,y1,data.length,data,delta,first,shapeOfPoint,sizeOfPoint);
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
function drawHistogram(canvas,ctx,x0,y0,delta,data,dh,dnum,styleOfRectangle)
{
    //(x0,y0)为原点的横纵坐标
    //delta为两个点的间距
    //var color=["#FF8C00","#0000FF","#7FFF00","#FF0000"];
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
    for(var i=0;i<data.length;i++)
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
function drawLineChart(canvas,ctx,x0,y0,x1,y1,numOfData,data,delta,first,shapeOfPoint,sizeOfPoint){
    // 坐标轴的高（因为纵轴还没有刻度所以暂时先用这个定一下位置，之后可以删掉）
    const chartHeight = y1 - y0;

    ctx.imageSmoothingEnabled = true;
    const red = 239;
    const green = 100;
    const blue = 203;
    ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.lineWidth = 3;

    // 画线
    ctx.beginPath();
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y1 - (data[i][1] * chartHeight);
        if(i === 0){
            ctx.moveTo(x,200);
        }
        else{
            ctx.lineTo(x,200);
        }
    }
    ctx.stroke();

    // 画点
    for(let i = 0; i < numOfData; i++){
        const x = first + i * delta;
        const y = y1 - (data[i][1] * chartHeight);
        const red = 0;
        const green = 0;
        const blue = 250;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        // 圆
        if(shapeOfPoint === 1){
            ctx.beginPath();
            ctx.arc(x,200,sizeOfPoint,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
        }
        // 方
        else if(shapeOfPoint === 2){
            ctx.beginPath();
            ctx.rect(x-sizeOfPoint/2,200-sizeOfPoint/2,sizeOfPoint,sizeOfPoint);
            ctx.fill();
            ctx.stroke();
        }
    }
}
// gff