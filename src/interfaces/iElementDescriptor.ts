import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import HTMLAttribute from '@/classes/HTMLAttribute';

export default interface iElementDescriptor {
	id: string;
	root: boolean;
	element: SupportedHTMLElement,
	alias: string;
	children: Array<iElementDescriptor>;
	attributes: Array<HTMLAttribute>;
};
