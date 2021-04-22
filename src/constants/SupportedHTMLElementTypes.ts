import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

// TODO: figure out which elements <a> can be a sibling of; I think SFMC hoists/propagates <a> tags upwards
export const HTML_TABLE = new SupportedHTMLElement('table', ['tr']);
export const HTML_TR = new SupportedHTMLElement('tr', ['td', 'th']);
export const HTML_TH = new SupportedHTMLElement('th', ['table', 'span', 'img', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ,'i', 'strong', 'b', 'u', 'strike']);
export const HTML_TD = new SupportedHTMLElement('td', ['table', 'span', 'img', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'strong', 'b', 'u', 'strike']);
export const HTML_SPAN = new SupportedHTMLElement('span', ['span', 'a', 'i', 'strong', 'b', 'u', 'strike']);
export const HTML_A = new SupportedHTMLElement('a', ['span', 'img', 'i', 'strong', 'b', 'u', 'strike']); 
export const HTML_IMG = new SupportedHTMLElement('img', []);
export const HTML_P = new SupportedHTMLElement('p', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H1 = new SupportedHTMLElement('h1', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H2 = new SupportedHTMLElement('h2', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H3 = new SupportedHTMLElement('h3', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H4 = new SupportedHTMLElement('h4', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H5 = new SupportedHTMLElement('h5', ['i', 'strong', 'b', 'u', 'strike']);
export const HTML_H6 = new SupportedHTMLElement('h6', ['i', 'strong', 'b', 'u', 'strike']);

const supported:  Array<SupportedHTMLElement> = [ HTML_TABLE, HTML_TR, HTML_TH, HTML_TD, HTML_SPAN, HTML_A, HTML_IMG, HTML_P, HTML_H1, HTML_H2, HTML_H3, HTML_H4, HTML_H5, HTML_H6];

export default supported;