$(document).ready(function(){
    
    // Ошибки для формы
	function valideForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Пожалуйста введите {0} символа")
				},
				phone: "Пожалуйста введи свой номер телефона"
			}
		});
	};
	valideForms('#form');
	

	var ua = navigator.userAgent;
	var isAndroid = /Android/i.test(ua);
	var isChrome = /Chrome/i.test(ua);

	// Fix masking on Chrome for mobile devices
	if (isAndroid && isChrome) {
		$('.price_input').attr('type','tel');
	}     
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('.modal-forms__overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});
	
	$('[data-modal=application]').on('click', function() {
		$('.modal-forms__overlay, #application').fadeIn('slow');
	});

	$('.modal-forms__close').on('click', function() {
		$('.modal-forms__overlay, #application, #thanks').fadeOut('slow');
	});

});