require('NSDecimalNumber,NSDecimalNumberHandler,UIColor,NSMutableAttributedString,NSString');

defineClass('NSObject', {
            decimalNumberjingduMaket: function(str) {
            var ssss = self.decimalNumberjingdu(str);
            return ssss;
            
            },
            });
defineClass('CoinKlineViewController', {
            updateHeader: function(tick) {
            if (tick) {
            var prices = self.decimalNumberjingdu(tick.close());
            self.priceLbl().setText(prices);
            
            // 计算涨跌幅
//            var open = self.decimalNumberjingdu(tick.open());
//            var close = self.decimalNumberjingdu(tick.close());
            var open = tick.open().doubleValue();
            var close = tick.close().doubleValue();

            
            if (open == 0) {

            self.rangeLbl().setText("0.00%");
            self.rangeLbl().setTextColor(UIColor.green());

            } else {

            var subtractResult =  close - open;
            var devideResult = subtractResult / open;
            var finalResult = devideResult * 100;
            
            if(finalResult == 0 ){

            self.rangeLbl().setText("0.00%");
            self.rangeLbl().setTextColor(UIColor.green());

            }else if(finalResult < 0){

            self.priceLbl().setTextColor(UIColor.red());
            self.rangeLbl().setTextColor(UIColor.red());

            var attrStr = NSString.stringWithFormat("涨幅 %@%%", finalResult.toFixed(2));
            self.rangeLbl().setText(attrStr);


            }else{

            self.priceLbl().setTextColor(UIColor.green());
            self.rangeLbl().setTextColor(UIColor.green());

            var attrStr = NSString.stringWithFormat("涨幅 +%@%%", finalResult.toFixed(2));
            self.rangeLbl().setText(attrStr);

            }

            }
            
            var amountAttr = self.decimalNumberjingdu(tick.amount());
            var amountAttrStr = NSString.stringWithFormat("24H %ld", amountAttr);
            self.amountLbl().setText(amountAttrStr);
            
            var closes = NSDecimalNumber.decimalNumberWithString(tick.close());
            var cNYRate = NSDecimalNumber.decimalNumberWithString(self.CNYRate());
            var conversionResult = closes * cNYRate;
            var conversionResultqqqq = NSString.stringWithFormat("%@", conversionResult);
            var conversionResultss = self.decimalNumberjingdu(conversionResultqqqq);
            
            self.convesionLbl().setText(NSString.stringWithFormat("≈%@CNY", conversionResultss));
            self.convesionLbl().setTextColor(UIColor.lightGrayColor());
            
            
            var highAttr = self.decimalNumberjingdu(tick.high());
            var highAttrStr = NSString.stringWithFormat("最高 %@", highAttr);
            self.highLbl().setText(highAttrStr);
            
            var lowAttr = self.decimalNumberjingdu(tick.low());
            var lowAttrStr = NSString.stringWithFormat("最低 %@", lowAttr);
            self.lowLbl().setText(lowAttrStr);
            
            }
            },
            });










