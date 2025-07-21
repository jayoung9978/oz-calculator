// 에러 처리 함수
const showError = (message) => {
	const resultElement = document.getElementById("result");
	// 기능 구현
	resultElement.textContent = `에러: ${message}`;
	resultElement.classList.remove("d-none", "alert-info");
	resultElement.classList.add("alert-danger");
};

const removeError = () => {
	// 에러 메시지 제거 함수
	const resultElement = document.getElementById("result"); // 에러 메시지를 표시하는 요소를 가져옵니다.
	// 기능 구현
	resultElement.textContent = "";
	resultElement.classList.add("d-none"); // 에러 메시지를 제거
	resultElement.classList.remove("alert-danger", "alert-info"); // 기존 클래스 제거
};

export { showError, removeError };
