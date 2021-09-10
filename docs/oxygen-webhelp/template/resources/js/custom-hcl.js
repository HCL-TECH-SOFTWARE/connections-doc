/*
 ********************************************************************
 * Licensed Materials - Property of HCL                             *
 *                                                                  *
 * Copyright HCL Software 2020. All Rights Reserved.                *
 *                                                                  *
 * Note to US Government Users Restricted Rights:                   *
 *                                                                  *
 * Use, duplication or disclosure restricted by GSA ADP Schedule    *
 *                                                                  *
 * Author: Emmanuel Palogan                                         *
 * Release Version: v.Q32021                                         *
 ********************************************************************
 */

import { LANG_LIST } from './constants.js'
import { LNG_IDX, VER_IDX, LND_IDX, LANGUAGE, VERSION, PAGE_IDX_LOC, ENABLE_LANG_EN, VERSION_LIST, VERSION_LIST_URL, PROD_LANG_LIST, LEARNING_ACADEMY_LINK} from './config.js'
import { initMailLink } from './mail.js'
import { initTwitterLink } from './twitter.js'
import { submitRating, toggleRateCheckbox, toggleSubmitButton } from './rating.js'
import { getIndexLocation, getBaseURL, getCurrentPath, createOptionItem, msg } from './utils.js'

let selectedLang = "en";
let requestSuccess = false;

$(function () {
    initSwitchers();
    fillLanguageItems();
    fillVersionItems();
    setTooltip();
    initMailLink();
    initTwitterLink();
    initEvents();
    initLabels();
    cleanEmptyTags();
});

function initLabels(){
  // this should be called after filling the language.  
  let version = document.getElementById("versions");
  let language = document.getElementById("languages");
  let rateStar = document.getElementById("ratingStarLabel");
  let rateComment = document.getElementById("ratingCommentLabel");
  let rateCheck = document.getElementById("rateCheckLabel");
  let rateCheckNote = document.getElementById("rateCheckNoteLabel");
  let LALink = document.getElementById("learningAcademyLink");
  let LAhref = document.getElementById("learningAcademy");

  if (LAhref !== null) LAhref.innerText = msg(selectedLang, "header.learning.academy");
  if (LEARNING_ACADEMY_LINK === false && LALink !== null) LALink.remove();
  if (language !== null) language.title = msg(selectedLang, "switcher.language.tooltip");
  if (version !== null) version.title = msg(selectedLang, "switcher.version.tooltip");
  if (rateStar !== null) rateStar.innerText = msg(selectedLang, "rating.star.label");
  if (rateComment !== null) rateComment.innerText = msg(selectedLang, "rating.comment.label");
  if (rateCheck !== null) rateCheck.innerHTML = msg(selectedLang, "rating.check.label");
  if (rateCheckNote !== null) rateCheckNote.innerHTML = msg(selectedLang, "rating.check.note");
}

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
    let rateSubmit = document.getElementById("rate-submit");
    let rateCheck = document.getElementById("rateCheck");
    let rateComment = document.getElementById('rate-comment');
    let rateStar = document.getElementsByName('rate');

    if (language !== null) language.onchange = changeLanguage;
    if (version !== null) version.onchange = changeVersion;
    if (rateSubmit !== null) {
        rateSubmit.addEventListener("click", submitRating);
        rateComment.addEventListener("keyup", toggleSubmitButton);
        rateStar.forEach(function(val){ 
            val.addEventListener("click", toggleSubmitButton);
        })
    }

    if (rateCheck !== null) rateCheck.addEventListener("click", toggleRateCheckbox);
}

