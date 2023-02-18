import express from "express";

const errRespNF = {errcode: 404, errmsg: "not found"};
export function err404(req: express.Request, res: express.Response){
    res.json(404);
    res.json(errRespNF);
}