let header = document.body.children[1]; 
let main = document.getElementsByTagName('main')[0];
let h1 = document.getElementsByTagName('h1')[0];
document.body.insertBefore(header, main);

let nav = document.getElementsByTagName('nav')[0];
console.log(nav);
console.log(h1);
header.insertBefore(h1, nav);

let imgs = document.getElementsByTagName('img');
let mopImg = imgs[0];
let chinImg = imgs[1];

let figures = document.getElementsByTagName('figure');
let fig1 = figures[0];
let fig2 = figures[1];

fig1.replaceChild(chinImg, mopImg);
fig2.insertBefore(mopImg, fig2.getElementsByTagName('figcaption')[0]);

let article = document.getElementsByTagName('article')[0];
article.appendChild(fig1);
article.appendChild(fig2);