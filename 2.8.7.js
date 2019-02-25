require('NormalHTTPManger,Timestamp_UNIX');
defineClass('AppDelegate', {
    getTimeString: function() {
        //    获取网络时间戳 和本地时间做比较 取差值
        NormalHTTPManger.n_POSTWithAPIName_parameters_completionBlock_failureBlock(GET_UNIX, null, block('BOOL,NSInteger,NSString*,id', function(isSuccessful, code, message, responseData) {
            Timestamp_UNIX.shareTimestamp().saveTimestamp(responseData);

        }), block('NSInteger,NSString*', function(code, errorString) {

        }))
    },
});
