import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import HTMLAttribute from '@/classes/HTMLAttribute';

export default interface iTreeElement {
	id: string;
	root: boolean;
	element: SupportedHTMLElement,
	alias: string;
	children: Array<iTreeElement>;
	attributes: Array<HTMLAttribute>;
};
