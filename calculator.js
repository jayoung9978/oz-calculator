let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
	try {
		if (!/^[0-9]$/.test(number)) throw new Error("유효한 숫자를 입력하세요.");
		currentInput += number;
		updateDisplay();
	} catch (error) {
		showError(error.message);
	}
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
	try {
		const operators = ["+", "-", "*", "/"];
		if (!operators.includes(op)) throw new Error("유효한 연산자를 선택하세요.");
		if (!currentInput && firstNumber === null)
			throw new Error("숫자를 먼저 입력하세요.");

		if (firstNumber === null) {
			firstNumber = Number(currentInput);
			if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");
		} else if (operator && currentInput) {
			// 연속 연산 지원: 이전 결과로 연산
			calculate();
			firstNumber = Number(currentInput);
		}
		operator = op;
		currentInput = "";
		updateDisplay();
	} catch (error) {
		showError(error.message);
	}
};

// 디스플레이 업데이트 (수식 표시)
function updateDisplay() {
	const display = document.getElementById("display");
	let text = "";
	if (firstNumber !== null) text += firstNumber;
	if (operator) text += " " + operator + " ";
	if (currentInput) text += currentInput;
	if (!text) text = "0";
	display.textContent = text;
}

// 초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
	currentInput = "";
	firstNumber = null;
	operator = null;
	updateDisplay();
	hideError();
};

// 계산 실행
const calculate = () => {
	try {
		if (firstNumber === null || operator === null || !currentInput) {
			throw new Error("계산에 필요한 값이 부족합니다.");
		}
		let secondNumber = Number(currentInput);
		if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");
		if (operator === "/" && secondNumber === 0)
			throw new Error("0으로 나눌 수 없습니다.");

		var result;
		switch (operator) {
			case "+":
				result = firstNumber + secondNumber;
				break;
			case "-":
				result = firstNumber - secondNumber;
				break;
			case "*":
				result = firstNumber * secondNumber;
				break;
			case "/":
				result = firstNumber / secondNumber;
				break;
			default:
				throw new Error("유효하지 않은 연산자입니다.");
		}

		// 계산 기록 저장
		const record = { firstNumber, operator, secondNumber, result };
		history.push(record);
		console.log("계산 기록:", JSON.stringify(history, null, 2));

		// 결과 및 기록 표시
		showResult(result);
		renderHistory();

		// 계산 후 초기화 (결과를 다음 입력의 첫 숫자로)
		currentInput = result.toString();
		firstNumber = null;
		operator = null;
		updateDisplay();
	} catch (error) {
		showError(error.message);
	}
};

// 결과 표시 (수식 아래)
function showResult(result) {
	let resultDiv = document.getElementById("calc-result");
	if (!resultDiv) {
		resultDiv = document.createElement("div");
		resultDiv.id = "calc-result";
		resultDiv.className = "alert alert-info mt-2";
		const display = document.getElementById("display");
		display.parentNode.insertBefore(resultDiv, display.nextSibling);
	}
	resultDiv.className = "alert alert-info mt-2";
	resultDiv.textContent = `결과: ${result}`;
}

// 에러 메시지 표시
const showError = (message) => {
	let resultDiv = document.getElementById("calc-result");
	if (!resultDiv) {
		resultDiv = document.createElement("div");
		resultDiv.id = "calc-result";
		resultDiv.className = "alert alert-danger mt-2";
		const display = document.getElementById("display");
		display.parentNode.insertBefore(resultDiv, display.nextSibling);
	}
	resultDiv.className = "alert alert-danger mt-2";
	resultDiv.textContent = `에러: ${message}`;
};

// 에러 메시지 숨기기
function hideError() {
	const resultDiv = document.getElementById("calc-result");
	if (resultDiv) resultDiv.remove();
}

// 계산 기록 표시 (리스트형, 클릭시 결과값을 수식에 반영)
function renderHistory() {
	let historyDiv = document.getElementById("history");
	if (!historyDiv) {
		historyDiv = document.createElement("div");
		historyDiv.id = "history";
		historyDiv.className = "mt-3";
		const container = document.querySelector(".calculator-container");
		container.appendChild(historyDiv);
	}
	let html = "<strong>기록:</strong><ul style='padding-left:1.2em'>";
	for (let i = history.length - 1; i >= 0; i--) {
		const h = history[i];
		html += `<li style="cursor:pointer" onclick="useHistoryResult(${h.result})">${h.firstNumber} ${h.operator} ${h.secondNumber} = <strong>${h.result}</strong></li>`;
	}
	html += "</ul>";
	historyDiv.innerHTML = html;
}

// 기록 클릭 시 결과값을 수식 입력칸으로 가져오기
function useHistoryResult(result) {
	currentInput = result.toString();
	firstNumber = null;
	operator = null;
	updateDisplay();
	hideError();
}
