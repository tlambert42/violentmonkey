// ==UserScript==
// @name         Jira Pharma Enhancer
// @namespace    Violentmonkey Scripts
// @match        https://galenica.atlassian.net/*
// @grant        GM_addStyle
// @version      1.0
// @description  Intégration locale JS + CSS - 15.07.2025
// ==/UserScript==

(function () {
  'use strict';

  // === CSS intégré ===
  GM_addStyle(`
    div._1r04ze3t._kqswstnw { display: none; }
    div._16jlkb7n._1o9zkb7n._i0dlf1ug._1reo1wug._18m91wug {
      background-color: #E9F2FE;
      border-right:1px solid #1868DB;
    }
    div._ca0qutpp._u5f3utpp._n3tdutpp._19bvutpp._7myae4h9._1sw7nqa1._qgnumuej._bfhkhp5a {
      display: none;
    }
    header._nd5l8cbt._zulpu2gc._18zrutpp._179rzgxb._1e0c11p5._yv0e1mfv._4cvr1h6o._bfhkvuon._vchhusvi._4t3i1dgc._152t1nws._kqsw1if8._1pbyegat._d6vu1bgi._1j8b18ax {
      border-bottom:1px solid #1868DB;
      background-color: #69A5EB;
    }
    div._ca0qutpp._u5f3utpp._n3tdutpp._19bvutpp._7myae4h9._1sw7nqa1._qgnumuej {
      display:none;
    }
    .css-wo70zv, .css-1y9f6yn, .css-1qn711l, .css-1sluwpb, ._165nglyw, ._bozg1crf._1e0cglyw, .css-1qp4wby {
      display:none;
    }
    ._1xoqidpf:last-child { display:none; }
    ._4t3i1ris, ._2hwxyrq6 {
      background-color:#E9F2FE;
      border-left:1px solid #1868DB;
      margin-left:10px;
    }
    ._otyru2gc { background-color: #fff; }
    .css-38ytem {
      background-color: #69A5EB !important;
    }
    .css-38ytem h2, ._16qs1pcf button .css-178ag6o, ._16qs1pcf .css-5a6fwh, .eDdpIk ._1wybidpf {
      color:#fff;
    }
    ._16qs1pcf, .eDdpIk { background-color: #1868DB; }
    #jira-issue-header-actions { background-color: #E9F2FE; }
    div._19pkidpf._2hwx1wug._otyridpf._18u01wug._4cvr1h6o._1bahesu3._1e0c1txw._1bsb1osq._vchhusvi._10nju2gc._p12f1ayu._7zw61ejb {
      display: none;
    }
    ._ca0qxy5q { padding-top: 0px !important; }
    ._16qszucj {
      background-color:#d5efe2;
      box-shadow:0px 1px 3px #076837;
    }
  `);

  // === JS intégré ===
  function onUrlChange(callback) {
    let currentUrl = location.href;
    const observer = new MutationObserver(() => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        callback();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const pushState = history.pushState;
    history.pushState = function () {
      pushState.apply(history, arguments);
      callback();
    };
    const replaceState = history.replaceState;
    history.replaceState = function () {
      replaceState.apply(history, arguments);
      callback();
    };
    window.addEventListener('popstate', callback);
  }

  function AddLinkToPhoneNumber() {
    setTimeout(() => {
      const phoneBlocks = document.querySelectorAll('[data-testid="servicedesk-insight-attribute-list.ui.attribute-wrapper"] dd.css-2u776x div');
      if (phoneBlocks.length >= 2) {
        const phoneText = phoneBlocks[1].textContent.trim();
        const phoneNumber = phoneText.replace(/\s+/g, '');
        if (!phoneBlocks[1].querySelector('a')) {
          const link = document.createElement('a');
          link.href = `tel:${phoneNumber}`;
          link.textContent = phoneText;
          link.style.color = '#0052cc';
          link.style.textDecoration = 'none';
          phoneBlocks[1].innerHTML = '';
          phoneBlocks[1].appendChild(link);
        }
      }
    }, 500);
  }

  function CheckCustomerExpander() {
    const observer = new MutationObserver(() => {
      const button = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
      if (button) {
        attachClickListener();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function attachClickListener() {
    const button = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
    if (button) {
      button.addEventListener('click', AddLinkToPhoneNumber);
    }
  }

  function OpenCustomerExpander() {
    const element = document.querySelector('._t9ec1sub');
    if (!element || !isRotated180(element)) {
      const button = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
      if (button) button.click();
    }
  }

  function isRotated180(element) {
    const transform = window.getComputedStyle(element).transform;
    if (transform && transform !== 'none') {
      const values = transform.match(/matrix\\(([^)]+)\\)/);
      if (values) {
        const [a, b, c, d] = values[1].split(',').map(parseFloat);
        return a === -1 && b === 0 && c === 0 && d === -1;
      }
    }
    return false;
  }

  function HideAffecterUserTitle() {
    const labels = document.querySelectorAll('[data-testid="issue-field-cmdb-object.ui.field-label"]');
    labels.forEach(label => {
      const container = label.closest('div._1e0c1txw');
      if (container) container.style.display = 'none';
    });
  }

  function GlobalFunction() {
    const panelSelector = '[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf';
    const observer = new MutationObserver((mutations, obs) => {
      const panel = document.querySelector(panelSelector);
      if (panel) {
        CheckCustomerExpander();
        OpenCustomerExpander();
        AddLinkToPhoneNumber();
        HideAffecterUserTitle();
        obs.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('pageshow', e => {
    if (e.persisted) GlobalFunction();
  });
  window.addEventListener('popstate', () => GlobalFunction());
  window.addEventListener('load', () => GlobalFunction());
  onUrlChange(() => GlobalFunction());
})();
