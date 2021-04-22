import SupportedHTMLElement from "@/classes/SupportedHTMLElement";

export default interface iTreeElement {
	id: string;
	root: boolean;
	element: SupportedHTMLElement,
	alias: string;
	children: Array<iTreeElement>;
};
