// 입력 처리 함수
const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const VALID_OPERATORS = ["+", "-", "*", "/"];

const resetDisplay = () => {
	// 기능 구현
	return "0";
};

const setDisplay = (text) => {
	// 기능 구현
	if (text.length > 15) {
		return text.substring(0, 15);
	}
	return text;
};

const subDisplay = (currentInput) => {
	// 기능구현
	return currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
};

const appendNumber = (number, currentInput) => {
	if (!VALID_NUMBERS.includes(number))
		throw new Error("유효한 숫자를 입력하세요.");
	if (number === "." && currentInput.includes(".")) {
		return currentInput; // 이미 소수점이 있는 경우에는 추가하지 않음
	}
	if (currentInput === "0" && number !== ".") {
		return setDisplay(number); // 0으로 시작하는 경우, 입력된 숫자를 대체
	}
	return setDisplay(currentInput + number); // 현재 입력값에 숫자를 추가하고, 디스플레이를 업데이트
};

const setOperator = (op, currentInput) => {
	if (!VALID_OPERATORS.includes(op))
		throw new Error("유효한 연산자를 선택하세요.");
	if (!currentInput) throw new Error("숫자를 먼저 입력하세요.");
	return op;
	// curentInput이 숫자로 끝나지 않으면 연산자 중복 입력을 방지
	// return setDisplay(currentInput + " " + op);
	// return op; // 연산자를 설정하는 로직을 추가할 수 있습니다.
};

export {
	resetDisplay,
	setDisplay,
	subDisplay,
	appendNumber,
	setOperator,
	VALID_NUMBERS,
	VALID_OPERATORS,
};
