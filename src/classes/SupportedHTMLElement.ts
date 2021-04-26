

export default class SupportedHTMLElement {
    private _validChildren: Array<string>;
    private _elementName: string;
    constructor(elementName: string, validChildren: Array<string>) {
        this._validChildren = validChildren;
        this._elementName = elementName;
    }

    getValidChildren(): Array<string> {
        return this._validChildren;
    }
    getElementType(): string {
        return this._elementName;
    }
    isValidChild(target: string): boolean {
        return this._validChildren.find((el: string) => el == target) ? true : false;
    }
}