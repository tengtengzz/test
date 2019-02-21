require('MerchantDetailTableViewCell,MerchantDetailViewController,NSString,NSInteger');
defineClass('TTInfoViewController', {
            merchantDetailTableViewCell_tag: function(cell, tag) {
            
            var vc = MerchantDetailViewController.alloc().init();
            vc.setTitles(NSString.stringWithFormat("%@-%@", cell.model().merchantName(), cell.model().name()));
            vc.setMerchantId(NSString.stringWithFormat("%@", cell.model().merchantId()));
            vc.setType(1);
            self.navigationController().pushViewController_animated(vc, YES);
            
            },
            });

