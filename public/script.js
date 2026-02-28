const modal = document.getElementById("bookingModal");
const form = document.getElementById("bookingForm");

function openForm(room) {
    modal.style.display = "block";
    document.getElementById("roomType").value = room;
}

function closeForm() {
    modal.style.display = "none";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mobile = document.getElementById("mobile").value;

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter valid 10 digit mobile number");
        return;
    }

    const data = {
        checkin: checkin.value,
        checkout: checkout.value,
        roomType: roomType.value,
        guests: guests.value,
        requests: requests.value,
        mobile: mobile
    };

    const response = await fetch("/book", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });

    const result = await response.text();

    document.getElementById("msg").innerText = result;

    if (result.includes("Successfully")) {
        closeForm();
        document.getElementById("facilities").classList.remove("hidden");
        document.getElementById("facilities").scrollIntoView({ behavior: "smooth" });
    }

    form.reset();
});