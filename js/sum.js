// 加减法对应js
var lis = document.querySelectorAll(".left ul li");
var Contents = document.querySelectorAll(".right .Content")
for (var a = 0; a < lis.length; a++) {
    lis[a].index = a;
    lis[a].onclick = function () {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
            Contents[j].style.display = "none";
        }
        this.className = "active";
        Contents[this.index].style.display = "block";
    }
}
// 点击随机答题
var tap = document.querySelector("#tap")
// 答题总次数次数
var total = 0
// 答题正确次数
var trueTotal = 0
// 答题编号
var indexNum = 0
// 添加表格内容函数
// 参数分别为题号,运算符,正确答案,你的答案,正确,错误,数字1,数字2
function addContent (a, b, c, d, e, f, num1, num2) {
    var tr = document.createElement("tr")
    var td1 = document.createElement("td")
    td1.innerText = a;
    tr.appendChild(td1)
    var td2 = document.createElement("td")
    td2.innerText = num1 + b + num2;
    tr.appendChild(td2)
    var td3 = document.createElement("td")
    td3.innerText = c;
    tr.appendChild(td3)
    var td4 = document.createElement("td")
    td4.innerText = d;
    tr.appendChild(td4)
    var td5 = document.createElement("td")
    td5.innerText = e;
    tr.appendChild(td5)
    var td6 = document.createElement("td")
    td6.innerText = f;
    tr.appendChild(td6)
    tableSum.appendChild(tr)
    // 判断表格有无元素
    var solo = document.getElementById("solo")
    solo.style.display = "none";
}
tap.onclick = function () {
    // 定义两个变量,储存50以内随机数
    var num1 = Math.floor(Math.random() * 50)
    var num2 = Math.floor(Math.random() * 50)
    // 随机获取符号
    var arr = ["+", "+", "-", "-"]
    var arrIndex = Math.floor(Math.random() * 3)
    var newarr = arr.splice(arrIndex, 1)
    var res = parseInt(prompt("请问" + num1 + newarr + num2 + "的答案为多少?"))
    // 获取表格
    var tableSum = document.querySelector(".contentTwo #tableSum tbody")
    // 判断符号
    if (newarr == "+") {
        var sum = num1 + num2
        if (res === sum) {
            indexNum++
            total++
            trueTotal++
            addContent(indexNum, "+", sum, res, "√", "", num1, num2)
            alert("恭喜你!回答正确")
        } else if (res < sum || res > sum) {
            indexNum++
            total++
            addContent(indexNum, "+", sum, res, "", "√", num1, num2)
            alert("答案错误")
        } else if (isNaN(res)) {
            alert("答题无效")
            return
        }
    } else {
        // 如果符号是-,计算两者之差
        var minu = num1 - num2
        if (res === minu) {
            total++
            indexNum++
            trueTotal++
            addContent(indexNum, "-", minu, res, "√", "", num1, num2)
            alert("恭喜你!回答正确")
        } else if (res < minu || res > minu) {
            total++
            indexNum++
            addContent(indexNum, "-", minu, res, "", "√", num1, num2)
            alert("答案错误")
        } else if (isNaN(res)) {
            alert("答题无效")
            return
        }
    }
    var per = trueTotal / total
    // 判断结果,第一次答错的情况: 0/1=NaN
    if (per == NaN) {
        per = 0
    }
    var totalText = "<div>" + "您一共答了" + "<span>" + total + "</span>" + "题" + "</div>"
    var trueText = "<div>" + "恭喜您正确题数为" + "<span>" + trueTotal + "</span>" + "题" + "</div>"
    var perText = "<div>" + "正确率" + "<span>" + per * 100 + "</span>" + "%" + "</div>"
    // 获取文本
    var totalContent = document.getElementById("total")
    var trueContent = document.getElementById("trueTotal")
    var perlContent = document.getElementById("per")
    // 替换文本
    totalContent.innerHTML = totalText
    trueContent.innerHTML = trueText
    perlContent.innerHTML = perText
}