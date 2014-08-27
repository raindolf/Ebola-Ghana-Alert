<?php 

class jfContactForm
{
	protected $recipient;
	protected $email_agent;
	protected $subject;
	protected $path;	
	protected $options = array();
	protected $messages = array();
	protected $status = 1; //clear form

	protected $messageForm;
	protected $messageFormStyle = '';
	protected $CssErrorFieldStyle = 'error';
	
	protected $action = 'send';
	protected $success = false;

	protected $fieldsMessage = array();
	protected $fieldsStyle = array();
	protected $fieldsValue = array();
		
	function jfContactForm($path)
	{		
		$this->path = $path;
		$this->clearFields();
		
		$this->loadOptions();
		@$this->action = $_REQUEST['jf_countdown_action'];
		
		switch($this->action)
		{
			case 'send':				
				
				$this->checkForm();
				
				if($this->status == 3)
				{						
					$this->send();
				}
				else 
				{
					$this->messageForm = $this->messages['error_fields'];
					$this->messageFormStyle = 'error';									
				}
			break;				
		}	
		
		if(!$this->action) {$this->action = 'send';}
	}
	
	function clearFields()
	{
		
		$this->fieldsMessage = array();
		$this->fieldsStyle = array();
		$this->fieldsValue = array('jf_cf_email' => null, 'jf_cf_name' => null, 'jf_cf_message' => null);
		
	}
	
	function loadOptions()
	{			
		$file = $this->path.'../xml/contact-form.xml';
		
		if(file_exists($file))
		{
			if($xml_obj = simplexml_load_file($file))
			{
				$this->recipient = (string)$xml_obj->recipient;
				$this->email_agent = (string)$xml_obj->email_agent;
				$this->subject = (string)$xml_obj->subject;
				
				$this->messages['email_blank'] = (string)$xml_obj->messages->email_blank;
				$this->messages['email_invalid'] = (string)$xml_obj->messages->email_invalid;
				$this->messages['name_blank'] = (string)$xml_obj->messages->name_blank;
				$this->messages['message_blank'] = (string)$xml_obj->messages->message_blank;
				$this->messages['error_fields'] = (string)$xml_obj->messages->error_fields;
				$this->messages['send_ok'] = (string)$xml_obj->messages->send_ok;
				$this->messages['send_error'] = (string)$xml_obj->messages->send_error;							
			}
		}
	}
	
	function getOption($name)
	{
		$value = $this->options[$name];
		
		if(isset($value)) {return $value;}
		else {return 'undefine';}
	}
	
	function option($name)
	{
		echo $this->getOption($name);
	}
			
	function checkForm()
	{				
		if(isset($_REQUEST['jf_cf_email'], $_REQUEST['jf_cf_name'], $_REQUEST['jf_cf_message']))
		{									
			$key = 'jf_cf_email';				
			$this->checkField($key, @stripslashes($_REQUEST[$key]));
				
			$key = 'jf_cf_name';				
			$this->checkField($key, @stripslashes($_REQUEST[$key]));
				
			$key = 'jf_cf_message';				
			$this->checkField($key, @stripslashes($_REQUEST[$key]));
			
			if($this->status != 2) {$this->status = 3;}
		}				
	}
	
	function checkField($name, $value)
	{
		
		switch($name)
		{
			case 'jf_cf_email':
				if(!$value){					
					$message = $this->messages['email_blank'];
					$style = $this->CssErrorFieldStyle;					
					$this->status = 2;
				}
				elseif(!$value = $this->chEmail($value)){
					$message = $this->messages['email_invalid'];
					$style = $this->CssErrorFieldStyle;					
					$this->status = 2;
				}
								
				break;
			case 'jf_cf_name':
				if(!$value)
				{					
					$message = $this->messages['name_blank'];
					$style = $this->CssErrorFieldStyle;
					$this->status = 2;
				}
				
				break;
			case 'jf_cf_message':
				if(!$value)
				{					
					$message = $this->messages['message_blank'];
					$style = $this->CssErrorFieldStyle;
					$this->status = 2;
				}
				
				break;
		}
		
		$this->fieldsMessage[$name] = $message;
		$this->fieldsStyle[$name] = $style;
		$this->fieldsValue[$name] = $value;	
		
	}
		
