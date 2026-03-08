document.addEventListener("DOMContentLoaded", function() {

  window.openForm = function(roomType) {
    document.getElementById("bookingModal").style.display = "block";
    document.getElementById("roomType").value = roomType;
  };

  window.closeForm = function() {
    document.getElementById("bookingModal").style.display = "none";
  };

  document.getElementById("bookingForm").addEventListener("submit", function(e) {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const room = document.getElementById("roomType").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!name || !mobile || !room) {
    alert("Please fill all details");
    return;
  }

  const booking = {
    name,
    mobile,
    room,
    checkin,
    checkout
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push(booking);

  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking Successful!");

  closeForm();

  });

});
