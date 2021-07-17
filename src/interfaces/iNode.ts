import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iHTMLAttribute from "@/interfaces/iHTMLAttribute";

export default interface iNode {
    element: SupportedHTMLElement
    children: Array<iNode>
}