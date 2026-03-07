function bookRoom() {

  const name = document.getElementById("name").value
  const mobile = document.getElementById("mobile").value
  const room = document.getElementById("room").value
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

  let bookings = JSON.parse(localStorage.getItem("bookings")) || []

  bookings.push(booking)

  localStorage.setItem("bookings", JSON.stringify(bookings))

  alert("Booking Successful!")

}