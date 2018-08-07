(function ( $ ) {
	$.fn.start = function(params){

		//Functions
		var sortList = function(){
			var sorted = elements.sort(sort_li)
		function sort_li(a, b){
		    return ($(b).attr('data-step')) < ($(a).attr('data-step')) ? 1 : -1;    
		}
		}
		var buttonController = function(params){
			var i = params.index
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
			if(params.hasOwnProperty('hasEvent') && params.hasEvent){
				$("#next").css("display", "none")
				$("#skip").css("display", "inline")
			}
			else{
				$("#skip").css("display", "none")
				$("#next").css("display", "inline")
			}
		}
		var showStep = function(i){
			var element = elements[i-1]
			var params = {
				index: i
			}
			if(element.hasAttribute('data-has-event')){
				params['hasEvent'] = $(element).attr('data-has-event')
			}
			buttonController(params);
			$(".show-step").removeClass("show-step")
			$(".overlay").css("display", "block")
			$(element).addClass("show-step")
			$("#step-content").html($(element).attr("data-content"))
			$('html, body').animate({
		        scrollTop: $(element).offset().top
		    }, 500)
		}
		//Ends Here

		//Plugin Controller
		var overlay = $("<div class='overlay'/>")
		var content = $("<div id='step-content'/>")
		var next = $("<button id='next'>Next</button>")
		var back = $("<button id='back'>Back</button>")
		var done = $("<button id='done'>Done</button>")
		var skip = $("<button id='skip'>Skip</button>")
		$(overlay).attr('style', 'position: fixed;display: none;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;	background-color: rgba(0,0,0,0.5);z-index: 2; cursor: pointer;')
		$(overlay).append(content)
		$(overlay).append(back)
		$(overlay).append(next)
		$(overlay).append(done)
		$(overlay).append(skip)
		$('body').prepend(overlay)
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
		$("#skip").on("click", function(){
			if(index>0 && index<elements.length){
				index++;
			}
				showStep(index)
		})
		//Ends Here
	}
	}( jQuery ));