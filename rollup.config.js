import copy from 'rollup-plugin-copy'

export default {
    input: 'src/main.js',
    output: {
        file: 'build/js/gomori.js',
        format: 'iife',
        name: 'ModLoader',
    },
    plugins: [
        copy({
            targets: [
                { src: 'static/index.html', dest: 'build/' },
                { src: 'static/js/*.js', dest: 'build/js/' },
                { src: 'static/js/libs/adm-zip', dest: 'build/js/libs/' },
            ]
        })
    ],
}
