(function (angular) {

    var iframe = document.getElementsByTagName('iframe')[0];

    if (iframe) {
        /*Докумет в iframe еще не загружен*/
        var iframeDoc = iframe.contentWindow.document;

        if (iframe.readyState === 'complete') {
            console.log("iframe.readyState == 'complete'");
        }

        iframe.onload = function () {
            /*Докумет в iframe загружен*/
            var iframeDoc2 = iframe.contentWindow.document;

            iframe.style.height = 100 + 'vh';
            iframe.style.width = 100 + 'vw';
        };
    }

    var module = angular.module('dgCarousel', []);


    this.getCoords = function (elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;


        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left,
            right: left + elem.offsetWidth,
            bottom: top + elem.offsetHeight
        };
    }
})(window.angular);