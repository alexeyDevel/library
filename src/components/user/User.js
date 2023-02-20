"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = User;
