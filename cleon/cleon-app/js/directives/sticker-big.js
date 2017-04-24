(function (ngModule) {

    ngModule.directive('stickerBig', ['stickerServiceDOM', function (stickerServiceDOM) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.date = new Date().getTime();
                $scope.comment = "Enter text here...";
                $scope.author = "Entrez votre nom";

                $scope.cancel = function () {
                    stickerServiceDOM.deleteBigSticker($element.parent());
                };
                $scope.save = function () {
                    stickerServiceDOM.createSmallSticker($element.parent(), $scope.date, $scope.comment, $scope.author);
                };

                $scope.id = genId();
                function genId() {
                    return Math.random().toString(36).substr(2, 9);
                }
            }],
            template: '<div class="stiket-big">' +
            '<div class="stiket-big-date">{{date | date:"dd-MM-yyyy HH:mm:ss"}}</div>' +
            '<div class="stiket-big-pole"> ' +
            '<textarea id="{{id}}" name="comment" ng-model="comment" style="resize: none"></textarea> ' +
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

                var txtAreaId = '' + $scope.id;

                $(document).ready(function () {
                    // custom scrollbar
                    var textarea = document.getElementById(txtAreaId);
                    $(textarea).niceScroll({
                        cursorcolor: "#eb6529",
                        autohidemode: false,
                        cursorwidth: "15px",
                    });
                });

            }
        };
    }]);


})(angular.module('cleonApp'));