// JavaScript Document
// ver-001 2012-12-11

function jfContactForm(path)
{
	this.path = path;
	this.fieldsJQ = {};
	this.fieldsSpan = {};
	
	var self = this;			
	
	this.success();
		
	$('#jf_cf .required').each(function(){				
		var field = $(this);
		self.fieldsJQ[field.attr('name')] = $(this);
		self.fieldsSpan[field.attr('name')] = $('span.' + field.attr('name'));
		
		$(this).blur(function(){
			self.checkFieldAJAX(field.attr('name'), field.val());
		});
	});		
		
	this.button = $('#jf_cf_submit').css('display', 'block');
	this.button.click(function(event){												 
		self.sendForm();
		
		event.preventDefault();
	});	
	
	$('#jf_cf input[type=submit]').css('display', 'none');
	
	var element = $('#jf_cf_button_show');
	element.click(function(){
		return false;
	});	
}

jfContactForm.prototype.success = function() {
	if($('#jf_cf_success').val() == 1) {
		$('#jf_cf').hide();		
		$('#jf_cf_button_show').show().click(function(){
			$('#jf_cf_button_show').hide();
			$('#jf_cf_information').remove();
			$('#jf_cf').show();
		});
	}	
}

jfContactForm.prototype.sendForm = function() {
	var form_field = 'jf_countdown_action=send';
	var self = this;

	$('#jf_cf .required').each(function(){																			
		var field = $(this);
		form_field = form_field + '&' + field.attr('name') + '=' + encodeURIComponent(field.val().replace(/\n\r?/g, '<br />'));
	});
	
	$('<div class="form-preloader" id="form-preloader"><span></span></div>').insertAfter(self.button);
	$.getJSON(this.path + '/php/contact-form-ajax.php?' + form_field + '&callback=?', function(data){
		$('#form-preloader').remove();
		if(data.status) {
			self.setFields(data.fields_value, data.fields_message, data.fields_style);
		
			switch(data.status)
			{
				case 2: // error, not properly filled in form fields					
				break;
				case 3: // correctly fill in the form
				break;
				case 4: // message is sent					
					self.message(data.message, data.style);
					$('#jf_cf_success').val(1);
					self.success();
					self.clearForm();					
				break;
				case 5: // error, message is not dispatched
					self.message(data.message, data.style);											
				break;				
			}
		}
		else {
			window.alert('Error AJAX Contact Form!');	
		}
	});
}

jfContactForm.prototype.message = function(message, style) {
	$('#jf_cf_information').remove();
	$('<p class="message"></p>').addClass(style).text(message).attr('id', 'jf_cf_information').insertBefore('#jf_cf');
}

jfContactForm.prototype.clearForm = function() {	
	for(name in this.fieldsJQ) {
		this.fieldsJQ[name].val('');
		this.fieldsSpan[name].hide();
	}	
}

jfContactForm.prototype.setFields = function(fields_value, fields_message, fields_style) {
	for(name in fields_value) {
  	this.fieldsJQ[name].val(fields_value[name]);
		if(fields_message[name] && fields_style[name]) {
			this.messageField(name, fields_message[name], fields_style[name]);			
		}
	}
}

jfContactForm.prototype.messageField = function(name, message, style) {
	if(style != null)
	{
		this.fieldsJQ[name].siblings('span').text(message).addClass(style).show();
		this.fieldsSpan[name].text(message).addClass(style).show();
	}
	else
	{				
		this.fieldsSpan[name].hide();
	}
}

jfContactForm.prototype.checkFieldAJAX = function(name, value)
{
	var self = this;

	$.getJSON(this.path + '/php/contact-form-ajax.php?jf_countdown_action=check_field_ajax&jf_field_name=' + name + '&jf_field_value=' + value + '&callback=?', function(data) {
		self.messageField(name, data.message, data.style);	
	});
}