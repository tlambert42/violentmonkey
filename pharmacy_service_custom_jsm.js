// ==UserScript==
// @name         Jira Pharma Enhancer 22
// @namespace    Violentmonkey Scripts
// @match        https://galenica.atlassian.net/*
// @grant        GM_addStyle
// @version      2.0.2
// @updateURL    https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @downloadURL  https://raw.githubusercontent.com/tlambert42/violentmonkey/main/pharmacy_service_custom_jsm.js
// @description  Intégration locale JS + CSS - 24.11.2025
// ==/UserScript==



(function() {

/*=================================================================================
	Amélioration de JSM

  24.11.2025 : TLA Création du script

  !!! ATTENTION A NE PAS UTILISER DE CLASSE CSS CAR CELA CHANGE SOUVENT

	STEP 00 - Définition des couleurs
  STEP 01 - Fonctions Globales

  STEP 02 - Custom Header
  STEP 03 - Custom Left Bloc
  STEP 04 - Custom Middle Bloc
  STEP 05 - Custom Right Bloc

=================================================================================*/
/*=================================================================================
	STEP 00 - Définition des couleurs
=================================================================================*/
const Color_Blue_Light  = "#E9F2FE";
const Color_Blue_Middle = "#AECFFB";
const Color_Blue_Normal = "#1868DB";
const Color_Blue_Dark   = "#312880";
const Color_Blue_Link   = "#0052cc";

const Color_Green_Light = "#d5efe2";
const Color_Green_Dark  = "#076837";

const Color_Red_Light   = "#FFBBBB";
const Color_Red_Dark    = "#750000";

const Color_White       = "#FFFFFF";
const Color_Grey_Dark   = "#666";
/*=================================================================================
	STEP 01 - Fonctions Globales
=================================================================================*/
onUrlChange(() => {
    //console.log('Changement d’URL détecté');
    custom_JSM();
});

function custom_JSM(){

	custom_Header();
	custom_LeftBloc();
	custom_MiddleBloc();
	custom_RightBloc();

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
/*=================================================================================
	STEP 02 - Custom Header
=================================================================================*/
function custom_Header(){

  //Modification de la navigation

  const MenuBleuClair = document.querySelector('[data-testid="page-layout.top-nav"]');
  if (MenuBleuClair){

    MenuBleuClair.style.setProperty('background-color', Color_Blue_Middle, 'important');
    MenuBleuClair.style.setProperty('border-top', Color_Blue_Normal, 'important');
    MenuBleuClair.style.setProperty('border-top-style', 'solid', 'important');
    MenuBleuClair.style.setProperty('border-bottom', Color_Blue_Normal, 'important');
    MenuBleuClair.style.setProperty('border-bottom-style', 'solid', 'important');
    MenuBleuClair.style.setProperty('border-width', '1px', 'important');

    MenuBleuClair.style.setProperty('box-shadow', `0px 1px 4px ${Color_Grey_Dark}`, 'important');


  }

  //Modification du bouton "Créer"

  const Button_Create = document.querySelector('[data-testid="atlassian-navigation--create-button"]');
  if (Button_Create) {
    Button_Create.style.setProperty('background-color', Color_Blue_Dark, 'important');
    Button_Create.style.setProperty('color',Color_White,'important');

    Button_Create.style.setProperty('border'      , Color_White, 'important');
    Button_Create.style.setProperty('border-width', '2px', 'important');
    Button_Create.style.setProperty('border-style', 'solid', 'important');
    Button_Create.style.setProperty('border-radius', '5px', 'important');
    Button_Create.style.setProperty('padding-top', '4px', 'important');
    Button_Create.style.setProperty('padding-bottom', '4px', 'important');

  }
  //Modification du bouton "Demander à Rovo"

  const Button_Rovo = document.querySelector('[data-testid="atlassian-navigation.ui.conversation-assistant.app-navigation-ai-mate"]');
  if (Button_Rovo) {
    Button_Rovo.style.setProperty('background-color', Color_Blue_Dark, 'important');
    Button_Rovo.style.setProperty('color',Color_White,'important');

    Button_Rovo.style.setProperty('border'      , Color_White, 'important');
    Button_Rovo.style.setProperty('border-width', '2px', 'important');
    Button_Rovo.style.setProperty('border-style', 'solid', 'important');
    Button_Rovo.style.setProperty('border-radius', '5px', 'important');
    Button_Rovo.style.setProperty('height', '32px', 'important');

    const Button_Rovo_spans = Button_Rovo.querySelectorAll('span');
    for (const sp of Button_Rovo_spans) {

      console.log('test tla');
      sp.style.setProperty('color', Color_White, 'important');
      sp.style.setProperty('margin-top', '-2px', 'important');
      sp.style.setProperty('margin-bottom', '0px', 'important');

    }

  }

  //Masquer le bouton d'aide de JSM
  const Button_Help = document.querySelector('[data-test-id="ak-spotlight-target-help-spotlight"]');
  if (Button_Help) {
    Button_Help.style.setProperty('display', 'none', 'important');
  }
}
/*=================================================================================
	STEP 03 - Custom Left Bloc
=================================================================================*/
function custom_LeftBloc(){

  const LeftMenuBleuClair = document.querySelector('[data-testid="page-layout.sidebar"]');
  if (LeftMenuBleuClair){

    LeftMenuBleuClair.style.setProperty('background-color', Color_Blue_Light, 'important');

    LeftMenuBleuClair.style.setProperty('border-right', Color_Blue_Normal, 'important');
    LeftMenuBleuClair.style.setProperty('border-width', '1px', 'important');
    LeftMenuBleuClair.style.setProperty('border-right-style', 'solid', 'important');

    LeftMenuBleuClair.style.setProperty('height', '100%', 'important');

  }

  //masquer la zone de feedback du menu

  const FEEDBACK_TEXT = 'feedback';

  function hideFeedbackBlock() {
    // Cible la sidebar
    const sidebar =
      document.querySelector('[data-test-id="page-layout.sidebar"]') ||
      document.querySelector('[data-testid="page-layout.sidebar"]');
    if (!sidebar) return;

    // Cherche le bouton qui contient le texte de feedback
    const feedbackButton = Array.from(sidebar.querySelectorAll('button'))
      .find(btn => btn.textContent && btn.textContent.includes(FEEDBACK_TEXT));
    if (!feedbackButton) return;

    // Remonte au plus petit div parent qui contient ce bouton et qui n'est PAS la sidebar
    let block = feedbackButton;
    while (block.parentElement && block !== sidebar) {
      // On s'arrête dès qu'on trouve un div qui contient le bouton
      if (block.parentElement.tagName.toLowerCase() === 'div') {
        block = block.parentElement;
        break;
      }
      block = block.parentElement;
    }

    // Vérifie qu'on ne masque pas la sidebar elle-même
    if (block !== sidebar) {
      block.parentElement.style.setProperty('display', 'none', 'important');
    }
  }

  hideFeedbackBlock();

  // Pour gérer les changements dynamiques (chargement AJAX)
  const mo = new MutationObserver(hideFeedbackBlock);
  mo.observe(document.documentElement, { childList: true, subtree: true });

}
/*=================================================================================
	STEP 04 - Custom Middle Bloc
=================================================================================*/
function custom_MiddleBloc(){

  //Décaler le contenu vers le haut pour masquer la navigation secondaire

  const UnderNavigation = document.querySelector('[data-testid="page-layout.main"]');
  if (UnderNavigation){
    UnderNavigation.style.setProperty('position', 'relative', 'important');
    UnderNavigation.style.setProperty('z-index', '1', 'important');
    UnderNavigation.style.setProperty('top', '0px', 'important');
    UnderNavigation.style.setProperty('height', 'calc(100% + 0px)', 'important');

  }

}
/*=================================================================================
	STEP 05 - Custom Right Bloc
=================================================================================*/
function custom_RightBloc(){

  //const panelSelectorRightPanel = '[data-testid="issue-field-heading-styled-field-heading.components"]';
  const panelSelectorRightPanel = '[data-testid="issue.views.issue-details.issue-layout.right-most-column"]';
  //const rightContainer = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.container-right"]');
  const rightContainer = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"]');

  const observerRightPanel = new MutationObserver((mutations, obsRightPanel) => {

    const panelRightPanel = document.querySelector(panelSelectorRightPanel);

    if (panelRightPanel) {

      custom_RightBloc_Under_Functions();
      // Une fois trouvé, on peut arrêter l'observation si ce n'est plus nécessaire
      obsRightPanel.disconnect();
    }
  });

  observerRightPanel.observe(document.body, { childList: true, subtree: true });

}


function custom_RightBloc_Under_Functions(){

  //Masquer le resizer du menu de droite

  const RightMenuResizer = document.querySelector('[data-testid="flex-resizer.ui.handle.resizer"]');
  if (RightMenuResizer){
    RightMenuResizer.style.setProperty('display', 'none', 'important');
  }

  //Style de la colonne de droite

  const RightMenuBleuClair = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.container-right"]');
  if (RightMenuBleuClair){

    RightMenuBleuClair.style.setProperty('background-color', Color_Blue_Light, 'important');
    RightMenuBleuClair.style.setProperty('border-left', Color_Blue_Normal, 'important');
    RightMenuBleuClair.style.setProperty('border-left-style', 'solid', 'important');
    RightMenuBleuClair.style.setProperty('border-width', '1px', 'important');
    RightMenuBleuClair.style.setProperty('margin-left', '12px', 'important');
    RightMenuBleuClair.style.setProperty('padding-left', '23px', 'important');

    RightMenuBleuClair.style.setProperty('position', 'relative', 'important');
    RightMenuBleuClair.style.setProperty('top', '0px', 'important');
    RightMenuBleuClair.style.setProperty('height', 'calc(100%)', 'important');

  }

  //const RightMenuHeaderBleuClair = document.querySelector('[data-testid="issue-view-sticky-header-container.sticky-header"]');
  const RightMenuHeaderBleuClair = document.getElementById('jira-issue-header-actions');

  if (RightMenuHeaderBleuClair){

    RightMenuHeaderBleuClair.style.setProperty('background-color', Color_Blue_Light, 'important');

  }
  



  //Bloc SLA
  applyStyleBloc("issue-view-layout-templates-views.ui.context.visible-hidden.ui.context-group.container.sla-group");

  //Bloc Details
  applyStyleBloc("issue-view-layout-templates-views.ui.context.visible-hidden.ui.context-group.container.details-group");


  CheckCustomerExpander("issue-field-cmdb-object-lazy.ui.card.cmdb-object-card");
  OpenCustomerExpander();

  //Sous-Bloc Reporter
  styleReporterBlocWithObserver();

  //Priorités
  waitForPriorityFields();

  //Bloc Others Fields
  applyStyleBloc("issue-view-layout-templates-views.ui.context.visible-hidden.ui.context-group.container.secondary-context-items");

  //Bloc Automatisation
  //Bloc StatusPage
  //Bloc Tempo





  //Entête du bloc de droite

}

function waitForPriorityFields() {
  const observerPriority = new MutationObserver(() => {
    const DivPriority = document.querySelector('[data-testid="issue.issue-view-layout.issue-view-priority-field.priority"]');
    const DivImpact   = document.querySelector('[data-testid="issue.issue-view-layout.issue-view-single-select-field.customfield_10504"]');
    const DivUrgence  = document.querySelector('[data-testid="issue.issue-view-layout.issue-view-single-select-field.customfield_10505"]');

    const BlocPriorityElements = [DivPriority, DivImpact, DivUrgence];

    BlocPriorityElements.forEach(el => {
      if (el) {
        el.style.borderRadius = '5px';
        el.style.backgroundColor = Color_Red_Light;
        el.style.padding = '12px';
        //el.style.boxShadow = 'var(--ds-shadow-raised, 0 1px 1px #091e4240, 0 0 1px #091e424f)';
        el.style.setProperty('box-shadow', `0px 1px 4px ${Color_Red_Dark}`, 'important');
      }
    });

    if (DivImpact) {
      DivImpact.style.marginBottom = '10px';
    }

    // Arrête l'observation une fois les éléments trouvés
    if (DivPriority && DivImpact && DivUrgence) {
      observerPriority.disconnect();
    }
  });

  observerPriority.observe(document.body, {
    childList: true,
    subtree: true
  });
}
function styleReporterBlocWithObserver() {
  const container = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.container-right"]');
  if (!container) return;

  const obs = new MutationObserver(() => {
    const ReporterBloc = document.querySelector('[data-testid="issue-field-cmdb-object-lazy.ui.card.cmdb-object-card"]');
    if (ReporterBloc) {
      console.log("Bloc trouvé, style appliqué !");
      ReporterBloc.style.setProperty('background-color', Color_Green_Light, 'important');
      ReporterBloc.style.setProperty('box-shadow', `0px 1px 4px ${Color_Green_Dark}`, 'important');
      obs.disconnect();
    }
  });

  obs.observe(container, { childList: true, subtree: true });
}

/*
function AddLinkToPhoneNumber() {
  setTimeout(() => {
    const phoneBlocks = document.querySelectorAll('[data-testid="servicedesk-insight-attribute-list.ui.attribute-wrapper"] dd div');
    const target = phoneBlocks[1];
    if (!target) return;

    // Garde idempotente
    if (target.dataset.linkified === "1") return;

    // Si lien déjà présent, on marque et on sort
    if (target.querySelector('a')) {
      target.dataset.linkified = "1";
      return;
    }

    const phoneText = (target.textContent || "").trim();
    if (!phoneText) return;

    const phoneNumber = phoneText.replace(/\s+/g, '');
    const link = document.createElement('a');
    link.href = `tel:${phoneNumber}`;
    link.textContent = phoneText;
    link.style.color = Color_Blue_Link;
    link.style.textDecoration = 'none';

    target.replaceChildren(link);     // évite innerHTML et reparse
    target.dataset.linkified = "1";   // flag pour éviter les re-traitements
  }, 300);
}*/

// Utilitaire: attend qu'une condition retourne un élément non-nul
function waitFor(getter, { interval = 100, timeout = 3000 } = {}) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const tick = () => {
      const el = getter();
      if (el) return resolve(el);
      if (Date.now() - t0 >= timeout) return reject(new Error('Timeout waitFor'));
      setTimeout(tick, interval);
    };
    tick();
  });
}

