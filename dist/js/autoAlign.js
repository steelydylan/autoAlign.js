/**
* autoAlign.js
* @version v1.0.0
* @link http://horicdesign.com
* @license MIT License
*/
(function($){
    var timer = false;
    var elements = [];
    var autoAlign = function() {
        for(var i = 0,n = elements.length; i < n; i++){
            var element = elements[i];
            var $ele = element.ele;
            var opt = element.opt;
            var width = (window.innerWidth||document.documentElement.clientWidth||0);
            $ele.css("minHeight","0px");
            if(width >= opt.columnsDesktop[0]){
                $ele.alignHeight(opt.columnsDesktop[1]);
            }else if(width >= opt.columnsDesktopSmall[0] && width < opt.columnsDesktop[0]){
                $ele.alignHeight(opt.columnsDesktopSmall[1]);
            }else if(width >= opt.columnsTablet[0] && width < opt.columnsDesktopSmall[0]){
                $ele.alignHeight(opt.columnsTablet[1]);
            }else{
                $ele.alignHeight(opt.columns);
            }
        }
    };
    $(window).resize(function(){
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(autoAlign, 200);
    });
    $.fn.extend({
        allAlignHeight:function(){
            var height = 0;
            var self = $(this);
            self.each(function(){
                if(height < $(this).outerHeight()){
                    height = $(this).outerHeight();
                }
            });
            height++;//min-heightは小数点を許すため
            self.each(function(){
                $(this).css("minHeight",height+"px");
            });
        },
        alignHeight:function(cols){
            if(!cols){
                this.allAlignHeight();
                return;
            }
            var heightArry = [];
            var self = $(this);
            var i = 0;
            self.each(function(){
                heightArry[i] = $(this).outerHeight();
                i++;
            });
            i = 0;
            self.each(function(){
                var t = i - i % cols;
                var h = heightArry[t];
                for(var j = 0; j < cols; j++){
                    if(h < heightArry[t+j]){
                        h = heightArry[t+j];
                    }
                }
                h++;//min-heightは小数点を許すため
                $(this).css("minHeight",h+"px");
                i++;
            });
        },
        autoAlign:function(opt){
            var opt = $.extend({
                columns:0,
                columnsTablet:[768,-1],
                columnsDesktopSmall:[992,-1],
                columnsDesktop:[1200,-1]
            },opt);
            opt.columnsTablet[1] = opt.columnsTablet[1] == -1 ? opt.columns : opt.columnsTablet[1];
            opt.columnsDesktopSmall[1] = opt.columnsDesktopSmall[1] == -1 ? opt.columnsTablet[1] : opt.columnsDesktopSmall[1];
            opt.columnsDesktop[1] = opt.columnsDesktop[1] == -1 ? opt.columnsDesktopSmall[1] : opt.columnsDesktop[1];            
            elements.push({ele:$(this),opt:opt});
            autoAlign();
        }
    });
})(jQuery);