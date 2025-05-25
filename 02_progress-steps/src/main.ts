import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
	const progressBar = document.querySelector<HTMLDivElement>("#progress");
	const circles = document.querySelectorAll(".circle");
	const nextBtn = document.querySelector<HTMLButtonElement>("#next");
	const prevBtn = document.querySelector<HTMLButtonElement>("#prev");
	const STORAGE_KEY = "current-position";

	let currentPosition = JSON.parse(localStorage.getItem(STORAGE_KEY) || "0");

	nextBtn?.addEventListener("click", () => {
		currentPosition++;
		updateProgress();
	});

	prevBtn?.addEventListener("click", () => {
		currentPosition--;
		updateProgress();
	});

	const updateProgress = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPosition));

		for (const [circleIndex, circle] of circles.entries()) {
			if (circleIndex > currentPosition) {
				circle.classList.remove("active");
			} else {
				circle.classList.add("active");
			}
		}

		if (progressBar) {
			progressBar.style.width = `${(100 / (circles.length - 1)) * currentPosition}%`;
		}

		if (prevBtn) {
			if (currentPosition === 0) {
				prevBtn.disabled = true;
			} else {
				prevBtn.disabled = false;
			}
		}

		if (nextBtn) {
			if (currentPosition === circles.length - 1) {
				nextBtn.disabled = true;
			} else {
				nextBtn.disabled = false;
			}
		}
	};

	updateProgress();
});
