require(["require.config"], function () {
    require(["jquery", "header","url", "template", "footer"], function ($, header, url, template) {
        class listMoudle {
            constructor () {
                this.init ();
                this.priceCeil ();
                this.priceFloor ();
                this.volumeEvent ();
                this.bengEvent ();
            }
            init () {
                $.ajax({
                    url : url.baseUrl + "listmodule",
                    method : "GET",
                    datatype : "JSON",
                    success :  (res) => {
                        if(res.res_code === 1){
                            this.list = res.res_body.list;
                            var html = template("listBox", {list : this.list})
                            $(".product-list").html(html)
                        }
                    }
                })
            }
            //升序事件
            priceCeil () {
                $("#ceil").on("click", () => {
                    let list = this.list.sort((a,b) => {
                        return a.price -b.price
                    })
                    var html = template("listBox", {list})
                    $(".product-list").html(html)
                })
            }
            //降序事件
            priceFloor () {
                $("#floor").on("click", () => {
                    let list = this.list.sort((a,b) => {
                        return b.price -a.price
                    })
                    var html = template("listBox", {list})
                    $(".product-list").html(html)
                })
            }
            //销量事件
            volumeEvent () {
                $("#volume").on("click", () => {
                    let list = this.list.sort((a,b) => {
                        return b.volume -a.volume
                    })
                    var html = template("listBox", {list})
                    $(".product-list").html(html)
                })
            }
            //页面跳转
            bengEvent () {
                let _this = this;
                $(".product-list").on("click", "li", function () {
                   var id = $(this).attr("aId")
                   location.href = "/html/details.html" + "?id=" +id; 
                })
            }
        }
        return new listMoudle();
    })
})