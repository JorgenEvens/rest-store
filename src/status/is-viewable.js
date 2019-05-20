import isPending from './is-pending';

export default
function isViewable(obj) {
    return !isPending(obj);
}
