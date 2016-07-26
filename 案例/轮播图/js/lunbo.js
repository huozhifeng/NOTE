var banner=document.getElementById('banner');
var inner=document.getElementById('inner');
var imgList=banner.getElementsByTagName('img');
var tips=document.getElementById('tips');
var oLis=tips.getElementsByTagName('li');
var as=banner.getElementsByTagName('a');
var leftBtn=document.getElementById('leftBtn');
var rightBtn=document.getElementById('rightBtn');
var javaData=null;
~function () {
    !function bindData(){
        var xhr=new XMLHttpRequest();
        xhr.open("get",'banner.txt',false);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                javaData=jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);

        var str='';
        for(var i=0;i<javaData.length;i++){
            var cur=javaData[i];
            str+='<div><img src="" trueSrc="'+cur.img+'" alt=""/></div>'
        }
        str+='<img src="" trueSrc="'+javaData[0].img+'" />';
        inner.innerHTML=str;
        animate.setCss(inner,'width',(javaData.length+1)*1000)
        str='';
        for(var j=0;j<javaData.length;j++){
            if(j==0){
                str+='<li class="select">1</li>'
            }else{
                str+='<li>'+(j+1)+'</li>'
            }
        }
        tips.innerHTML=str;
    }();

    function imgDelay(){
        for(var i=0;i<imgList.length;i++){
            !function (i) {
                var cur=imgList[i];
                if(cur.isLoaded){return}
                var tempImg=new Image();
                tempImg.src=cur.getAttribute('trueSrc');
                tempImg.onload= function () {
                    cur.src=this.src;
                    tempImg=null;
                    animate(cur,{opacity:1},1000);
                    cur.isLoaded=true;
                } ;
            }(i)
        }
    }
    window.setTimeout(imgDelay,1000);

    var timer=window.setInterval(move,2000);
    var step=0;
    function move(){
        if(step==imgList.length-1){
            step=0;
            animate.setCss(inner,'left',0)
        }
        step++;
        animate(inner,{left:step*(-1000)},1000)
        focusAlign();
    }

    function focusAlign(){
        for(var i=0;i<oLis.length;i++){
            var cur=oLis[i];
            var tempStep=step==imgList.length-1?0:step;
            tempStep===i?cur.className='select':cur.className='';
        }
    }

    banner.onmouseover= function () {
        clearInterval(timer);
        leftBtn.style.display='block'
        rightBtn.style.display="block"
    }
    banner.onmouseout= function () {
        timer=window.setInterval(move,2000);
        leftBtn.style.display='none';
        rightBtn.style.display='none'
    }

    !function () {
        for(var i=0;i<oLis.length;i++){
            var cur=oLis[i];
            cur.selfIndex=i;
            cur.onclick= function () {
                step=this.selfIndex;
                animate(inner,{left:(-step)*1000},1000)
                focusAlign();
            }
        }
    }()

    leftBtn.onclick= function () {
        if(step==0){
            step=imgList.length-1;
            animate.setCss(inner,'left',step*-1000);
        }
        step--;
        animate(inner,{left:-step*1000},1000);
        focusAlign();
    };

    rightBtn.onclick= function () {
        move();
    }
}()
