'use strict'
const hero = () =>{
    const tableTd = document.querySelector('.contain__table');
    const charsItems = [];
    for (i=65; i<91; i++){
    charsItems.push(String.fromCharCode(i))
}

for (i=49; i<58; i++){
    charsItems.push(String.fromCharCode(i))
}

charsItems.push(String.fromCharCode(48))
// console.log(charsItems)

let sum = '';
for (j=0;j<charsItems.length;j++){
if (j==0) sum +=`<tr>`;
if (j==26) {
    sum += `<td class="table__item"></td>`;
}
sum += `<td class="table__item" data-value="${charsItems[j]}">${charsItems[j]}</td>`;
if (j==12 || j==25 || j==38) sum +=`</tr>`;

}
tableTd.innerHTML = sum;

tableTd.addEventListener('click',(ev)=>console.log("letter is: ",ev.target.dataset['value']))

}

export default hero();