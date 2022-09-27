<?php

date_default_timezone_set('Asia/Yakutsk');

$token = "";
$chatid = "";
$name = $_GET['name'];
$phone = $_GET['phone'];
$date = date('m/d/Y h:i:s', time());


$message = '
Заказ обратного звонка!

Имя: ' . $name . ' 
Телефон: ' . $phone . '
Дата: ' . $date; 

$data = [
    'text' => $message,
    'chat_id' => $chatid
];

file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data));