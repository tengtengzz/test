require('OwnWebSocketUtil,WebSocketUtil,OneCoinMoneyChangeListViewController,YYZAlertView,BeginTranferMoneyViewController,GetMoneyViewController,NSIndexPath,Account,NSString,Token,PublicRSA,NSCharacterSet,WSLNetWorkingTool');



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
            if (cell.model().coinType().integerValue() > 1006) {
            vc.setSelectCoinType(cell.model().coinType().integerValue() -1 );
            } else {
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            }
            self.navigationController().pushViewController_animated(vc, YES);
            
            }
            
            },
            });


