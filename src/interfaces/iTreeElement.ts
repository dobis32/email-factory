export default interface iTreeElement {
	id: string;
	root: boolean;
	type: string;
	alias: string;
	children: Array<iTreeElement>;
};
