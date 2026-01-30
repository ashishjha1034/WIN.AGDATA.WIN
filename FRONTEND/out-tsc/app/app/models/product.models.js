/**
 * Product-related models and interfaces
 * Used for Product Management admin module
 */
export var RedemptionStatus;
(function (RedemptionStatus) {
    RedemptionStatus[RedemptionStatus["Pending"] = 0] = "Pending";
    RedemptionStatus[RedemptionStatus["Approved"] = 1] = "Approved";
    RedemptionStatus[RedemptionStatus["Rejected"] = 2] = "Rejected";
    RedemptionStatus[RedemptionStatus["Delivered"] = 3] = "Delivered";
    RedemptionStatus[RedemptionStatus["Cancelled"] = 4] = "Cancelled";
})(RedemptionStatus || (RedemptionStatus = {}));
//# sourceMappingURL=product.models.js.map