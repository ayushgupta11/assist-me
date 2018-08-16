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
			$(".assist-skip").css("display","inline")
			if(i == elements.length){
				$(".assist-done").css("display", "inline")
				$(".assist-next").css("display","none")
				$(".assist-skip").css("display","none")
				$(".assist-back").removeAttr("disabled")
			}
			else if(i==1){
				$(".assist-done").css("display", "none")
				$(".assist-back").attr("disabled", "true")
				$(".assist-next").removeAttr("disabled")
			}
			else{
				$(".assist-done").css("display", "none")
				$(".assist-next").removeAttr("disabled")
				$(".assist-back").removeAttr("disabled")
			}
			if(params.hasOwnProperty('hasEvent') && params.hasEvent){
				$(".assist-next").css("display", "none")
			}
			else{
				$(".assist-next").css("display", "inline")
			}
		}
		var showStep = function(i){
			var element = elements[i-1]
			var params = {
				index: i
			}
			var css = '';
			$(element).append(step)
			if(element.hasAttribute('data-has-event')){
				params['hasEvent'] = $(element).attr('data-has-event')
			}
			if(element.hasAttribute('data-css')){
				css = $(element).attr('data-css')
			}
			buttonController(params);
			$(".assist-show-step").removeAttr("style")
			$(".assist-show-step").removeClass("assist-show-step")
			$(".assist-step_no").text($(element).attr('data-step'))
			$(".assist-overlay").css("display", "block")
			$(element).addClass("assist-show-step")
			if(css != ''){
			$(".assist-show-step").attr('style', css)
		}
			$("#assist-step-content").html($(element).attr("data-content"))
			$('html, body').animate({
		        scrollTop: $(element).offset().top
		    }, 500)
		}
		//Ends Here

		//Plugin Controller
		$(".assist-overlay").remove()
		var overlay = $("<div class='assist-overlay'/>")
		var step = $("<div class='assist-step' />")
		var content = $("<div id='assist-step-content'/>")
		var button_container = $("<div class='assist-tour_content'/>")
		var next = $("<button class='assist-next'>Next</button>")
		var back = $("<button class='assist-back'>Back</button>")
		var done = $("<button class='assist-done'>Done</button>").css("display", "none")
		var skip = $("<button class='assist-skip'>Skip this Step</button>")
		var skip_all = $("<button class='assist-skip_all'>Skip Demo</button>")
		var stepno = $("<span class='assist-step_no' />")
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
		$(".assist-next").on('click', function(){
			if(index>0 && index<elements.length){
			index++;
		}
			showStep(index)
		})
		$(".assist-back").on('click', function(){
			if(index>0 && index<=elements.length){
			index--;
			}
			showStep(index)
		})
		$(".assist-done").on("click", function(){
			$(".assist-overlay").css("display", "none")
			$(".assist-show-step").removeAttr("style")		
			$(".assist-show-step").removeClass("assist-show-step")
			$(".assist-step").remove()
		})
		$(".assist-skip_all").on("click", function(){
			$(".assist-overlay").css("display", "none")
			$(".assist-show-step").removeAttr("style")		
			$(".assist-show-step").removeClass("assist-show-step")
			$(".assist-step").remove()
		})
		$(".assist-skip").on("click", function(){
			if(elements[index-1].hasAttribute('data-branch') && elements[index-1].hasAttribute('data-has-event')){
				var branch_index = $(".assist-show-step").attr("data-branch")
				var countSteps = $("[data-branch=" + branch_index + "]").length
				if(index<elements.length && countSteps > 0){
					index += countSteps
				}
			}
			else if(index>0 && index<elements.length){
			index++;
		}
		if(index > elements.length){
			$(".assist-overlay").css("display", "none")
			$(".assist-show-step").removeAttr("style")		
			$(".assist-show-step").removeClass("assist-show-step")
			$(".assist-step").remove()
		}
		else{
			showStep(index)
		}
		})
		//Ends Here
	}
	}( jQuery ));