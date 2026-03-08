function loadBookings() {

let bookings = JSON.parse(localStorage.getItem("bookings")) || []

let table = document.getElementById("bookingTable")

let rows = ""

let approved = 0
let pending = 0

bookings.forEach((b,index)=>{

let status = b.status || "Pending"

if(status==="Approved"){
approved++
}else{
pending++
}

rows += `
<tr>

<td>${b.name}</td>
<td>${b.mobile}</td>
<td>${b.room}</td>
<td>${b.checkin}</td>
<td>${b.checkout}</td>

<td>${status}</td>

<td>
<button onclick="approveBooking(${index})">
Approve
</button>
</td>

<td>
<button onclick="deleteBooking(${index})">
Delete
</button>
</td>

</tr>
`

})

table.innerHTML = rows

document.getElementById("totalBookings").innerText = bookings.length
document.getElementById("approvedCount").innerText = approved
document.getElementById("pendingCount").innerText = pending

}

function approveBooking(index){

let bookings = JSON.parse(localStorage.getItem("bookings")) || []

bookings[index].status = "Approved"

localStorage.setItem("bookings",JSON.stringify(bookings))

loadBookings()

}

function deleteBooking(index){

let bookings = JSON.parse(localStorage.getItem("bookings")) || []

bookings.splice(index,1)

localStorage.setItem("bookings",JSON.stringify(bookings))

loadBookings()

}

loadBookings()