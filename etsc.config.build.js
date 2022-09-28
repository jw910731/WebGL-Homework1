module.exports = {
    esbuild: {
        entryPoints: ['./src/index.ts'],
        minify: true,
        target: "es6",
        bundle: true,
        sourcemap: true,
    },
}