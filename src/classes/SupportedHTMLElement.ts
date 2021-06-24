import iHTMLAttribute from "@/interfaces/iHTMLAttribute";

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

    getHTML(attributes: Array<iHTMLAttribute>): string {
        // TODO unit test; unit test the element-text functionality too
        const textContentAttribute = 'element-text'
        const elementText = attributes.find((att: iHTMLAttribute) => att.name === textContentAttribute) as iHTMLAttribute;
        const inlineAttributes = attributes.filter((att: iHTMLAttribute) => att.name !== textContentAttribute) as Array<iHTMLAttribute>;
        let output = '';

        output += `<${this._elementName}`
        attributes.forEach((att: iHTMLAttribute) => {
            if (att.name !== 'element-text') output +=  ` ${att.name}="${att.value}"`
        });
        output += '>'
        output += `${elementText ? elementText.value : ''}`
        output += ` </${this._elementName}>`;
        return output;
    }
}