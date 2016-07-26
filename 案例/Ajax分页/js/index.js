var boxList=document.getElementById("boxList");
var pageList=document.getElementById("pageList");
var page=document.getElementById("page");
var oLis=pageList.getElementsByTagName("li");
var pageInput=document.getElementById("pageInput");
var n=1,totalPage=0;

bindHTML();
function bindHTML(){
    function callBack(jsonData){
        var total=jsonData["total"],data=jsonData["data"];
        totalPage=total;
        var str='';
        for(var i=0;i<data.length;i++){
            var curData=data[i],sex=curData["sex"]==1?"女":"男";
            str+='<li>';
            str+='<span>'+curData["num"]+'</span>';
            str+='<span>'+curData["name"]+'</span>';
            str+='<span>'+sex+'</span>';
            str+='<span>'+curData["score"]+'</span>';
            str+='</li>';
        }
        boxList.innerHTML=str;
        if(pageList.innerHTML===""){
            str='';
            for(i=1;i<=total;i++){
                if(i===1){
                    str+='<li class="bg">'+i+'</li>';
                    continue;
                }
                str+='<li>'+i+'</li>'
            }
            pageList.innerHTML=str;
        }
        for(i=0;i<oLis.length;i++){
            oLis[i].className=i===(n-1)?"bg":null;
        }
        pageInput.value=n;
    }


    var xhr=new XMLHttpRequest;
    xhr.open("get","getData?n="+n+"&_="+Math.random(),true);
    xhr.onreadystatechange= function () {
        if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
            callBack(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}

page.onclick= function (e) {
    e=e||window.event;
    var tar = e.target|| e.srcElement,tarTag=tar.tagName.toLocaleUpperCase(),tarInner=tar.innerHTML;

    if(tarTag==="DIV"){
        if(tarInner==="FIRST"){
            if(n===1){
                return
            }
            n=1;
        }
        if(tarInner==="LAST"){
            if(n===totalPage){
                return
            }
            n=totalPage;
        }
        if(tarInner==="PREV"){
            if(n===1){
                return
            }
            n--;
        }
        if(tarInner==="NEXT"){
            if(n===totalPage){
                return
            }
            n++;
        }
       bindHTML();
    }
    if(tarTag=="LI"){
        var tempN=parseFloat(tarInner);
        if(tempN===n){
            return;
        }
        n=tempN;
        bindHTML();
    }
};

pageInput.onkeyup= function (e) {
    e=e||window.event;
    if(e.keyCode===13){
        var num=Number(this.value.replace(/^ +| +$/g,""));
        if(isNaN(num)){
            this.value=n;
            return;
        }
        if(num===n){
            return;
        }
        if(num<1){
            n=1
        }else if(num>totalPage){
            n=totalPage
        }else{
            n=num
        }
        bindHTML();
    }
};










