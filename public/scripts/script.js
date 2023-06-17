const form = document.getElementById('main-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

// listens for a submission 
// collects username and password
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let uname = username.value;
    let pword = password.value;
    // turn data into object to send to server
    const sentData = {uname, pword};
    const options = {
        method: "POST",
        body: JSON.stringify(sentData),
        headers: {
            "content-type": "application/json"
        }
    }
    const data = await fetch("/accounts", options);
    const response = await data.json();
    if (response.status == "yes") {
        setCookie("username", response.body.uname, 1);
        setCookie("socialsn", response.body.socials.toLowerCase(), 1);
        setCookie("email", response.body.mail.toLowerCase(), 1);
        setCookie("logged", response.status, 1);
        location.replace("index.html");
    }
    else {
        setCookie("logged", response.status, 1);
        deleteCookie("email");
        deleteCookie("username");
        deleteCookie("socialsn");
        alert("incorrect username or password");
    }
    console.log(response);
    event.target.reset();
})
//functions for easier cookie management
//function names speak for themselves
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}
//------------------------------------------
function deleteCookie(name) {
    setCookie(name, null, null);
}
//------------------------------------------
function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1);
        }
    })
    return result;
}
