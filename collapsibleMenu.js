class ClpMenu extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(tpl.content.cloneNode(true));
        const style = document.createElement('style');
        style.textContent=`
        *{
            box-sizing:border-box;
        }
        .editor-box {
            margin-top: 20px;
            background: white;
            border: rgb(233, 233, 233) solid 1px;
        }
        
        .editor-box-hidden {
            height: 0px;
            overflow: hidden;
        }
        
        .editor-box-content {
            height: fit-content;
            overflow: hidden;
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
            height: 40px;
            width: 100%;
            font-size: 18px;
            border: rgb(233, 233, 233) solid 1px;
            border-width: 1px 0px 0px 0px;
        }`
        shadow.appendChild(style);
    };
    connectedCallback() {
        const title=this.shadowRoot.children[0].children[0];
        console.log(title);
        title.addEventListener("click",editor_box_clicked);
    }
    editor_box_clicked() {
        var content = this.shadowRoot.children[0].children[1];
        if (child.className === 'editor-box-hidden')
            child.className = 'editor-box-content';
        else
            child.className = 'editor-box-hidden';
    };

}
customElements.define('clp-menu', ClpMenu);
