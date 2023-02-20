"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.createUser = exports.findByUserName = exports.findById = void 0;
var users_1 = __importDefault(require("../store/users"));
var User_1 = __importDefault(require("../components/user/User"));
function findById(id, cb) {
    var user = null;
    process.nextTick(function () {
        users_1.default.forEach(function (item) {
            if (item.id === id)
                user = item;
        });
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(new Error("user width id: ".concat(id, " not found")), null);
        }
    });
}
exports.findById = findById;
function findByUserName(userName, cb) {
    process.nextTick(function () {
        var user = null;
        users_1.default.forEach(function (item) {
            if (item.userName === userName) {
                console.log("".concat(item.userName, " === ").concat(userName, "   ").concat(item.userName === userName));
                user = item;
            }
        });
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(new Error("user width id: ".concat(user.id, " not found")), null);
        }
    });
}
exports.findByUserName = findByUserName;
function createUser(user) {
    try {
        var newUser = new User_1.default(user.userName, user.displayName, user.email, user.age, user.password);
        users_1.default.push(__assign({}, newUser));
        console.log(users_1.default);
        return { user: newUser };
    }
    catch (err) {
        return { err: err };
    }
}
exports.createUser = createUser;
function verifyPassword(user, password) {
    return user.password === password;
}
exports.verifyPassword = verifyPassword;
