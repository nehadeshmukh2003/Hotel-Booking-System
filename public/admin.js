async function loadBookings() {
    const response = await fetch("/bookings");
    const data = await response.json();

    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    let approved = 0;
    let pending = 0;

    data.forEach(row => {

        if(row.status === "Approved") approved++;
        else pending++;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.room_type}</td>
            <td>${row.mobile}</td>
            <td>${row.status}</td>
            <td>
                <button onclick="approve(${row.id})">Approve</button>
                <button onclick="deleteBooking(${row.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("totalBookings").innerText = data.length;
    document.getElementById("approvedCount").innerText = approved;
    document.getElementById("pendingCount").innerText = pending;

    loadChart(approved, pending);
}

async function deleteBooking(id) {
    await fetch(`/delete/${id}`, { method:"DELETE" });
    loadBookings();
}

async function approve(id) {
    await fetch(`/approve/${id}`, { method:"PUT" });
    loadBookings();
}

function loadChart(approved, pending) {
    new Chart(document.getElementById("statusChart"), {
        type: 'doughnut',
        data: {
            labels: ['Approved', 'Pending'],
            datasets: [{
                data: [approved, pending]
            }]
        },
        options: {
            responsive: false
        }
    });
}

document.getElementById("search").addEventListener("keyup", function() {
    const value = this.value.toLowerCase();
    const rows = document.querySelectorAll("#table tbody tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value)
            ? "" : "none";
    });
});

loadBookings();