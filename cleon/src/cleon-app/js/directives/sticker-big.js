(function (module) {

    module.directive('stickerBig', ['stickerServiceDOM', '$document', function (stickerServiceDOM, $document) {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, $element) {
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
            '<img src="../../images/check.png" alt="#" ng-click="save()"> ' +
            '</div> ' +
            '<div class="stiket-big-cross"> ' +
            '<img src="../../images/cross.png" alt="#" ng-click="cancel()"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
            link: function ($scope, $element) {

                // custom scrollbar
                var textarea = $element.find('textarea[name="comment"]');
                textarea.niceScroll({
                    cursorcolor: "#eb6529",
                    autohidemode: false,
                    cursorwidth: "15px"
                });

                textarea.on('paste', function () {
                    textarea.getNiceScroll().resize();
                });

            }
        };
    }]);

})(angular.module('cleonApp'));