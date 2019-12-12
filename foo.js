/*
 * @Author: mkll
 * @Date: 2019-12-12 09:58:22
 * @LastEditors: mkll
 * @LastEditTime: 2019-12-12 10:05:13
 * @Description: It always end like this
 * @See: 
 */
let btn = document.querySelector('.btn');
let label = document.querySelector('.label');
btn.addEventListener('click', function(event) {
  btn.classList.toggle('on')
    ? label.textContent = "开"
    : label.textContent = "关"
    
  
})