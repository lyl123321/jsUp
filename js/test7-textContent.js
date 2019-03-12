var e = document.createElement('div');
e.innerHTML = "<><div>dsf<script>sfd</script></div><>";
console.log(e.textContent);
console.log(e.innerText);
console.log(e.innerHTML);

https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

1\ Element.innerHTML 返回或设置元素包含的 HTML 内容
设置 Element.innerHTML 的值时, 字符串值会被解析为 HTML 或者 XML, 然后被插入 DOM 树.
另外,可以使用element.insertAdjacentHTML(position, text)来设置HTML.
var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
注意：如果 <div>, <span>, or <noembed>节点具有包含字符(&)、(<)或(>)的子文本节点，
则 innerHTML 分别将这些字符作为 HTML 实体"&amp;", "&lt;" and "&gt;" 返回。

2\ Node.innertext 返回或设置节点及其子代的“已渲染”的文本内容
等同于在渲染好的页面上复制节点的所有文本,然后粘贴得到的文本内容.

3\ Node.textContent 返回或设置节点及其子代的文本内容
要获取整个文档的所有文本和 CDATA 数据，可以使用document.documentElement.textContent,
在节点上设置此属性将删除所有的子节点，并用具有给定值的单个文本节点替换它们.

一\ textContent 与 innertext 的差异
1\ 虽然 textContent 获取所有元素的内容，包括<script>和<style>元素，
但是 innerText 不获取它们，而只会显示“人类可读”元素。
2\ innerText 知道样式，不会返回“隐藏”元素的文本，而文本内容则返回。
3\ 因为 innerText 知道CSS样式，它触发回流，而 textContent 不触发。
4\ 与 textContent 不同，在Internet Explorer（版本11及以下）中更改innerText将从元素中删
除子节点，并永久销毁所有子文本节点。将节点再次插入到任何其他元素或相同元素中是不可能的。

二\ textContent 与 innerHTML 的差异
1\ textContent 具有更好的性能，因为它的值不会被解析为 HTML。
2\ 此外，使用 textContent 可以防止 XSS 攻击(不一定,看情况)。