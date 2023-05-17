"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
function pagination(allPosts, limit, page) {
    if (limit === void 0) { limit = 20; }
    if (page === void 0) { page = 1; }
    var countPages = Math.ceil(allPosts.length / limit);
    if (limit < 0) {
        return allPosts;
    }
    if (page > countPages) {
        return allPosts;
    }
    var postList = [];
    for (var i = 0; i < countPages; i++) {
        var arr = [];
        for (var j = 0; j < limit; j++) {
            arr.push(allPosts[0]);
            allPosts.splice(0, 1);
        }
        postList.push(arr);
    }
    var ans = postList[page - 1].filter(function (el) { return typeof (el) == 'object'; });
    return ans;
}
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map