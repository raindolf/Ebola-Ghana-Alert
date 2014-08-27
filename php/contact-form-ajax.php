<?php 
include_once('contact-form.php');

if(isset($_REQUEST['jf_countdown_action']))
{
	$contactForm = new jfContactForm('');
	
	switch(@$_REQUEST['jf_countdown_action'])
	{
		case 'check_field_ajax':			
			@$name = $_REQUEST['jf_field_name'];
			@$value = $_REQUEST['jf_field_value'];
			
			$contactForm->checkField($name, $value);
			
			$field = $contactForm->getField($name);
	
			header('Content-Type: text/javascript; charset=utf-8');
			header('Content-type: text/json');
	
			//echo json_encode($field);		
			echo $_REQUEST['callback'].'('.json_encode($field).')';		
			break;
		case 'send':
            //echo 'tut '.$contactForm->getValue('jf_cf_name');
			//echo json_encode($contactForm->get());
			echo $_REQUEST['callback'].'('.json_encode($contactForm->get()).')';
			//echo '{"status" : "2", "fields_values : ["1", "2", "3"]"}';
			break;
	}
}

?>