<?php
include 'db.php';

$today = date('Y-m-d');
$query = "SELECT * FROM subscriptions WHERE billing_date = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $today);
$stmt->execute();
$result = $stmt->get_result();

while ($subscription = $result->fetch_assoc()) {
    // Send email reminder logic here
    mail($subscription['user_email'], "Payment Reminder", "Your payment for " . $subscription['service_name'] . " is due today.");
}
?>