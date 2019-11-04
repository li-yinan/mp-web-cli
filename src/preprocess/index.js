import * as babel from '@babel/core';
import compReplace from './plugins/components-replace';
let options = {
    // ast: true,
    // code: true
    generatorOpts: {
        sourceMaps: true,
    },
    plugins: [
        compReplace
    ]
}
let code = `
    /* web-replace: ./bbb */
    import {aaa} from './aaa';
    let bbb = 1;
    aaa.exec(bbb);
`;
babel.transform(code, options, function(err, result) {
    console.log(code);
    console.log(result.code);
});
