/* Sending Email from Contact Section */
(function () {
	emailjs.init('DQNy5qMGUmVTsKugK');
})();

function sendmail() {
	let fullName = document.getElementById('name').value;
	let userPhone = document.getElementById('phone').value;
	let userEmail = document.getElementById('email').value;
	let userMessage = document.getElementById('message').value;

	let contactParams = {
		from_name: fullName,
		from_phone: userPhone,
		from_email: userEmail,
		message: userMessage,
	};

	alert('Your message has been sent successfully');

	emailjs
		.send('service_2p0g1ch', 'template_f5fvqfv', contactParams)
		.then(function (res) {});
}
