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

    getAttributeData(): iHTMLAttribute {
        return { name: this._attributeName, value: this._attributeValue };
    }
}