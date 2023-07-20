// 感谢歪门邪道 https://juejin.cn/post/7196843994030342200
class ClpMenu extends HTMLElement {

    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(tpl.content.cloneNode(true));
        let rownum = parseInt(this.getAttribute("rownum"));
        this.contentheight = "40px";// content展开时的高度
        if (rownum)// 加几行
        {
            for (let i = 2; i <= rownum; i++) {
                let row = document.createElement('div');
                row.setAttribute('class', "editor-box-row");
                let slot = document.createElement('slot');
                slot.setAttribute('name', "content" + i);
                row.appendChild(slot);
                var content = this.shadowRoot.children[0].children[1].children[0];
                console.log(content);
                content.appendChild(row);
            }
        }

        const style = document.createElement('style');
        style.textContent = `
        *{
            box-sizing:border-box;
        }
        .editor-box {
            margin-top: 20px;
            background: white;
            border: rgb(233, 233, 233) solid 1px;
        }
        
        .editor-box-hidden {
            display: grid;
            grid-template-rows: 0fr;
            transition: .3s;
            overflow: hidden;

        }
        
        .editor-box-content {
            display: grid;
            grid-template-rows: 1fr;
            transition: .3s;
            overflow: hidden;
        }
        .editor-box-bag{
            min-height: 0px;
            overflow:hidden;
        }
        
        .editor-box-title {
            padding: 5px 10px 5px 10px;
            height: 42px;
            width: 100%;
            font-size: 18px;
            font-weight: bold;
        }
        
        .editor-box-row {
            margin: 0px;
            padding: 5px 10px 5px 10px;
            width: 100%;
            font-size: 18px;
            border: rgb(233, 233, 233) solid 1px;
            border-width: 1px 0px 0px 0px;
        }`
        shadow.appendChild(style);
    };
    connectedCallback() {
        const title = this.shadowRoot.children[0].children[0];
        //console.log(title);
        title.addEventListener("click", this.editor_box_clicked);
        var content = this.shadowRoot.children[0].children[1];

    }
    editor_box_clicked() {
        var parent = this.parentElement;
        var child = parent.children[1];
        if (child.className === 'editor-box-hidden')
            child.className = 'editor-box-content';
        else
            child.className = 'editor-box-hidden';
    };

}
customElements.define('clp-menu', ClpMenu);
