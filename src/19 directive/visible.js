function parseDisplay(nodeName, val) {
    //用于取得此类标签的默认display值
    var key = "_" + nodeName
    if (!parseDisplay[key]) {
        var node = DOC.createElement(nodeName)
        root.appendChild(node)
        if (W3C) {
            val = getComputedStyle(node, null).display
        } else {
            val = node.currentStyle.display
        }
        root.removeChild(node)
        parseDisplay[key] = val
    }
    return parseDisplay[key]
}

avalon.parseDisplay = parseDisplay

avalon.directive("visible", {
    init: noop,
    is: function (a, b) {
        return Boolean(a) === Boolean(b)
    },
    change: function (val, binding) {
        var elem = binding.element
        if (!elem || elem.disposed)
            return
        elem.isShow = val
        addHooks(this, binding)
    },
    update: function (elem, vnode) {
        if (vnode.isShow) {
            elem.style.display = vnode.displayValue || ""
            if (avalon(elem).css("display") === "none") {
                elem.style.display = vnode.displayValue = parseDisplay(elem.nodeName)
            }
        } else {
            elem.style.display = "none"
        }
    }
})