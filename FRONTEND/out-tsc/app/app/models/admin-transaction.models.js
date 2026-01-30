/**
 * Admin Transaction Models
 * TypeScript interfaces for transaction audit/management features
 */
// Transaction types enum matching backend
export var TransactionType;
(function (TransactionType) {
    TransactionType["Earned"] = "Earned";
    TransactionType["Redeemed"] = "Redeemed";
    TransactionType["Adjusted"] = "Adjusted";
    TransactionType["Refunded"] = "Refunded";
})(TransactionType || (TransactionType = {}));
//# sourceMappingURL=admin-transaction.models.js.map