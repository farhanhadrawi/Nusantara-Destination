<?php
// Koneksi ke database
$conn = new mysqli("localhost", "root", "", "user");

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari formulir
$username = $_POST['username'];
$password = $_POST['password'];

// Query untuk mendapatkan data pengguna dari database berdasarkan username
$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Ambil baris pertama (harusnya hanya satu karena username seharusnya unik)
    $row = $result->fetch_assoc();

    // Periksa apakah password cocok
    if (password_verify($password, $row['password'])) {
        echo "Login berhasil!";
        // Di sini, Anda dapat menyimpan informasi login ke sesi atau melakukan tindakan lainnya.
    } else {
        echo "Password salah.";
    }
} else {
    echo "Username tidak ditemukan.";
}

// Tutup koneksi
$conn->close();
?>
