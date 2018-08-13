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
				$(".back").removeAttr("disabled")
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
			$(".step_no").text($(element).attr('data-step'))
			$(".overlay").css("display", "block")
			$(element).addClass("show-step")
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
		var button_container = $("<div class='tour_content'/>")
		var next = $("<button class='next'>Next</button>")
		var back = $("<button class='back'>Back</button>")
		var done = $("<button class='done'>Done</button>").css("display", "none")
		var skip = $("<button class='skip'>Skip this Step</button>")
		var skip_all = $("<button class='skip_all'>Skip Demo</button>")
		var stepno = $("<span class='step_no' />")
		$(step).append(content)
		$(button_container).append(back)
		$(button_container).append(next)
		$(button_container).append(done)
		$(button_container).append(skip)
		$(button_container).append(skip_all)
		$(step).append(stepno)
		$(step).append(button_container)
		$('body').prepend(overlay)
		var elements = $("[data-step]")
		sortList();
		console.log(elements)
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
			$(".show-step").removeAttr("style")		
			$(".show-step").removeClass("show-step")
			$(".step").remove()
		})
		$(".skip_all").on("click", function(){
			$(".overlay").css("display", "none")
			$(".show-step").removeAttr("style")		
			$(".show-step").removeClass("show-step")
			$(".step").remove()
		})
		$(".skip").on("click", function(){
			if(elements[index-1].hasAttribute('data-branch')){
				var countSteps = $("[data-branch=" + index + "]").length -1
				if(index<elements.length){
					index += countSteps
				}
			}
			else if(index>0 && index<elements.length){
			index++;
		}
		if(index > elements.length){
			$(".overlay").css("display", "none")
			$(".show-step").removeAttr("style")		
			$(".show-step").removeClass("show-step")
			$(".step").remove()
		}
		else{
			showStep(index)
		}
		})
		//Ends Here
	}
	}( jQuery ));