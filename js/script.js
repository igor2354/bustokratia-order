$(document).ready(function () {
	function disableButton() {
		let currentStep = $(".order-box__group-step").attr("data-current-step");

		$(".order-box__button").removeClass("disabled");

		if (currentStep == 1) {
			$(".order-box__button.--prev").addClass("disabled");
		}

		if (currentStep == 3) {
			$(".order-box__button.--next").addClass("disabled");
		}
	}

	disableButton();

	$(".js-button-step").on("click", function () {
		let currentStep = parseInt($(".order-box__group-step").attr("data-current-step"));

		if ($(this).hasClass("--next")) {
			if (currentStep < 3) {
				$(".order-box__step").removeClass("current");

				$(".item-bar").removeClass("current");

				$(".order-box__group-step").attr("data-current-step", currentStep + 1);

				$(`.order-box__step[data-step="${currentStep + 1}"]`).addClass("current");

				$(`.item-bar[data-step="${currentStep + 1}"]`).addClass("current");
			}
		}

		if ($(this).hasClass("--prev")) {
			if (currentStep > 1) {
				$(".order-box__step").removeClass("current");

				$(".item-bar").removeClass("current");

				$(".order-box__group-step").attr("data-current-step", currentStep - 1);

				$(`.order-box__step[data-step="${currentStep - 1}"]`).addClass("current");

				$(`.item-bar[data-step="${currentStep - 1}"]`).addClass("current");
			}
		}

		disableButton();
	});

	let match = [window.matchMedia("(max-width: 768px)")];

	function moveItemBar() {
		if (match[0].matches) {
			$.each($(".item-bar"), function (index, val) {
				let elStep = $(val).attr("data-step");

				$(`.order-box__step[data-step="${elStep}"]`).before($(val));
			});
		} else {
			$.each($(".item-bar"), function (index, val) {
				$(".order-box__bar").append($(val));
			});
		}
	}

	moveItemBar();
	match[0].addListener(moveItemBar);

	$("input[type=tel]").inputmask({
		mask: "+7 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	});
});
