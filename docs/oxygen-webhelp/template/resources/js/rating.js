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
import { getIndexLocation, msg } from './utils.js';
import { LNG_IDX } from './config.js'
import { LANG_LIST } from './constants.js'

const defaultStarRate = 999;
const defaultCommentRate = "no comment - ";

export function submitRating() {
    let userFeedback = document.getElementById('rate-comment').value;
    let userRate = getStarRating();
    let selectedLang = getIndexLocation(LNG_IDX)
    if (LANG_LIST[selectedLang] === undefined) selectedLang = "en"
    
    if (userRate !== "" || userFeedback !== "") {
        if (userRate === "") userRate = defaultStarRate;
        if (userFeedback === "") userFeedback += defaultCommentRate + Math.random().toString(36).substr(2, 9);
        gtag('event', 'User Feedback', {'event_category': 'rating', 'event_label':userFeedback, 'value':userRate});
        console.log("Star rating: " + userRate + "\nComment: " + userFeedback);
        alert(msg(selectedLang, "rating.success.alert"));
        clearRating();
        location.reload();
    } else {
        alert(msg(selectedLang, "rating.error.alert"));
    }
}

export function toggleRateCheckbox() {
    let rateCheck = document.getElementById("rateCheck");
    let userFeedback = document.getElementById('rate-comment');
    userFeedback.value = "";
    userFeedback.disabled = !rateCheck.checked;
}

export function toggleSubmitButton() {
    let userFeedback = document.getElementById('rate-comment').value;
    let starRating = getStarRating();
    let submitBtn = document.getElementById('rate-submit');
    
    if (starRating !== "" || userFeedback !== "") {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }

}

function clearRating() {
    let userFeedback = document.getElementById('rate-comment');
    let starRating = document.getElementsByName('rate');
    let rateCheck = document.getElementById("rateCheck");

    rateCheck.checked = false;
    userFeedback.value = "";
    userFeedback.disabled = true;

    starRating.forEach(function(val){ 
        if (val.checked) {
            val.checked = false
        }
    })
}

function getStarRating() {
    let starRating = document.getElementsByName('rate');
    let userRate = "";

    starRating.forEach(function(val){ 
        if (val.checked) {
            userRate = val.value;
        }
    })

    return userRate;
}