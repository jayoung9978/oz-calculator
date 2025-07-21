// js/main.js (내가 이전에 제시했던 코드 그대로!)
import {
	calculate,
	VALID_NUMBERS,
	VALID_OPERATORS,
	initializeCalculator,
	handleNumberInput,
	handleOperatorInput,
	handleBackspace,
} from "./index.js"; // index.js에서 필요한 함수들을 import

document.addEventListener("DOMContentLoaded", () => {
	// let initializeCalculator; // 페이지 로드 시 계산기 초기화

	// 숫자, 연산자, 지우기, 계산 등 버튼 클릭 이벤트 처리
	document.querySelectorAll(".buttons button, .calc-btn").forEach((button) => {
		// .calc-btn 클래스를 가진 버튼들도 포함
		button.addEventListener("click", () => {
			const type = button.dataset.type; // data-type 속성 읽기
			const value = button.dataset.value; // data-value 속성 읽기

			try {
				if (type === "number") {
					handleNumberInput(value);
				} else if (type === "operator") {
					handleOperatorInput(value);
				} else if (type === "equals") {
					calculate();
				} else if (type === "clear") {
					// 'C' 버튼 처리
					initializeCalculator();
				} else if (type === "backspace") {
					// '←' 백스페이스 버튼 처리
					handleBackspace();
				}
			} catch (error) {
				console.error("버튼 클릭 처리 중 에러:", error);
				// 에러는 index.js/error.js에서 처리하므로 여기서 별도 UI 처리는 하지 않음
			}
		});
	});

	// 키보드 입력 이벤트 처리
	document.addEventListener("keydown", (event) => {
		const key = event.key;

		// 기록용 배열 초기화
		if (!window.inputLog) window.inputLog = [];

		// 숫자 또는 연산자만 기록
		if (VALID_NUMBERS.includes(key) || VALID_OPERATORS.includes(key)) {
			window.inputLog.push(key);
		}
		if (key === "Enter") {
			window.inputLog.push("Enter");
			console.log(`[입력: ${window.inputLog.join(", ")}]`);
			window.inputLog = [];
		}

		try {
			if (VALID_NUMBERS.includes(key)) {
				handleNumberInput(key);
			} else if (VALID_OPERATORS.includes(key)) {
				handleOperatorInput(key);
			} else if (key === "Enter") {
				event.preventDefault(); // Enter 키 입력 시 기본 동작(폼 제출 등) 방지
				calculate();
			} else if (key === "Backspace") {
				handleBackspace();
			} else if (key === "Escape") {
				// 'Escape' 키로 전체 초기화
				initializeCalculator();
			}
		} catch (error) {
			console.error("키보드 입력 처리 중 에러:", error);
		}
	});
});
