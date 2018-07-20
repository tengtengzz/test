require('UIView, UILayer, UIButton, UILabel, UIColor, UITextField, UIFont');
defineClass('DDOrderConversationViewController', {
            viewDidLoad: function() {
            self.super().viewDidLoad();
            // Do any additional setup after loading the view.
            self.chatBar().setHidden(YES);
            self.updateOrderInfo();
            // 收款方式
            var gatherTypeBtn = UIButton.buttonWithType(0);
            gatherTypeBtn.setBackgroundColor(UIColor.whiteColor());
            gatherTypeBtn.layer().setBorderColor(UIColor.colorWithRed_green_blue_alpha(152/255.0, 152/255.0, 152/255.0, 1).CGColor());
            gatherTypeBtn.layer().setBorderWidth(0.5);
            gatherTypeBtn.layer().setBorderColor(UIColor.colorWithRed_green_blue_alpha(102/255.0, 102/255.0, 102/255.0, 1).CGColor());
            gatherTypeBtn.layer().setCornerRadius(3);
            gatherTypeBtn.layer().setMasksToBounds(true);
            
            
            gatherTypeBtn.addTarget_action_forControlEvents(self, 'gatherTypeBtnClick:', 1 <<  6);
            gatherTypeBtn.titleLabel().setFont(UIFont.systemFontOfSize(13));
            gatherTypeBtn.setTitle_forState("付款方式", 0);
            gatherTypeBtn.setTitleColor_forState(UIColor.colorWithRed_green_blue_alpha(102/255.0, 102/255.0, 102/255.0, 1), 0);
            
            var hh = self.heightAndWidthAndFontWithCGFloat(30);
            var ww = self.heightAndWidthAndFontWithCGFloat(82);
            var yy = self.heightAndWidthAndFontWithCGFloat(10);
            var viewFrame = self.view().frame();
            var SCREEN_WIDTH = viewFrame.width;
            var xxx = SCREEN_WIDTH - ww - 15;
            var txfF = {x:xxx, y:yy, width:ww, height:hh};
            
            gatherTypeBtn.setFrame(txfF);
            
            self.orderView().addSubview(gatherTypeBtn);
            
            },
            });
