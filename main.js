(function ( $ ) {
	$.fn.start = function(params){

		//Functions
		var sortList = function(){
			var sorted = elements.sort(sort_li)
		function sort_li(a, b){
		    return ($(b).attr('data-step')) < ($(a).attr('data-step')) ? 1 : -1;    
		}
		}
		var buttonController = function(i){
			if(i == elements.length){
				$("#done").css("display", "inline")
				$("#next").attr("disabled", "true")
			}
			else if(i==1){
				$("#done").css("display", "none")
				$("#back").attr("disabled", "true")
				$("#next").removeAttr("disabled")
			}
			else{
				$("#done").css("display", "none")
				$("#next").removeAttr("disabled")
				$("#back").removeAttr("disabled")
			}
		}
		var showStep = function(i){
			buttonController(i);
			var element = elements[i-1]
			$(".show-step").removeClass("show-step")
			$(".overlay").css("display", "block")
			$(element).addClass("show-step")
			$("#step-content").html($(element).attr("data-content"))
			$('html, body').animate({
		        scrollTop: $(element).offset().top
		    }, 500)
		}
		//Ends Here

		//Event Handlers
		$("#next").on('click', function(){
			if(index>0 && index<elements.length){
			index++;
		}
			showStep(index)
		})
		$("#back").on('click', function(){
			if(index>0 && index<=elements.length){
			index--;
			}
			showStep(index)
		})
		$("#done").on("click", function(){
			$(".overlay").css("display", "none")
		})
		//Ends Here


		//Plugin Controller
		var elements = $("[data-step]")
		sortList();
		var index =0
		if(params && params.hasOwnProperty('startFrom') && params.startFrom <= elements.length){
			index = params.startFrom
		}
		else{
			index = 1
		}
		showStep(index)
		//Ends here

	}
	}( jQuery ));