<?php 

$subscribeMessages = null;

function loadOptions()
{
	global $subscribeMessages;

	$file = '../xml/subscribe.xml';
		
	if(file_exists($file))
	{
		if($xml_obj = simplexml_load_file($file))
		{						
			$subscribeMessages['email_blank'] = (string)$xml_obj->messages->email_blank;
			$subscribeMessages['email_invalid'] = (string)$xml_obj->messages->email_invalid;			
			$subscribeMessages['success'] = (string)$xml_obj->messages->success;
			$subscribeMessages['error'] = (string)$xml_obj->messages->error;							
		}
	}
}

function chEmail($email)
{	
	if(preg_match("/^([a-z0-9]|\\-|\\.|\\_)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,4}\$/i", strtolower($email))) return $email;
	else return false;
}

function addEmail($email) {
	$flag = false;
	
	$fp = fopen(getcwd().'/../subscribe-list.txt', 'a+');
	if($fp){
		rewind($fp);
		
		//search for a new e-mail in the list
		while(!feof($fp)) {
			$str = fgets($fp, 999);
			if($email."\r\n" == $str) {
				$flag = true;
				break;
			}
		}
		
		if(!$flag) {
			//add a new e-mail to the list
			fwrite($fp, $email."\r\n");		
		}
		
		fclose($fp);
		return true;
	}
	
	return false;
}


/*-------------------------- BEGIN */

loadOptions();

@$email = $_REQUEST['jf_subscribe_email'];
$status = 0;
$message = '';

if($email == '') {
	$status = 1;
	$message = $subscribeMessages['email_blank'];
}
elseif(!chEmail($email)) {
	$status = 1;
	$message = $subscribeMessages['email_invalid'];
}
elseif(!addEmail($email)) {
	$status = 1;
	$message = $subscribeMessages['error'];
}
else {
	$status = 2;
	$message = $subscribeMessages['success'];
}

//echo json_encode(array('status' => $status,  'message' => $message));
echo $_REQUEST['callback'].'('.json_encode(array('status' => $status,  'message' => $message)).')';

?>