export default {
    treeData: [
        {
            id: 'foo',
            root: true,
            type: 'table',
            alias: 'rootTable',
            children: [
                {
                    id: 'bar',
                    root: false,
                    type: 'tr',
                    alias: 'rootTR',
                    children: [
                        {
                            id: 'fizz',
                            root: false,
                            type: 'td',
                            alias: 'rootTD',
                            children: [
                                {
                                    id: 'buzz',
                                    root: false,
                                    type: 'p',
                                    alias: 'rootP',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    modalState: true,
    activeModal: '',
    modalcb: () => { return; }
}