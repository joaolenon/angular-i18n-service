# Usage

    translate.start({
        defaults : {
            locale : "pt"
        },
        
        locales : {
            en : "/app/translations/messages.en.json",
            pt : "/app/translations/messages.pt.json"
        }
    }).then(function() {
        console.log("Translations Loaded do something")
    });

    $rootScope.i18n = translate;