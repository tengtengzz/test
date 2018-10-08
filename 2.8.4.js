




require('LCCKMessage,NSDate,NSString, UIView, UILayer, UIButton, UILabel, UIColor, UITextField, UIFont');
defineClass('LockTransferView', {
            layoutSubviews: function() {
            self.super().layoutSubviews();
            var string = " 收款人 ";
            var font = self.nameTF().font();
            var textColor = UIColor.colorWithRed_green_blue_alpha(51 / 255.0, 51 / 255.0, 51 / 255.0, 1);
            // 密码输入框左边图片
            var lockIv = UILabel.alloc().init();
            lockIv.setTextColor(textColor);
            lockIv.setFont(font);
            lockIv.setText(string);
            var ww  = self.heightAndWidthAndFontWithCGFloat(60);
            var hh = self.heightAndWidthAndFontWithCGFloat(30);
            var xx = 0;
            var yy = 0;
            var txfF = {x:xx, y:yy, width:ww, height:hh};
            lockIv.setFrame(txfF);
            
            // 添加TextFiled的左边视图
            self.nameTF().setLeftView(lockIv);
            
            // 设置TextField左边的总是显示
            self.nameTF().setLeftViewMode(3);
            
            
            
            
            
            var strings = " 验证码 ";
            var lockIv1 = UILabel.alloc().init();
            lockIv1.setTextColor(textColor);
            lockIv1.setFont(font);
            lockIv1.setText(strings);

            lockIv1.setFrame(txfF);
            
            // 添加TextFiled的左边视图
            self.codeTF().setLeftView(lockIv1);
            
            // 设置TextField左边的总是显示
            self.codeTF().setLeftViewMode(3);
            
            
            self.nameTF().setPlaceholder("请输入收款人手机号或邮箱");
            self.codeTF().setPlaceholder("请输入手机或邮箱验证码");
            self.transferPwdTF().setPlaceholder("请输入交易密码");

            },
            });

defineClass('FriendConversationViewController', {
    sendTextMessage: function(text) {
        if (text.length() > 0) {

            var lcckMessage = LCCKMessage.alloc().initWithText_senderId_sender_timestamp_serverMessageId(text, self.userId(), self.user(), (NSDate.date().timeIntervalSince1970() * 1000), null);
            self.makeSureSendValidMessage_afterFetchedConversationShouldWithAssert(lcckMessage, NO);
            self.chatViewModel().sendMessage(lcckMessage);

        }
    },
});

defineClass('BibiTransferInfoView', {
            priceAddNumChangeAction: function(tf) {
            if (self.priceTF().text().isPureInts() || self.priceTF().text().isPureFloats()) {
            
            var moneyDec = self.priceTF().text().floatValue(); //   买入卖出价
            
            var marketcolse = self.market__close().floatValue();
            var conversionResult1 = marketcolse * moneyDec;
            var conversionResult = conversionResult1 * self.CNYRate().floatValue();
             conversionResult = conversionResult.toFixed(2); // 输出结果为 2.45
            self.convertLbl().setText(NSString.stringWithFormat("≈ ¥ %@", conversionResult));
            
            if (self.priceAmount()) {
            var priceAmount = self.priceAmount().floatValue();
            var multiplying = 0;
            
            if (self.transferType() == 1) {
            //                        能卖出几个
            multiplying = priceAmount / moneyDec;
            multiplying = multiplying.toFixed(4); // 输出结果为 2.45

            self.validChooseLbl().setText(NSString.stringWithFormat("可买入 %@ %@", multiplying,self.coin__name()));
            
            } else {
            //                        能买入几个
            multiplying = multiplying.toFixed(4); // 输出结果为 2.45
            multiplying = priceAmount * moneyDec;
            self.validChooseLbl().setText(NSString.stringWithFormat("可兑换 %@ %@", multiplying,self.coin__name()));
            }
            
            }
            
            if (self.numberTF().text().isPureInts() || self.numberTF().text().isPureFloats()) {
            
            //            数量
            var minDec = self.numberTF().text().floatValue(); // 买入卖出数量
            var multiplying = moneyDec * minDec;
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 %2.f%@", multiplying, self.quote__name()));
            
            } else {
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 0%@", self.quote__name()));
            }
            } else {
            self.convertLbl().setText("");
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 0%@", self.quote__name()));
            
            }
            
            },
            });
