function Addjob(container) {
    this.container = container;
}

addJob.template = `
    <div class="addJob-body">
        <form id="addForm">
            <div class="form-group">
                <label for="job_add_name">职位名称</label>
                <input type="text" class="form-control" id="job_add_name" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
                <label for="job_add_price">薪资</label>
                <input type="text" class="form-control" id="job_add_price" placeholder="薪资范围">
            </div>
            <div class="form-group">
                <label for="job_add_ask">要求</label>
                <input type="text" class="form-control" id="job_add_ask" placeholder="招聘要求">
            </div>
            <div class="form-group">
                <label for="company_add_name">公司名称</label>
                <input type="text" class="form-control" id="company_add_name" placeholder="请输入公司名称">
            </div>
            <div class="form-group">
                <label for="logo_add">上传公司logo</label>
                <input type="file" id="logo_add" multiple>
            </div>
            <button type="submit" class="btn btn-primary">添加职位</button>
        </form>
    </div>`

Addjob.prototype = {
    init:function () {
        this.createPage();
        this.addjobClick();
    },
    createPage:function(){
        this.el = $("<div></div>");
        this.el.append(addJob.template)
        this.container.append(this.el);
    },
    addjobClick:function () {
        this.el.find("#addForm").on("submit",this.hanleAddjobCb.bind(this))
    },
    hanleAddjobCb(e){
        e.preventDefault();
        var jobName = this.el.find("#job_add_name");
        var jobPrice = this.el.find("#job_add_price");
        var jobAsk = this.el.find("#job_add_ask");
        var companyName = this.el.find("#company_add_name");
        var jobLogo = this.el.find("#logo_add");

        //如何用AJAX模拟form表单
        var formData = new FormData();
        // console.log(formData);
        formData.append("jobName",jobName.val())
        formData.append("jobPrice",jobPrice.val());
        formData.append("jobAsk",jobAsk.val());
        formData.append("companyName",companyName.val());
        formData.append("jobLogo",jobLogo[0].files[0]);
        //如何用data吧formData传入服务器中
        $.ajax({
            type:"post",
            url:"job/addjob",
            data:formData,
            cache:false,//缓存
            contentType:false,//类型
            processData:false,//data提交的一种方式
            success:this.handleAddSucc.bind(this)
        })
     },
    handleAddSucc(data){
        if(data.state){
            alert("添加成功");
            new Page().renderSwitch(1);
            new Page().tabbarActive(1);
        }else{
            alert("添加失败");
        }
    }
}