<?php 
// Koneksi ke database 
$conn = new mysqli("localhost", "root", "", "user"); 
 
// Periksa koneksi 
if ($conn->connect_error) { 
    die("Koneksi gagal: " . $conn->connect_error); 
} 
 
// Ambil data dari formulir 
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$email = $_POST['email'] ?? '';
$tanggal_lahir = $_POST['tanggallahir'] ?? '';
$no_handphone = $_POST['nohandphone'] ?? '';
$jenis_kelamin = $_POST['jenis-kelamin'] ?? '';

// Periksa data wajib 
if (
    empty($username) ||
    empty($password) ||
    empty($email) ||
    empty($tanggal_lahir) ||
    empty($no_handphone) ||
    empty($jenis_kelamin)
) {
    die("Semua data wajib diisi.");
}

// Validasi format email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Format email tidak valid.");
}

// Hash password
$password = password_hash($password, PASSWORD_DEFAULT);

// Gunakan prepared statement untuk mencegah SQL Injection
$stmt = $conn->prepare(
    "INSERT INTO users 
    (username, password, email, tanggal_lahir, no_handphone, jenis_kelamin) 
    VALUES (?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssssss",
    $username,
    $password,
    $email,
    $tanggal_lahir,
    $no_handphone,
    $jenis_kelamin
);

// Jalankan query
if ($stmt->execute()) {
    echo "Pendaftaran berhasil!";
} else {
    echo "Pendaftaran gagal: " . $stmt->error;
}

// Tutup statement dan koneksi
$stmt->close();
$conn->close();
?>