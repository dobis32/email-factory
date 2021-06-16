import iHTMLAttribute from "@/interfaces/iHTMLAttribute";

export default interface iNode {
    id: string;
    alias: string;
    type: string;
    root: boolean;
    attributes: Array<iHTMLAttribute>;
    children: Array<iNode>;
}