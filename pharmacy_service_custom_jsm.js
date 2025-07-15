// ==UserScript==
// @name         Jira Pharma Enhancer
// @namespace    Violentmonkey Scripts
// @match        https://galenica.atlassian.net/*
// @grant        GM_addStyle
// @version      1.5
// @updateURL    https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @downloadURL  https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @description  Intégration locale JS + CSS - 15.07.2025
// ==/UserScript==

(function () {
  'use strict';

  // === CSS intégré ===
  
GM_addStyle(`

div._1r04ze3t._kqswstnw {
  display: none;
}
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
/* FILTRES */

.css-wo70zv{
  display:none;
}
.css-1y9f6yn{
  display:none;
}
.css-1qn711l{
  display:none;
}
._1xoqidpf:last-child{
  display:none;
}
.css-1sluwpb{
  display:none;
}
/*------------------*/
._165nglyw{
  display:none;
}
._bozg1crf._1e0cglyw{
  display:none;
}
/* Menu droite */
/* A FAIRE */
._4t3i1ris{
  background-color:#E9F2FE;
}
._2hwxyrq6{
  background-color:#E9F2FE;
  border-left:1px solid #1868DB;
  margin-left:10px;
}
._otyru2gc{
  background-color: #fff;
}
.css-38ytem{
  background-color: #69A5EB !important;
}
.css-38ytem h2{
  color:#fff;
}
._16qs1pcf{
  background-color: #1868DB;
}
._16qs1pcf button .css-178ag6o{
  color: #fff;
}
._16qs1pcf .css-5a6fwh{
  color: #fff;
}
.eDdpIk{
  background-color: #1868DB;
}
.eDdpIk ._1wybidpf{
  color: #fff;
  }
#jira-issue-header-actions{
  background-color: #E9F2FE;
}
/* Timesheet */



.css-1qp4wby{
  display: none;
}

div._19pkidpf._2hwx1wug._otyridpf._18u01wug._4cvr1h6o._1bahesu3._1e0c1txw._1bsb1osq._vchhusvi._10nju2gc._p12f1ayu._7zw61ejb {
  display: none;
}

._ca0qxy5q{
  padding-top: 0px !important;
}
/*
._11lvidpf button {
  display:none;
}

._1e0c1txw._4cvr1h6o._1bah1yb4._1tkezwfg.css-1bgzpx9{
  display:none;
}
*/
/* INFO PHARMA */
._16qszucj{
  background-color:#d5efe2;
  box-shadow:0px 1px 3px #076837;

}



`);


  // === JS intégré ===
  
  window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
          console.log('Page restaurée depuis le cache (bfcache)');
          // Ton code ici
      }
  });


  window.addEventListener('popstate', function(event) {
    console.log('Navigation détectée via popstate');
      // Ton code ici
    //GlobalFunction();
  });


  window.addEventListener('load', function() {
    console.log('Navigation Load');
    //GlobalFunction();
  });


  function onUrlChange(callback) {
    let currentUrl = location.href;

    const observer = new MutationObserver(() => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        callback();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Patch pushState et replaceState
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

  onUrlChange(() => {
    console.log('Changement d’URL détecté');
    GlobalFunction();
  });






  function AddLinkToPhoneNumber(){

    setTimeout(() => {
      const phoneBlocks = document.querySelectorAll('[data-testid="servicedesk-insight-attribute-list.ui.attribute-wrapper"] dd.css-2u776x div');

        if (phoneBlocks.length >= 2) {
            const secondPhone = phoneBlocks[1].textContent.trim();
            console.log('📞 Numéro du 2ᵉ bloc :', secondPhone);

            if (phoneBlocks[1] && !phoneBlocks[1].querySelector('a')) {

              const phoneText = phoneBlocks[1].textContent.trim();
              const phoneNumber = phoneText.replace(/\s+/g, '');
              const link = document.createElement('a');
              link.href = `tel:${phoneNumber}`;
              link.textContent = phoneText;
              link.style.color = '#0052cc';
              link.style.textDecoration = 'none';
              phoneBlocks[1].innerHTML = '';
              phoneBlocks[1].appendChild(link);
              console.log('Numéro transformé en lien');

            }
        }

    }, 500);

  }

  function CheckCustomerExpander(){

    const observer3 = new MutationObserver(() => {
      const button3 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
      if (button3) {
        attachClickListener();

        observer3.disconnect(); // on arrête l'observation une fois le bouton trouvé
      }
    });

    observer3.observe(document.body, { childList: true, subtree: true });

  }

  function attachClickListener() {
    const buttonClient2 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
    if (buttonClient2) {

      buttonClient2.addEventListener('click', AddLinkToPhoneNumber);

      console.log('Écouteur ajouté au bouton');
    }
  }

  function OpenCustomerExpander(){




      const element = document.querySelector('._t9ec1sub');
      if (element && isRotated180(element)) {
        console.log('L’élément est pivoté à 180 degrés');
      } else {
        console.log('L’élément n est pas pivoté à 180 degrés');
        const buttonClient2 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')

        //const button = document.querySelector('._1gqnidpf button');
        if (buttonClient2) {
          //setTimeout(() => {}, 2000);
          buttonClient2.click();
          console.log('Bouton buttonClient2 cliqué');
        }
      }

    //alert('ouvert / fermé');
    const path = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf span[role="img"] svg path')
    console.log(path);

    if (path) {
      const d = path.getAttribute('d');
      if (d.includes('14.53 6.03')) {
        console.log("Flèche vers le haut → détails affichés");
      } else {
        console.log("Flèche vers le bas → détails masqués");

        const buttonClient = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')

        //const button = document.querySelector('._1gqnidpf button');
        if (buttonClient) {
          //setTimeout(() => {}, 2000);
          buttonClient.click();
          console.log('Bouton buttonClient cliqué');
        }
      }
    }

  }

  function isRotated180(element) {
    const style = window.getComputedStyle(element);
    const transform = style.transform;

    if (transform && transform !== 'none') {
      // Exemple de transform: matrix(-1, 0, 0, -1, 0, 0) pour 180deg
      const values = transform.match(/matrix\(([^)]+)\)/);
      if (values) {
        const matrixValues = values[1].split(',').map(parseFloat);
        const [a, b, c, d] = matrixValues;

        // Vérifie si la matrice correspond à une rotation de 180 degrés
        return a === -1 && b === 0 && c === 0 && d === -1;
      }
    }

    return false;
  }



  function HideAffecterUserTitle(){

    /*

    // Sélectionner tous les boutons avec la classe cible
    const allButtons = document.querySelectorAll('button.css-1bgzpx9');

    //alert(allButtons.length);

    // Masquer uniquement le premier bouton (lié à "Affected User")
    if (allButtons.length > 0) {
        allButtons[0].style.display = 'none';
        console.log('🔒 Bouton lié à "Affected User" masqué');
    }*/


    const labels = document.querySelectorAll('[data-testid="issue-field-cmdb-object.ui.field-label"]');

    labels.forEach(label => {
      const container = label.closest('div._1e0c1txw');
      if (container) {
        container.style.display = 'none';
        console.log('Bloc CMDB masqué.');

      }
    });



  }



  function GlobalFunction() {
    const panelSelector = '[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf'; // ← adapte ce sélecteur si nécessaire

    const observer = new MutationObserver((mutations, obs) => {
      const panel = document.querySelector(panelSelector);

      if (panel) {

        //setTimeout(() => {}, 2000);

        CheckCustomerExpander();
        OpenCustomerExpander();
        AddLinkToPhoneNumber();
        HideAffecterUserTitle();


        // Une fois trouvé, on peut arrêter l'observation si ce n'est plus nécessaire
        obs.disconnect();
      }
    });

    // Démarre l'observation sur le body ou un autre conteneur pertinent
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

})();
