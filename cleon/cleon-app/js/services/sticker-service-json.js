(function (ngModule) {

    ngModule.factory('stickerServiceJSON', ['$compile', function ($compile) {

        return {

            smallStickers: [],

            addSticker: function (ng_elem) {

                var scope = ng_elem.scope();

                this.smallStickers.push({
                    id: scope.$id,
                    date: scope.date,
                    comment: scope.comment,
                    author: scope.author,
                    screen: scope.screen,
                    uet: scope.uet,
                    board: scope.board,
                    top: scope.top,
                    left: scope.left
                });
            },

            deleteSticker: function (ng_elem) {

                var index = this.findSticker(ng_elem);

                this.smallStickers.splice(index, 1);

            },

            findSticker: function (ng_elem) {

                var scope = ng_elem.scope();

                for (var i = 0; i < this.smallStickers.length; i++) {

                    if (this.smallStickers[i].id == scope.$id) {
                        return i;
                    }

                }

                return null;
            },

            updateStickerContent: function (ng_elem) {

                var scope = ng_elem.scope();

                var index = this.findSticker(ng_elem);

                this.smallStickers[index].date = scope.date;
                this.smallStickers[index].comment = scope.comment;
                this.smallStickers[index].author = scope.author;
            },

            updateStickerPosition: function (ng_elem) {
                var scope = ng_elem.scope();

                var index = this.findSticker(ng_elem);

                this.smallStickers[index].top = scope.top;
                this.smallStickers[index].left = scope.left;

            },

            moveStickerToEnd: function (ng_elem) {

                if (this.smallStickers.length == 1) {
                    return;
                }

                var index = this.findSticker(ng_elem);

                var obj = this.smallStickers.splice(index, 1);

                this.smallStickers.push(obj[0]);
            },

            getAllStickersJSON: function () {
                return JSON.stringify(this.smallStickers);
            }
        };

    }]);

})(angular.module('cleonApp'));