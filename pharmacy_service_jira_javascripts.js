// ==UserScript==
// @name        New script
// @namespace   Violentmonkey Scripts
// @match       https://*.atlassian.net/*
// @grant       none
// @version     1.0
// @author      -
// @description 14.07.2025 09:26:57
// ==/UserScript==

(function() {
  'use strict';

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
alert('TEST 2');
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

