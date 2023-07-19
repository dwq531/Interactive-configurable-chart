window.onload = function ()
{
    var editorBoxs = document.getElementsByClassName('editor-box-title');
    //console.log(editorBoxs);
    for(let box of editorBoxs)
    {
        box.addEventListener("click",editor_box_clicked);
        //console.log(box);
    }
        
};
function editor_box_clicked()
{
    var parent = this.parentElement;
    var child=parent.children[1];
    if(child.className==='editor-box-hidden')
        child.className='editor-box-content';
    else
        child.className='editor-box-hidden';
};