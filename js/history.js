// 계산 기록 저장
export default function saveHistory(
	firstNumber,
	operator,
	secondNumber,
	result,
	history
) {
	const record = { firstNumber, operator, secondNumber, result };
	history.push(record);
	console.log("계산 기록:", JSON.stringify(history, null, 2));
	return history;
}
