import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/index.js',
    dest: 'dist/svg-utils.js',
    format: 'umd',
    moduleName: 'SvgUtils',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        })
    ]
};