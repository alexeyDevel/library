const errRespNF = {errcode: 404, errmsg: "not found"};
module.exports = (req, res) => {
    res.json(404);
    res.json(errRespNF);
}