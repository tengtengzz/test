2.0.31|require('UIBarButtonItem,OneCoinMoneyChangeListViewController,BeginTranferMoneyViewController,GetMoneyViewController');
defineClass('MyMoeyManagementViewController', {
            myMoeyManagementTableViewCell_button: function(cell, button) {
            if (button.tag() == 1) {
            //资金明细
            self.navigationController().navigationBar().setTranslucent(YES);
            self.navigationController().navigationItem().backBarButtonItem().setBackButtonTitlePositionAdjustment_forBarMetrics(UIOffsetZero, UIBarMetricsDefault);
            var item = UIBarButtonItem.alloc().initWithTitle_style_target_action("明细", UIBarButtonItemStylePlain, null, null);
            self.navigationItem().setBackBarButtonItem(item);
            var vc = OneCoinMoneyChangeListViewController.alloc().init();
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(vc, YES);
            } else if (button.tag() == 2) {
            //        充币
            var bibiOrderVC = BeginTranferMoneyViewController.alloc().init();
            bibiOrderVC.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(bibiOrderVC, YES);
            } else {
            //        提币m
            var vc = GetMoneyViewController.alloc().init();
            vc.setSelectCoinType(cell.model().coinType().integerValue());
            self.navigationController().pushViewController_animated(vc, YES);
            
            
            }
            
            },
            });
