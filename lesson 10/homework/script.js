class Options{
    constructor(height, width, bg, fontSize, textAlign){
        this.height=height;
        this.width=width;
        this.bg=bg; 
        this.fontSize=fontSize; 
        this.textAlign=textAlign;
    }
    newDiv(text){
        let div=document.createElement('div');
        div.style.cssText = `height: ${this.height};
                            width : ${this.width};
                            background:${this.bg};
                            font-size:${this.fontSize};
                            text-Align:${this.textAlign};`;
        div.textContent=text;
        return div;
    }
}
 let hello = new Options('40px','200px','yellow','20px','center');
 document.body.appendChild(hello.newDiv(' Привет мир!')) ;