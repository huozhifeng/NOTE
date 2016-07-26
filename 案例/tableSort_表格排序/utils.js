var utils = {
    /*listToArray: function (similarArray) {
     var a = [];
     try {
     a = Array.prototype.slice.call(similarArray);
     } catch (e) {
     alert();
     var a = [];
     for (var i = 0; i < similarArray.length; i++) {
     a[a.length] = similarArray[i];
     }
     }
     return a;
     },*/
    jsonParse: function (jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");//window 高版本
    },

    listToArray: function (similarAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(similarAry)
        } catch (e) {
            for (var i = 0; i < similarAry.length; i++) {
                ary[ary.length] = similarAry[i];
            }
        }
        return ary;
    },

    offset: function(ele){
    var eleLeft=ele.offsetLeft;
    var eleTop=ele.offsetTop;
    var eleParent=ele.offsetParent;
    var left=null;
    var top=null;
    left +=eleLeft;
    top  +=eleTop;
    while(eleParent){
        if(window.navigator.userAgent.indexOf('MSIE 8.0')!==-1){
            left +=eleParent.offsetLeft;
            top  +=eleParent.offsetTop; }else{ left +=eleParent.clientLeft+eleParent.offsetLeft;
            top  +=eleParent.clientTop+eleParent.offsetTop;
        }

        eleParent=eleParent.offsetParent;
    }
    return {left:left,top:top}
    },

    getWin: function (attr,val){
        if( val !== undefined){
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr]||document.body[attr];
    }

}

