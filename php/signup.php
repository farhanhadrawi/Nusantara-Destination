<?php
// Koneksi ke database
$conn = new mysqli("localhost", "root", "", "user");

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari formulir
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password untuk keamanan
$email = $_POST['email'];
$tanggal_lahir = $_POST['tanggallahir'];
$no_handphone = $_POST['nohandphone'];
$jenis_kelamin = $_POST['jenis-kelamin'];

// Query untuk menyimpan data ke database
$sql = "INSERT INTO users (username, password, email, tanggal_lahir, no_handphone, jenis_kelamin) VALUES ('$username', '$password', '$email', '$tanggal_lahir', '$no_handphone', '$jenis_kelamin')";

// Jalankan query
if ($conn->query($sql) === TRUE) {
    echo "Pendaftaran berhasil!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Tutup koneksi
$conn->close();
?>
