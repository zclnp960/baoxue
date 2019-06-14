require(["require.config"], function () {
    require(["jquery", "header","url", "template", "footer", "slides", "islogin"], function ($, header, url, template) {
      class Index  {
        constructor () {
            this.carrousel();
            this.hotModule();
            this.newModule();
            this.floorsModule();
            this.lefthotEvent();
            this.righthotEvent ();
        }
        //游戏导航栏
        carrousel () {
            //请求数据
            $.ajax({
                url : url.baseUrl + "navlist",
                method : "GET",
                datatype : "json",
                success : function (res) {
                    //console.log(res);
                    if(res.res_code === 1){
                        let list = res.res_body.list;
                        //template 是模块引擎提供的方法，用它来渲染模板引擎
                        var html = template("carrouselList", {list});
                        $("#aidCarrouselr").html(html);
                    } 
                }
            })
            this.carrouselEvent ();
        }
        //游戏导航栏点击事件
        carrouselEvent () {
            $("#aidCarrouselr").on("click", ".iones", function() {
                var id = $(this).attr("aId");
                location.href = "/html/list.html" + "?id=" +id;
            })
        }
        //人气热销栏
        hotModule () {
            //请求数据
            $.ajax({
                url : url.baseUrl + "hotModule",
                method : "GET",
                datatype : "json",
                success : function (res) {
                    //console.log(res)
                    if(res.res_code === 1){
                        let list = res.res_body.list;
                        //console.log(list)
                        var html = template("lefthotImg", {list});
                        //console.log(html)
                        $("#imgOne").html(html);
                    }
                }
            })
            $.ajax({
                url : url.baseUrl + "hotModuletwo",
                method : "GET",
                datatype : "json",
                success : function (res) {
                    //console.log(res)
                    if(res.res_code === 1){
                        let list = res.res_body.list;
                        //console.log(list)
                        var html = template("righthotImg", {list});
                        //console.log(html)

                        $("#imgTwo").html(html);

                    }
                }
            })
        }
        //人气热销栏点击事件
        //左面
        lefthotEvent () {
            $("#hot-bottoms").on("click", ".left-text", function () {
                var html = this;
                var id = $(html).attr("aId")
                location.href = "/html/details.html" + "?id=" +id;
            })
        }
        //右面
        righthotEvent () {
            $("#imgTwo ").on("click", ".right-text", function () {
                var html = this;
                var id = $(html).attr("aId")
                //console.log(id)
                location.href = "/html/details.html" + "?id=" +id;
            })
        }
        //最新周边
        newModule () {
            $.ajax({
                url : url.baseUrl + "new",
                method : "GET",
                datatype : "json",
                success : function (res) {
                    //console.log(res)
                    if(res.res_code === 1){
                        let list = res.res_body.list;
                        //console.log(list)
                        var html = template("newTem", {list});
                        //console.log(html)
                        $("#newMain").html(html);
                    }
                }
            })
        }
        //周边往下内容
        floorsModule () {
            $.ajax({
                url : url.baseUrl + "floors",
                method : "GET",
                datatype : "json",
                success : function (res) {
                    if(res.res_code === 1){
                        let list = res.res_body.list;
                        var html = template("aidFloors", {list});
                        $(".indexFloors").html(html);
                    }
                }
            })
        }
      }
      return new Index();
    })
})
