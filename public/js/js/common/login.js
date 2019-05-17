function Login(container){
    this.container = container;
    this.init();
}

Login.template = `
<div class="sign-content">
        <div class="logo">
            <img src="http://www.mobiletrain.org/images/index/new_logo.png" alt="">
        </div>
        <form id="login-form">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1">用户名</span>
                <input type="text" class="form-control" placeholder="请输入用户名" id="login-username" >
            </div>
            <div class="input-group">
                <span class="input-group-addon">密&nbsp;&nbsp;&nbsp;码</span>
                <input type="text" class="form-control" id="login-password" placeholder="请输入密码">
            </div>
            <p class="text-info" id="toggle">立即注册</p>
            <button type="submit" class="btn btn-primary login-btn">登录</button>
        </form>
    </div>
`

Login.prototype = {
    init:function () {
        this.create();
        this.toggleSign();
        this.loginClick();
    },
    create:function () {
        this.container.html("");
        this.el = $("<div></div>");
        this.el.append(Login.template);
        this.container.append(this.el);
    },
    toggleSign:function () {
        this.el.find("#toggle").on("click",this.handleToggleSignCb.bind(this))
    },
    handleToggleSignCb(){
        new Page().createContent(false);
    },
    loginClick:function () {
        this.el.find("#login-form").on("submit",this.handleLoginCb.bind(this))
    },
    handleLoginCb(e){
        e.preventDefault();
        var username = this.el.find("#login-username").val();
        var password = this.el.find("#login-password").val();

        // console.log(username,password);
        $.ajax({
            type: "post",
            url: "users/login",
            data: {
                username,
                password
            },
            success: this.handleLoginSucc.bind(this)
        })
    },
    handleLoginSucc(data){
        if(data.state){
            alert("登录成功！");
            location.href="http://localhost:3000/html/home.html "
        }else{
            alert("登录失败！")
        }
    }
}