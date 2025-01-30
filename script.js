function fetchSubscriptions() {
    fetch('../php/subscriptions.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#subscriptionsTable tbody');
            tableBody.innerHTML = '';
            data.forEach(subscription => {
                const row = `<tr>
                    <td>${subscription.service_name}</td>
                    <td>${subscription.amount}</td>
                    <td>${subscription.billing_date}</td>
                    <td>${subscription.status}</td>
                    <td><button onclick="editSubscription(${subscription.id})">Edit</button>
                        <button onclick="deleteSubscription(${subscription.id})">Delete</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        });
}

function addSubscription() {
    const serviceName = document.querySelector('#serviceName').value;
    const amount = document.querySelector('#amount').value;
    const billingDate = document.querySelector('#billingDate').value;
    const status = document.querySelector('#status').value;

    fetch('../php/subscriptions.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serviceName, amount, billingDate, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchSubscriptions();
        } else {
            alert('Error adding subscription');
        }
    });
}
function searchSubscriptions() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#subscriptionsTable tbody tr');

    rows.forEach(row => {
        const serviceName = row.cells[0].textContent.toLowerCase();
        row.style.display = serviceName.includes(input) ? '' : 'none';
    });
}