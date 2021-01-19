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

	// Ошибки, к оторые применятся к формам, установить в html id
    valideForms('#form');
    
    // Модальные окна
	// Указать в html data-modal у нужных кнопок и указать класс ( $('[data-modal=application]') )
	$('[data-modal=application]').on('click', function() {
		// Затемненный задний фон, его класс ( $('.modal-forms__overlay, )
		// Кнопка при нажатии на которую будет появляться модальное окно ( #application').fadeIn(); )
		$('.modal-forms__overlay, #application').fadeIn('slow');
	});

	// Класс крестика ( $('.modal-forms__close') )
	$('.modal-forms__close').on('click', function() {
		// Будет закрываться то что не нужно ( $('.modal-forms__overlay, #application, #order, #thanks') )
		$('.modal-forms__overlay, #thanks').fadeOut('slow');
	});

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	// Отправка писем на почту
	// Обращение ко всем формам $('form').submit(function(e)
	$('form').submit(function(e) {
		// Отменяем стандартное поведение браузера e.preventDefault();
		e.preventDefault();
		$.ajax({
			// Указывем что будем отдавать данные type: "POST"
			type: "POST",
			// То, куда мы будем отправлять наш запрос url: "repository/Heart_Rate_Monitor/mailer"
			url: "repository/job/mailer",
			// Данные которые хочу отправить на сервер data: $(this).serialize()
			data: $(this).serialize()
		}).done(function() {
			// Находим то, что внутри нашей формы $(this).find("input")
			// Очищает формы после отправки .val("")
			$(this).find("input").val("");
			// Закрываем ненужные формы, для того чтоб потом высветилась форма благодарнсоти $('#application, #order').fadeOut();
			$('#application, #order').fadeOut();
			// Появление затемненного экрана и окна благодарности, с медленной скоростью $('.modal-forms__overlay, #thanks').fadeIn('slow');
			$('.modal-forms__overlay, #thanks').fadeIn('slow');
			// Чтоб все формы очистились в конце $('form').trigger('reset');
			$('form').trigger('reset');
		});
		return false;
	});
});