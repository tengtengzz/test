require('ApplyListModel,MerchantListModel,NSString,NSDecimalNumber,NSURL,NSObject+MJKeyValue,UIView,ApplyDetailModel,UIFont,UIColor,RepaymentDetailTableViewCell,RepaymentDetailHeadView,ThreeZoneHeadView,ApplyDetailViewController,NetworkManager,NSMutableDictionary,MerchantDetailTableViewCell,MerchantDetailViewController,NSInteger');
defineClass('TTInfoViewController', {
            merchantDetailTableViewCell_tag: function(cell, tag) {
            
            var vc = MerchantDetailViewController.alloc().init();
            vc.setTitles(NSString.stringWithFormat("%@-%@", cell.model().merchantName(), cell.model().name()));
            vc.setMerchantId(NSString.stringWithFormat("%@", cell.model().merchantId()));
            vc.setType(1);
            self.navigationController().pushViewController_animated(vc, YES);
            
            },
            });


defineClass('RepaymentDetailViewController', {
            viewDidLoad: function() {
            self.super().viewDidLoad();
            self.setTitle("还款计划详情");
            self.setnavigationBarTitleStyleWithFont_color(UIFont.systemFontOfSize(self.heightAndWidthAndFontWithCGFloat(18)), UIColor.black33());
            self.view().setBackgroundColor(UIColor.colorWithHexString("#f7fafb"));
            self.table().setSeparatorColor(UIColor.colorWithHexString("#e5e5e5"));
            self.table().setBackgroundColor(UIColor.clearColor());
            self.registerCellClass("RepaymentDetailTableViewCell");
            self.registerHeaderClass("RepaymentDetailHeadView");
            self.table().registerClass_forHeaderFooterViewReuseIdentifier(ThreeZoneHeadView.class(), "ThreeZoneHeadView");
            self.setUnpaged(YES);
            
            self.loadList();
            
            },
            });


defineClass('BorrowMoneyDetailViewController', {
            viewDidAppear: function(animated) {
            self.super().viewDidAppear(animated);
            
            var dayRates = NSString.stringWithFormat("%@", self.proModel().dayRates());
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRates);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.dayRateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            },
            });
defineClass('BorrowMoneyViewController', {
            viewDidAppear: function(animated) {
            self.super().viewDidAppear(animated);
            var proModel = ApplyDetailModel.mj__objectWithKeyValues(self.modelnew().project());
            var dayRates = NSString.stringWithFormat("%@", proModel.dayRates());
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRates);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            
            },
            });

defineClass('MerchantDetailOkTableViewCell', {
            setModel: function(model) {
            self.setValue_forKey(model,"_model");

            
            var proModel = ApplyListModel.mj__objectWithKeyValues(model.project());
            self.titleLab().setText(proModel.merchantName());
            self.loanTimeLab().setText(NSString.stringWithFormat("借款期限 %@天", proModel.loanTime()));
            self.pendingMoneyLab().setText(NSString.stringWithFormat("%@-%@", proModel.minAmount(), proModel.maxAmount()));
            
            
            var loanTimeS = NSString.stringWithFormat("%@", proModel.loanTime());
            var repaymentIntervalTimeS = NSString.stringWithFormat("%@", proModel.repaymentIntervalTime());
            var loanTime = NSDecimalNumber.decimalNumberWithRoundUpString(loanTimeS);
            var repaymentIntervalTime = NSDecimalNumber.decimalNumberWithString(repaymentIntervalTimeS);
            var time = loanTime / repaymentIntervalTime;
            
            self.acomuntLab().setText(NSString.stringWithFormat("共%@期", time));
            var dayRates = NSString.stringWithFormat("%@", proModel.dayRates());
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRates);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));

            var url = NSString.stringWithFormat("http://img.yunshuidi.cn/%@", model.merchant().objectForKey("logo"));
            self.iconIV().sd__setImageWithURL(NSURL.URLWithString(url));

            },
            });

defineClass('MerchantDetailTableViewCell', {
            setModel: function(model) {

            self.setValue_forKey(model,"_model");
            var state =model.state();

            if (state == 1) {
            self.acmountTitleLab().setText("可用额度(元)");
            }
           if(!model.merchantName()){
             self.titleTF().setText(model.name());
            }else{
             self.titleTF().setText(model.merchantName());
            }
           
            self.pendingMoneyLab().setText(NSString.stringWithFormat("%@-%@", model.minAmount(), model.maxAmount()));
            self.loanTimeLab().setText(NSString.stringWithFormat("借款期限 %@天", model.loanTime()));
            
            var loanTimeS = NSString.stringWithFormat("%@", model.loanTime());
            var repaymentIntervalTimeS = NSString.stringWithFormat("%@", model.repaymentIntervalTime());
            var loanTime = NSDecimalNumber.decimalNumberWithRoundUpString(loanTimeS);
            var repaymentIntervalTime = NSDecimalNumber.decimalNumberWithString(repaymentIntervalTimeS);
            var time = loanTime / repaymentIntervalTime;

            self.acomuntLab().setText(NSString.stringWithFormat("共%@期", time));
            var dayRates = NSString.stringWithFormat("%@", model.dayRates());
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRates);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            var url = NSString.stringWithFormat("http://img.yunshuidi.cn/%@", model.merchant().objectForKey("logo"));
            self.iconIV().sd__setImageWithURL(NSURL.URLWithString(url));

            },
            });



