require(["require.config"], function () {
    require(["jquery", "header", "url", "template", "footer"], function ($, header, url, template) {
        class Details {
            constructor () {
                this.numModule ();
                this.init ();
                this.clickImg ();
            }
            //获取id请求数据
            init () {
                let id = location.search.slice(4);
                $.ajax({
                    url : url.baseUrl + "details?id=" + id,
                    method : "GET",
                    datatype : "json",
                    success : (res) => {
                        if(res.res_code === 1){
                            this.detailsModule (res.res_body.data);
                            this.leftImgModule (res.res_body.data);
                            //保存当前数据
                            this.shop = res.res_body.data;
                            //rap2返回的id重复，需要手动修改id
                            this.shop.id = id;
                            //console.log(this.shop.id)
                            //获取商品名称
                            var title = res.res_body.data[0].text.title;
                            $("#productName").html(title);
                        }
                    }
                })
            }
            //渲染左侧页面
            leftImgModule (data) {
                var html = template("leftImg", {data})
                $("#imageBox").html(html)
            }
            //渲染右侧页面
            detailsModule (data) {
                var html = template("descWrap", {data})
                $("#boxDesc").html(html)
            }
            //点击右侧图片切换
            clickImg () {
               $("#imageBox").on("click", "li", function () {
                    var b = $(this).children("img").attr("src")  
                    $("#leftOne").attr("src", b)
                    //$(this).attr("class", "we-li")
                    
               })
            }
            //数量加减
            numModule () {
                $("#plusBtn").on("click", () => {
                    $("#numText").val(Number($("#numText").val())+1)
                });
                $("#minusBtn").on("click", () => {
                    if(Number($("#numText").val()) === 0){
                        $("#numText").val(0)
                    }else{
                        $("#numText").val(Number($("#numText").val())-1)
                    }
                })
            }
        }
        return new Details ();
    })
})