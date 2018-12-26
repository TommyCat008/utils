/**
 * 内部调用函数
 * @param {*} numberRound 
 * @param {*} roundDigit 
 * @private
 */
function roundFun(numberRound, roundDigit) {
    if (numberRound >= 0) {
        var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
        return tempNumber;
    } else {
        var tempNumber = parseInt((-numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
        return -tempNumber;
    }
}

/**
 * 内部被调用的方法
 * @private
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function Utils() {
    console.log('该函数不可被实例化');
}

// Utils.prototype.

/**
 * 判断是否存在某一个class类
 * @param {Object} element
 * @param {Object} cls 
 */
Utils.prototype.hasClass = function (element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * 删除某一个class
 * @param {Object} element
 * @param {Object} cls
 */
Utils.prototype.removeClass = function (element, cls) {
    if (hasClass(element, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}

/**
 * 添加一个class类
 * @param {Object} element
 * @param {Object} cls
 */
Utils.prototype.addClass = function (element, cls) {
    if (!hasClass(element, cls)) {
        element.className += " " + cls;
    }
}

/**
 * 根据文件大小返回对应的缩写格式
 * @param {Number} value 文件的大小
 */
Utils.prototype.getSize = function (value) {
    if (!value) {
        return '';
    }
    let unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    let index = 0;

    let srcsize = parseFloat(value);
    if (!srcsize) {
        return '未知';
    }
    let quotient = srcsize;
    while (quotient > 1024) {
        index += 1;
        quotient = quotient / 1024;
    }
    return roundFun(quotient, 2) + " " + unitArr[index];
}

/**
 * 判断一个字符串中是不是全由汉字组成的
 * @param {String} value 
 */
Utils.prototype.checkAllChinese = function (value) {
    let testRegular = /^[\u4e00-\u9fa5]{0,}$/;
    if (testRegular.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否是正确的email地址
 * @param {String} value 
 */
Utils.prototype.checkEmail = function (value) {
    let testRegular = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (testRegular.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断手机号是否合法
 * @param {String|Number} value 
 */
Utils.prototype.checkTelephone = function (value) {
    let testRegular = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/;
    if (testRegular.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断一个对象是否是空的，如果是空对象返回 true
 * @param {Object} obj 
 */
Utils.prototype.checkIsEmptyObject = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

/**
 * 动态加载一个CSS样式文件
 * @param {String} url 
 */
Utils.prototype.LoadStyle = function (url) {
    try {
        document.createStyleSheet(url);
    } catch (e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
    }
}

/**
 * 判断是否移动设备
 */
Utils.prototype.isMobile = function () {
    if (typeof this._isMobile === 'boolean') {
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport ||
        rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment &&
        (fixViewPortsExperiment.toLowerCase() === "new");
    if (!fixViewPortsExperiment) {
        if (!this.isAppleMobileDevice()) {
            screenWidth = screenWidth / window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}

/**
 * 判断是否移动设备访问
 */
Utils.prototype.isMobileUserAgent = function () {
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i
        .test(window.navigator.userAgent.toLowerCase()));
}

/**
 * 判断是否苹果移动设备访问
 */
Utils.prototype.isAppleMobileDevice = function () {
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent
        .toLowerCase()));
}

/**
 * 创建一个随机的Guid
 */
Utils.prototype.createGuid = function () {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 获取两个时间戳之间的差值
 * @param {number} starttime 13位的时间戳
 * @param {number} endtime 13位的时间戳
 */
Utils.prototype.timeDiff2String = function () {
    let timeDiff = endtime - starttime;
    if (timeDiff <= 0) return '';
    let day = Math.floor(timeDiff / 1000 / 60 / 60 / 24); //天
    timeDiff = timeDiff % (1000 * 60 * 60 * 24);
    let hour = Math.floor(timeDiff / 1000 / 60 / 60); //小时
    timeDiff = timeDiff % (1000 * 60 * 60);
    let min = Math.floor(timeDiff / 1000 / 60); //分钟
    timeDiff = timeDiff % (1000 * 60);
    let second = Math.floor(timeDiff / 1000);
    return day + "天" + hour + "小时" + min + "分钟" + second + "秒";
}

/**
 * 时间戳转换成以破折号连接的时间
 * @param {number} timeline 13位的时间戳
 */
Utils.prototype.formatTimeline = function (timeline) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // let seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 开始写一个浅拷贝的方法
 */
Utils.prototype.assign = function () {

}

export default Utils;