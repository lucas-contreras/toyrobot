/**
 * Remove all spaces inside of string
 * @param {*} value 
 */
export function removeAllSpaces(value = "") {
	return (value || "").replace(/\s/g, "");
}
