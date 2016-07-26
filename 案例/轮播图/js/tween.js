
function animate(ele,obj,duration){
    var oBegin={};
    var oChange={};
    var flag=0;
    for(var attr in obj){
        var target=obj[attr];
        var begin=animate.getCss(ele,attr);
        var change=target-begin;
        if(change){
            oBegin[attr]=begin;
            oChange[attr]=change;
            flag++;
        }
    }
    if(!flag)return;
    var interval=15;
    var times=0;
    clearInterval(ele.timer);
    function step(){
        times+=interval;
        if(times<duration){
            for(var attr in oChange){
                var change=oChange[attr];
                var begin=oBegin[attr];
                var val=times/duration*change+begin;
                animate.setCss(ele,attr,val);
            }
        }else{
            for(var attr in oChange){
                var target=obj[attr];
                animate.setCss(ele,attr,target);
            }
            clearInterval(ele.timer);
            ele.timer=null;
        }

    }
    ele.timer=setInterval(step,interval);
};

animate.getCss=function(ele,attr){
    if(window.getComputedStyle){
        return parseFloat(window.getComputedStyle(ele,null)[attr]);
    }else{
        if(attr=="opacity"){
            var val=ele.currentStyle.filter;
            var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
            if(reg.test(val)){
                return RegExp.$1/100;
            }else{
                return 1;
            }
        }else{
            return parseFloat(ele.currentStyle[attr]);
        }
    }
};

animate.setCss=function(ele,attr,val){
    if(attr=="opacity"){
        ele.style.opacity=val;
        ele.style.filter="alpha(opacity="+val*100+")";
    }else{
        ele.style[attr]=val+"px";
    }
};
function jsonParse(jsonStr) {
    return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
}