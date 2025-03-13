<?php

$host = 'localhost'; 
$username = 'root';
$password = '';
$dbname = 'transport_db'; 


$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$name = $_POST['name'];
$reg_no = $_POST['reg_no'];
$department = $_POST['department'];
$semester = $_POST['semester'];
$area = $_POST['area'];


$sql = "INSERT INTO students (name, reg_no, department, semester, area)
        VALUES ('$name', '$reg_no', '$department', '$semester', '$area')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>
