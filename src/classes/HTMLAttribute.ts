import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
export default class HTMLAttribute {
    private _attributeName: string;
    private _attributeValue: string;

    /**
     *
     */
    constructor(attName: string, attValue: string) {
        this._attributeName = attName;
        this._attributeValue = attValue;
    }

    getAttribute(): iHTMLAttribute {
        return { attributeName: this._attributeName, attributeValue: this._attributeValue };
    }
}