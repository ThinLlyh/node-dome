function Reg(container){
    this.container = container;
    this.init();
}

Reg.template = `
<div class="sign-content">
        <div class="logo">
            <img src="http://www.mobiletrain.org/images/index/new_logo.png" alt="">
        </div>
        <form id="register-form">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1">用户名</span>
                <input type="text" class="form-control" placeholder="请输入用户名" id="reg-username" >
            </div>
            <div class="input-group">
                <span class="input-group-addon">密&nbsp;&nbsp;&nbsp;码</span>
                <input type="text" class="form-control" id="reg-password" placeholder="请输入密码">
            </div>
            <p class="text-info" id="toggle">已注册，立即登录</p>
            <button type="submit" class="btn btn-primary login-btn">注册</button>
        </form>
    </div>
`

Reg.prototype = {
    init: function () {
        this.create();
        this.toggleSign();
        this.registerClick();
    },
    create: function () {
        this.container.html("");
        this.el = $("<div></div>");
        this.el.append(Reg.template);
        this.container.append(this.el);
    },
    toggleSign: function () {
        this.el.find("#toggle").on("click", this.handleToggleSignCb.bind(this))
    },
    handleToggleSignCb() {
        new Page().createContent(true);
    },
    registerClick: function () {
        this.el.find("#register-form").on("submit", this.handleRegisterClickCb.bind(this))
    },
    handleRegisterClickCb(e) {
        e.preventDefault();
        var username = this.el.find("#reg-username").val();
        var password = this.el.find("#reg-password").val();

        // console.log(username,password);
        $.ajax({
            type: "post",
            url: "users/reg",
            data: {
                username,
                password
            },
            success: this.handleRegisterSucc.bind(this)
        })
    },
    handleRegisterSucc(data) {
        if(data.state){
            alert("注册成功！");
            new Page().createContent(true);
        }else{
            alert("注册失败！");
        }
    }

}