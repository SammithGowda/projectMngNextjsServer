"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../controller/search");
const router = (0, express_1.Router)();
router.get("/", search_1.search);
exports.default = router;
