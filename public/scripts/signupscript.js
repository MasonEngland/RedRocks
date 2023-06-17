const username = document.getElementById('username');
const email = document.getElementById('email');
const ssn = document.getElementById('ssn');
const password = document.getElementById('password');
const form = document.getElementById('main-form');

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const uname = username.value;
    const pword = password.value;
    const mail = email.value;
    const socials = ssn.value;
    console.log("1");
    if (uname == "") {
        document.getElementById('username-error').textContent = "Please enter username";
        return; 
    }
    if (pword == "") {
        document.getElementById('password-error').textContent = "Please enter password";
        return;
    }
    if (mail == "") {
        document.getElementById('email-error').textContent = "Please enter email";
        return;
    }
    if (socials == "") {
        document.getElementById('ssn-error').textContent = "Please enter social security number";
        return;
    }
    console.log("2");
    //--------------------------------------------------------------------------
    const sentData = { uname, pword, mail, socials};
    const options = {
        method: "POST",
        body: JSON.stringify(sentData),
        headers: {
            "content-type": "application/json"
        }
    }
    const response = await fetch("/post", options);
    const output = await response.text();
    console.log(3);
    if (output == "taken uname") {
        document.getElementById('username-error').textContent = "Username  is already taken";
    }
    else if (output == "taken email") {
        document.getElementById('email-error').textContent = "Email already registered";
    }
    console.log(4);
    //location.replace("login.html");
    event.target.reset();
})