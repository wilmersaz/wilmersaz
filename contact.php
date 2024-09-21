<?php

if ($_POST) {
    $name = "";
    $email = "";
    $phone = "";
    $obs = "";

    if (isset($_POST['name'])) {
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    }

    if (isset($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    if (isset($_POST['phone'])) {
        $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    }

    if (isset($_POST['obs'])) {
        $obs = filter_var($_POST['obs'], FILTER_SANITIZE_STRING);
    }

    $to = "wasanchez0731@misena.edu.co";
    $msjCorreo = "Nombre: $name\n E-Mail: $email\n Teléfono: $phone\n Mensaje:\n $obs";
    $subjet = 'Nuevo mensaje de mi sección contáctame';
    if (mail($to, $subjet, $msjCorreo)) {
        $success = 'Se ha enviado tu mensaje. Pronto me contactaré contigo';
    } else {
        $errors = 'Ha ocurrido un error!. Por favor, intenta nuevamente';
    }
} else {
    $empty = 'Campos incompletos';
}

// header("location:javascript://history.go(-1)");

header('Location: ' . $_SERVER['HTTP_REFERER']);
exit;

?>