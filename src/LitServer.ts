
export function html(strings: TemplateStringsArray, ...values: unknown[]) {
	const l = strings.length - 1;
	let html = '';
	for (let i = 0; i < l; i++) {
		let v = values[i];
		if (v instanceof Array) {
			v = v.join('');
		}
		html += strings[i] + v;
	}
	html += strings[l];
	return html;
}