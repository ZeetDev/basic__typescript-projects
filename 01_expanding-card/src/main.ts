import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
	const boxes = document.querySelectorAll(".box");
	const ACTIVE_CLASS = "box-active";
	const STORAGE_KEY = "box-position";

	for (const [boxIndex, box] of boxes.entries()) {
		box?.addEventListener("click", () => {
			removeActiveClass();
			storeIntoLocalStorage(boxIndex);
			box.classList.add(ACTIVE_CLASS);
		});
	}

	const removeActiveClass = () => {
		for (const box of boxes) {
			box.classList.remove(ACTIVE_CLASS);
		}
	};

	const storeIntoLocalStorage = (boxIndex?: number) => {
		if (boxIndex !== undefined && boxIndex !== null && boxIndex >= 0) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(boxIndex));
		}
		const getIndex = JSON.parse(localStorage.getItem(STORAGE_KEY) || "0");
		boxes[getIndex].classList.add(ACTIVE_CLASS);
	};

	storeIntoLocalStorage();
});
