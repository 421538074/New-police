var api ="http://police.pzhkj.cn"






function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}


window.warn = function(msg) {
    var template = 
    `
    <div id="alert-msg" class="alert-mask">
        <div class="alert-body">
            <p class="alert-title">警告</p>
            <p class="alert-msg">${msg}</p>
            <button class="alert-close" onclick="close()">确定</button>
        </div>
    </div>
    `
    $('body').append(template);
    $('.alert-body').animate({top:"40px"});
}