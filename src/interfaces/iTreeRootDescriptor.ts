import iElementDescriptor from "@/interfaces/iElementDescriptor";
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import HTMLAttribute from "@/classes/HTMLAttribute";

export default interface iTreeRootDescriptor {
    id: string;
	root: boolean;
	element: SupportedHTMLElement,
	alias: string;
	children: Array<iElementDescriptor>;
	attributes: Array<HTMLAttribute>;
}