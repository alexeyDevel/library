"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(app);
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server(server);
var booksRouteForView_1 = __importDefault(require("./routes/booksRouteForView"));
var routes_1 = __importDefault(require("./routes"));
var PORT = process.env.PORT || 4000;
var UrlDB = process.env.UrlDB || 'mongodb+srv://admin:Nk10sfjjx4Ycxm4z@cluster0.1tvpdns.mongodb.net/library';
app.use(express_1.default.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRouteForView_1.default);
app.use((0, express_session_1.default)({ secret: 'SECRET' }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use('/', routes_1.default);
mongoose_1.default.set('strictQuery', true);
function start(PORT, UrlDB) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                mongoose_1.default.connect(UrlDB, function (error) {
                    if (error)
                        throw error;
                    console.log('Successfully connected');
                });
                io.on('connection', function (socket) {
                    var clientId = socket.id;
                    var roomName = socket.handshake.query.roomName;
                    console.log('roomName: ' + roomName);
                    socket.join(roomName);
                    socket.on('book-message', function (msg) {
                        msg.type = "roomName: ".concat(roomName);
                        socket.to(roomName).emit('book-message', msg);
                        socket.emit('book-message', msg);
                    });
                    socket.on('disconnect', function () {
                        console.log('user disconnected');
                    });
                });
                server.listen(PORT);
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
start(PORT, UrlDB);
