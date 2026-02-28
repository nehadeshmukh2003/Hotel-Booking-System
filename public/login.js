// async function login() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password })
//     });

//     const result = await response.json();

//     if (result.success) {
//         window.location.href = "admin.html";
//     } else {
//         document.getElementById("msg").innerText = "Invalid Login";
//     }
// }







async function login() {
    const response = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    const result = await response.json();

    if(result.success)
        window.location.href = "admin.html";
    else
        msg.innerText = "Invalid Login";
}