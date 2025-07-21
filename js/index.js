import calculateOperation from "./operation.js";
import {
	resetDisplay,
	setDisplay,
	subDisplay,
	appendNumber,
	setOperator,
	VALID_NUMBERS,
	VALID_OPERATORS,
} from "./input.js";
import { showError, removeError } from "./error.js";
import saveHistory from "./history.js";

// 상태 변수들 (이 모듈 안에서만 관리됨)
let history = []; // 계산 기록을 저장할 배열
let currentInput = "0"; // 현재 입력된 숫자나 연산자를 저장하는 변수
let firstNumber = null; // 첫 번째 숫자를 저장하는 변수
let operator = null; // 현재 입력된 숫자, 연산자, 첫 번째 숫자를 저장하는 변수들
let isError = false; // 에러 상태를 나타내는 변수
let waitForNewNumber = false;

// DOM 요소들
const displayElement = document.getElementById("display");
const resultElement = document.getElementById("result");

// 디스플레이 업데이트 함수
const updateDisplay = (text) => {
	displayElement.textContent = setDisplay(text);
};

// 모든 상태 초기화 및 디스플레이 엡데이트
const initializeCalculator = () => {
	history = [];
	currentInput = resetDisplay();
	firstNumber = null;
	operator = null;
	waitForNewNumber = false;
	updateDisplay(currentInput);
	removeError(); // 에러 메시지 제거
	resultElement.classList.add("d-none"); // 결과 영역 숨김
	resultElement.textContent = "";
};

// 숫자 입력처리
const handleNumberInput = (number) => {
	removeError(); // 에러 메시지 clear
	if (waitForNewNumber) {
		// 새 숫자를 입력할 때 이전 입력을 초기화
		currentInput = number;
		waitForNewNumber = false;
	} else {
		currentInput = appendNumber(number, currentInput);
	}
	updateDisplay(currentInput);
};

// 연산자 입력 처리
const handleOperatorInput = (op) => {
	removeError(); // 에러 메시지 clear
	if (operator === "*" && op === "*") {
		// 연산자가 이미 있고, 새 숫자 입력 대기 중이면 연산자만 교체
		operator = "**";
		return;
	}

	if (firstNumber === null) {
		firstNumber = Number(currentInput);
	} else if (!waitForNewNumber) {
		calculate();
		firstNumber = Number(currentInput);
	}

	operator = op;
	waitForNewNumber = true;
	resultElement.classList.add("d-none");
};
// 백스페이스 처리
const handleBackspace = () => {
	removeError;
	if (!waitForNewNumber) {
		currentInput = subDisplay(currentInput);
		updateDisplay(currentInput);
	}
};

export function calculate() {
	try {
		if (firstNumber === null || operator === null || !currentInput) {
			if (firstNumber === null || operator === null || !currentInput) {
				// isError = true;
				currentInput = String(firstNumber);
			} else {
				throw new Error("계산에 필요한 값이 부족합니다.");
			}
		}
		const secondNumber = Number(currentInput);
		if (isNaN(secondNumber)) {
			// isError = true;
			throw new Error("유효한 숫자를 입력하세요.");
		}
		const result = calculateOperation(firstNumber, secondNumber, operator);
		saveHistory(firstNumber, operator, secondNumber, result, history);
		resultElement.textContent = `결과: ${result}`;
		resultElement.classList.remove("d-none", "alert-danger");
		resultElement.classList.add("alert-info");
		// resultElement.textContent = `결과: ${result}`;
		currentInput = String(result);
		updateDisplay("0");

		// resetDisplay();
		firstNumber = null;
		operator = null;
		waitForNewNumber = true;
	} catch (error) {
		showError(error.message);
		firstNumber = null;
		operator = null;
		waitForNewNumber = false;
	}
}

export {
	calculateOperation,
	resetDisplay,
	setDisplay,
	subDisplay,
	appendNumber,
	setOperator,
	showError,
	removeError,
	saveHistory,
	handleBackspace,
	handleNumberInput,
	handleOperatorInput,
	initializeCalculator,
	VALID_NUMBERS,
	VALID_OPERATORS,
	history,
	currentInput,
	firstNumber,
	operator,
	isError,
};
