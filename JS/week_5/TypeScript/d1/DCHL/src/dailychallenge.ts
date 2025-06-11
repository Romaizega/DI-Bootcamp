function validateUnionType(value: any, allowedTypes: string[]): boolean {
    return allowedTypes.includes(typeof value);

}
console.log(validateUnionType("Hello", ["string"])); 
console.log(validateUnionType(1, ["number", "string"]));
console.log(validateUnionType({}, ["object"]));
console.log(validateUnionType(undefined, ["undefined"]));
