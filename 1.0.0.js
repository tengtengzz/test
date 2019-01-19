

require('NavigationView');
defineClass('TTInfoViewController', {
    back: function() {
        self.navView().titleLbl().setText("nihau");
    },
});
