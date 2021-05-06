/*
 ********************************************************************
 * Licensed Materials - Property of HCL                             *
 *                                                                  *
 * Copyright HCL Technologies Ltd. 2001, 2020. All Rights Reserved. *
 *                                                                  *
 * Note to US Government Users Restricted Rights:                   *
 *                                                                  *
 * Use, duplication or disclosure restricted by GSA ADP Schedule    *
 *                                                                  *
 * Author: Emmanuel Palogan
 ********************************************************************
 */

import { LANG_LIST, VERSION_LIST, PROD_LANG_LIST } from './constants.js'
import { initMailLink } from './mail.js'
import { initTwitterLink } from './twitter.js'

const LNG_IDX = 3;
const VER_IDX = 2;
const LND_IDX = 1;
const LANGUAGE = "Language";
const VERSION = "Version";
const PAGE_IDX_LOC = "index.html";

$(function () {
    initSwitchers();
    fillLanguageItems();
    fillVersionItems();
    setTooltip();
    initMailLink();
    initTwitterLink();
    initEvents();
});

function initSwitchers() {
    if (PROD_LANG_LIST.length < 1) {
        $(".language-container").remove();
    }

    if (Object.getOwnPropertyNames(VERSION_LIST).length < 2) {
        $(".version-container").remove();
    }
}

function initEvents() {
    let version = document.getElementById("versions");
    let language = document.getElementById("languages");
    if (language !== null) language.onchange = changeLanguage
    if (version !== null) version.onchange = changeVersion
}

function fillVersionItems() {
    let sel = document.getElementById("versions");
    if (sel !== null) {
        let currentPath = document.location.pathname
        let p = currentPath.split('/')
        let verLoc = p[VER_IDX];
        let ver = VERSION_LIST[verLoc];

        for (let v in VERSION_LIST) {
            let option = createOptionItem(sel, 'v-' + v, v, VERSION_LIST[v])
            if (ver !== undefined && verLoc === v) {
                option.selected = 'true';
            }
        }
    }
}

function fillLanguageItems() {
    let sel = document.getElementById("languages");
    if (sel !== null) {
        let currentPath = document.location.pathname
        let p = currentPath.split('/')
        let langLoc = p[LNG_IDX];
        let lng = LANG_LIST[langLoc];
        let hasSelected = false;

        PROD_LANG_LIST.forEach(function (value, index, arr) {
            let option = createOptionItem(sel, 'lang_' + value, value, LANG_LIST[value])
            if (lng !== undefined && langLoc === value) {
                option.selected = 'true';
                hasSelected = true
            }
        });

        if (hasSelected === false) {
            document.getElementById("lang_en").selected = 'true';
        }
    }

}

function createOptionItem(selectElement, id, value, text) {
    let option = document.createElement("option");
    option.text = text;
    option.value = value;
    option.id = id;
    selectElement.add(option);

    return option;
}

function changeVersion() {
    let ver = document.getElementById("versions").value;
    if (ver !== null && ver !== undefined && ver !== '' && ver !== "0") {
        let domain = document.location.origin
        let currentPath = getCurrentPath(VER_IDX, VERSION_LIST)
        let base_url = getBaseURL(VER_IDX)
        let currentPage = currentPath.replace(base_url, "")
        let verDir = "/" + ver
        let search = document.location.search
        let verUrl = domain + base_url + verDir + currentPage + search

        sendRequest(verUrl, VERSION);
    } 
    else if (ver === "0") {
        let domain = document.location.origin
        let pathnames = document.location.pathname.split('/')
        let prodLandingURL = domain + "/" 
        
        pathnames.forEach(function (value, index, arr){
            if (index <= LND_IDX && index > 0) {
                prodLandingURL += value + "/"
            }
        })
        
        prodLandingURL += PAGE_IDX_LOC

        sendRequest(prodLandingURL, VERSION);
    }
    else {
        alert("Version undefined. Please check version reference.")
    }
}

function changeLanguage() {
    let defaultLang = "en"
    let lang = document.getElementById("languages").value;
    if (lang !== null && lang !== undefined && lang !== '') {

        let domain = document.location.origin
        let currentPath = getCurrentPath(LNG_IDX, LANG_LIST)
        let base_url = getBaseURL(LNG_IDX)
        let currentPage = currentPath.replace(base_url, "")
        let langDir = (lang === defaultLang) ? "" : "/" + lang
        let search = document.location.search
        let langUrl = domain + base_url + langDir + currentPage + search

        sendRequest(langUrl, LANGUAGE);
    } else {
        alert("Language undefined. Please check language reference.")
    }
}

function sendRequest(urlDest, requestType) {
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let isSoft404 = isPageNotFound(request.responseText)
            if (request.status === 200 && !isSoft404) {
                console.log(requestType + " documents exist")
                window.location.href = urlDest
            } else {
                alert(requestType + ' does not exist!')
                console.log(requestType + " document does not exist")
                return;
            }
        }
    }
    request.open('GET', urlDest, true);
    request.send()
}

function isPageNotFound(responseText) {
    let isSoft404 = false
    let template = document.createElement('template');
    template.innerHTML = responseText
    let bannerTitle = template.getElementsByClassName('banner-title').innerHTML
    if (bannerTitle !== undefined && bannerTitle !== '' && bannerTitle !== null) {
        isSoft404 = bannerTitle.includes('Ooops... Page Not Found')
    }
    return isSoft404
}

function getBaseURL(urlIdx) {
    let base = ''
    let currentPath = document.location.pathname
    let p = currentPath.split('/')
    for (let i = 1; i < urlIdx; i++) {
        base += '/' + p[i]
    }
    return base
}

function getCurrentPath(urlIdx, itemMap) {
    let currentPath = document.location.pathname
    let p = currentPath.split('/')
    let langLoc = p[urlIdx]
    if (itemMap[langLoc] != undefined) {
        currentPath = currentPath.replace('/' + langLoc, '')
    }

    return currentPath
}

function setTooltip() {
    $('[data-toggle="tooltip"]').tooltip;
}