require('OwnWebSocketUtil,WebSocketUtil,OneCoinMoneyChangeListViewController,YYZAlertView,BeginTranferMoneyViewController,GetMoneyViewController,NSIndexPath,Account,NSString,PublicRSA,NSMutableDictionary,MBProgressHUD,NormalHTTPManger,NSUserDefaults,GetMCodeMessageViewController');
defineClass('BeginTranferMoneyViewController', {
    OkPayViewOkPayPassword: function(payString) {
        self.setPayPwdView(null);

        var indexPath = NSIndexPath.indexPathForRow_inSection(0, 0);
        var cell = self.tableView().cellForRowAtIndexPath(indexPath);
        var memberId = Account.sharedAccount().currentUserUid();
        var coinType = NSString.stringWithFormat("%ld", self.selectCoinType());
        var clientId = self.clientId();
        var address = self.recommendMCode();

        var amount = cell.putMoneyTF().text();
        var minerFee = cell.lastMiner();
        var remark = cell.remarkTF().text();
        var basePassword = payString;
        var payPassword = PublicRSA.encryptString_publicKey(basePassword,  "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCva5zyrSyeg4pedBK9t7UpHgY40++3LXsu7xm0V9o7PsgbtiCkqGVCy/nE9TiMSNscOClliZIRmVpI/Dha2fZsB13bebYmjP1a41q+LVhTOBJSWztdet5ftXklQp0FqUTq3CAMWZKUQTTHNNfRcm5S7dzpdrfyrqO3xh88Mal4qQIDAQAB\n-----END PUBLIC KEY-----");
        var url;
        var parameters = NSMutableDictionary.dictionaryWithCapacity(0);
        if (self.selectTransferPeopelOrFriend() == 3) {
            parameters.setObject_forKey(amount, "amount");
            parameters.setObject_forKey(clientId, "clientId");
            parameters.setObject_forKey(coinType, "coinType");
            parameters.setObject_forKey(memberId, "memberId");
            parameters.setObject_forKey(minerFee, "minerFee");
            parameters.setObject_forKey(payPassword, "payPassword");
            parameters.setObject_forKey(remark, "remark");

            url = "/member/leancloud/red/transfer/one";

        } else {
            if (self.selectCoinType() == 1009) {
                var xrpTag = self.recommendTag();
                parameters.setObject_forKey(address, "address");
                parameters.setObject_forKey(amount, "amount");
                parameters.setObject_forKey(coinType, "coinType");
                parameters.setObject_forKey(memberId, "memberId");
                parameters.setObject_forKey(minerFee, "minerFee");
                parameters.setObject_forKey(payPassword, "payPassword");
                parameters.setObject_forKey(remark, "remark");
                parameters.setObject_forKey(xrpTag, "xrpTag");

            } else {
                parameters.setObject_forKey(address, "address");
                parameters.setObject_forKey(amount, "amount");
                parameters.setObject_forKey(coinType, "coinType");
                parameters.setObject_forKey(memberId, "memberId");
                parameters.setObject_forKey(minerFee, "minerFee");
                parameters.setObject_forKey(payPassword, "payPassword");
                parameters.setObject_forKey(remark, "remark");

            }
            url = "/member/account/transfer/one";
        }


        MBProgressHUD.showLoadingMessage_toView(null, self.view());

        NormalHTTPManger.n_POSTWithAPIName_parameters_completionBlock_failureBlock(url, parameters, block('BOOL,NSInteger,NSString*,id', function(isSuccessful, code, message, responseData) {
 
        }), block('NSInteger,NSString*', function(code, errorString) {
        }));


    },
});


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
        self.convertLbl().setHidden(YES);
    },
});

defineClass('MyMoeyManagementViewController', {
            myMoeyManagementTableViewCell_button: function(cell, button) {
            if (button.tag() == 1) {
            //资金明细
            var vc = OneCoinMoneyChangeListViewController.alloc().init();
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(vc, YES);
            } else if (button.tag() == 2) {
            if (cell.model().coinType().integerValue() == 1006) {
            YYZAlertView.showMessage_animation("暂未开启此币种", YES);
            return;
            }
            
            //        充币
            var bibiOrderVC = BeginTranferMoneyViewController.alloc().init();
            bibiOrderVC.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(bibiOrderVC, YES);
            } else {
            if (cell.model().coinType().integerValue() == 1006) {
            YYZAlertView.showMessage_animation("暂未开启此币种", YES);
            return;
            }
            //        提币m
            var vc = GetMoneyViewController.alloc().init();
            if (cell.model().coinType().integerValue() < 1006) {
                 vc.setSelectCoinType(cell.model().coinType().integerValue() - 1);
             } else {
                   vc.setSelectCoinType(cell.model().coinType().integerValue());
             }
            self.navigationController().pushViewController_animated(vc, YES);

            }
            
            },
            });
