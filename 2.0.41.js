2.0.41|require('OneCoinMoneyChangeListViewController,BeginTranferMoneyViewController,GetMoneyViewController');
defineClass('MyMoeyManagementViewController', {
    myMoeyManagementTableViewCell_button: function(cell, button) {
        if (button.tag() == 1) {
            //资金明细
            NAV_BACK_ITEM_ADD_TITLE(NSLocalizedString("明细", null))
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
