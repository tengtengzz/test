defineClass('MainSubviewViewController', {
    viewWillAppear: function(animated) {
        self.super().viewWillAppear(animated);
        self.view().setBackgroundColor(BACKGROUND_COLOR);

        self.isAddGestureLock().isHaveFriendRequest(); //是否有好友请求
        self.loadDataWithHudView_hudStr(null, null);
    },
});
