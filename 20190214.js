require('MerchantDetailTableViewCell,MerchantDetailViewController,NSString,NSInteger,QNUploadManager,MBProgressHUD,UIImage,MyEduListViewController,MeLendingViewController,NewNeedPendingViewController,EGCommonWebViewController,NSIndexPath');

defineClass('EGMeViewController', {
            tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
            
            tableView.deselectRowAtIndexPath_animated(indexPath, YES);
            var dic = self.dataArray().objectAtIndex(indexPath.section()).objectAtIndex(indexPath.row());
            var index = dic.strValue("tag").integerValue();
            switch (index) {
            case 0:
            {
            self.navigationController().pushViewController_animated(MyEduListViewController.alloc().init(), YES);

            }
            break;
            case 1:
            {
            self.navigationController().pushViewController_animated(MeLendingViewController.alloc().init(), YES);

            }
            break;
            case 2:
            {
            self.navigationController().pushViewController_animated(NewNeedPendingViewController.alloc().init(), YES);

            }
            break;
            case 3:
            {
            self.tabBarController().setSelectedIndex(1);

            }
            break;
            case 4:
            {
            var web = EGCommonWebViewController.new();
            web.setURL("http://www.yunshuidi.cn/html/help.html");
            web.setTitle("问题详情");
            self.navigationController().pushViewController_animated(web, YES);
            }
            break;
            case 5:
            {
            var web = EGCommonWebViewController.new();
            web.setURL("http://www.yunshuidi.cn/customer/index.html");
            web.setTitle("客服热线");
            self.navigationController().pushViewController_animated(web, YES);
            }
            break;
            case 6:
            {
            var web = EGCommonWebViewController.new();
            web.setURL("http://www.yunshuidi.cn/html/about.html");
            web.setTitle("关于我们");
            self.navigationController().pushViewController_animated(web, YES);
            }
            break;
            default:
            break;
            }
            },
            });

defineClass('TTInfoViewController', {
            merchantDetailTableViewCell_tag: function(cell, tag) {
            
            var vc = MerchantDetailViewController.alloc().init();
            vc.setTitles(NSString.stringWithFormat("%@-%@", cell.model().merchantName(), cell.model().name()));
            vc.setMerchantId(NSString.stringWithFormat("%@", cell.model().merchantId()));
            vc.setType(1);
            self.navigationController().pushViewController_animated(vc, YES);
            
            },
            });

