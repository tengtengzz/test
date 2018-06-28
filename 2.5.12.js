require('OwnWebSocketUtil,WebSocketUtil');
defineClass('BibiTransferInfoViewController', {
    viewWillAppear: function(animated) {
        self.super().viewWillAppear(animated);
        if (self.isSelf()) {
            OwnWebSocketUtil.sharedUtil().setDelegate(self);
        } else {
            WebSocketUtil.sharedUtil().setDelegate(self);
        }

        // 订阅
        if (self.hasSubscribed() == NO) {

            self.subscribeHuobiPanKou(YES);
        }

        self.updateData();
        _convertLbl.setHidden(YES);
    },
});
