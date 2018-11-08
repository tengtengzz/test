

require('Account,NSMutableDictionary,NSString,MBProgressHUD,NormalHTTPManger,IsLockedModel,LockedBalanceModel,NSDecimalNumber,YYZAlertView');
defineClass('LockPositionListViewController', {
            loadData: function() {
            
            var memberId = Account.sharedAccount().currentUserUid();
            
            var parametersss = NSMutableDictionary.dictionary();
            parametersss.setObject_forKey(memberId, "memberId");
            var pageNo = self.page();
            var pageSize = 10;
            var url = NSString.stringWithFormat("/member/account/lockedPostionRecord/%@-%@-%@", (self.selectCoinType()), (pageNo), (pageSize));
            MBProgressHUD.showLoadingMessage_toView(null, self.view());
            
            NormalHTTPManger.n__POSTWithAPIName_parameters_completionBlock_failureBlock(url, parametersss, block('BOOL,NSInteger,NSString*,id', function(isSuccessful, code, message, responseData) {
                                                                                                                self.setModel(IsLockedModel.mj__objectWithKeyValues(responseData));
                                                                                                                
                                                                                                                var balanceModel = LockedBalanceModel.mj__objectWithKeyValues(self.model().balance());
                                                                                                                
                                                                                                                var noReleaseMoney = NSDecimalNumber.decimalNumberWithRoundUpString(balanceModel.noReleaseMoney());
                                                                                                                self.headView2().noReleaseMoneyLab().setText(NSString.stringWithFormat("%@ %@", noReleaseMoney, self.selectCoinName()));
                                                                                                                var releaseMoney = NSDecimalNumber.decimalNumberWithRoundUpString(balanceModel.releaseMoney());
                                                                                                                self.headView2().releaseMoneyLab().setText(NSString.stringWithFormat("%@ %", releaseMoney, self.selectCoinName()));
                                                                                                                
                                                                                                                var pageListModel = IsLockedModel.mj__objectWithKeyValues(self.model().pageList());
                                                                                                                var dataArray = IsLockedModel.mj__objectArrayWithKeyValuesArray(pageListModel.list());
                                                                                                                if (self.page() == 1) {
                                                                                                                self.dataSource().removeAllObjects();
                                                                                                                self.dataSource().addObjectsFromArray(dataArray);
                                                                                                                if (self.dataSource().count() == 0) {
                                                                                                                self.tableView().nodataOrNoNetworkView().setHidden(NO);
                                                                                                                self.tableView().nodataOrNoNetworkView().setNodataOrNoNetworkCode(NodataOrNoNetworkCodeDate);
                                                                                                                } else {
                                                                                                                self.tableView().nodataOrNoNetworkView().setHidden(YES);
                                                                                                                }
                                                                                                                self.tableView().reloadData();
                                                                                                                
                                                                                                                } else {
                                                                                                                if (pageListModel.hasNextPage().integerValue() == 0 && pageListModel.pages().integerValue() < self.page()) {
                                                                                                                YYZAlertView.showMessage("没有更多记录了");
                                                                                                                MBProgressHUD.hideHUDForView(self.view());
                                                                                                                
                                                                                                                return;
                                                                                                                
                                                                                                                }
                                                                                                                self.dataSource().addObjectsFromArray(dataArray);
                                                                                                                self.tableView().reloadData();
                                                                                                                
                                                                                                                
                                                                                                                }
                                                                                                                MBProgressHUD.hideHUDForView(self.view());
                                                                                                                
                                                                                                                }), block('NSInteger,NSString*', function(code, errorString) {
                                                                                                                          self.tableView().nodataOrNoNetworkView().setHidden(self.dataSource().count() == 0 ? NO : YES);
                                                                                                                          MBProgressHUD.hideHUDForView(self.view());
                                                                                                                          
                                                                                                                          }));
            
            },
            });