defineClass('MerchantDetailTableViewCell', {
            setApplyModel: function(applyModel) {
            self.setValue_forKey(applyModel,"_applyModel");

            
            self.titleTF().setText(applyModel.project().objectForKey("name"));
            self.titleTF().setLeftView(UIView.new());
            
            
            //    状态待处理(0), 已通过(1), 已使用(2),
            if (applyModel.state() == 1 || applyModel.state() == 2) {
            self.acmountTitleLab().setText("批复额度(元)");
            self.pendingMoneyLab().setText(NSString.stringWithFormat("%@", applyModel.amount()));

            }

            if (applyModel.state() == 0) {
            self.acmountTitleLab().setText("申请额度(元)");
            self.pendingMoneyLab().setText(NSString.stringWithFormat("%@", applyModel.applyAmount()));

            }
            self.loanTimeLab().setText(NSString.stringWithFormat("借款期限 %@天", applyModel.project().objectForKey("loanTime")));
            
            
            
            
            var dayRate = NSString.stringWithFormat("%@", applyModel.project().objectForKey("dayRates"));

            var loanTimeS = NSString.stringWithFormat("%@", applyModel.project().objectForKey("loanTime"));
            var repaymentIntervalTimeS = NSString.stringWithFormat("%@", applyModel.project().objectForKey("repaymentIntervalTime"));
            var loanTime = NSDecimalNumber.decimalNumberWithRoundUpString(loanTimeS);
            var repaymentIntervalTime = NSDecimalNumber.decimalNumberWithString(repaymentIntervalTimeS);
            var time = loanTime / repaymentIntervalTime;
 
            self.acomuntLab().setText(NSString.stringWithFormat("共%@期", time));

            
            var dayRate = NSString.stringWithFormat("%@", applyModel.project().objectForKey("dayRates"));
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRate);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            

            
            
            },
            });




defineClass('MerchantDetailOkTwoTableViewCell', {
            setModel: function(model) {
            
            self.setValue_forKey(model,"_model");

            
            self.titleLab().setText(model.project().objectForKey("name"));
            
            //    状态  已拒绝(-1),  待处理(0),  已失效(3);
            if (model.state() == -1 || model.state() == 0 || model.state() == 3) {
                self.acmountTitleLab().setText("申请额度(元)");
            }
            if (model.state() == 1) {
                self.acmountTitleLab().setText("可用额度(元)");
            }
            
            self.pendingMoneyLab().setText(NSString.stringWithFormat("%@", model.applyAmount()));
            self.loanTimeLab().setText(NSString.stringWithFormat("借款期限 %@天", model.project().objectForKey("loanTime")));


            
            var dayRate = NSString.stringWithFormat("%@", model.project().objectForKey("dayRates"));
            
            var loanTimeS = NSString.stringWithFormat("%@", model.project().objectForKey("loanTime"));
            var repaymentIntervalTimeS = NSString.stringWithFormat("%@", model.project().objectForKey("repaymentIntervalTime"));
            var loanTime = NSDecimalNumber.decimalNumberWithRoundUpString(loanTimeS);
            var repaymentIntervalTime = NSDecimalNumber.decimalNumberWithString(repaymentIntervalTimeS);
            var time = loanTime / repaymentIntervalTime;
            
            self.acomuntLab().setText(NSString.stringWithFormat("共%@期", time));
            
            if (!model.dayRates() || model.dayRates().isEqual(" ")) {
            var dayRate = NSString.stringWithFormat("%@", model.project().objectForKey("dayRates"));
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRate);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            }else{
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(NSString.stringWithFormat("%@", model.dayRates()));
            var rateDec = NSDecimalNumber.decimalNumberWithRoundUpString(dayRate);
            var minMinerFeeDec = NSDecimalNumber.decimalNumberWithString("100");
            var multiplDec = rateDec * minMinerFeeDec;
            self.rateLab().setText(NSString.stringWithFormat("%@%%", multiplDec));
            
            }
            

            
            
            },
            });
