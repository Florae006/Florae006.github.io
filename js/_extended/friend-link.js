
// 定义一个生成随机背景色的函数
const randomHex = () => `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.5)`;

// 遍历所有已经存在的盒子，为每个盒子设置随机背景色
document.querySelectorAll('.friend-link-div').forEach(div => {
    div.style.background = randomHex();
});

// 定义一个回调函数，用于处理每当DOM树中添加新节点时的操作
const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                // 检查是否为目标盒子节点
                if (node.nodeType === 1 && node.classList.contains('friend-link-div')) {
                    // 更改背景色
                    node.style.background = randomHex();
                }
            });
        }
    }
};

// 创建MutationObserver实例
const observer = new MutationObserver(callback);

// 配置观察选项：观察子节点的添加
const config = { childList: true, subtree: true };

// 选择要观察变化的DOM节点（在这个例子中，是body，但你可以根据需要更改）
const targetNode = document.body;

// 启动观察
observer.observe(targetNode, config);