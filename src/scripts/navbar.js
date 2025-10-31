document.getElementById("navbar-container").innerHTML = `
<nav class="navbar">
  <div class="nav-left">
    <div class="nav-logo">🎓 Admission Portal</div>
    <i class="fa-solid fa-bell" id="notificationIcon"></i>
  </div>
  <div class="nav-toggle" id="navToggle"><i class="fa-solid fa-bars"></i></div>
  <ul class="nav-links" id="navLinks">
    <li><a href="/">Home</a></li>
    <li><a href="/admissiontimecount.html">Admission Time</a></li>
    <li><a href="/notification.html">Notifications</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
</nav>
`;
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
document.getElementById("notificationIcon").addEventListener("click", () => {
  window.location.href = "/notification.html";
});