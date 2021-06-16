import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
// import HTMLAttribute from '@/classes/HTMLAttribute';
import iHTMLAttribute from "./iHTMLAttribute";

export default interface iTreeElement {
	id: string;
	root: boolean;
	element: SupportedHTMLElement,
	alias: string;
    attributes: Array<iHTMLAttribute>;
	children: Array<string>;
};
