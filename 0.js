require('UIBarButtonItem,UIImage,UIColor,WebSocketUtil');
defineClass('TheMarketInfoListViewController', {
    viewDidLoad: function() {
        self.super().viewDidLoad();
        self.navigationItem().setTitle(NSLocalizedString("行情", null));
        var rightBarButtonItem = UIBarButtonItem.alloc().initWithImage_style_target_action(UIImage.imageNamed("navbar_refresh"), UIBarButtonItemStyleDone, self, @selector(refreshWebSocket));
        self.navigationItem().setRightBarButtonItem(rightBarButtonItem);
        self.view().setBackgroundColor(UIColor.whiteColor());
        self.setMarket_close("1");
        self.view().addSubview(self.topScroll());
        self.view().addSubview(self.separatorLine());
        self.view().addSubview(self.tableView());

        self.requestCurrencyLists();
        //    [self loadFloat];


    },
    viewWillAppear: function(animated) {
        self.super().viewWillAppear(animated);
        WebSocketUtil.sharedUtil().setDelegate(self);
        //    [OwnWebSocketUtil sharedUtil].delegate() = self;
        // 订阅
        if (WebSocketUtil.sharedUtil().wsState() == SR_OPEN && _hasSubscribedHuobi == NO) {
            self.subscribeHuobiMarket(YES);
        }

        //    if ([OwnWebSocketUtil sharedUtil].wsState() == SR_OPEN && _hasSubscribedBibao == NO) {
        //        [self subscribeBibaoMarket:NO];
        //    }
    },
    viewWillDisappear: function(animated) {
        self.super().viewWillDisappear(animated);
        if (WebSocketUtil.sharedUtil().delegate() == self) WebSocketUtil.sharedUtil().setDelegate(null);
        //    if ([OwnWebSocketUtil sharedUtil].delegate() == self) [OwnWebSocketUtil sharedUtil].delegate() = null;
        // 取消订阅
        if (_hasSubscribedHuobi) {
            self.subscribeHuobiMarket(NO);
        }
        //    if (_hasSubscribedBibao) {
        //        [self subscribeBibaoMarket:NO];
        //    }


        !self.viewWillDisappearBlock() ? : self.viewWillDisappearBlock()();
    },
});
