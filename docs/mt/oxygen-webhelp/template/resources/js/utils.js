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
import { I18N } from './lang.js'

let defaultLang = "en";

export function getIndexLocation(IDX) {
    let currentPath = document.location.pathname
    let p = currentPath.split('/')
    return p[IDX];
}

export function getBaseURL(urlIdx) {
    let base = ''
    let currentPath = document.location.pathname
    let p = currentPath.split('/')
    for (let i = 1; i < urlIdx; i++) {
        base += '/' + p[i]
    }
    return base
}

export function getCurrentPath(urlIdx, itemMap) {
    let currentPath = document.location.pathname
    let p = currentPath.split('/')
    let langLoc = p[urlIdx]
    if (itemMap[langLoc] != undefined) {
        currentPath = currentPath.replace('/' + langLoc, '')
    }

    return currentPath
}

export function createOptionItem(selectElement, id, value, text) {
    let option = document.createElement("option");
    option.text = text;
    option.value = value;
    option.id = id;
    selectElement.add(option);

    return option;
}

export function msg(lang, langKey) {
    return checkMsgLang(lang, langKey);
}

function checkMsgLang(lang, langKey) {
    let msg = I18N[lang][langKey];
    if (msg === "") {
        console.log("Message is not available for " + langKey + " on " + lang + ". Using default language:" + defaultLang);
        msg = I18N[defaultLang][langKey]
    }
    return msg;
}