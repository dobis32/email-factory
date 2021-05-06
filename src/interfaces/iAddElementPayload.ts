import iTreeElement from './iTreeElement';

export default interface iAddElementPayload {
	elementToAdd: iTreeElement;
	parentid: string;
	pre: boolean;
};
