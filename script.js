function bookRoom() {

  const name = document.getElementById("name").value
  const mobile = document.getElementById("mobile").value
  // const room = document.getElementById("room").value
  const room = document.getElementById("roomType").value
  const checkin = document.getElementById("checkin").value
  const checkout = document.getElementById("checkout").value

  if (!name || !mobile || !room) {
    alert("Please fill all details")
    return
  }

  const booking = {
    name,
    mobile,
    room,
    checkin,
    checkout
  }


function openForm(roomType) {

  document.getElementById("bookingModal").style.display = "block"

  document.getElementById("roomType").value = roomType

}

function closeForm() {

  document.getElementById("bookingModal").style.display = "none"

}



  let bookings = JSON.parse(localStorage.getItem("bookings")) || []

  bookings.push(booking)

  localStorage.setItem("bookings", JSON.stringify(bookings))

  alert("Booking Successful!")

}