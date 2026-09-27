const admin = require("firebase-admin");

process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

admin.initializeApp({
  projectId: "gift-zone-53de8",
});

const db = admin.firestore();

/**
 * Creates a test order and triggers the order status change.
 */
async function testOrderStatus() {
  const orderRef = db.collection("orders").doc("TEST-GZ-001");

  console.log("Creating test order...");

  await orderRef.set({
    orderId: "TEST-GZ-001",
    userId: "test-user-001",
    customerName: "Test Customer",
    customerPhone: "9999999999",
    customerEmail: "test@giftzone.com",
    orderStatus: "Order Placed",
    createdForTesting: true,
  });

  console.log("Test order created.");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Changing status to Gift Being Packed...");

  await orderRef.update({
    orderStatus: "Gift Being Packed",
    statusUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("Status changed successfully.");
  console.log("Check the FIRST terminal for the Cloud Function log.");
}

testOrderStatus()
    .then(() => {
      console.log("TEST COMPLETE");
      process.exit(0);
    })
    .catch((error) => {
      console.error("TEST FAILED:", error);
      process.exit(1);
    });
