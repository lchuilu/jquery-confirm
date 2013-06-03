/*
@author :  lchuilu@gmail.com
@sample:
    $("#confirmWithCustomActions").confirm({
            msg: '确定要删除么？',
            before:function(e){
                
            },
            onOK: function(e) {
                
            },
            onCancel: function(e) {
                
            }
        });
*/


(function ($) {

    $.fn.confirm = function (options) {
		return this.each(function () {
			var opts;
			var shouldDisplayDialog = true;
            var button = $(this);
            var defaults = {
				msg: "确定要删除么?",
                onOK: function (target) {
                    shouldDisplayDialog = false;
                    //button.click(target);
					shouldDisplayDialog = true;
                },
                checkConditions: function () {
                    return true;
                }
            }

            if (typeof options != "object") {
                opts = $.extend({}, defaults);
            } else {
                opts = $.extend({}, defaults, options);
            }

            $(this).click(function (e) {
                if (shouldDisplayDialog) {
                    if (opts.checkConditions.call()) {
                        if (opts.before != undefined) {
                            opts.before(e);
                            if (opts.before(e) != false ) {
                                showConfirm(e);
                            };
                        }else{
                            showConfirm(e);
                        };
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });
            var showConfirm =  function(e) {
                var target = $(e.target);
                var html = '';
                $('#confirmDiv').remove();
                html+= '<p class="msg">' + opts.msg + '</p>';
                html += '<span class="arrow"><i class="a1">◆</i><i class="a2">◆</i></span><p class="ops"><span class="ok">确定</span> | <span class="cancel">取消</span></p>';
                $('<div id="confirmDiv" />')
                    .append(html)
                    .css({'left':target.offset().left +target.width()/2 -27,'top':target.offset().top+25,'display':'none','position':'absolute'})
                    .appendTo('body')
                    .fadeIn();
                var closepop = setTimeout(function(){
                    $('#confirmDiv').remove();
                },3000)
                $('body').delegate('#confirmDiv','mouseenter',function(){
                    clearTimeout(closepop);
                })
                $('body').delegate('#confirmDiv','mouseleave',function(){
                    closepop = setTimeout(function(){
                        $('#confirmDiv').remove()
                    },3000)
                })
                $('#confirmDiv .ok').click(function(){
                    $('#confirmDiv').remove();
                    opts.onOK(e);
                });
                $('#confirmDiv .cancel').click(function(e){
                    $('#confirmDiv').remove();
                    if (opts.onCancel != undefined) {
                        opts.onCancel(e);
                    }
                });
            }
        });
    };

})(jQuery);