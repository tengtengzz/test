2.0.61|require('UIBarButtonItem,OneCoinMoneyChangeListViewController,BeginTranferMoneyViewController,GetMoneyViewController,AllCoinInfoModel,FinancialOrderDetailListHeadView,UIColor,YYZAlertView,FinancialBuyInViewController,FinancialMoneyInViewController,FinancialModel,YYZAlertView,UIApplication,NSURL');

defineClass('MainSubviewViewController', {
            viewWillAppear: function(animated) {
            self.super().viewWillAppear(animated);
            self.isAddGestureLock().isHaveFriendRequest(); //是否有好友请求
            var alterView = YYZAlertView.alloc().initWithCustomTitle_withMessage_withConfirmButtonTitle_withCancelButtonTitle("温馨提示", "已有新版本，请升级2.5.1版本", "确定", null);
            alterView.showTwo_animation(null, YES);
            alterView.biBaoBaReturnIdBlock(block('NSInteger', function(tag) {
                                                 UIApplication.sharedApplication().openURL(NSURL.URLWithString("itms-services://?action=download-manifest&url=https://www.bibaovip.com/static/download/ios/BiBao.plist"));
                                                 }));
            
            self.loadDataWithHudView_hudStr(null, null);
            
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
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(vc, YES);
            
            
            }
            
            },
            });

defineClass('FinancialMainViewController', {
            financialListTableViewCell_button: function(cell, btn) {
            if (self.coinType() == 1006) {
            YYZAlertView.showMessage_animation("暂未开启此币种", YES);
            return;
            }
            
            
            var vc = FinancialBuyInViewController.alloc().init();
            vc.setCoinType(self.coinType());
             vc.navigationItem().setTitle("买入");
            vc.setModel(cell.model());
            self.navigationController().pushViewController_animated(vc, YES);
            },
            financialMainBottomTwoButtonViewWithButton: function(btn) {
            if (self.coinType() == 1006) {
            YYZAlertView.showMessage_animation("暂未开启此币种", YES);
            return;
            }
            if (btn.tag() == 147) {
            
            var vc = FinancialMoneyInViewController.alloc().init();
            vc.setFromId(1);
            vc.setCoinType(self.coinType());
             vc.navigationItem().setTitle("转入");
            self.navigationController().pushViewController_animated(vc, YES);
            
            } else {
            var vc = FinancialMoneyInViewController.alloc().init();
            vc.setFromId(2);
            vc.setCoinType(self.coinType());
             vc.navigationItem().setTitle("转出");
            self.navigationController().pushViewController_animated(vc, YES);
            
            }
            
            },
            
            });

defineClass('BeginTranferMoneyViewController', {
            viewWillAppear: function(animated) {
            self.super().viewWillAppear(animated);
            if (self.selectCoinType() == 1006) {
            YYZAlertView.showMessage_animation("暂未开启此币种", YES);

            self.navigationController().popViewControllerAnimated(YES);
            return;
            }
            var array = AllCoinInfoModel.shareAllCoinInfoModel().CurrentAllCoinTypeAddBigNameArray().mutableCopy();
            array.enumerateObjectsUsingBlock(block('NSDictionary*,NSUInteger,BOOL*', function(obj, idx, stop) {
                                                   if (obj.allValues().containsObject("1006")) {
                                                   array.removeObject(obj);
                                                   }
                                                   }));
            
            self.headView().setTitleArray(array);
            self.headView().btnArray().enumerateObjectsUsingBlock(block('UIButton*,NSUInteger,BOOL*', function(obj, idx, stop) {
                                                                        if (self.selectCoinType() == obj.tag()) {
                                                                        obj.setTitleColor_forState(UIColor.colorWithRed_green_blue_alpha(33 / 255.0, 105 / 255.0, 229 / 255.0, 1), 0);
                                                                        } else {
                                                                        obj.setTitleColor_forState(UIColor.colorWithRed_green_blue_alpha(38 / 255.0, 38 / 255.0, 38 / 255.0, 1), 0);
                                                                        
                                                                        }
                                                                        }));
            self.tableView().reloadData();

            },
            });
