var nameStr="赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔操燕华金魏曹姜";
var nameStr2="壹贰叄肆伍陆柒扒玖";
function ran(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var ary=[];
for(var i=0;i<=82;i++){
    var obj={};
    obj["num"]=i<10?'00'+i:'0'+i;
    obj["name"]=nameStr[ran(0,31)]+nameStr2[ran(0,8)];
    obj["sex"]=ran(0,1);
    obj["score"]=ran(59,99);
    ary.push(obj);
}
console.log(JSON.stringify(ary));