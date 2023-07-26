
class ColorBoard extends HTMLElement {
    constructor() {
        super();
        this.curColor = {
            h: 0,
            s: "100%",
            l: "50%",
            a: 1
        };
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(cb.content.cloneNode(true));
        const style = document.createElement('style');
        style.textContent = `
        * {
        margin: 0;
        padding: 0;
        user-select: none;
        --bg: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.4) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.4) 75%,
            rgba(0, 0, 0, 0.4)
          ),
          linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.4) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.4) 75%,
            rgba(0, 0, 0, 0.4)
          );
      }
      
      body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease;
      }
      
      .container {
        width: 100%;
        height: 195px;
        border: 1px solid grey;
      }
      
      .show {
        width: 100%;
        height: 25px;
        background: var(--bg);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
      }
      
      .rgb_value {
        width: 100%;
        height: 100%;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      
      .color_control {
        height: 140px;
        margin: 10px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .spectrum {
        width: 80%;
        height: 100%;
        position: relative;
      }
      
      canvas {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
      .color_cursor {
        width: 10px;
        height: 10px;
        background: #ccc;
        border-radius: 100%;
        box-sizing: border-box;
        position: absolute;
        pointer-events: none;
        border: 1px solid #eee;
        left: 0;
        top: 0;
      }
      
      .opacity {
        position: relative;
        width: 8%;
        height: 100%;
        background: var(--bg);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
        cursor: pointer;
      }
      
      .opacity_bg {
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      }
      
      .hue {
        position: relative;
        width: 8%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          hsl(0, 100%, 50%),
          hsl(60, 100%, 50%),
          hsl(120, 100%, 50%),
          hsl(180, 100%, 50%),
          hsl(240, 100%, 50%),
          hsl(300, 100%, 50%),
          hsl(360, 100%, 50%)
        );
        cursor: pointer;
      }
      
      .slide {
        width: 110%;
        height: 5px;
        border: 1px solid white;
        position: absolute;
        left: -2px;
        top: 0;
      }
      `
        shadow.appendChild(style);
    }
    connectedCallback() {

        const container = this.shadowRoot.children[0];
        const rgb_value = container.children[0].children[0];
        const opacity = container.children[1].children[1];
        const hue = container.children[1].children[2];
        const opaSlide = opacity.children[1];
        const hueSlide = hue.children[0];
        const spectrum = container.children[1].children[0];
        const canvas = spectrum.children[0];
        const cursor = spectrum.children[1];
        const ctx = canvas.getContext('2d');
        const speRect = canvas.getBoundingClientRect();
        // 颜色改变事件
        /*
        rgb_value.addEventListener("change",()=>{
            const event = new CustomEvent("change",{detail:this.innerHTML});
            console.log(this.innerHTML);
            this.dispatchEvent(event);
        })
        */

        //绘制色谱,初始色为红色
        this.drawSpectrum(canvas, '#f00', ctx);


        let isDraw = false;
        //鼠标在画布外
        canvas.onmouseout = () => (isDraw = false);
        //鼠标抬起
        container.onmouseup = () => (isDraw = false);
        //鼠标按下
        container.onmousedown = () => (isDraw = true);
        //鼠标移动
        container.onmousemove = (e) => {
            if (!isDraw) return;
            //通过鼠标位置计算滑块位置，然后计算比例修改透明度和色相值
            //计算透明度
            if (e.target === opacity || e.target.parentNode === opacity) {
                let y = e.pageY - opacity.getBoundingClientRect().top;
                if (y < 0) y = 0.1;
                if (y > opacity.offsetHeight) y = opacity.offsetHeight-5;
                opaSlide.style.top = y + "px";
                this.curColor.a = 1 - y / opacity.offsetHeight;
            }
            //颜色
            if (e.target === hue || e.target.parentNode === hue) {
                let y = e.pageY - hue.getBoundingClientRect().top;
                if (y < 0) y = 0.1;
                if (y > hue.offsetHeight) y = hue.offsetHeight-5;
                hueSlide.style.top = y + "px";
                this.curColor.h = (y / hue.offsetHeight) * 360;
               
                let temp_s=this.curColor.s;
                let temp_a=this.curColor.a;
                let temp_l=this.curColor.l;
                this.curColor.s="100%";
                this.curColor.a=1;
                this.curColor.l="50%";
                this.drawSpectrum(canvas, tinycolor(this.curColor), ctx);
                this.curColor.s=temp_s;
                this.curColor.a=temp_a;
                this.curColor.l=temp_l;
            }

            if (e.target === spectrum || e.target.parentNode === spectrum) {
                //通过x，y在画布上的比例计算颜色的亮度和饱和度
                let x = e.offsetX;
                let y = e.offsetY;
                let r = cursor.offsetHeight;

                if (x < 0) x = 0;
                if (x > speRect.width - r) x = speRect.width - r;
                if (y < 0) y = 0.1;
                if (y > speRect.height - r) y = speRect.height - r;

                cursor.style.left = x + "px";
                cursor.style.top = y + "px";

                // from stackoverflow
                let hsvValue = 1 - y / speRect.height;
                let hsvSaturation = x / speRect.width;
                let lightness = (hsvValue / 2) * (2 - hsvSaturation);
                let saturation =
                    (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness - 1));

                this.curColor.l = lightness * 100 + "%";
                this.curColor.s = saturation * 100 + "%";
            }

            //change
            let color = tinycolor(this.curColor)["toRgbString"]();
            rgb_value.style.background = color;
            rgb_value.style.color = parseInt(this.curColor.l) >= 50 ? "black" : "white";
            rgb_value.innerHTML = color;
            const event = new CustomEvent("rgbchange",{detail:color});
            this.dispatchEvent(event);
            //console.log(event);
        };
        
    }
    drawSpectrum(canvas, color, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!color) color = '#f00';

        //填充color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //白色->灰色:从左到右渐变
        let whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //黑色->灰色:从下到上渐变
        let blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
customElements.define('color-board', ColorBoard);