
defineClass('TheMarketInfoListViewController', {
    viewWillAppear: function(animated) {
        self.super().viewWillAppear(animated);
    if ([WebSocketUtil sharedUtil].wsState == SR_OPEN && _hasSubscribedHuobi == NO) {
        [self subscribeHuobiMarket:YES];
    }

});
