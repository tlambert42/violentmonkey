// ==UserScript==
// @name         Jira Pharma Enhancer
// @namespace    Violentmonkey Scripts
// @match        https://galenica.atlassian.net/*
// @grant        GM_addStyle
// @version      1.6.8
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
        'NAV4_proj-JSMSP-rprt-container',     			  // Reports JSMSP
        'NAV4_proj-INC-rprt-container',     			    // Reports INC
        'NAV4_proj-JSMSP-views-container',    			  // Views JSMSP
        'NAV4_proj-INC-views-container',    			    // Views INC
        'NAV4_proj-JSMSP-nlog-container',      			  // Customers Logs JSMSP
        'NAV4_proj-INC-nlog-container',      			    // Customers Logs INC
        'NAV4_archived_work_items_JSMSP-container',  	// Archives JSMSP
        'NAV4_archived_work_items_INC-container',  	  // Archives INC
        'NAV4_proj-JSMSP-summary-container', 	        // Summary JSMSP
        'NAV4_proj-INC-summary-container'             // Summary INC
	];
 const ContentMenu_MenusToHide_DataTestID = [
        'issue-view-ecosystem.ecosystem-actions-wrapper' //Tempo
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
    "Canaux",
    "Leni Agent Help Space",
    "Dashboard",
    "Microsoft Teams Integration"
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

._ca0qxy5q{
  padding-top:0px !important;
}

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
  /*color: #fff;*/
}
._16qs1pcf .css-5a6fwh{
  /*color: #fff;*/
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
/* Bouton status */
._16qs1pcf button .css-178ag6o{
  padding-top:5px;
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

  //bouton créer
  const createButton = document.querySelector('[data-testid="atlassian-navigation--create-button"]');
  if (createButton) {
    createButton.style.backgroundColor = '#312880'; // bleu par exemple
    createButton.style.color = '#ffffff'; // texte en blanc
  }

}
/*=================================================================================
	Customisation du Menu de gauche
=================================================================================*/
function customLeftMenu() {
    const LeftMenuContainerSelectors = [
        '[data-testid="NAV4_proj_JSMSP-container"]',
        '[data-testid="NAV4_proj_INC-container"]'
        // Ajoute ici d'autres sélecteurs si nécessaire
    ];

    const LeftMenucheckButtonState = (button) => {
        const LeftMenuIsExpanded = button.getAttribute('aria-expanded') === 'true';
        if (LeftMenuIsExpanded) {
            HideElementWithDataTestID(LeftMenu_MenusToHide_DataTestID);
            HideElementWithURL(LeftMenu_MenusToHide_URL);
            HideElementWithName(LeftMenu_MenusToHide_Name);
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

        LeftMenucheckButtonState(button);
    };

    const LeftMenuFindAndObserve = () => {
        for (const selector of LeftMenuContainerSelectors) {
            const container = document.querySelector(selector);

            if (container) {

                const button = container.querySelector('button[aria-expanded]');

                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                if (button) {
                    LeftMenuObserveButton(button);
                    //break;
                }
            }
        }
    };

    const LeftMenuDomObserver = new MutationObserver(() => {
        LeftMenuFindAndObserve();
    });

    LeftMenuDomObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    LeftMenuFindAndObserve();
    hideRecentSection();
}

/*=================================================================================
	Customisation du Contenu
=================================================================================*/
function customContent(){
  //console.log('customContent');

  //Bouton tempo
  const ecosystemWrapper = document.querySelector('[data-testid="issue-view-ecosystem.ecosystem-actions-wrapper"]');
  if (ecosystemWrapper) {
    ecosystemWrapper.style.display = 'none';
    //console.log('Élément ecosystem-actions-wrapper masqué');
  }

  //bouton confluence

  const confluenceButton = document.querySelector('button[aria-haspopup="true"] ._1e0c1o8l svg');
  if (confluenceButton) {
    const buttonWrapperConfluence = confluenceButton.closest('button');
    if (buttonWrapperConfluence) {
     // buttonWrapperConfluence.style.display = 'none';

      buttonWrapperConfluence.style.setProperty('display', 'none', 'important');

      //console.log('Bouton Confluence masqué');
    }
  }

}

/*=================================================================================
	Customisation du Menu de droite
=================================================================================*/
function customRightMenu(){
	//console.log('customRightMenu');


  const panelSelectorRightPanel = '[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf';

  const observerRightPanel = new MutationObserver((mutations, obsRightPanel) => {

    const panelRightPanel = document.querySelector(panelSelectorRightPanel);

    if (panelRightPanel) {

      CheckCustomerExpander();
      OpenCustomerExpander();
      AddLinkToPhoneNumber();
      HideElementWithDataTestID(ContentMenu_MenusToHide_DataTestID);

      // Une fois trouvé, on peut arrêter l'observation si ce n'est plus nécessaire
      obsRightPanel.disconnect();
    }
  });

  // Démarre l'observation sur le body ou un autre conteneur pertinent
    observerRightPanel.observe(document.body, {
      childList: true,
      subtree: true
    });

  customRightMenuHideElements();

}

function customRightMenuHideElements(){

  // Masquage du bouton de vote

  const elementsVote = document.querySelectorAll('div._1n1uewfl._nz6rewfl');
  if (elementsVote.length > 1) {
      elementsVote[1].style.display = 'none';
    elementsVote[1].remove();
  }


  // Masquage du bouton de partage
  const shareButton = document.querySelector('button[data-testid="share-button.ui.pre-share-view.button"]');
  if (shareButton) {
      shareButton.style.display = 'none';
      shareButton.remove();
  }

  //masquer Exalate

  const wrapperExalate = document.querySelector('[data-testid="issue.views.issue-base.context.ecosystem.connect.field-wrapper"]');
  if (wrapperExalate) {
    wrapperExalate.style.display = 'none';
    wrapperExalate.remove();
  }

  //Bloc Priority
  const DivPriority=  document.querySelector('[data-testid="issue.issue-view-layout.issue-view-priority-field.priority"]');
  const DivImpact =  document.querySelector('[data-testid="ref-spotlight-target-global-spotlight-target-customfield_10504"]');
  const DivUrgence =  document.querySelector('[data-testid="ref-spotlight-target-global-spotlight-target-customfield_10505"]');

  if(DivPriority && DivImpact && DivUrgence){

    const BlocPriorityElements = [DivPriority, DivImpact, DivUrgence];

    BlocPriorityElements.forEach(el => {
      if (el) {
        el.style.borderRadius = '5px';
        el.style.backgroundColor = '#FFBBBB';
        el.style.padding = '12px';
        el.style.boxShadow = 'var(--ds-shadow-raised, 0 1px 1px #091e4240, 0 0 1px #091e424f)';
      }
    });
  }



  if(DivImpact){
    DivImpact.style.marginBottom = '10px';
  }

  //sous-titre en gras

  const targetElementBold = document.querySelector('[data-component-selector="jira-issue-field-heading-field-heading-title"]');
  if (targetElementBold) {

    const styleBold = document.createElement('style');
    styleBold.innerHTML = `[data-component-selector="jira-issue-field-heading-field-heading-title"] {
        font-weight: 700 !important;
      }
    `;
    document.head.appendChild(styleBold);

  }


  // bouton de changement de status
  waitForStatusButton();

  // bouton status style



  // affichage du status centré
  waitForResolutionButton();

  //bouton automatisation
  waitForAutomatisationButton();

  //bouton de tickets liés
  waitForButtonLinkedTickets();


  window.addEventListener('load', waitForAutomatisationButton);
  window.addEventListener('load', waitForButtonLinkedTickets);


}
function waitForResolutionButton() {

  //fonction pour modifier le bouton de status
  const observer = new MutationObserver(() => {

    const resolutionBox = document.querySelector('[data-testid="issue.views.issue-base.foundation.status.resolution"]');
    if (resolutionBox) {

      resolutionBox.style.setProperty('margin-left', 'auto', 'important');
      resolutionBox.style.setProperty('margin-right', 'auto', 'important');
      resolutionBox.style.setProperty('display', 'flex', 'important');
      resolutionBox.style.setProperty('align-items', 'center', 'important');
      resolutionBox.style.setProperty('justify-content', 'center', 'important');

      resolutionBox.style.setProperty('width', '100%', 'important');
      resolutionBox.style.setProperty('left', '0', 'important');
      resolutionBox.style.setProperty('position', 'relative', 'important');
      resolutionBox.style.setProperty('margin-bottom', '10px', 'important');

      observer.disconnect(); // Arrête l'observation une fois trouvé

    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}


function waitForStatusButton() {

  //fonction pour modifier le bouton de status
  const observer = new MutationObserver(() => {
    const button = document.querySelector('#issue\\.fields\\.status-view\\.status-button');
    if (button) {
      //console.log('✅ Bouton trouvé');
      //button.style.setProperty('width', '313px', 'important');
      button.style.setProperty('height', '43px', 'important');
      button.style.setProperty('box-shadow', '0px 2px 3px #666', 'important');

      const StatusButtonContainer = document.querySelector('[data-testid="issue.views.issue-base.foundation.status.status-field-wrapper"]');

      if (StatusButtonContainer){

        StatusButtonContainer.style.setProperty('width', '100%', 'important');
        StatusButtonContainer.style.setProperty('margin-right', '0px', 'important');

      }

      observer.disconnect(); // Arrête l'observation une fois trouvé

    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function waitForAutomatisationButton() {
  const observer = new MutationObserver(() => {
    const button = document.querySelector('[data-testid="issue.views.issue-base.foundation.status.actions-wrapper"] div.css-1b1skvc');
    if (!button) return;

    const AutomatisationButtonContainer = document.querySelector('[data-testid="issue.views.issue-base.foundation.status.actions-wrapper"]');
    if (AutomatisationButtonContainer) {
      AutomatisationButtonContainer.style.setProperty('width', '100%', 'important');
      AutomatisationButtonContainer.style.setProperty('margin-right', '0px', 'important');
      AutomatisationButtonContainer.style.setProperty('display', 'flex', 'important');
      AutomatisationButtonContainer.style.setProperty('align-items', 'center', 'important');
      AutomatisationButtonContainer.style.setProperty('justify-content', 'center', 'important');
    }
    const AutomatisationButtonButton = document.querySelector('[data-testid="issue.views.issue-base.foundation.status.actions-wrapper"] button');

    if(AutomatisationButtonButton){

        AutomatisationButtonButton.style.setProperty('left', '-70px', 'important');

    }

    // Appliquer les styles au bouton
    button.style.setProperty('background-color', '#312880', 'important');
    button.style.setProperty('color', '#fff', 'important');
    button.style.setProperty('border-radius', '5px', 'important');
    button.style.setProperty('width', '100%', 'important');
    button.style.setProperty('height', '43px', 'important');
    button.style.setProperty('padding', '0 10px', 'important');
    button.style.setProperty('display', 'flex', 'important');
    button.style.setProperty('align-items', 'center', 'important');
    button.style.setProperty('justify-content', 'center', 'important');
    button.style.setProperty('gap', '6px', 'important'); // espace entre icône et texte

    // Icône SVG
    const svgIcon = button.querySelector('svg path');
    if (svgIcon) {
      svgIcon.style.setProperty('fill', '#fff', 'important');
    }

    // Ajouter le texte "Automatisation"
    const svgAutomatisation = button.querySelector('svg');
    if (svgAutomatisation) {
      const existingText = button.querySelector('.automatisation-text');
      if (!existingText && !button.textContent.includes('Automatisation')) {
        const span = document.createElement('span');
        span.textContent = 'Automatisation';
        span.className = 'automatisation-text';
        span.style.setProperty('font-weight', 'bold', 'important');
        span.style.setProperty('color', '#fff', 'important');
        span.style.setProperty('white-space', 'nowrap', 'important');
        button.appendChild(span);
      }
    }

    // Bouton automatisation (texte masqué par défaut)
    const clipped = document.querySelector('.css-1b1skvc ._ogto7mnp');
    if (clipped) {
      clipped.style.setProperty('clip', 'unset', 'important');
      clipped.style.setProperty('clip-path', 'none', 'important');
      clipped.style.setProperty('font-size', '14px', 'important');
      clipped.style.setProperty('line-height', 'normal', 'important');
      clipped.style.setProperty('overflow', 'visible', 'important');
      clipped.style.setProperty('color', '#fff', 'important');
      clipped.style.setProperty('margin-left', '20px', 'important');
    }

    observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}





/*=================================================================================
	Fonctions
=================================================================================*/
function waitForButtonLinkedTickets() {

  const buttonsLinkedTickets = document.querySelectorAll('.css-32hz2l [data-testid="issue-field-cmdb-object.ui.card.button-view-details"]');
  if (buttonsLinkedTickets.length > 0) {
    buttonsLinkedTickets.forEach(button => {
      button.style.setProperty('background-color', '#4AD18A', 'important');
      button.style.setProperty('box-shadow', '0px 2px 3px #666', 'important');
    });
    // console.log('✅ Boutons trouvés et modifiés');
  } else {
    // console.log('⏳ Boutons non trouvés, nouvelle tentative...');
    setTimeout(waitForButtonLinkedTickets, 300);

  }

  /*
    const buttonLinkedTickets = document.querySelector('.css-32hz2l [data-testid="issue-field-cmdb-object.ui.card.button-view-details"]');
    if (buttonLinkedTickets) {
        buttonLinkedTickets.style.setProperty('background-color', '#4AD18A', 'important');
        buttonLinkedTickets.style.setProperty('box-shadow', '0px 2px 3px #666', 'important');
        //console.log('✅ Bouton trouvé et modifié');
    } else {
        //console.log('⏳ Bouton non trouvé, nouvelle tentative...');
        setTimeout(waitForButtonLinkedTickets, 300);
    }
*/
}
//Fonction qui masque des data-testid
function HideElementWithDataTestID(ElementsList) {

	ElementsList.forEach(testId => {
	const CardToHide = document.querySelector(`[data-testid="${testId}"]`);

    //console.log(CardToHide);
    //console.log(testId);
		//if (CardToHide && CardToHide.getAttribute('data-selected') === 'false') {
    if (CardToHide) {

			//CardToHide.remove(); // suppression au lieu de display: none
      CardToHide.style.setProperty('display', 'none', 'important');
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
                    //card.style.display = 'none';
                    card.remove();
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
                //section.style.display = 'none';
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


        //const button = document.querySelector('._1gqnidpf button');
        if (buttonClient2 && buttonClient2.getAttribute('data-testid') !== 'issue-field-cmdb-object.ui.card.button-view-details') {
          //setTimeout(() => {}, 2000);
          buttonClient2.click();
          //console.log('Bouton buttonClient2 cliqué');

        }
      }

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
