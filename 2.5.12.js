require('OwnWebSocketUtil,WebSocketUtil,OneCoinMoneyChangeListViewController,YYZAlertView,BeginTranferMoneyViewController,GetMoneyViewController,NSIndexPath,Account,NSString,Token,PublicRSA,NSCharacterSet,WSLNetWorkingTool');

defineClass('BeginTranferMoneyViewController', {
    OkPayViewOkPayPassword: function(payString) {
        self.setPayPwdView(null);
        var indexPath = NSIndexPath.indexPathForRow_inSection(0, 0);
        var cell = self.tableView().cellForRowAtIndexPath(indexPath);
        var memberId = Account.sharedAccount().currentUserUid();
        var coinType = NSString.stringWithFormat("%ld", self.selectCoinType());
        var clientId = self.clientId();

        var amount = cell.putMoneyTF().text();
        var minerFee = cell.lastMiner();
        var remark = cell.remarkTF().text();
        var payPassword = payString;
        var rtime = self.rtimeString();
        var token = Token.shareTokenString().currentUserToken();
        var encWithPubKey;
        encWithPubKey = PublicRSA.encryptString_publicKey(payPassword, "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCva5zyrSyeg4pedBK9t7UpHgY40++3LXsu7xm0V9o7PsgbtiCkqGVCy/nE9TiMSNscOClliZIRmVpI/Dha2fZsB13bebYmjP1a41q+LVhTOBJSWztdet5ftXklQp0FqUTq3CAMWZKUQTTHNNfRcm5S7dzpdrfyrqO3xh88Mal4qQIDAQAB\n-----END PUBLIC KEY-----");
        var basePassword = encWithPubKey.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.characterSetWithCharactersInString(":#?@!/###2#####’()*+,;=%<>[\\]^`{|}\"]+").invertedSet());
        
        var noMd5String;
        var parametersString;
        var url;
        noMd5String = NSString.stringWithFormat("amount%@clientId%@coinType%@memberId%@minerFee%@payPassword%@remark%@rtime%@token%@%@", amount, clientId, coinType, memberId, minerFee, encWithPubKey, remark, rtime, token, "32D070407EDD19245B204E0615675A44");
    
         parametersString = NSString.stringWithFormat("amount=%@&&clientId=%@&&coinType=%@&&memberId=%@&&minerFee=%@&&payPassword=%@&&remark=%@&&rtime=%@&&token=%@", amount, clientId, coinType, memberId, minerFee, basePassword, remark, rtime, token);
        url = "/member/leancloud/red/transfer/one";


        var sign = noMd5String.md5();
        
        WSLNetWorkingTool.postJSONWithUrl_parameters_headerFiled_headerFiledName_hudView_hudStr_success_fail(url, parametersString, sign, Head_URL_Sign, self.view(), "转账中", block('NSDictionary*,NetworkResponseCode,NSString*', function(data, codes, message) {
  
            if (codes == NetworkResponseCodeSuccess) {
  
                
                dispatch_async(dispatch_get_main_queue(), block(function() {
                  NSUserDefaults.standardUserDefaults().setValue_forKey(data["result"], "OrderKey");
                  NSUserDefaults.standardUserDefaults().synchronize();
                  var dic = NSMutableDictionary.dictionaryWithCapacity(4);
                  dic.setObject_forKey(remark, "money_transfer_remark");
                  dic.setObject_forKey(self.acountModel().coinName(), "money_transfer_coinName");
                  dic.setObject_forKey(coinType, "money_transfer_coinType");
                  dic.setObject_forKey(amount, "money_transfer_amount");

                  var edit = GetMCodeMessageViewController.alloc().init();
                  if (self.selectTransferPeopelOrFriend() == SelectTransferFriend) {
                    edit.setFromId(GetMCodeIsWhereFromCodePayVerifyClientID);
                  } else {
                    edit.setFromId(GetMCodeIsWhereFromCodePayVerifyAddress);

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
            if (cell.model().coinType().integerValue() < 1006) {
                 vc.setSelectCoinType(cell.model().coinType().integerValue() - 1);
             } else {
                   vc.setSelectCoinType(cell.model().coinType().integerValue());
             }
            self.navigationController().pushViewController_animated(vc, YES);

            }
            
            },
            });
