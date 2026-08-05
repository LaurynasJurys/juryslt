/* Jurys Cloud Consulting — site interactions
   - mobile nav toggle
   - contact form -> mailto (no backend; works on any static host)
*/
(function () {
  "use strict";

  // ---- mobile nav ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    // close on link click (mobile)
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // ---- contact form -> mailto ----
  var form = document.getElementById("contact-form");
  if (form) {
    var RECIPIENT = "laurynas@jurys.lt";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || "").toString().trim(); };

      var name = get("name");
      var email = get("email");
      var company = get("company");
      var interest = get("interest");
      var message = get("message");

      var subject = "Website enquiry — " + (name || "new contact");
      if (interest) subject += " [" + interest + "]";

      var body = [];
      if (name)    body.push("Name: " + name);
      if (email)   body.push("Email: " + email);
      if (company) body.push("Company: " + company);
      if (interest) body.push("Interested in: " + interest);
      if (message) body.push("", "Message:", message);
      body.push("", "(Sent from juryscloud.eu contact form)");

      var href =
        "mailto:" + encodeURIComponent(RECIPIENT) +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body.join("\n"));

      // open the user's mail client
      window.location.href = href;

      var note = document.getElementById("form-status");
      if (note) {
        note.textContent =
          "Opening your email client… If nothing happens, email " + RECIPIENT + " directly.";
        note.style.display = "block";
      }
      form.reset();
    });
  }

  // ---- footer year ----
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
