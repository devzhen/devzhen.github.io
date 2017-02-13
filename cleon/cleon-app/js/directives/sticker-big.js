(function (module) {

    module.directive('stickerBig', ['stickerServiceDOM', function (stickerServiceDOM) {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, $element, $attrs) {
                $scope.date = new Date().getTime();
                $scope.comment = "Enter text here...";
                $scope.author = "Entrez votre nom";

                $scope.cancel = function () {
                    stickerServiceDOM.deleteBigSticker($element.parent());
                };
                $scope.save = function () {
                    stickerServiceDOM.createSmallSticker($element.parent(), $scope.date, $scope.comment, $scope.author);
                };
            },
            template: '<div class="stiket-big">' +
            '<div class="stiket-big-date">{{date | date:"dd-MM-yyyy HH:mm:ss"}}</div>' +
            '<div class="stiket-big-pole"> ' +
            '<textarea name="comment" ng-model="comment" style="resize: none"></textarea> ' +
            '</div> ' +
            '<div class="stiket-big-bottom"> ' +
            '<div class="stiket-big-bottom-title"> ' +
            '<textarea name="author" ng-model="author" maxlength="18" style="resize: none"></textarea> ' +
            '</div> ' +
            '<div class="stiket-big-check"> ' +
            '<img src="cleon-app/images/check.png" alt="#" ng-click="save()"> ' +
            '</div> ' +
            '<div class="stiket-big-cross"> ' +
            '<img src="cleon-app/images/cross.png" alt="#" ng-click="cancel()"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
            link: function ($scope, $element) {

                /*$('#test').on('keyup', function () {
                    console.log('clientHeight - ' + $('#test')[0].clientHeight);
                    console.log('scrollHeight - ' + $('#test')[0].scrollHeight);
                    console.log('clientWidth - ' + $('#test')[0].clientWidth);
                    console.log('offsetWidth - ' + $('#test')[0].offsetWidth);
                    console.log('scrollTop - ' + $('#test')[0].scrollTop);
                    console.log('\n');
                });*/

                // custom scrollbar
                $element.find('textarea[name="comment"]').niceScroll({
                    cursorcolor: "#eb6529",
                    autohidemode:false,
                    cursorwidth: "15px"
                });
            }
        };
    }]);

})(angular.module('cleonApp'));