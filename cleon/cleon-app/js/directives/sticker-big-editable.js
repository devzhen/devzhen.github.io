(function (module) {

    module.directive('stickerBigEditable', ['stickerServiceDOM', function (stickerServiceDOM) {

        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.date = new Date().getTime();
                $scope.comment = "Enter text here...";
                $scope.author = "Entrez votre nom";
                $scope.smallSticker = null;

                $scope.cancel = function () {
                    stickerServiceDOM.deleteBigSticker($element.parent());
                };
                $scope.save = function () {
                    stickerServiceDOM.editSmallSticker($scope);
                };
            }],
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
            '<img id="save" src="cleon-app/images/check.png" alt="#" ng-click="save()"> ' +
            '</div> ' +
            '<div class="stiket-big-cross"> ' +
            '<img id="cancel" src="cleon-app/images/cross.png" alt="#" ng-click="cancel()"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
            link: function ($scope, $element) {
                /*$scope.$on('$destroy', function () {
                 console.log('scope ' + $scope.$id + ' destroyed');
                 });
                 $element.on('$destroy', function () {
                 console.log('element ' + $element.toString() + ' destroyed');
                 });*/

                var textarea = $element.find('textarea[name="comment"]');

                // custom scrollbar
                textarea.niceScroll({
                    cursorcolor: "#eb6529",
                    autohidemode: false,
                    cursorwidth: "15px"
                });

                textarea.getNiceScroll(0).doScrollTop(textarea.height());
            }
        };
    }]);

})(angular.module('cleonApp'));