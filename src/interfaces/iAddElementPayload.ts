import iElementDescriptor from './iElementDescriptor';

export default interface iAddElementPayload {
	elementToAdd: iElementDescriptor;
	parentid: string;
	pre: boolean;
};
