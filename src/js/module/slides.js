//轮播图事件
define(["jquery"], function($) {
    class slidesBanner {
        constructor () {
          this.init();
          this.slides();
          this.goNext();
          this.goPrev();
          this.buttonEvent();
          this.bootUp();
          this.enterEvent();
          this.leaveEvent();
        }
        init () {
            //轮播图有关
            this.$slides_container = $(".slides-container"),
            this.$ul = this.$slides_container.children("ul"),
            this.$imgs = this.$ul.children(),
            this.$ol = this.$slides_container.children(".ol-list"),
            this.$imgwidth = this.$imgs.eq(0).width(),
            this.$len = this.$imgs.length,
            this.index = 0,     //记录当前图片
            this.btn = [],      //存放ol里面的li
            this.flag = false,  //代表运动状态，默认为false，用来解决bug的，当多次点击goNext或者goPrev时的bug
            this.timer = "";
            
        }
      // 追加图片和创建ol
      slides () {
          //追加一张图，计算ul宽度，创建ol
          this.$imgs.eq(0).clone().appendTo(this.$ul);
          //计算宽度
          this.$ul.css({"width" : this.$imgwidth * (this.$len + 1)});
          //创建ol
          for(var i = 0; i<this.$len; i++){
            this.btn.push($("<li>").addClass(i === 0? "ac" : "").appendTo(this.$ol));
          }
      }
      //往右运动点击事件
      goNext () {
        let _this = this;
        //处于非运动状态，才让运动
        if(!_this.flag){
          $("#goNext").on("click", function right () {
            //_this.index++;
            if(++_this.index >= _this.$len){
                _this.index = 0;
                //允许运动到追加的那张图上，但是运动完后要瞬间回到第0张
                _this.flag = true;  //开始运动了要变成true
                _this.$ul.animate({"left" : -_this.$len * _this.$imgwidth}, () =>{
                    //运动完后的的回调函数
                    _this.$ul.css("left" , 0);
                    _this.flag = false   //运动结束后变成false
                });
            }else{
                _this.$ul.animate({"left" : -_this.index * _this.$imgwidth}, () => {
                  _this.flag = false;
                });
            }
            //下方按钮添加和去掉ac
            _this.btn[_this.index].addClass("ac").siblings().removeClass("ac");
            //console.log(_this.btn[0],_this.index,$(_this.btn).eq(_this.index))
          })
        }
        
      }
      //往左运动
      goPrev () {
        if(!this.flag){
          this.flag = true;
          $("#goPrev").on("click", () => {
            if(--this.index < 0){
              this.$ul.css({"left" : -this.$len * this.$imgwidth});
              this.index = this.$len - 1;
            }
            this.$ul.animate({"left" : -this.index * this.$imgwidth}, () => {
              this.flag = false;
            });
            this.btn[this.index].addClass("ac").siblings().removeClass("ac");
          })
        }
      }
      //按钮点击事件
      buttonEvent () {
        let _this = this;
        _this.btn.forEach(function (ele, index) {
          ele.on("click", function () {
              _this.index = index;
              _this.$ul.animate({"left" : -_this.index * _this.$imgwidth});
              _this.btn[_this.index].addClass("ac").siblings().removeClass("ac"); 
          })       
        })
      }
      //自动
      bootUp () {
        this.timer = setInterval(() => {
         $("#goNext").trigger("click");
        }, 2000);
      }
      //移入事件
      enterEvent () {
        this.$slides_container.on("mouseenter", () => {
          clearInterval(this.timer);
        })
      }
      //移出事件
      leaveEvent () {
        this.$slides_container.on("mouseleave", () => {
          this.bootUp ()
        })
      }
    }
    return new slidesBanner();
});