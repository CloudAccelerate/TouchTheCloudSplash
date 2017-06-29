/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'data/loader', 'jquery', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojrouter', 'ojs/ojtable', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol'], function (oj, ko, loader, $) {
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
        self.oracleServiceSearch = ko.observable('');
        self.technologySearch = ko.observable('');
        self.useCaseSearch = ko.observable('');
        //filter - for now just title search
        self.filteredAllEngagements = ko.computed(function () {
            var engagamentFilter = new Array();
            if (self.allEngagaments().length !== 0) {
                if (self.titleSearch().length === 0) {
                    engagamentFilter = self.allEngagaments();
                }
                else {
                    ko.utils.arrayFilter(self.allEngagaments(), function (r) {
                        var token = self.titleSearch().toLowerCase();
                        if (r.title.toLowerCase().indexOf(token) >= 0) {
                            engagamentFilter.push(r);
                        }
                    });
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
                history.pushState(null, '', 'index.html?root=engagament&details=' + engage.details);
                oj.Router.sync();
            }
            else {
                // Default id for person is 100 so no need to specify.
                oj.Router.rootInstance.go('engagament');
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
        }]
        getItemInitialDisplay = function (index) {
            return index < 3 ? '' : 'none';
        };
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
    }
    return EngagementsViewModel;
});