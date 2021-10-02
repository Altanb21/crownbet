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
        while (_) try {
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
var typeorm_1 = require("typeorm");
var ParamsController_1 = __importDefault(require("./ParamsController"));
var User_1 = __importDefault(require("../entity/User"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registerUser = function (req, res) {
        var _this = this;
        console.log(req.body);
        var username = req.body.username || "";
        var email = req.body.email || "";
        var password = req.body.password || "";
        ParamsController_1.default.requireParamsType([
            { paramName: "username", param: username, paramType: "string", rules: [
                    ["minStrLen", 10]
                ] },
            { paramName: "email", param: email, paramType: "string", rules: [
                    ["strPattern", "email"]
                ] },
            { paramName: "password", param: password, paramType: "string", rules: [
                    ["minStrLen", 10]
                ] },
        ], function (err) {
            if (err)
                return res.status(500).send(err.message);
            (0, typeorm_1.createConnection)().then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                var alreadyUsername, alreadyEmail, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, connection
                                .getRepository(User_1.default)
                                .createQueryBuilder("user")
                                .where("user.username = :username", { username: username })
                                .getOne()];
                        case 1:
                            alreadyUsername = _a.sent();
                            return [4 /*yield*/, connection
                                    .getRepository(User_1.default)
                                    .createQueryBuilder("user")
                                    .where("user.email = :email", { email: email })
                                    .getOne()];
                        case 2:
                            alreadyEmail = _a.sent();
                            if (alreadyUsername) {
                                res.status(400).send({
                                    message: "Username already in use!"
                                });
                            }
                            if (alreadyEmail) {
                                res.status(400).send({
                                    message: "Email already in use!"
                                });
                            }
                            user = new User_1.default();
                            user.username = username;
                            user.email = email;
                            user.password = password;
                            user.created_at = new Date();
                            user.updated_at = new Date();
                            return [4 /*yield*/, connection.manager.save(user)];
                        case 3:
                            _a.sent();
                            res.status(200).send({ message: "User created!" });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return UserController;
}());
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map