	function chEmail($email)
 	{			  		  
	  	//if(@ereg("^([a-z0-9]|\\-|\\.|\\_)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,4}\$", strtolower($email))) return $email;
			if(preg_match("/^([a-z0-9]|\\-|\\.|\\_)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,4}\$/i", strtolower($email))) return $email;
	  	else return '';
	}
		
	function send()
	{		
	  $uniq = md5(time());
	  $message = "------------".$uniq."\n";
	  $message .= "Content-Type:text/html; charset=UTF-8; \n";
	  $message .= "Content-Transfer-Encoding: 8bit\n\n";
	  $message .= $this->htmlLetter()."\n\n";
	  $message .= "------------".$uniq."\n";
	
	  $header = 'From: '.$this->email_agent."\n";
	  $header .= "X-Mailer: PHPMail Tool\n";
	  $header .= "Mime-Version: 1.0\n";
	  $header .= "Content-Type:multipart/mixed;";
	  $header .= 'boundary="----------'.$uniq."\"\n\n";
	
	  if(mail($this->recipient, $this->subject.' [ '.$this->fieldsValue['jf_cf_name'].' email: '.$this->fieldsValue['jf_cf_email'].' ] ', $message, $header))
	  {			  				  		
			$this->status = 4;
			$this->success = true;
			$this->messageForm = $this->messages['send_ok'];
			$this->messageFormStyle = null;
			$this->clearFields();		
	  }
	  else {
	  	$this->status = 5;
	  	$this->messageForm = $this->messages['send_error'];
	  	$this->messageFormStyle = 'error';	  		
	  }
	}
	
	function getField($name)
	{
		return array('name' => $name, 'value' => $this->fieldsValue[$name], 'message' => $this->fieldsMessage[$name], 'style' => $this->fieldsStyle[$name]);
	}
		
	function get()
	{
		$result['status'] = $this->status;
		$result['fields_value'] = $this->fieldsValue;
		$result['fields_message'] = $this->fieldsMessage;
		$result['fields_style'] = $this->fieldsStyle;
		$result['message'] = $this->messageForm;
		$result['style'] = $this->messageFormStyle;
		
		return $result;		
	}
	
	function getStatus()
	{
		return $this->status;
	}
	
	function action()
	{
		echo $this->action;
	}	
	
	function success()
	{
		echo $this->success;
	}
		
	function getSuccess()
	{
		return $this->success;
	}	
	
	function value($name)
	{
		echo $this->fieldsValue[$name];
	}
	
	function getValue($name)
	{
		return $this->fieldsValue[$name];
	}	
	
	function style($name)
	{
		echo $this->fieldsStyle[$name];
	}
	
	function getStyle($name)
	{
		return $this->fieldsStyle[$name];
	}	
	
	function message($name)
	{
		echo $this->fieldsMessage[$name];
	}	
	
	function getMessage($name)
	{
		return $this->fieldsMessage[$name];
	}	
	
	function getMessageForm()
	{
		return $this->messageForm;
	}
	
	function getMessageFormStyle()
	{
		return $this->messageFormStyle;
	}
	
	function htmlLetter()
	{
		return '
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Message From Site.</title>
</head>

<body>
	<table cellpadding="5" cellspacing="0" border="0">
		<tr>
			<td><strong>Name:</strong></td>
			<td>'.$this->fieldsValue['jf_cf_name'].'</td>
		</tr>
		<tr>
			<td><strong>E-Mail:</strong></td>
			<td>'.$this->fieldsValue['jf_cf_email'].'</td>
		</tr>		
		<tr>
			<td><strong>Message:</strong></td>
			<td>'.$this->fieldsValue['jf_cf_message'].'</td>
		</tr>
	</table>
</body>
</html>
		';
	}
	
}

?>