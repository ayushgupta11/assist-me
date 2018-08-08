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
			$(".skip").css("display","inline")
			if(i == elements.length){
				$(".done").css("display", "inline")
				$(".next").attr("disabled", "true")
				$(".skip").css("display","none")
			}
			else if(i==1){
				$(".done").css("display", "none")
				$(".back").attr("disabled", "true")
				$(".next").removeAttr("disabled")
			}
			else{
				$(".done").css("display", "none")
				$(".next").removeAttr("disabled")
				$(".back").removeAttr("disabled")
			}
			if(params.hasOwnProperty('hasEvent') && params.hasEvent){
				$(".next").css("display", "none")
			}
			else{
				$(".next").css("display", "inline")
			}
		}
		var showStep = function(i){
			var element = elements[i-1]
			var params = {
				index: i
			}
			$(element).append(step)
			if(element.hasAttribute('data-has-event')){
				params['hasEvent'] = $(element).attr('data-has-event')
			}
			buttonController(params);
			$(".show-step").removeAttr("style")
			$(".show-step").removeClass("show-step")
			$(".overlay").css("display", "block")
			$(element).addClass("show-step")
			$(".show-step").attr("style","background:white;opacity: 1;z-index:3;padding: 20px;border-radius: 5px;")
			$("#step-content").html($(element).attr("data-content"))
			$('html, body').animate({
		        scrollTop: $(element).offset().top
		    }, 500)
		}
		//Ends Here

		//Plugin Controller
		$(".overlay").remove()
		var overlay = $("<div class='overlay'/>")
		var step = $("<div class='step' />")
		var content = $("<div id='step-content'/>")
		var next = $("<button class='next'>Next</button>")
		var back = $("<button class='back'>Back</button>")
		var done = $("<button class='done'>Done</button>").css("display", "none")
		var skip = $("<button class='skip'>Skip</button>")
		//var stepno = $("<div class='step-info' />")
		//$(".step-info").attr('style','border-radius: 50%;padding: 5px;position:absolute;top:0;left:0;')
		$(overlay).attr('style', 'position: fixed;display: none;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;	background-color: rgba(0,0,0,0.5);z-index: 2; cursor: pointer;')
		$(step).append(content)
		$(step).append(back)
		$(step).append(next)
		$(step).append(done)
		$(step).append(skip)
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
		$(".next").on('click', function(){
			if(index>0 && index<elements.length){
			index++;
		}
			showStep(index)
		})
		$(".back").on('click', function(){
			if(index>0 && index<=elements.length){
			index--;
			}
			showStep(index)
		})
		$(".done").on("click", function(){
			$(".overlay").css("display", "none")
			$(".step").remove()
		})
		$(".skip").on("click", function(){
			$(".overlay").css("display", "none")
			$(".step").remove()
		})
		//Ends Here
	}
	}( jQuery ));