// ==UserScript==
// @name         Jira Pharma Enhancer
// @namespace    Violentmonkey Scripts
// @match        https://galenica.atlassian.net/*
// @grant        GM_addStyle
// @version      1.6.2
// @updateURL    https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @downloadURL  https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @description  Intégration locale JS + CSS - 15.07.2025
// ==/UserScript==

(function() {

/*=================================================================================
	Amélioration de JSM

	Définition des variables

	Fonction Globale
	Customisation de la CSS
	Customisation du Header
	Customisation du Menu de gauche
	Customisation du Contenu
	Customisation du Menu de droite



=================================================================================*/
/*=================================================================================
	Définition des variables
=================================================================================*/
//Liste des menus de gauche à masquer

const LeftMenu_MenusToHide_DataTestID = [
        'NAV4_proj-JSMSP-rprt-container',     			  // Reports
        'NAV4_proj-JSMSP-views-container',    			  // Views
        'NAV4_proj-JSMSP-nlog-container',      			  // Customers Logs
        'NAV4_archived_work_items_JSMSP-container',  	// Archives
        'NAV4_proj-JSMSP-summary-container' 	        // Summary
	];
const LeftMenu_MenusToHide_URL = [
		'Checklist',
		'Create issue from template',
		'demandes de service',
    "tempo-project-centric-timesheet-panel",          // Timesheet
    "ic-templates-page-checklist",                     //Checklist
    "jql-search-extensions-extended-search-project-settings" // Extended search
	];
const LeftMenu_MenusToHide_Name = [
		'Ajouter un raccourci',
    'demandes de service',
    "Files d'attente",
    "Create issue from template",
  "Canaux"
	];
/*=================================================================================
	Fonction Globale
=================================================================================*/
onUrlChange(() => {
    //console.log('Changement d’URL 2 détecté');
    customJSM();
});

function customJSM(){

	customCSS();
	customHeader();
	customLeftMenu();
	customContent();
	customRightMenu();

}
/*=================================================================================
	Customisation de la CSS
=================================================================================*/
function customCSS(){
  GM_addStyle(`


/*======================================
	Navigation du haut
======================================*/

header._nd5l8cbt._zulpu2gc._18zrutpp._179rzgxb._1e0c11p5._yv0e1mfv._4cvr1h6o._bfhkvuon._vchhusvi._4t3i1dgc._152t1nws._kqsw1if8._1pbyegat._d6vu1bgi._1j8b18ax {
  border-bottom:1px solid #1868DB;
  background-color: #69A5EB;

}
/*======================================
	Sous-Navigation du haut
======================================*/
div._19pkidpf._2hwx1wug._otyridpf._18u01wug._4cvr1h6o._1bahesu3._1e0c1txw._1bsb1osq._vchhusvi._10nju2gc._p12f1ayu._7zw61ejb {
  display: none;
}
/*======================================
	Menu de gauche
======================================*/
/* Fond */

div._16jlkb7n._1o9zkb7n._i0dlf1ug._1reo1wug._18m91wug {
  background-color: #E9F2FE;
  border-right:1px solid #1868DB;
}

/* Filtres par défaut */

.css-wo70zv{
  display:none;
}

/* Envoyer du feedback */

div._ca0qutpp._u5f3utpp._n3tdutpp._19bvutpp._7myae4h9._1sw7nqa1._qgnumuej._bfhkhp5a {
  display: none;
}
div._ca0qutpp._u5f3utpp._n3tdutpp._19bvutpp._7myae4h9._1sw7nqa1._qgnumuej {
  display:none;
}
/*======================================
	Contenu
======================================*/

/*======================================
	Menu de droite
======================================*/
/* Fond */

._4t3i1ris{
  background-color:#E9F2FE;
}
#jira-issue-header-actions{
  background-color: #E9F2FE;
}

._2hwxyrq6{
  background-color:#E9F2FE;
  border-left:1px solid #1868DB;
  margin-left:10px;
}
/*======================================
	Menu de droite - Bloc
======================================*/
/* Fond */

._otyru2gc{
  background-color: #fff;
}

/* Entête expander */

.css-38ytem{
  background-color: #69A5EB !important;
}
.css-38ytem h2{
  color:#fff;
}

/* Bouton de status */

._16qs1pcf button .css-178ag6o{
  color: #fff;
}
._16qs1pcf .css-5a6fwh{
  color: #fff;
}
/* Bouton automation */
.eDdpIk{
  background-color: #1868DB;
}
.eDdpIk ._1wybidpf{
  color: #fff;
}
/* Automation / tempo / statuspage */
.css-1qp4wby{
  display: none;
}
/*======================================
	Menu de droite - INFOS Pharma
======================================*/
._16qszucj{
  background-color:#d5efe2;
  box-shadow:0px 1px 3px #076837;

}


`);
}
/*=================================================================================
	Customisation du Header
=================================================================================*/
function customHeader(){
  //console.log('customHeader');
}
/*=================================================================================
	Customisation du Menu de gauche
=================================================================================*/
function customLeftMenu(){

	// Afin de pouvoir masquer les menus, on doit détecter que le projet soit ouvert

	const LeftMenuContainerSelector = '[data-testid="NAV4_proj_JSMSP-container"]';

    const LeftMenucheckButtonState = (button) => {

        const LeftMenuIsExpanded = button.getAttribute('aria-expanded') === 'true';
        //console.log('État du bouton :', isExpanded ? 'Actif (ouvert)' : 'Inactif (fermé)');

        if(LeftMenuIsExpanded) {

          //console.log('on commence le masquage');

          // On masque les menus non souhaités

          HideElementWithDataTestID(LeftMenu_MenusToHide_DataTestID);
          HideElementWithURL(LeftMenu_MenusToHide_URL);
          HideElementWithName(LeftMenu_MenusToHide_Name);

          //LeftMenuDomObserver.disconnect();
        }

    };

    const LeftMenuObserveButton = (button) => {

        const LeftMenuObserver = new MutationObserver(() => {
            LeftMenucheckButtonState(button);
        });

        LeftMenuObserver.observe(button, {
            attributes: true,
            attributeFilter: ['aria-expanded']
        });

        // Vérifie l'état initial
        LeftMenucheckButtonState(button);
    };

    const LeftMenuFindAndObserve = () => {

        const LeftMenuContainer = document.querySelector(LeftMenuContainerSelector);
        if (LeftMenuContainer) {
            const button = LeftMenuContainer.querySelector('button[aria-expanded]');
            if (button) {
                LeftMenuObserveButton(button);
            }
        }
    };

    // Surveille le DOM pour détecter l'apparition du bouton
    const LeftMenuDomObserver = new MutationObserver(() => {
        LeftMenuFindAndObserve();
    });

    LeftMenuDomObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Tentative initiale
    LeftMenuFindAndObserve();

  hideRecentSection();

}
/*=================================================================================
	Customisation du Contenu
=================================================================================*/
function customContent(){
  //console.log('customContent');
}
/*=================================================================================
	Customisation du Menu de droite
=================================================================================*/
function customRightMenu(){
	//console.log('customRightMenu');
  const panelSelectorRightPanel = '[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf'; // ← adapte ce sélecteur si nécessaire

  const observerRightPanel = new MutationObserver((mutations, obsRightPanel) => {

    const panelRightPanel = document.querySelector(panelSelectorRightPanel);

    if (panelRightPanel) {

      CheckCustomerExpander();
      OpenCustomerExpander();
      AddLinkToPhoneNumber();
      // Une fois trouvé, on peut arrêter l'observation si ce n'est plus nécessaire
      obsRightPanel.disconnect();
    }
  });
  // Démarre l'observation sur le body ou un autre conteneur pertinent
    observerRightPanel.observe(document.body, {
      childList: true,
      subtree: true
    });

  // Masquage du bouton de vote
  document.querySelectorAll('div._1n1uewfl._nz6rewfl')[1].style.display = 'none';

  // Masquage du bouton de partage
  const shareButton = document.querySelector('button[data-testid="share-button.ui.pre-share-view.button"]');
  if (shareButton) {
      shareButton.style.display = 'none';
      //console.log('Bouton "Partager" masqué');
  }



  // Sélectionner l'ancien SVG à remplacer
  /*
  const ancienSVG = document.querySelector('span.css-bwxjrz svg');
  //console.log('ancien');
  //console.log(ancienSVG);

  if (ancienSVG) {
      // Nouveau SVG à insérer
      const nouveauSVG = `
          <svg fill="none" viewBox="0 0 16 16" role="presentation" class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbutpp _4t3iutpp">
              <path fill="currentcolor" d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"></path>
          </svg>
      `;

      // Remplacer l'ancien SVG par le nouveau
      ancienSVG.outerHTML = nouveauSVG;
  }*/


}
/*=================================================================================
	Fonctions
=================================================================================*/
//Fonction qui masque des data-testid
function HideElementWithDataTestID(ElementsList) {
	ElementsList.forEach(testId => {
	const CardToHide = document.querySelector(`[data-testid="${testId}"]`);
		if (CardToHide && CardToHide.getAttribute('data-selected') === 'false') {
			CardToHide.style.display = 'none';
		}
	});
}
//Fonction qui masque des éléments par leur URL
function HideElementWithURL(ElementsList) {
    const cards = document.querySelectorAll('div[data-selected="false"]');

    cards.forEach(card => {

        ElementsList.forEach(LinkID => {
            const link = card.querySelector(`a[href*="${LinkID}"]`);
            //console.log(LinkID);

            if (link) {

                // Vérifie si l'élément est déjà masqué
                if (card.style.display === 'none') {
                    //console.log(`Carte contenant "${LinkID}" est déjà masquée`);
                } else {
                    card.style.display = 'none';
                    //console.log(`Menu contenant "${LinkID}" masquée`);
                }

            }
        });
    });
}

//Fonction qui masque des éléments par leur nom
function HideElementWithName(ElementsList) {
    const lowerCaseList = ElementsList.map(el => el.toLowerCase());

    const cards = document.querySelectorAll('div[data-selected="false"], div');

    cards.forEach(card => {
        const span = card.querySelector('span');
        if (span) {
            const text = span.textContent.trim().toLowerCase();
            if (lowerCaseList.includes(text)) {
                card.style.display = 'none';
                //console.log(`Menu "${text}" masquée`);
            }
        }
    });
}
// Fonction pour masquer le bloc Récents des projets
function hideRecentSection() {
    const headings = document.querySelectorAll('h2');
    headings.forEach(heading => {
        if (heading.textContent.trim() === 'Récents') {
            const section = heading.closest('div[role="group"]');
            if (section) {
                section.style.display = 'none';
                //console.log('Bloc "Récents" masqué');
            }
        }
    });
}


//Fonction de détection de changement d'URL


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

// Fonction de transformation du no de téléphone en lien cliquable

function AddLinkToPhoneNumber(){

    setTimeout(() => {
      const phoneBlocks = document.querySelectorAll('[data-testid="servicedesk-insight-attribute-list.ui.attribute-wrapper"] dd.css-2u776x div');

        if (phoneBlocks.length >= 2) {
            const secondPhone = phoneBlocks[1].textContent.trim();
            //console.log('📞 Numéro du 2ᵉ bloc :', secondPhone);

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
              //console.log('Numéro transformé en lien');

            }
        }

    }, 500);
}

// Fonction qui check l'état du bloc d'infos des pharmacies

function CheckCustomerExpander(){

  const observer3RightPanel = new MutationObserver(() => {
    const button3RightPanel = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
    if (button3RightPanel) {
      attachClickListener();

      observer3RightPanel.disconnect(); // on arrête l'observation une fois le bouton trouvé
    }
  });

  observer3RightPanel.observe(document.body, { childList: true, subtree: true });

}

  function attachClickListener() {
    const buttonClient2RightPanel = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
    if (buttonClient2RightPanel) {

      buttonClient2RightPanel.addEventListener('click', AddLinkToPhoneNumber);

    }
  }

  //Fonction qui ouvre le menu des infos pharmacies si il est fermé

  function OpenCustomerExpander(){

      const element = document.querySelector('._t9ec1sub');
      if (element && isRotated180(element)) {
        //console.log('L’élément est pivoté à 180 degrés');
        const buttonClient2 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')


        //issue-field-cmdb-object.ui.card.button-view-details


        //const button = document.querySelector('._1gqnidpf button');
        if (buttonClient2 && buttonClient2.getAttribute('data-testid') !== 'issue-field-cmdb-object.ui.card.button-view-details') {
          //setTimeout(() => {}, 2000);
          buttonClient2.click();
          //console.log('Bouton buttonClient2 cliqué');

        }
      }
/*

      const path = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf span[role="img"] svg path')
      //console.log(path);

      if (path) {
        const d = path.getAttribute('d');
        console.log(path);

        if (d.includes('14.53 6.03')) {
          console.log("Flèche vers le haut → détails affichés");
        } else {
          console.log("Flèche vers le bas → détails masqués");

          const buttonClient = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')

          //const button = document.querySelector('._1gqnidpf button');
          if (buttonClient) {
            //setTimeout(() => {}, 5400);
            //buttonClient.click();

            console.log('Bouton buttonClient cliqué');

              // Affiche la DIV parente ou l'identifiant
              const parentDiv = buttonClient.closest('div');
              if (parentDiv) {
                console.log('DIV parente du bouton cliqué :', parentDiv);
                console.log('ID de la DIV parente :', parentDiv.id || 'Pas d\'ID');
              }

          }
        }
      }*/

  }

//Fonction qui check si la flèche de l'expander est ouverte ou non

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


/*=================================================================================
	FIN
=================================================================================*/
})();
