var poploginDialog = require('@/page/login/popLogin')
var mobButton = require('@/components/common/mobButton')
const components = [
    poploginDialog,
    mobButton
];
const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};
//配对使用require和module.exports以及import和export default
module.exports = {
    install,
}