const {setGlobalOptions} = require("firebase-functions");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

setGlobalOptions({
  maxInstances: 10,
});

/*
 * ==========================================
 * GIFT ZONE - ORDER STATUS BACKEND
 * ==========================================
 *
 * Status flow:
 *
 * Order Placed
 *      ↓
 * Gift Being Packed
 *      ↓
 * Gift Ready
 *      ↓
 * Delivery Person Picked Up
 *      ↓
 * Out for Delivery
 *      ↓
 * Delivered
 *
 * The function detects orderStatus changes.
 *
 * Twilio credentials are NOT stored in this file.
 * They will be added securely later.
 */

// Customer notification messages
const notificationMessages = {
  "Order Placed":
    "Gift Zone: Your order has been placed successfully.",

  "Gift Being Packed":
    "Gift Zone: Your gift is now being packed.",

  "Gift Ready":
    "Gift Zone: Your gift is ready for delivery.",

  "Delivery Person Picked Up":
    "Gift Zone: Your gift has been picked up by our delivery person.",

  "Out for Delivery":
    "Gift Zone: Your gift is out for delivery.",

  "Delivered":
   "Gift Zone: Your gift has been delivered successfully. " +
"Thank you for choosing Gift Zone!",
};

/*
 * ==========================================
 * ORDER STATUS CHANGE FUNCTION
 * ==========================================
 */

exports.orderStatusChanged = onDocumentUpdated(
    "orders/{orderId}",
    async (event) => {
      const beforeData = event.data.before.data();
      const afterData = event.data.after.data();

      if (!beforeData || !afterData) {
        logger.warn("Gift Zone: Order data is missing.");
        return;
      }

      const oldStatus = beforeData.orderStatus || "";
      const newStatus = afterData.orderStatus || "";

      // Ignore updates where orderStatus did not change.
      if (oldStatus === newStatus) {
        return;
      }

      const orderId = event.params.orderId;

      const customerName = afterData.customerName || "";
      const customerPhone = afterData.customerPhone || "";
      const customerEmail = afterData.customerEmail || "";

      const message =
      notificationMessages[newStatus] ||
      `Gift Zone: Your order status is now "${newStatus}".`;

      logger.info("Gift Zone order status changed", {
        orderId: orderId,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        oldStatus: oldStatus,
        newStatus: newStatus,
        notificationMessage: message,
      });

      /*
     * ==========================================
     * TWILIO NOTIFICATION - NEXT STEP
     * ==========================================
     *
     * We will connect Twilio here after securely
     * configuring:
     *
     * TWILIO_ACCOUNT_SID
     * TWILIO_AUTH_TOKEN
     * TWILIO_PHONE_NUMBER
     *
     * IMPORTANT:
     * These values must NEVER be placed in:
     *
     * - index.js
     * - payment.html
     * - script.js
     * - GitHub frontend files
     *
     * They will be stored securely using Firebase
     * Secret Manager.
     */

      logger.info("Gift Zone notification prepared", {
        orderId: orderId,
        phone: customerPhone,
        message: message,
      });

      return;
    },
);
