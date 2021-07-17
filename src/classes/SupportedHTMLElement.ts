import iHTMLAttribute from "@/interfaces/iHTMLAttribute";
import _TEXT_CONTENT_ATTRIBUTE_ from "@/constants/TextContentAttribute";
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
}