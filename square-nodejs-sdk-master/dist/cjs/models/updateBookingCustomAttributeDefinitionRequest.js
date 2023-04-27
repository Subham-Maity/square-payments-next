"use strict";
exports.__esModule = true;
exports.updateBookingCustomAttributeDefinitionRequestSchema = void 0;
var schema_1 = require("../schema");
var customAttributeDefinition_1 = require("./customAttributeDefinition");
exports.updateBookingCustomAttributeDefinitionRequestSchema = (0, schema_1.object)({
    customAttributeDefinition: [
        'custom_attribute_definition',
        (0, schema_1.lazy)(function () { return customAttributeDefinition_1.customAttributeDefinitionSchema; }),
    ],
    idempotencyKey: ['idempotency_key', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.string)()))]
});
//# sourceMappingURL=updateBookingCustomAttributeDefinitionRequest.js.map