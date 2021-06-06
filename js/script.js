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

				if ($(".order-box__group-step").hasClass("move-el")) {
					$(`.order-box__step[data-step="${currentStep}"]`).before($(`.item-bar[data-step="${currentStep + 1}"]`));
				}
			}
		}

		if ($(this).hasClass("--prev")) {
			if (currentStep > 1) {
				$(".order-box__step").removeClass("current");

				$(".item-bar").removeClass("current");

				$(".order-box__group-step").attr("data-current-step", currentStep - 1);

				$(`.order-box__step[data-step="${currentStep - 1}"]`).addClass("current");

				$(`.item-bar[data-step="${currentStep - 1}"]`).addClass("current");

				if ($(".order-box__group-step").hasClass("move-el")) {
					$(".order-box__bar").prepend($(`.item-bar[data-step="${currentStep}"]`));
				}
			}
		}

		disableButton();
	});

	let match = [window.matchMedia("(max-width: 768px)")];

	function moveItemBar() {
		if (match[0].matches) {
			$.each($(".item-bar"), function (index, val) {
				let elStep = $(val).attr("data-step");

				let currentStep = $(".order-box__group-step").attr("data-current-step");

				if (elStep <= currentStep) {
					$(`.order-box__step[data-step="${elStep}"]`).before($(val));
				}
			});

			$(".order-box__group-step").addClass("move-el");
		} else {
			$(".item-bar")
				.sort((a, b) => {
					var first = parseInt($(a).attr("data-step"));
					var second = parseInt($(b).attr("data-step"));
					return first < second ? -1 : first > second ? 1 : 0;
				})
				.appendTo($(".order-box__bar"));

			$(".order-box__group-step").removeClass("move-el");
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