async function AddLinkToPhoneNumber() {
  try {
    // Attendre que le 2e bloc téléphone existe réellement après le clic/expansion
    const target = await waitFor(() => {
      const list = document.querySelectorAll(
        '[data-testid="servicedesk-insight-attribute-list.ui.attribute-wrapper"] dd div'
      );
      return list.length >= 2 ? list[1] : null;
    }, { interval: 100, timeout: 4000 });

    // Garde idempotente: si déjà traité, sortir
    if (target.dataset.linkified === "1") return;

    // Si lien déjà présent (reconstruction Atlassian), marquer et sortir
    if (target.querySelector('a')) {
      target.dataset.linkified = "1";
      return;
    }

    const phoneText = (target.textContent || "").trim();
    if (!phoneText) return;

    const phoneNumber = phoneText.replace(/\s+/g, '');
    const link = document.createElement('a');
    link.href = `tel:${phoneNumber}`;
    link.textContent = phoneText;
    link.style.color = Color_Blue_Link;
    link.style.textDecoration = 'none';

    // Remplacement propre (évite innerHTML et reparse)
    target.replaceChildren(link);
    target.dataset.linkified = "1";
  } catch (e) {
    // Optionnel: trace pour diagnostiquer si le bloc n’est jamais apparu
    console.debug('AddLinkToPhoneNumber: bloc introuvable dans le délai', e);
  }
}


