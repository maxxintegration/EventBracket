<?php


//If the form is submitted
if(isset($_POST['send_email'])) {

	$name = trim($_POST['contact_name']);
	$email = trim($_POST['contact_email']);
	$subject = trim($_POST['contact_subject']);
	$destination_email = "youremail@domain.com" // PUT YOUR EMAIL HERE eq. myemail@gmail.com

	if(function_exists('stripslashes')) {
		$message = stripslashes(trim($_POST['contact_messages']));
	} else {
		$message = trim($_POST['contact_messages']);
	}

	$emailTo = $destination_email;

	$subject_email = sprintf( 'Contact Form Submission from %s', $name );
	
	$body = "Name : " . $name . "\n\n Email : " . $email . "\n\n Subject : " . $subject . "\n\n Messages : " . $message;
	$headers = 'From: '.$email . "\r\n" . 'Reply-To: ' . $email;
	
	mail($emailTo, $subject_email, $body, $headers);

} else {
	if (!empty($_SERVER['HTTP_REFERER']))
    header("Location: ".$_SERVER['HTTP_REFERER']);
}
