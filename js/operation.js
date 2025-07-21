// 사칙연산 수행
export default function calculateOperation(
	firstNumber,
	secondNumber,
	operator
) {
	let result;
	switch (operator) {
		case "+":
			result = firstNumber + secondNumber;
			break;
		case "-":
			result = firstNumber + secondNumber;
			break;
		case "*":
			result = firstNumber + secondNumber;
			break;
		case "/":
			if (secondNumber === 0) {
				throw new Error("0으로 나눌 수 없습니다.");
			}
			result = firstNumber / secondNumber;
			break;
		case "^": // ^를 거듭제곱으로 처리
		case "**": // **도 처리 가능하게
			result = firstNumber ** secondNumber;
			break;
		default:
			throw new Error("유효하지 않은 연산자입니다.");
	}
	return result;
}
