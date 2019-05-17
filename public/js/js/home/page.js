function Page(){
    this.tabber = $(".tabbar>ul>li");
    this.addJob = $("#addJob");
    this.jobList = $("#jobList");
    this.content = $(".content>div");
    this.jobHome = $("#jobHome");
    this.init();
}

Page.prototype = {
    init:function () {
        this.tabberToggle();
    },
    tabberToggle:function(){
        this.tabber.on("click",this.handleTabbarCb.bind(this))
    },
    handleTabbarCb(e){
        $(e.target).addClass("active").siblings().removeClass("active");
        var index = $(e.target).index();

        switch(index){
            case 0:
                this.addJob.html("");
                this.jobList.html("");
                this.jobHome.html("<h2>首页</h2>");
                break;
            case 1:
                this.addJob.html("");
                this.jobHome.html("");
                new JobList(this.jobList).init();
                break;
            case 2:
                this.jobList.html("");
                this.jobHome.html("");
                new Addjob(this.addJob).init();
                break;
        }
    }
}
new Page();