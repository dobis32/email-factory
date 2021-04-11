import iAddSiblingPayload from "@/interfaces/iAddSiblingPayload";
import iTreeElement from "@/interfaces/iTreeElement";
   
export default {
    addElementSibling: (context: any, payload: iAddSiblingPayload) => {
        const { elementToAdd, parentid, pre } = payload;
        const updatedTree: Array<iTreeElement> = context.state.elementTree;
        const parent = findElement(updatedTree, parentid)
        if(parent != undefined) {
            if(!pre) parent?.children.push(elementToAdd);
            else parent.children = [elementToAdd, ...parent.children]
            context.commit('updateElementTree', updatedTree);
        }
        else console.log('parent does not exist!');
    }    
}


const findElement = function(tree: Array<iTreeElement>, targetid: string): iTreeElement | undefined {
    let elements = [...tree]
    let targetEl: iTreeElement | undefined = undefined;
    while(elements.length) {
        const el: iTreeElement | undefined = elements.shift();
        if (el?.id == targetid) {
            targetEl = el;
            elements = []; // break the loop
        } else el?.children.forEach((child: iTreeElement) => elements.push(child))
    }
    return targetEl;
}