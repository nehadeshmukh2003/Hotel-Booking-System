function loadBookings() {

  const bookings = JSON.parse(localStorage.getItem("bookings")) || []

  const table = document.getElementById("bookingTable")

  let rows = ""

  bookings.forEach(b => {

    rows += `
    <tr>
    <td>${b.name}</td>
    <td>${b.mobile}</td>
    <td>${b.room}</td>
    <td>${b.checkin}</td>
    <td>${b.checkout}</td>
    </tr>
    `

  })

  table.innerHTML = rows

}

loadBookings()