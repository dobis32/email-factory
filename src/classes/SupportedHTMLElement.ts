import iHTMLAttribute from "@/interfaces/iHTMLAttribute";

export default class SupportedHTMLElement {
    private _elementID: string;
    private _elementAlias: string;
    private _elementType: string;
    private _isRoot: boolean;
    private _attributes: Array<iHTMLAttribute>
    private _children: Array<string>

    constructor(id: string, alias: string, type: string, root: boolean, attributes: Array<iHTMLAttribute>,  children: Array<string>) {
        this._elementID = id;
        this._elementAlias = alias;
        this._elementType = type;
        this._isRoot = root;
        this._attributes = attributes;
        this._children = children;
    }

    getElementID(): string {
        return this._elementID;
    }

    getElementAlias(): string {
        return this._elementAlias;
    }

    setElementAlias(alias: string) {
        this._elementAlias = alias;
    }

    getElementType(): string {
        return this._elementType;
    }

    elementIsARoot(): boolean {
        return this._isRoot;
    }

    getElementAttributes(): Array<iHTMLAttribute> {
        return this._attributes;
    }

    setElementAttributes(atts: Array<iHTMLAttribute>): void {
        this._attributes = atts;
    }

    getElementChildren(): Array<string> {
        return this._children;
    }

    setElementChildren(updatedChildren: Array<string>): void {
        this._children = updatedChildren;
    }

    getHTML(attributes: Array<iHTMLAttribute>): string {
        // TODO unit test; unit test the element-text functionality too
        const textContentAttribute = 'element-text';
        const elementText = attributes.find((att: iHTMLAttribute) => att.name === textContentAttribute) as iHTMLAttribute;
        const inlineAttributes = attributes.filter((att: iHTMLAttribute) => att.name !== textContentAttribute) as Array<iHTMLAttribute>;
        let output = '';
        output += `<${this._elementType}`;
        inlineAttributes.forEach((att: iHTMLAttribute) => {
            if (att.name !== 'element-text') output +=  ` ${att.name}="${att.value}"`
        });
        output += '>';
        output += `${elementText ? elementText.value : ''}`;
        output += ` </${this._elementType}>`;
        return output;
    }
}