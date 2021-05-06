import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { AChildren,
    ImgChildren,
    SpanChildren,
    TableChildren,
    TRChildren,
    THChildren,
    TDChildren,
    PChildren,
    HChildren } from '@/constants/HTMLChildren/index';
// TODO: figure out which elements <a> can be a sibling of; I think SFMC hoists/propagates <a> tags upwards
export const HTML_TABLE = new SupportedHTMLElement('table', TableChildren);
export const HTML_TR = new SupportedHTMLElement('tr', TRChildren);
export const HTML_TH = new SupportedHTMLElement('th', THChildren);
export const HTML_TD = new SupportedHTMLElement('td', TDChildren);
export const HTML_SPAN = new SupportedHTMLElement('span', SpanChildren);
export const HTML_A = new SupportedHTMLElement('a', AChildren); 
export const HTML_IMG = new SupportedHTMLElement('img', ImgChildren);
export const HTML_P = new SupportedHTMLElement('p', PChildren);
export const HTML_H1 = new SupportedHTMLElement('h1', HChildren);
export const HTML_H2 = new SupportedHTMLElement('h2', HChildren);
export const HTML_H3 = new SupportedHTMLElement('h3', HChildren);
export const HTML_H4 = new SupportedHTMLElement('h4', HChildren);
export const HTML_H5 = new SupportedHTMLElement('h5', HChildren);
export const HTML_H6 = new SupportedHTMLElement('h6', HChildren);

const supported:  Array<SupportedHTMLElement> = [ HTML_TABLE, HTML_TR, HTML_TH, HTML_TD, HTML_SPAN, HTML_A, HTML_IMG, HTML_P, HTML_H1, HTML_H2, HTML_H3, HTML_H4, HTML_H5, HTML_H6];

export default supported;