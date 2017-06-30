/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout'], function (oj, ko) {
    var imageMap = {};
    imageMap.appcontainer = {
        src: './js/images/services/app-container.png'
        , display: 'Application Container'
        , type: 'service'
    };
    imageMap.container = {
        src: './js/images/services/container.png'
        , display: 'Container'
        , type: 'service'
    };
    imageMap.developer = {
        src: './js/images/services/developer.png'
        , display: 'Developer'
        , type: 'service'
    };
    imageMap.integration = {
        src: './js/images/services/integration.png'
        , display: 'Integration'
        , type: 'service'
    };
    imageMap.mobile = {
        src: './js/images/services/mobile.png'
        , display: 'Mobile'
        , type: 'service'
    };
    imageMap.mysql = {
        src: './js/images/services/mysql.png'
        , display: 'MySQL'
        , type: 'service'
    };
    imageMap.process = {
        src: './js/images/services/process.png'
        , display: 'Process'
        , type: 'service'
    };
    imageMap.ebsonprem = {
        src: './js/images/technologies/ebsonprem.png'
        , display: 'E-Business Suite'
        , type: 'technology'
    };
    imageMap.docker = {
        src: './js/images/technologies/docker.png'
        , display: 'Docker'
        , type: 'technology'
    };
    imageMap.golang = {
        src: './js/images/technologies/golang.png'
        , display: 'Go Lang'
        , type: 'technology'
    };
    imageMap.java = {
        src: './js/images/technologies/java.png'
        , display: 'Java'
        , type: 'technology'
    };
    imageMap.javascript = {
        src: './js/images/technologies/javascript.png'
        , display: 'JavaScript'
        , type: 'technology'
    };
    imageMap.jet = {
        src: './js/images/technologies/jet.png'
        , display: 'Oracle JET'
        , type: 'technology'
    };
    imageMap.nodejs = {
        src: './js/images/technologies/nodejs.png'
        , display: 'Node JS'
        , type: 'technology'
    };
    imageMap.max = {
        src: './js/images/technologies/max.png'
        , display: 'Oracle MAX'
        , type: 'technology'
    };
    imageMap.database = {
        src: './js/images/technologies/database.png'
        , display: 'Oracle Database'
        , type: 'technology'
    };
    mapImage = function (name) {
        var img = imageMap[name];
        if (img) {
            return img.src;
        }
        return '';
    }
    mapDisplay = function (name) {
        var img = imageMap[name];
        if (img) {
            return img.display;
        }
        return '';
    }
    getImage = function (key) {
        return imageMap[key]
    }
    getMap = function () {
        return imageMap;
    }
    return {
        mapImage: mapImage
        , mapDisplay: mapDisplay
        , getImage: getImage
        , getMap: getMap
    }
});