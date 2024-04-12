

      // Add your login validation logic here

      document.getElementById("login-button").addEventListener("click", () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

      if (username==='Ani Melendrez' && password==='GraciasAna') {
        alert('Login successful!');
        localStorage.setItem(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          )
          window.open("../index.html", "_self");
      } else {
        alert('Invalid username or password. Please try again.');
      }
      });
      
      let token = localStorage.getItem("token");
      if (token) {
        window.open("../index.html", "_self");
      }