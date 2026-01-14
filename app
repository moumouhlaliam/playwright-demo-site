// Demo Login (fake)
function handleLogin(e){
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  const msg = document.querySelector("#loginMessage");
  msg.className = "alert";
  msg.textContent = "";

  if(!email || !password){
    msg.classList.add("err");
    msg.textContent = "Please fill in all fields.";
    return;
  }

  if(email === "qa@test.com" && password === "Password123"){
    msg.classList.add("ok");
    msg.textContent = "Login successful!";
    localStorage.setItem("demo_auth", "true");
  } else {
    msg.classList.add("err");
    msg.textContent = "Invalid credentials.";
    localStorage.removeItem("demo_auth");
  }
}

// Demo Form (validation)
function handleContact(e){
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const topic = document.querySelector("#topic").value;
  const details = document.querySelector("#details").value.trim();
  const msg = document.querySelector("#formMessage");

  msg.className = "alert";
  msg.textContent = "";

  if(name.length < 2){
    msg.classList.add("err");
    msg.textContent = "Name must be at least 2 characters.";
    return;
  }
  if(!topic){
    msg.classList.add("err");
    msg.textContent = "Please select a topic.";
    return;
  }
  if(details.length < 10){
    msg.classList.add("err");
    msg.textContent = "Details must be at least 10 characters.";
    return;
  }

  msg.classList.add("ok");
  msg.textContent = "Submitted successfully! (demo)";
}

// Guard page example (optional)
function requireAuth(){
  const ok = localStorage.getItem("demo_auth") === "true";
  const box = document.querySelector("#authBox");
  if(!box) return;

  if(ok){
    box.className = "alert ok";
    box.textContent = "Authenticated session detected (demo).";
  } else {
    box.className = "alert err";
    box.textContent = "Not authenticated. Use qa@test.com / Password123 on the Login demo.";
  }
}