function CheckCustomerExpander(testid){

  const observerRightPanelButton = new MutationObserver(() => {

    const buttonRightPanel = document.querySelector(`[data-testid="${testid}"] button`);

    //const button3RightPanel = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
    if (buttonRightPanel) {
      attachClickListener(testid);

      observerRightPanelButton.disconnect(); // on arrête l'observation une fois le bouton trouvé
    }
  });

  observerRightPanelButton.observe(document.body, { childList: true, subtree: true });

}

function OpenCustomerExpander(){
      //const element = document.querySelector('[data-testid="issue-field-cmdb-object-lazy.ui.card.cmdb-object-card"] button span div');
      //const element = document.querySelector('._t9ec1sub');
      const element = document.querySelector('._t9ec1sub');

      if (element && isRotated180(element)) {
        console.log('L’élément est pivoté à 180 degrés');
        const buttonClient2 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')


        //const button = document.querySelector('._1gqnidpf button');
        if (buttonClient2 && buttonClient2.getAttribute('data-testid') !== 'issue-field-cmdb-object.ui.card.button-view-details') {
          //setTimeout(() => {}, 2000);
          buttonClient2.click();
          //console.log('Bouton buttonClient2 cliqué');

        }
      }

  }

function isRotated180(element) {
  //Fonction qui check si la flèche de l'expander est ouverte ou non

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
/*
function attachClickListener(testid) {

  const buttonClient2RightPanel = document.querySelector(`[data-testid="${testid}"] button`);

  //const buttonClient2RightPanel = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button');
  if (buttonClient2RightPanel) {

    console.log("Ajout telephone");
    buttonClient2RightPanel.addEventListener('click', AddLinkToPhoneNumber);

  }
}*/

function attachClickListener(testid) {
  const btn = document.querySelector(`[data-testid="${testid}"] button`);
  if (!btn) return;

  if (!btn.dataset.clickBound) {
    btn.addEventListener('click', AddLinkToPhoneNumber, { passive: true });
    btn.dataset.clickBound = "1";  // garde
  }

  const element = document.querySelector('._t9ec1sub');

      if (element && isRotated180(element)) {
        //const buttonClient2 = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.right-most-column"] ._1gqnidpf button')


        //const button = document.querySelector('._1gqnidpf button');
        if (btn && btn.getAttribute('data-testid') !== 'issue-field-cmdb-object.ui.card.button-view-details') {
          //setTimeout(() => {}, 2000);
          btn.click();
          //console.log('Bouton buttonClient2 cliqué');

        }
      }


}


function applyStyleBloc(testid) {
  // Cherche le bloc cible
  const Details_Bloc = document.querySelector(`[data-testid="${testid}"]`);
  if (!Details_Bloc) {
    // Si le bloc n'est pas encore là, on observe son parent le plus proche connu
    const container = document.querySelector('[data-testid="issue.views.issue-details.issue-layout.container-right"]') || document.body;
    let observerBloc = new MutationObserver(() => {
      const bloc = document.querySelector(`[data-testid="${testid}"]`);
      if (bloc && !bloc.dataset.styled) {
        styleBloc(bloc);
        bloc.dataset.styled = "1";
        observerBloc.disconnect();
      }
    });
    observerBloc.observe(container, { childList: true, subtree: true });
    return;
  }
  // Si le bloc est déjà là et pas encore stylisé
  if (!Details_Bloc.dataset.styled) {
    styleBloc(Details_Bloc);
    Details_Bloc.dataset.styled = "1";
  }
}

function styleBloc(Details_Bloc) {
  //console.log(Details_Bloc);
  const Details_BlocHeader = Details_Bloc.querySelector('section');
  const Details_BlocHeaderContent = Details_BlocHeader?.querySelector('div');
  const Details_BlocContent = Details_Bloc.querySelector('section + div');
  if (Details_BlocHeader) {
    Details_Bloc.style.setProperty('background-color', Color_White, 'important');
    Details_Bloc.style.setProperty('border-radius', '5px', 'important');
    Details_Bloc.style.setProperty('border', Color_Blue_Middle, 'important');
    Details_Bloc.style.setProperty('border-style', 'solid', 'important');
    Details_Bloc.style.setProperty('border-width', '1px', 'important');
    Details_Bloc.style.setProperty('border-bottom-width', '2px', 'important');
    Details_BlocHeader.style.setProperty('border-width', '0px', 'important');
    if (Details_BlocHeaderContent) {
      Details_BlocHeaderContent.style.setProperty('background-color', Color_Blue_Middle, 'important');
      Details_BlocHeaderContent.style.setProperty('border-left', Color_Blue_Middle, 'important');
      Details_BlocHeaderContent.style.setProperty('border-left-style', 'solid', 'important');
      Details_BlocHeaderContent.style.setProperty('border-left-radius', '5px', 'important');
      Details_BlocHeaderContent.style.setProperty('border-top', Color_Blue_Middle, 'important');
      Details_BlocHeaderContent.style.setProperty('border-top-style', 'solid', 'important');
      Details_BlocHeaderContent.style.setProperty('border-right', Color_Blue_Middle, 'important');
      Details_BlocHeaderContent.style.setProperty('border-right-style', 'solid', 'important');
      Details_BlocHeaderContent.style.setProperty('border-right-radius', '5px', 'important');
      Details_BlocHeaderContent.style.setProperty('border-width', '1px', 'important');
    }
    if (Details_BlocContent) {
      Details_BlocContent.style.setProperty('border', 'none', 'important');
    }
  }
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
/*=================================================================================
	FIN
=================================================================================*/
})();
