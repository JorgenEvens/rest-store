export default
function transformable(fn) {
    const transformations = [];

    function exec() {
        return transformations.reduce((r, f) => {
            return f.call(this, r);
        }, fn.call(this));
    }

    function transform(t) {
        transformations.push(t);
        return exec;
    }

    fn.transform = transform;
    exec.transform = transform;

    return fn;
}
