function JobList(container){
    this.container = container;
}

JobList.prototype = {
    init:function(){
        this.createPage()
    },
    createPage:function () {
        this.container.text("joblist");
    }
}