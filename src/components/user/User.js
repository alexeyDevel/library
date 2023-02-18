"use strict";
var uuid = require("uuid").v4;
var User = /** @class */ (function () {
    function User(userName, displayName, email, age, password) {
        this.id = uuid(),
            this.userName = userName,
            this.displayName = displayName,
            this.email = email,
            this.age = age,
            this.password = password;
    }
    return User;
}());
module.exports = User;
