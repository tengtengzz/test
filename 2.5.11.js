require('OwnWebSocketUtil,WebSocketUtil,OneCoinMoneyChangeListViewController,YYZAlertView,BeginTranferMoneyViewController,GetMoneyViewController,NSIndexPath,Account,NSString,Token,PublicRSA,NSCharacterSet,WSLNetWorkingTool,NSOperationQueue,NSUserDefaults,NSMutableDictionary,GetMCodeMessageViewController,NSDecimalNumber,SliderView,NSIndexPath,NSDictionary');

defineClass('ChangeCoinTypeViewController', {
            tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
            self.tableView().reloadData();
            var model = self.dataArray().objectAtIndex(indexPath.row());
            //    存选中的币种 设置全局
            var localDic = NSDictionary.dictionaryWithObject_forKey(model.coinName(), model.coinType());
            NSUserDefaults.standardUserDefaults().setObject_forKey(localDic, "selectCoinTypesssssssssssssssssssss");
            NSUserDefaults.standardUserDefaults().synchronize();
            if (self.changeCoinTypeViewControllerGetCoinInfoCallback()) {
            self.changeCoinTypeViewControllerGetCoinInfoCallback()(self, model);
            }
            
            },
            });



defineClass('BeginTranferMoneyViewController', {
            OkPayViewOkPayPassword: function(payString) {
            self.setPayPwdView(null);
            var indexPath = NSIndexPath.indexPathForRow_inSection(0, 0);
            var cell = self.tableView().cellForRowAtIndexPath(indexPath);
            var memberId = Account.sharedAccount().currentUserUid();
            var clientId = self.clientId();
            var address = self.recommendMCode();
            
            var amount = cell.putMoneyTF().text();
            var minerFee = cell.lastMiner();
            var remark = cell.remarkTF().text();
            var payPassword = payString;
            var rtime = self.rtimeString();
            var token = Token.shareTokenString().currentUserToken();
            
            var encWithPubKey;
            encWithPubKey = PublicRSA.encryptString_publicKey(payPassword, "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCva5zyrSyeg4pedBK9t7UpHgY40++3LXsu7xm0V9o7PsgbtiCkqGVCy/nE9TiMSNscOClliZIRmVpI/Dha2fZsB13bebYmjP1a41q+LVhTOBJSWztdet5ftXklQp0FqUTq3CAMWZKUQTTHNNfRcm5S7dzpdrfyrqO3xh88Mal4qQIDAQAB\n-----END PUBLIC KEY-----");
            var basePassword = encWithPubKey.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.characterSetWithCharactersInString(":#?@!/$&’()*+,;=%<>[\\]^`{|}\"]+").invertedSet());
            
            var noMd5String;
            var parametersString;
            var url;
            
            require('NSString');
            if (self.selectTransferPeopelOrFriend() == 3) {
            noMd5String = NSString.stringWithFormat("amount%@clientId%@coinType%@memberId%@minerFee%@payPassword%@remark%@rtime%@token%@32D070407EDD19245B204E0615675A44", amount, clientId, (self.selectCoinType()), memberId, minerFee, encWithPubKey, remark, rtime, token);
            
            parametersString = NSString.stringWithFormat("amount=%@&clientId=%@&coinType=%@&memberId=%@&minerFee=%@&payPassword=%@&remark=%@&rtime=%@&token=%@", amount, clientId, (self.selectCoinType()), memberId, minerFee, basePassword, remark, rtime, token);
            url = "/member/leancloud/red/transfer/one";
            
            } else {
            if (self.selectCoinType() == 1009) {
            var xrpTag = self.recommendTag();
            noMd5String = NSString.stringWithFormat("address%@amount%@coinType%@memberId%@minerFee%@payPassword%@remark%@rtime%@token%@xrpTag%@32D070407EDD19245B204E0615675A44", address, amount, (self.selectCoinType()), memberId, minerFee, encWithPubKey, remark, rtime, token, xrpTag);
            parametersString = NSString.stringWithFormat("address=%@&amount=%@&coinType=%@&memberId=%@&minerFee=%@&payPassword=%@&remark=%@&rtime=%@&token=%@&xrpTag=%@", address, amount, (self.selectCoinType()), memberId, minerFee, basePassword, remark, rtime, token, xrpTag);
            
            } else {
            noMd5String = NSString.stringWithFormat("address%@amount%@coinType%@memberId%@minerFee%@payPassword%@remark%@rtime%@token%@32D070407EDD19245B204E0615675A44", address, amount, (self.selectCoinType()), memberId, minerFee, encWithPubKey, remark, rtime, token);
            parametersString = NSString.stringWithFormat("address=%@&amount=%@&coinType=%@&memberId=%@&minerFee=%@&payPassword=%@&remark=%@&rtime=%@&token=%@", address, amount, (self.selectCoinType()), memberId, minerFee, basePassword, remark, rtime, token);
            }
            
            url = "/member/account/transfer/one";
            }
            
            
            var sign = noMd5String.md5();
            
            WSLNetWorkingTool.postJSONWithUrl_parameters_headerFiled_headerFiledName_hudView_hudStr_success_fail(url, parametersString, sign, "sign", self.view(), "转账中", block('NSDictionary*,NetworkResponseCode,NSString*', function(data, codes, message) {
                                                                                                                                                                                       
                                                                                                                                                                                       if (codes == 0) {
                                                                                                                                                                                
                                                                                 var string = NSString.stringWithFormat("%@", data.objectForKey("result"));
                                                                                                                                                                                NSUserDefaults.standardUserDefaults().setValue_forKey(string, "OrderKey");
                                                                                                                                                                                NSUserDefaults.standardUserDefaults().synchronize();
                                                                                                                                                                                var dic = NSMutableDictionary.dictionaryWithCapacity(4);
                                                                                                                                                                                dic.setObject_forKey(remark, "money_transfer_remark");
                                                                                                                                                                                dic.setObject_forKey(self.acountModel().coinName(), "money_transfer_coinName");
                                                                                                                                                                                dic.setObject_forKey((self.selectCoinType()), "money_transfer_coinType");
                                                                                                                                                                                dic.setObject_forKey(amount, "money_transfer_amount");
                                                                                                                                                                                
                                                                                                                                                                                
                                                                                                                                                                                NSOperationQueue.mainQueue().addOperationWithBlock(block(function() {
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                         var edit = GetMCodeMessageViewController.alloc().init();
                                                                                                                                                                                                                                         if (self.selectTransferPeopelOrFriend() == 3) {
                                                                                                                                                                                                                                         edit.setFromId(3);
                                                                                                                                                                                                                                         } else {
                                                                                                                                                                                                                                         edit.setFromId(4);
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                         edit.setSelectTransferPeopelOrFriend(self.selectTransferPeopelOrFriend());
                                                                                                                                                                                                                                         edit.setOrderDic(dic);
                                                                                                                                                                                                                                         self.navigationController().pushViewController_animated(edit, YES);
                                                                                                                                                                                                                                         }));
                                                                                                                                                                                
                                                                                                                                                                                       }
                                                                                                                                                                                
                                                                                                                                                                                       
                                                                                                                                                                                       
                                                                                                                                                                                       }), block('NSError*', function(error) {
                                                                                                                                                                                                 
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
            if (cell.model().coinType().integerValue() > 1006) {
            vc.setSelectCoinType(cell.model().coinType().integerValue() - 1);
            } else {
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            }
            self.navigationController().pushViewController_animated(vc, YES);
            
            }
            
            },
            });


