# Usage

    translate.start({
        defaults : {
            locale : "pt"
        },
        
        locales : {
            en : "/app/translations/messages.en.yml",
            pt : "/app/translations/messages.pt.yml"
        }
    }).then(function() {
        console.log("Translations Loaded do something")
    });

    $rootScope.i18n = translate;