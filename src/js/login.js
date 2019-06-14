require(["require.config"], function () {
    require(["jquery","url", "template","footer"], function ($, url, template) {
        class Login {
            constructor () {
                this.userpwdModule ();
                this.userModule ();
            }
            //账号与密码验证
            userpwdModule () {
                let _this = this;
                $("#loginbtn").on("click", () => {
                    _this.user = $("#inputuser").val();
                    //console.log(_this.user)
                    _this.pwd = $("#inputPassword3").val();
                    $.ajax({
                        url : url.baseUrl + "user",
                        method : "POST",
                        datatype : "json",
                        success : (res) => {
                            if(res.res_code === 1){
                                let rapuser = res.res_body.list[0].one.user == _this.user;
                                let rappassword = res.res_body.list[0].one.password == _this.pwd;
                                //console.log(rapuser)
                                if(rapuser) {
                                    let usercookie = sessionStorage.setItem("user", _this.user)
                                   if(rappassword) {
                                        if(confirm("即将跳转主页")){
                                            location.href = "/index.html";
                                        }
                                   }else{
                                        var html = $("<span>账号或密码错误</span>");
                                        $("#nobox").html(html);    
                                    }
                                }else{
                                    var html = $("<span id = 'nospan'>账号或密码错误</span>");
                                    $("#nobox").html(html);    
                                }
                            }
                        }
                    })
                    return false;
                })
                
            }
            //点击账号表单
            userModule () {
                $("#inputuser").on("click", () => {
                    $("#nospan").remove()
                })
            }
        }
        return new Login()
    })
})