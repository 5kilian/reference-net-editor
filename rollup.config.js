import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { uglify } from 'rollup-plugin-uglify';


let dest = process.env.DEST || 'dist';

export default {
    input: 'index.js',
    output: {
        file: dest + '/ref-net.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        commonjs(),
        serve('example'),
        livereload('example'),
        (dest !== 'example' && uglify()),
        babel({ exclude: 'node_modules/**' })
    ]
}

