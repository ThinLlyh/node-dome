function Page(){
    this.container = $("#sign");
}

Page.prototype = {
    init:function(){
        this.createContent();
    },
    createContent:function (flag) {
        if(!flag){
            this.reg = new Reg(this.container);
        }else{
            this.login = new Login(this.container);
        }
    }
}

new Page().init();