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

export function initTwitterLink() {
    let lnk = document.getElementById("footerTwitterLink");
    if (lnk !== null) {
        let title = document.getElementsByTagName('title')[0].text.trim(); //first title tag located in head.
        let url = window.location.href;
        lnk.href = lnk.href + "?text=" + title + "&url=" + url;
    }
}