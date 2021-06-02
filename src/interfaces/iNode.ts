import HTMLAttribute from "@/classes/HTMLAttribute";

export default interface iNode {
    id: string;
    alias: string;
    type: string;
    root: boolean;
    attributes: Array<HTMLAttribute>;
    children: Array<iNode>;
}