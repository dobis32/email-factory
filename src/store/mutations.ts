import iTreeElement from "@/interfaces/iTreeElement"

export default {
    updateElementTree: (state: any, updatedTree: Array<iTreeElement>) => {
        state.elementTree = updatedTree;
    }
}