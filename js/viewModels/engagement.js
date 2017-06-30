/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'data/loader', 'data/images', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojbutton', 'ojs/ojlistview', 'ojs/ojtable', 'ojs/ojmasonrylayout'], function (oj, ko, loader, images, $) {
    function EngagementViewModel() {
        var self = this;
        self.firstTime = true;
        self.series = ko.observable();
        self.engId = ko.observable('');
        self.title = ko.observable('');
        self.handleActivated = function (info) {
            var parentRouter = info.valueAccessor().params.ojRouter.parentRouter;
            self.engRouter = parentRouter.currentState().value;
            self.engRouter.configure(function (stateId) {
                var state;
                if (stateId) {
                    var data = stateId.toString();
                    state = new oj.RouterState(data, {
                        value: data
                        , canEnter: function () {
                            return self.loadData(data);
                        }
                    });
                }
                return state;
            });
            return oj.Router.sync();
        };

        function getEngURL(id) {
            var url;
            if (id) {
                url = "js/data/" + id + ".json";
            }
            return url;
        }
        self.loadData = function (id) {
            return new Promise(function (resolve, reject) {
                loader.fetchData(getEngURL(id)).then(function (engObj) {
                    for(var i = 0; i < engObj.series.length;i++){
                        engObj.series[i].agendaDS = new oj.ArrayTableDataSource(engObj.series[i].agenda, {idAttribute: 'start'});
                    }
                    self.series(engObj.series);
                    self.title(engObj.title);
                    
                    resolve(true);
                }).fail(function (error) {
                    console.log('Error: ', error.message);
                    resolve(false);
                });
            });
        };
        self.goEng = function (engId) {
            self.engRouter.go(engId.toString());
            return true;
        };
        self.onEnter = function (engId, event) {
            if (event.keyCode === 13) {
                self.engRouter.go(engId.toString());
                return true;
            }
        };
        self.tabImages = ko.observableArray(["oj-start demo-catalog-icon-24 demo-icon-font", "oj-start demo-people-icon-24 demo-icon-font", "oj-start demo-chat-icon-24 demo-icon-font", "oj-start demo-education-icon-24 demo-icon-font"]);
        back = function () {
            window.history.back();
        }
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
    return EngagementViewModel;
});