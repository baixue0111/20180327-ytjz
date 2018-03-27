var fs = require('fs');
var path = require('path');
var COS = require('cos-nodejs-sdk-v5');
var config = require('./_config');

var cos = new COS({
    AppId: config.AppId,
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
});


exports.putObjectFromFileToBaeBos = function putUploadFile(fileName, fileNamePath) {
    console.log("fileName="+fileName);
    console.log("fileNamePath="+fileNamePath);
    console.log("_config.isBaeBosUploadImages.isOpen="+config.isBaeBosUploadImages.isOpen);
    if (!config.isBaeBosUploadImages.isOpen) {
        return;
    }

    console.log("fileName="+fileName);
    console.log("fileNamePath="+fileNamePath);

    cos.putObject({
        Bucket: config.Bucket, /* 必须 */
        Region: config.Region,
        Key: fileName, /* 必须 */
        // Body: filepath,
        Body: fs.createReadStream(fileNamePath), /* 必须 */
        ContentLength: fs.statSync(fileNamePath).size, /* 必须 */
        onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData));
        },
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(data, null, '  '));
        }
    });
}


exports.sliceUploadFile = function sliceUploadFile(fileName, fileNamePath) {
    if (!config.isBaeBosUploadImages.isOpen) {
        return;
    }

    cos.sliceUploadFile({
        Bucket: config.Bucket, /* 必须 */
        Region: config.Region,
        Key: fileName, /* 必须 */
        FilePath: fileNamePath, /* 必须 */
        SliceSize: 1024 * 1024,  //1MB  /* 非必须 */
        AsyncLimit: 5, /* 非必须 */
        onHashProgress: function (progressData) {
            // console.log(JSON.stringify(progressData));
        },
        onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData));
        },
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(data, null, '  '));
        }
    });
}

var getImagesHref = function (imagesFileName) {
    var baeBosUrl = "../../uploads/" + imagesFileName;
    if (_config.isBaeBosUploadImages.isOpen) {
        baeBosUrl = config.isBaeBosUploadImages.url + imagesFileName;
    }
    return baeBosUrl;
}

exports.getImagesHref = getImagesHref;

