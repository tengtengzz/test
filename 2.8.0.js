require('NSString');
defineClass('SampleClass', {
            priceAddNumChangeAction: function(tf) {
            if (self.priceTF().text().isPureInts() || self.priceTF().text().isPureFloats()) {
            
            var moneyDec = self.priceTF().text().floatValue(); //   买入卖出价
            
            var market_colse = self.market_close().floatValue();
            var conversionResult1 = market_colse * moneyDec;
            var conversionResult = conversionResult1 * self.CNYRate().floatValue();
            self.convertLbl().setText(NSString.stringWithFormat("≈ ¥ %.2f", conversionResult));
            
            if (self.priceAmount()) {
            var priceAmount = self.priceAmount().floatValue();
            var multiplying = 0;
            
            if (self.transferType() == BibiTransferTypeBuy) {
            //                        能卖出几个
            multiplying = priceAmount / moneyDec;
            self.validChooseLbl().setText(NSString.stringWithFormat("可买入 %.4f %@", multiplying, self.coin_name()));
            
            } else {
            //                        能买入几个
            multiplying = priceAmount * moneyDec;
            self.validChooseLbl().setText(NSString.stringWithFormat("可兑换  %.4f %@", multiplying, self.quote_name()));
            }
            
            }
            
            if (self.numberTF().text().isPureInts() || self.numberTF().text().isPureFloats()) {
            
            //            数量
            var minDec = self.numberTF().text().floatValue(); // 买入卖出数量
            var multiplying = moneyDec * minDec;
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 %2.f%@", multiplying, self.quote_name()));
            
            } else {
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 0%@", self.quote_name()));
            }
            } else {
            self.convertLbl().setText("");
            self.tradeAmountLbl().setText(NSString.stringWithFormat("交易额 0%@", self.quote_name()));
            
            }
            
            },
            });
