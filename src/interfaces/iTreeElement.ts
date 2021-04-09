export default interface iTreeElement {
	type: string;
	alias: string;
	id: string;
	children: Array<iTreeElement>;
};
