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

export function initMailLink() {
    let lnk = document.getElementById("footerMailLink");
    if (lnk !== null) {
        let title = document.getElementsByTagName('title')[0].text.trim(); //first title tag located in head.
        let url = window.location.href;
        lnk.href = "mailto:?subject=" + title + "&body=" + title + " - " + url;
    }
}