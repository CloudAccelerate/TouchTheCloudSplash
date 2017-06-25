/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'data/loader', 'ojs/ojmasonrylayout'],
  function(oj, ko, loader) {
     function EngagementViewModel() {
       var self = this;
         
        self.engagement = ko.observableObject({});
     }

     return EngagementViewModel;
  }
);
