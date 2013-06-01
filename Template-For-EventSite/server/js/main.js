/* Author:melnichuk Vladimir*/
var ie8 = ($.browser.msie && $.browser.version == '8.0') ? true : false;

function init_responsive_menu() {
	var menu = $('.menu nav').html();
	var r_menu = '<div class="r_menu">';
	r_menu += '<div class="r_menu_content">';
	r_menu += '<div class="arrow"></div>';
	r_menu += '<div class="text">Menu</div>';
	r_menu += '</div>';
	r_menu += menu;
	r_menu += '</div>';
	$('.menu').after(r_menu);

	$('.r_menu .r_menu_content').live('click', function() {
		$(this).toggleClass('collapsed');
		$('.r_menu > ul').slideToggle(300);
	});

	$('.menu nav li a, .r_menu li a').live('click', function(e) {
		if($(this).attr('href') == '#' || $(this).attr('href') == '') {
			e.preventDefault();
		}
	});
}

function init_menu() {
	var timer = new Array();
	jQuery('nav li').hover(
		function() {
			clearTimeout(timer[jQuery('nav li').index(this)]);
			jQuery(this).addClass('hover');
		},
		function() {
			var _this = this;
			timer[jQuery('nav li').index(this)] = setTimeout(function() {jQuery(_this).removeClass('hover');}, 100);
		}
	);
}

function init_fields() {
	$('.w_def_text').each(function() {
		var text = $(this).attr('title');
		
		if($(this).val() == '') {
			$(this).val(text);
		}
	});
	
	$('.w_def_text').live('click', function() {
		var text = $(this).attr('title');
		
		if($(this).val() == text) {
			$(this).val('');
		}
		
		$(this).focus();
	});
	
	$('.w_def_text').live('blur', function() {
		var text = $(this).attr('title');
		
		if($(this).val() == '') {
			$(this).val(text);
		}
	});
}

function init_pricing_table() {
	$('.block_pricing_table_1, .block_pricing_table_2').each(function() {
		var content = $(this).html();
		var native_class = $(this).attr('class');
		var new_content = '<div class="' + native_class + ' responsive flexslider"><ul class="slides">';
		new_content += content;
		new_content += '</ul></div>';

		$(this).after(new_content);
	});

	$('.block_pricing_table_1.responsive, .block_pricing_table_2.responsive').each(function() {
		$(this).find('.clear').remove();
		$(this).find('.column').wrap('<li />');
	});

	$('.block_pricing_table_1.responsive, .block_pricing_table_2.responsive').flexslider({
		animation : 'slide',
		slideshow : false,
		controlNav : false,
		smoothHeight : true
	});
}

function init_footer_tooltip() {
	$('.footer_tooltip').each(function(){
		var text = $(this).html();
		var content = '<span class="f_tooltip"><span class="arrow"></span>' + text + '</span>';
		$(this).html(content);
	});

	$('.footer_tooltip .f_tooltip').each(function(){
		var left = $(this).outerWidth() / 2;
		$(this).css('margin-left', '-' + left + 'px');
	});
}





jQuery(document).ready(function($) {
	$('.promo_slider').slides({
		effect: 'fade',
		fadeSpeed: 700,
		play: 4000,
		pause: 1000,
		hoverPause: true,
		generateNextPrev: false,
		generatePagination: false,
		autoHeight: true		
	});

	init_fields();
	init_footer_tooltip();

	if(!ie8) {
		init_responsive_menu();
		init_pricing_table();
	}

	$("a[data-rel^='prettyPhoto']").prettyPhoto({
		deeplinking : false,
		keyboard_shortcuts : false
	});
	
	init_menu();

	$('.contact_form input').blur(function(){
		form=$(this).closest('.contact_form')
		form_validate(form);
	})

	$('.contact_form .generic_button').click(function(){
		form=$(this).closest('.contact_form')
		form_validate(form);
		if(form.find(".check").hasClass("required")===true){
			return false
		}else{
			form.submit()
		}
	})

	// FILTER PORFOLIO
	$('.block_filter a').on('click', function(){
		filter_name = $(this).data('filter')
		height = $('.block_portfolio').height()

		$('.block_filter a').removeClass('current')
		$(this).addClass('current')
		
		$('.block_portfolio').css({'height':height})
		
		$('.block_portfolio .filter_title').stop().fadeOut(function(){
			$('.block_portfolio .filter_title').html(filter_name)
			$('.block_portfolio .filter_title').fadeIn()
		})
		
		$('.porfolio_box').stop().fadeOut(function(){
			$('.porfolio_box .portfolio_item').hide()
			$('.'+filter_name).show(function(){
				$('.porfolio_box').fadeIn(function(){
					$('.block_portfolio').css({'height': 'auto'})
				})	
			})
		})		
	})

});






