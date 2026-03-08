// Debug: Check if script is loading
console.log("Script loaded successfully");

// Get modal element
const modal = document.getElementById("bookingModal");
const roomTypeSelect = document.getElementById("roomType");

// Function to open modal
function openForm(roomType) {
  console.log("openForm called with:", roomType);
  modal.style.display = "block";
  roomTypeSelect.value = roomType;
}

// Function to close modal
function closeForm() {
  modal.style.display = "none";
}

// Make functions globally accessible
window.openForm = openForm;
window.closeForm = closeForm;

// Add click events to all Book Now buttons
document.querySelectorAll('.book-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const roomType = this.getAttribute('data-room');
    openForm(roomType);
  });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeForm();
  }
});

// Form submission
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
  document.getElementById("bookingForm").reset();
});

