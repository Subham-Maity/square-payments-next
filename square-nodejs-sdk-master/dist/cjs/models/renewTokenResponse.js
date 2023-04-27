"use strict";
exports.__esModule = true;
exports.renewTokenResponseSchema = void 0;
var schema_1 = require("../schema");
var error_1 = require("./error");
exports.renewTokenResponseSchema = (0, schema_1.object)({
    accessToken: ['access_token', (0, schema_1.optional)((0, schema_1.string)())],
    tokenType: ['token_type', (0, schema_1.optional)((0, schema_1.string)())],
    expiresAt: ['expires_at', (0, schema_1.optional)((0, schema_1.string)())],
    merchantId: ['merchant_id', (0, schema_1.optional)((0, schema_1.string)())],
    subscriptionId: ['subscription_id', (0, schema_1.optional)((0, schema_1.string)())],
    planId: ['plan_id', (0, schema_1.optional)((0, schema_1.string)())],
    errors: ['errors', (0, schema_1.optional)((0, schema_1.array)((0, schema_1.lazy)(function () { return error_1.errorSchema; })))]
});
//# sourceMappingURL=renewTokenResponse.js.map