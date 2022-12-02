const express = require('express');
const router = express.Router();
const login = { id: 1, mail: "test@mail.ru" };

router.post("/api/user/login",(req, res) => {
    res.json(login);
});

module.exports = router;