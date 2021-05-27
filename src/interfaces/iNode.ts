export default interface iNode {
    id: string;
    alias: string;
    type: string;
    root: boolean;
    children: Array<iNode>;
}