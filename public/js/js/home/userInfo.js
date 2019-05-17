function UserInfo() {
    this.username = $("#username");
    this.logout = $("#js-logout");
}

UserInfo.prototype = {
    init: function () {
        this.modifyUsername();
        this.logoutClick();
    },
    modifyUsername: function () {
        if (Cookies.get('user')) {
            this.username.text(Cookies.get('user'));
        }
    },
    logoutClick:function(){
        this.logout.on("click", this.logoutCb.bind(this))
    },
    logoutCb() {
        if (this.username.text() == Cookies.get('user')) {
            if (confirm("您确定要退出吗?")) {
                Cookies.remove("user");
                Cookies.remove("token");
                if (!Cookies.get("token")) {
                    location.href = "http://localhost:3000/index.html";
                }
            }
        }
    }
}

new UserInfo().init();
