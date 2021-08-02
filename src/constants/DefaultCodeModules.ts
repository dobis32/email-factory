import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import CodeModule from '@/classes/CodeModule';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';

const moduleAHeroTable = new SupportedHTMLElement(
    'Module-A-HeroTable'
    , 'heroTable'
    , 'table'
    , true
    , [
        
        {
            name: 'width',
            value: '600'
        } as iHTMLAttribute,
        {
            name: 'align',
            value: 'center'
        } as iHTMLAttribute,
    ]  
    , [
        'Module-A-HeroTR-1'
    ]
     
);

const moduleAHeroTR = new SupportedHTMLElement(
    'Module-A-HeroTR-1'
    , 'heroTR_1'
    , 'tr'
    , false
    , [ ]  
    , [
        'Module-A-HeroTD-1'
    ]
     
);

const defaultmoduleAHeroTD = new SupportedHTMLElement(
    'Module-A-HeroTD-1'
    , 'initTD'
    , 'td'
    , false
    , [ ]  
    , [
        'Module-A-HeroIMG'
    ]
     
);

const defaultmoduleAHeroIMG = new SupportedHTMLElement(
    'Module-A-HeroIMG'
    , 'initP'
    , 'p'
    , false
    , [ {
        name: 'style',
        value: 'font-size: 0; line-height: 0; width: 600px; height: auto;'
    } as iHTMLAttribute,
    {
        name: 'width',
        value: '600'
    } as iHTMLAttribute, ]  
    , [ ]
);

export const CODE_MODULE_A: CodeModule = new CodeModule('ModuleA', 'Module A',  [
    moduleAHeroTable, moduleAHeroTR, defaultmoduleAHeroTD, defaultmoduleAHeroIMG
  ]  as Array<SupportedHTMLElement>);

const moduleBHeroTable_Root = new SupportedHTMLElement(
    'Module-B-HeroTable'
    , 'heroTable'
    , 'table'
    , true
    , [
        
        {
            name: 'width',
            value: '600'
        } as iHTMLAttribute,
        {
            name: 'align',
            value: 'center'
        } as iHTMLAttribute,
    ]  
    , [
        'Module-B-HeroTR-1'
    ]
     
);

const moduleBHeroTR_1 = new SupportedHTMLElement(
    'Module-B-HeroTR-1'
    , 'heroTR'
    , 'table'
    , false
    , []  
    , [
        'Module-B-HeroTD-1'
    ]
     
);

const moduleBHeroTD_1 = new SupportedHTMLElement(
    'Module-B-HeroTD-1'
    , 'heroTD'
    , 'table'
    , false
    , []  
    , [
        'Module-B-CTA-1-table'
    ]
     
);

const moduleBCTA1_Table = new SupportedHTMLElement(
    'Module-B-CTA-1-table'
    , 'heroCTA_table'
    , 'table'
    , false
    , []  
    , [
       'Module-B-CTA-1-tr'
    ]
     
);

const moduleBCTA1_TR = new SupportedHTMLElement(
    'Module-B-CTA-1-tr'
    , 'heroCTA_tr'
    , 'table'
    , false
    , []  
    , [
        'Module-B-CTA-1-td'
    ]
     
);

const moduleBCTA1_TD = new SupportedHTMLElement(
    'Module-B-CTA-1-td'
    , 'heroCTA_td'
    , 'table'
    , false
    , []  
    , [
       
    ]
     
);

export const CODE_MODULE_B: CodeModule = new CodeModule('ModuleB', 'Module B',  [
    moduleBHeroTable_Root, moduleBHeroTR_1, moduleBHeroTD_1, moduleBCTA1_Table, moduleBCTA1_TR, moduleBCTA1_TD
  ]  as Array<SupportedHTMLElement>);

export const DUMMY_PLACEHOLDER_MODULE = new CodeModule('','',[]);