/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'data/loader', 'jquery', 'data/images', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojrouter', 'ojs/ojtable', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol', 'ojs/ojselectcombobox'], function (oj, ko, loader, $, images) {
    function EngagementsViewModel() {
        var self = this;
        self.allEngagaments = ko.observableArray([]);
        self.ready = ko.observable(false);
        self.engagements = ko.observableArray([]);
        loader.fetchData('js/data/engagements.json').then(function (data) {
            self.allEngagaments(data.engagements);
        }).fail(function (error) {
            console.log('Error in getting Engagements data: ' + error.message);
        });
        self.model = oj.Model.extend({
            idAttribute: 'details'
        });
        self.collection = new oj.Collection(null, {
            url: 'js/data/engagements.json'
            , model: self.model
        });
        //search fields
        self.titleSearch = ko.observable('');
        self.oracleServiceSearch = ko.observableArray([]);
        self.technologySearch = ko.observableArray([]);
        self.useCaseSearch = ko.observableArray([]);
        //filter - for now just title search
        self.filteredAllEngagements = ko.computed(function () {
            var engagamentFilter = new Array();
            if (self.allEngagaments().length !== 0) {
                var filtered = false;
                if (self.titleSearch().length !== 0) {
                    ko.utils.arrayFilter(self.allEngagaments(), function (r) {
                        var token = self.titleSearch().toLowerCase();
                        if (r.title.toLowerCase().indexOf(token) >= 0) {
                            engagamentFilter.push(r);
                        }
                    });
                    filtered = true;
                }
                if (self.oracleServiceSearch().length !== 0) {
                    ko.utils.arrayFilter(self.allEngagaments(), function (r) {
                        var allMatch = true;
                        for (var i = 0; i < self.oracleServiceSearch().length; i++) {
                            var token = self.oracleServiceSearch()[i].toLowerCase();
                            var matchFound = false;
                            for (var j = 0; j < r.oracleServices.length; j++) {
                                var service = r.oracleServices[j].toLowerCase();
                                if (service === token) {
                                    matchFound = true;
                                    break;
                                }
                            }
                            if (!matchFound) {
                                allMatch = false;
                                break;
                            }
                        }
                        if (allMatch) {
                            engagamentFilter.push(r);
                        }
                    });
                    filtered = true;
                }
                if (self.technologySearch().length !== 0) {
                    ko.utils.arrayFilter(self.allEngagaments(), function (r) {
                        var allMatch = true;
                        for (var i = 0; i < self.technologySearch().length; i++) {
                            var token = self.technologySearch()[i].toLowerCase();
                            var matchFound = false;
                            for (var j = 0; j < r.technology.length; j++) {
                                var service = r.technology[j].toLowerCase();
                                if (service === token) {
                                    matchFound = true;
                                    break;
                                }
                            }
                            if (!matchFound) {
                                allMatch = false;
                                break;
                            }
                        }
                        if (allMatch) {
                            engagamentFilter.push(r);
                        }
                    });
                    filtered = true;
                }
                if (self.useCaseSearch().length !== 0) {
                    ko.utils.arrayFilter(self.allEngagaments(), function (r) {
                        var allMatch = true;
                        for (var i = 0; i < self.useCaseSearch().length; i++) {
                            var token = self.useCaseSearch()[i].toLowerCase();
                            var matchFound = false;
                            for (var j = 0; j < r.useCases.length; j++) {
                                var service = r.useCases[j].toLowerCase();
                                if (service === token) {
                                    matchFound = true;
                                    break;
                                }
                            }
                            if (!matchFound) {
                                allMatch = false;
                                break;
                            }
                        }
                        if (allMatch) {
                            engagamentFilter.push(r);
                        }
                    });
                    filtered = true;
                }
                if (!filtered) {
                    engagamentFilter = self.allEngagaments();
                }
            }
            self.ready(true);
            return engagamentFilter;
        });
        self.cardViewDataSource = ko.computed(function () {
            return new oj.ArrayTableDataSource(self.filteredAllEngagements(), {
                idAttribute: 'details'
            });
        });
        self.loadDetailsPage = function (engage) {
            if (engage.details) {
                // Temporary code until go('engagement/' + engage.engage); is checked in 1.1.2
                clearTimeout(tid);
                history.pushState(null, '', 'index.html?root=engagement&details=' + engage.details);
                oj.Router.sync();
            }
        };
        self.changeHandler = function (page, event) {
            if (event.option === 'selection') {
                if (event.value[0]) {
                    var engagament = {};
                    engagament.details = event.value[0];
                    self.loadPersonPage(engagament);
                }
            }
        };
        //        CAROUSEL INFORMATION
        self.carouselImage = [{
            "src": "./js/carousel/ttc-logo.png"
        }, {
            "src": "./js/carousel/devopsstarterkit.png"
        }, {
            "src": "./js/carousel/quotetoorder.png"
        }, {
            "src": "./js/carousel/icsworkshop.png"
        }];
        getPagingModel = function () {
            if (!self.pagingModel) {
                self.pagingModel = $("#filmStrip").ojFilmStrip("getPagingModel");
            }
            return self.pagingModel;
        };
        //timer stuff for carousel
        var timer = 5000;
        var tid = setTimeout(moveCarousel, timer);

        function moveCarousel() {
            var pagingModel = getPagingModel();
            var nextPage = (pagingModel.getPage() + 1) % pagingModel.totalSize();
            pagingModel.setPage(nextPage);
            tid = setTimeout(moveCarousel, timer);
        }
        self.cloudServicesList = ko.observableArray([]);
        self.technologyList = ko.observableArray([]);
        self.useCaseList = ko.observableArray(
            [{
                    "display": "Hybrid Integration"
                    , "value": "hybridintegration"
                }
                , {
                    "display": "Citizen Development"
                    , "value": "citizendevelopment"
                }
                , {
                    "display": "DevOps"
                    , "value": "devops"
                }
                , {
                    "display": "Microservices"
                    , "value": "microservices"
                }
                , {
                    "display": "Quote to Order"
                    , "value": "quotetoorader"
                }
                , {
                    "display": "Continuous Deployment"
                    , "value": "cd"
                }
                , {
                    "display": "Continuous Integration"
                    , "value": "ci"
                }]);
        Object.keys(images.getMap()).forEach(function (key) {
            var obj = images.getImage(key);
            if (obj.type === 'service') {
                self.cloudServicesList.push({
                    display: obj.display
                    , src: obj.src
                    , value: key
                });
            }
            else {
                self.technologyList.push({
                    display: obj.display
                    , src: obj.src
                    , value: key
                });
            }
        });
        self.cloudServicesList.sort(function (left, right) {
            return left.display.toLowerCase() < right.display.toLowerCase() ? -1 : 1
        });
        self.technologyList.sort(function (left, right) {
            return left.display.toLowerCase() < right.display.toLowerCase() ? -1 : 1
        });
        self.useCaseList.sort(function (left, right) {
            return left.display.toLowerCase() < right.display.toLowerCase() ? -1 : 1
        });
        serviceFilterChangeHandler = function (context, valueParam) {
            if (valueParam.option == "value") {
                self.oracleServiceSearch.removeAll();
                for (var i = 0; i < valueParam.value.length; i++) {
                    self.oracleServiceSearch.push(valueParam.value[i]);
                }
            }
        }
        technologyFilterChangeHandler = function (context, valueParam) {
            if (valueParam.option == "value") {
                self.technologySearch.removeAll();
                for (var i = 0; i < valueParam.value.length; i++) {
                    self.technologySearch.push(valueParam.value[i]);
                }
            }
        }
        useCaseFilterChangeHandler = function (context, valueParam) {
            if (valueParam.option == "value") {
                self.useCaseSearch.removeAll();
                for (var i = 0; i < valueParam.value.length; i++) {
                    self.useCaseSearch.push(valueParam.value[i]);
                }
            }
        }
    }
    return EngagementsViewModel;
});