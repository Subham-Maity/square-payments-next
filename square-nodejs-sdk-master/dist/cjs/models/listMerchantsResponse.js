"use strict";
exports.__esModule = true;
exports.listMerchantsResponseSchema = void 0;
var schema_1 = require("../schema");
var error_1 = require("./error");
var merchant_1 = require("./merchant");
exports.listMerchantsResponseSchema = (0, schema_1.object)({
    errors: ['errors', (0, schema_1.optional)((0, schema_1.array)((0, schema_1.lazy)(function () { return error_1.errorSchema; })))],
    merchant: ['merchant', (0, schema_1.optional)((0, schema_1.array)((0, schema_1.lazy)(function () { return merchant_1.merchantSchema; })))],
    cursor: ['cursor', (0, schema_1.optional)((0, schema_1.number)())]
});
//# sourceMappingURL=listMerchantsResponse.js.map