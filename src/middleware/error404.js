"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.err404 = void 0;
var errRespNF = { errcode: 404, errmsg: "not found" };
function err404(req, res) {
    res.json(404);
    res.json(errRespNF);
}
exports.err404 = err404;
