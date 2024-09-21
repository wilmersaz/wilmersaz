// smooth scroll
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {
    	if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
      	} 
    });


	$('.link').on('click',function(){
		let img = 'poli.png';
		if($(this).attr('id') == 'pills-professional-tab')
			img = 'poli.png';
		else if($(this).attr('id') == 'pills-technologist-tab')
			img = 'sena.png';
		else
			img = 'panamericana.png';

		$('#img-institution').attr('src','assets/imgs/'+img);
	});
});