function fillVersionItems() {
    let sel = document.getElementById("versions");
    if (sel !== null) {
        let verLoc = getIndexLocation(VER_IDX);
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
        let langLoc = getIndexLocation(LNG_IDX);
        let lng = LANG_LIST[langLoc];
        let hasSelected = false;

        PROD_LANG_LIST.forEach(function (value, index, arr) {
            let option = createOptionItem(sel, 'lang_' + value, value, LANG_LIST[value])
            if (lng !== undefined && langLoc === value) {
                option.selected = 'true';
                selectedLang = value
                hasSelected = true
            }
        });

        if (hasSelected === false) {
            document.getElementById("lang_en").selected = 'true';
        }
    }

}

function changeVersion() {
    let ver = document.getElementById("versions").value;
    if (ver !== null && ver !== undefined && ver !== '' && ver !== "0") {

        if (ver in VERSION_LIST_URL) {
            location.href = VERSION_LIST_URL[ver];
        } else {
            let domain = document.location.origin
            let currentPath = getCurrentPath(VER_IDX, VERSION_LIST)
            let currentPathLang = getCurrentPath(LNG_IDX, LANG_LIST)
            let base_url = getBaseURL(VER_IDX)
            let baseLang_url = getBaseURL(LNG_IDX)
            let currentPage = currentPath.replace(base_url, "")
            let currentPageLang = currentPathLang.replace(baseLang_url, "")
            currentPageLang = (selectedLang === 'en' && ENABLE_LANG_EN) ? currentPageLang.replace('/en', '') : '/en' + currentPageLang
            let verDir = "/" + ver
            let search = document.location.search
            let rootEnLangUrl = domain + base_url + verDir + currentPageLang + search
            let verUrl = domain + base_url + verDir + currentPage + search

            if(selectedLang === 'en') sendRequest(rootEnLangUrl, LANGUAGE, false);
            sendRequest(verUrl, VERSION, true);
        }
    } else if (ver === "0") {
        let domain = document.location.origin
        let pathnames = document.location.pathname.split('/')
        let prodLandingURL = domain + "/" 
        
        pathnames.forEach(function (value, index, arr){
            if (index <= LND_IDX && index > 0) {
                prodLandingURL += value + "/"
            }
        })
        
        prodLandingURL += PAGE_IDX_LOC

        sendRequest(prodLandingURL, VERSION, true);
    } else {
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
        let langDir = (lang === defaultLang && !ENABLE_LANG_EN) ? "" : "/" + lang
        let search = document.location.search
        let langUrl = domain + base_url + langDir + currentPage + search

        sendRequest(langUrl, LANGUAGE, true);
    } else {
        alert("Language undefined. Please check language reference.")
    }
}

function sendRequest(urlDest, requestType, doAlert) {
    let request = new XMLHttpRequest()
    let versionError = msg(selectedLang, "request.version.error");
    let languageError = msg(selectedLang, "request.language.error");
    console.log('Sending Request for ' + urlDest)
    request.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            let msg = (requestType === VERSION) ? versionError : languageError;
            let isSoft404 = isPageNotFound(request.responseText)
            if (request.status === 200 && !isSoft404) {
                console.log('Destination exists!')
                requestSuccess = true
                window.location.href = urlDest
            } else {
                console.log(msg)
                if(doAlert === true && requestSuccess === false) {
                    alert(msg)
                    location.reload();
                }
            }
        }
    }
    request.open('GET', urlDest, false);
    request.send()
}

function isPageNotFound(responseText) {
    let isSoft404 = false
    let template = new DOMParser().parseFromString(responseText, "text/html");
    let bannerTitle = ''

    if(template.getElementsByClassName('banner-title')[0] !== undefined) {
        bannerTitle = template.getElementsByClassName('banner-title')[0].innerText;
    }
    
    if (bannerTitle !== '') {
        isSoft404 = bannerTitle.includes('Ooops... Page Not Found')
    }
    return isSoft404
}

function setTooltip() {
    $('[data-toggle="tooltip"]').tooltip;
}

function cleanEmptyTags() {
    let welcome = document.getElementsByClassName('wh_welcome')[0];
    if (welcome !== undefined && welcome.innerText.trim() === "") {
        welcome.innerHTML = ""
    }
}