import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
export default class CodeModule {
    private _name: string;
    private _id: string;
    private _treeData: Array<SupportedHTMLElement>;

    // TODO add preferences
    
    constructor(id: string, name: string, treeData: Array<SupportedHTMLElement>) {
        this._id = id;
        this._name = name;
        this._treeData = treeData;
    }

    setModuleTreeData(data: Array<SupportedHTMLElement>): void {
        this._treeData = data;
    }

    getModuleTreeData(): Array<SupportedHTMLElement> {
        return this._treeData;
    }

    setModuleID(id: string): void {
        this._id = id;
    }

    getModuleID(): string {
        return this._id;
    }

    setModuleName(name: string): void {
        this._name = name;
    }

    getModuleName(): string {
        return this._name;
    }
}