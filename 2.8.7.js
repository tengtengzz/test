defineClass('TheMarketInfoListViewController', {
    viewWillAppear: function(animated) {
        self.super().viewWillAppear(animated);
    if ([WebSocketUtil sharedUtil].wsState == SR_OPEN && _hasSubscribedHuobi == NO) {
        [self subscribeHuobiMarket:YES];
    }
        self.isAddGestureLock().isHaveFriendRequest(); //是否有好友请求
        self.loadDataWithHudView_hudStr(null, null);
    },
});
