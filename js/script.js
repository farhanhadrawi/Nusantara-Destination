
        function validateForm() {
            // Validasi formulir
            var username = document.getElementById("idusername").value;
            var password = document.getElementById("idpassword").value;
            var email = document.getElementById("idemail").value;
            var tanggal_lahir = document.getElementById("idtanggallahir").value;
            var no_handphone = document.getElementById("idhp").value;
            var gender1 = document.getElementById("gender1").checked;
            var gender2 = document.getElementById("gender2").checked;

            if (username === "" || password === "" || email === "" || tanggal_lahir === "" || no_handphone === "" || (!gender1 && !gender2)) {
                showNotification("Harap isi semua formulir.", false);
                return false;
            }

            return true;
        }

        function showNotification(message, isSuccess) {
            var notification = document.getElementById("notification");
            notification.innerHTML = message;

            if (isSuccess) {
                notification.style.color = "green";
            } else {
                notification.style.color = "red";
            }
        }