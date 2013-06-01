<?php

if($_POST)
{
$To = "your@mail.com";
$Subject = "New Message ";
$Body = "New Message  from your site \n\n";

$Body .= "Name:\n";
$Body .= $_POST[name]."\n\n";

$Body .= "E-mail:\n";
$Body .= $_POST[email]."\n\n";

if($_POST[site]){
	$Body .= "Site:\n";
	$Body .= $_POST[site]."\n\n";
}

$Body .= "Message:\n";
$Body .= $_POST[msg]."\n\n";

if(!mail($To,$subject,$Body))
	die ("Mail Could not be sent");
}

header( 'Refresh: 0; url=/' )

?>