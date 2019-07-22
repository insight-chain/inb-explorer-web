/**
 * 时间戳处理
 * @param inputTime :时间戳
 * @param format: 返回的时间格式，默认yyyy-MM-dd hh:mm
 */
export const formatDateTime = (inputTime, format) => {
    if (!inputTime) {
        return "";
    }
    try {
        var date = new Date(parseInt(inputTime));
        if (!format) {
            format = "yyyy-MM-dd hh:mm";
        }
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    } catch (err) {
        return inputTime;
    }
}

/**
 * 交易类型处理
 * @param inputTime :交易类型
 */
export const transactionLei = function(leixin) {
    if (leixin == 1) {
        return '转账'
    } else if (leixin == 2) {
        return '抵押'
    } else if (leixin == 3) {
        return '解抵押'
    } else if (leixin == 4) {
        return '投票'
    }
}



export const hexToInt11 = function(hex) {
    // if(!(hex instanceof String) || hex.indexOf('0x') != 0){
    //     return hex;
    // }
    var len = hex.length,
        a = new Array(len),
        code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
    return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

// 16位转12位
export const hexToInt = function(hex) {
    // if(!(hex instanceof String) || hex.indexOf('0x') != 0){
    //     return hex;
    // }
    if (hex == 0 || hex == null) {
        return 210;
    }
    return parseInt(hex, 16);
}

// 判断是不是移动端
export const isMobile = function() {
    var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}
// baty转k
export const ConversionByte=function(byte){
    return Math.floor(byte/1024 * 100) / 100 
}


// 截取小数点后四位
export const takeFour = function(num) {
    return Math.round(num * 10000) / 10000
}

// 处理账户INB余额
export const ProcessingBalance  = function(num) {
        if (num < 0) {
           return 0 
        }
        return num
}
//千分位方法
export const fmoney  = function(num) {
    return (num || 0).toLocaleString()
}
//小数点后面保留两位
export const IsTwoNum =function(num){
    // eslint-disable-next-line no-empty
    var n=num.toString().split(".")[1].length
    console.log(n)
    if(num%1 == 0){
        return num + '00'
    }else if(n==1){
        return num +'0'
    }else{
        return num
    }
}