/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/tabs/secondary-tab.js';
import '@material/web/tabs/tabs.js';

import {MaterialStoryInit} from './material-collection.js';
import {MdTabs} from '@material/web/tabs/tabs.js';
import {css, html, nothing} from 'lit';
import {ref} from 'lit/directives/ref.js';

/** Knob types for Tabs stories. */
export interface StoryKnobs {
  activeTabIndex: number;
  autoActivate: boolean;
  inlineIcon: boolean;
  content: string;
}

const styles = css`
  [role='tabpanel']:not([hidden]) {
    font-family: Roboto, Material Sans, system-ui;
  }

  [role='tabpanel']:not(.subtabs) {
    padding: 16px;
  }

  md-tabs {
    --inline-size: 50vw;
    min-inline-size: var(--inline-size);
  }

  md-tabs.scrolling {
    inline-size: var(--inline-size);
  }

  .controls {
    height: 48px;
  }
`;

const primary: MaterialStoryInit<StoryKnobs> = {
  name: 'Primary Tabs',
  styles,
  render(knobs) {
    const tabContent = getTabContentGenerator(knobs);
    const inlineIcon = knobs.inlineIcon;

    return html`
      <md-tabs
        aria-label="Primary tabs"
        .activeTabIndex=${knobs.activeTabIndex}
        .autoActivate=${knobs.autoActivate}
        ${setupTabPanels()}>
        <md-primary-tab
          id="tab-one"
          aria-controls="panel-one"
          .inlineIcon=${inlineIcon}>
          ${tabContent('piano', 'Keyboard')}
        </md-primary-tab>
        <md-primary-tab
          id="tab-two"
          aria-controls="panel-two"
          .inlineIcon=${inlineIcon}>
          ${tabContent('tune', 'Guitar')}
        </md-primary-tab>
        <md-primary-tab
          id="tab-three"
          aria-controls="panel-three"
          .inlineIcon=${inlineIcon}>
          ${tabContent('graphic_eq', 'Drums')}
        </md-primary-tab>
        <md-primary-tab
          id="tab-four"
          aria-controls="panel-four"
          .inlineIcon=${inlineIcon}>
          ${tabContent('speaker', 'Bass')}
        </md-primary-tab>
        <md-primary-tab
          id="tab-five"
          aria-controls="panel-five"
          .inlineIcon=${inlineIcon}>
          ${tabContent('nightlife', 'Saxophone')}
        </md-primary-tab>
      </md-tabs>

      <div role="tabpanel" id="panel-one" aria-labelledby="tab-one"
        >Keyboard</div
      >
      <div role="tabpanel" id="panel-two" aria-labelledby="tab-two" hidden
        >Guitar</div
      >
      <div role="tabpanel" id="panel-three" aria-labelledby="tab-three" hidden
        >Drums</div
      >
      <div role="tabpanel" id="panel-four" aria-labelledby="tab-four" hidden
        >Bass</div
      >
      <div role="tabpanel" id="panel-five" aria-labelledby="tab-five" hidden
        >Saxophone</div
      >
    `;
  },
};

const secondary: MaterialStoryInit<StoryKnobs> = {
  name: 'Secondary Tabs',
  styles,
  render(knobs) {
    const tabContent = getTabContentGenerator(knobs);

    return html`
      <md-tabs
        aria-label="Secondary tabs"
        .activeTabIndex=${knobs.activeTabIndex}
        .autoActivate=${knobs.autoActivate}
        ${setupTabPanels()}>
        <md-secondary-tab id="tab-one" aria-controls="panel-one">
          ${tabContent('flight', 'Travel')}
        </md-secondary-tab>
        <md-secondary-tab id="tab-two" aria-controls="panel-two">
          ${tabContent('hotel', 'Hotel')}
        </md-secondary-tab>
        <md-secondary-tab id="tab-three" aria-controls="panel-three">
          ${tabContent('hiking', 'Activities')}
        </md-secondary-tab>
        <md-secondary-tab id="tab-four" aria-controls="panel-four">
          ${tabContent('restaurant', 'Food')}
        </md-secondary-tab>
      </md-tabs>

      <div role="tabpanel" id="panel-one" aria-labelledby="tab-one">Travel</div>
      <div role="tabpanel" id="panel-two" aria-labelledby="tab-two" hidden
        >Hotel</div
      >
      <div role="tabpanel" id="panel-three" aria-labelledby="tab-three" hidden
        >Activities</div
      >
      <div role="tabpanel" id="panel-four" aria-labelledby="tab-four" hidden
        >Food</div
      >
    `;
  },
};

const scrolling: MaterialStoryInit<StoryKnobs> = {
  name: 'Scrolling Tabs',
  styles,
  render(knobs) {
    const tabContent = getTabContentGenerator(knobs);
    const inlineIcon = knobs.inlineIcon;

    return html` <md-tabs
      aria-label="A tab bar that scrolls"
      class="scrolling"
      .activeTabIndex=${knobs.activeTabIndex}
      .autoActivate=${knobs.autoActivate}>
      ${new Array(10).fill(html`
        <md-primary-tab .inlineIcon=${inlineIcon}>
          ${tabContent('piano', 'Keyboard')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}>
          ${tabContent('tune', 'Guitar')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}>
          ${tabContent('graphic_eq', 'Drums')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}>
          ${tabContent('speaker', 'Bass')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}>
          ${tabContent('nightlife', 'Saxophone')}
        </md-primary-tab>
      `)}
    </md-tabs>`;
  },
};

const custom: MaterialStoryInit<StoryKnobs> = {
  name: 'Custom Tabs',
  styles: [
    styles,
    css`
      .custom {
        /* text */
        --md-primary-tab-label-text-font: cursive, system-ui;
        --md-primary-tab-label-text-size: 0.8em;
        /* indicator */
        --md-primary-tab-active-indicator-color: firebrick;
        --md-primary-tab-active-indicator-height: 8px;
        --md-primary-tab-active-indicator-shape: 9999px 0;
        /* active/selected tab */
        --active-color: darkorange;
        --md-primary-tab-active-icon-color: var(--active-color);
        --md-primary-tab-active-label-text-color: var(--active-color);
        --md-primary-tab-active-focus-icon-color: var(--active-color);
        --md-primary-tab-active-focus-label-text-color: var(--active-color);
        --md-primary-tab-active-hover-icon-color: var(--active-color);
        --md-primary-tab-active-hover-label-text-color: var(--active-color);
        --md-primary-tab-active-pressed-icon-color: var(--active-color);
        --md-primary-tab-active-pressed-label-text-color: var(--active-color);
      }

      .custom::part(divider) {
        --md-divider-color: var(--active-color);
        --md-divider-thickness: 4px;
      }
    `,
  ],
  render(knobs) {
    const tabContent = getTabContentGenerator(knobs);

    return html`
      <md-tabs
        aria-label="A custom themed tab bar"
        class="custom"
        .activeTabIndex=${knobs.activeTabIndex}
        .autoActivate=${knobs.autoActivate}>
        <md-primary-tab id="tab-one" aria-controls="panel-one">
          ${tabContent('flight', 'Travel')}
        </md-primary-tab>
        <md-primary-tab id="tab-two" aria-controls="panel-two">
          ${tabContent('hotel', 'Hotel')}
        </md-primary-tab>
        <md-primary-tab id="tab-three" aria-controls="panel-three">
          ${tabContent('hiking', 'Activities')}
        </md-primary-tab>
        <md-primary-tab id="tab-four" aria-controls="panel-four">
          ${tabContent('restaurant', 'Food')}
        </md-primary-tab>
      </md-tabs>

      <div role="tabpanel" id="panel-one" aria-labelledby="tab-one">Travel</div>
      <div role="tabpanel" id="panel-two" aria-labelledby="tab-two" hidden
        >Hotel</div
      >
      <div role="tabpanel" id="panel-three" aria-labelledby="tab-three" hidden
        >Activities</div
      >
      <div role="tabpanel" id="panel-four" aria-labelledby="tab-four" hidden
        >Food</div
      >
    `;
  },
};

const primaryAndSecondary: MaterialStoryInit<StoryKnobs> = {
  name: 'Primary and Secondary Tabs',
  styles,
  render(knobs) {
    const tabContent = getTabContentGenerator(knobs);
    const inlineIcon = knobs.inlineIcon;

    return html`
      <md-tabs
        aria-label="Primary tabs"
        .activeTabIndex=${knobs.activeTabIndex}
        .autoActivate=${knobs.autoActivate}
        ${setupTabPanels()}>
        <md-primary-tab .inlineIcon=${inlineIcon} aria-controls="movies">
          ${tabContent('videocam', 'Movies')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon} aria-controls="photos">
          ${tabContent('photo', 'Photos')}
        </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon} aria-controls="music">
          ${tabContent('audiotrack', 'Music')}
        </md-primary-tab>
      </md-tabs>

      <div role="tabpanel" id="movies" class="subtabs" aria-label="Movies">
        <md-tabs
          aria-label="Secondary tabs for movies"
          .activeTabIndex=${knobs.activeTabIndex}
          .autoActivate=${knobs.autoActivate}
          ${setupTabPanels()}>
          <md-secondary-tab aria-controls="star-wars"
            >Star Wars</md-secondary-tab
          >
          <md-secondary-tab aria-controls="avengers">Avengers</md-secondary-tab>
          <md-secondary-tab aria-controls="jaws">Jaws</md-secondary-tab>
          <md-secondary-tab aria-controls="forzen">Frozen</md-secondary-tab>
        </md-tabs>

        <div role="tabpanel" id="star-wars" aria-label="Star Wars"
          >Star Wars</div
        >
        <div role="tabpanel" id="avengers" aria-label="Avengers" hidden
          >Avengers</div
        >
        <div role="tabpanel" id="jaws" aria-label="Jaws" hidden>Jaws</div>
        <div role="tabpanel" id="frozen" aria-label="Frozen" hidden>Frozen</div>
      </div>

      <div
        role="tabpanel"
        id="photos"
        class="subtabs"
        aria-label="Photos"
        hidden>
        <md-tabs
          aria-label="Secondary tabs for photos"
          .activeTabIndex=${knobs.activeTabIndex}
          .autoActivate=${knobs.autoActivate}>
          <md-secondary-tab aria-controls="yosemite">Yosemite</md-secondary-tab>
          <md-secondary-tab aria-controls="mona-lisa"
            >Mona Lisa</md-secondary-tab
          >
          <md-secondary-tab aria-controls="swiss-alps"
            >Swiss Alps</md-secondary-tab
          >
          <md-secondary-tab aria-controls="niagra-falls"
            >Niagra Falls</md-secondary-tab
          >
        </md-tabs>

        <div role="tabpanel" id="yosemite" aria-label="Yosemite">Yosemite</div>
        <div role="tabpanel" id="mona-lisa" aria-label="Mona Lisa" hidden
          >Mona Lisa</div
        >
        <div role="tabpanel" id="swiss-alps" aria-label="Swiss Alps" hidden
          >Swiss Alps</div
        >
        <div role="tabpanel" id="niagra-falls" aria-label="Niagra Falls" hidden
          >Niagra Falls</div
        >
      </div>

      <div role="tabpanel" id="music" class="subtabs" aria-label="Music" hidden>
        <md-tabs
          aria-label="Secondary tabs for music"
          .activeTabIndex=${knobs.activeTabIndex}
          .autoActivate=${knobs.autoActivate}
          ${setupTabPanels()}>
          <md-secondary-tab aria-controls="rock">Rock</md-secondary-tab>
          <md-secondary-tab aria-controls="ambient">Ambient</md-secondary-tab>
          <md-secondary-tab aria-controls="sounds"
            >Soundscapes</md-secondary-tab
          >
          <md-secondary-tab aria-controls="noise">White Noise</md-secondary-tab>
        </md-tabs>

        <div role="tabpanel" id="rock" aria-label="Rock">Rock</div>
        <div role="tabpanel" id="ambient" aria-label="Ambient" hidden
          >Ambient</div
        >
        <div role="tabpanel" id="sounds" aria-label="Soundscapes" hidden
          >Soundscapes</div
        >
        <div role="tabpanel" id="noise" aria-label="White noise" hidden
          >White Noise</div
        >
      </div>
    `;
  },
};

const dynamic: MaterialStoryInit<StoryKnobs> = {
  name: 'Dynamic Tabs',
  styles,
  render(knobs) {
    const inlineIcon = knobs.inlineIcon;

    function getTabs(event: Event) {
      return (
        (event.target! as Element).getRootNode() as ShadowRoot
      ).querySelector('md-tabs')!;
    }

    function addTab(event: Event) {
      const tabs = getTabs(event);
      const count = tabs.childElementCount;
      const tab = document.createElement('md-primary-tab');
      tab.textContent = `Tab ${count + 1}`;
      tabs.append(tab);
    }
    function removeTab(event: Event) {
      const tabs = getTabs(event);
      tabs.tabs[tabs.tabs.length - 1]?.remove();
    }

    function moveTabTowardsEnd(event: Event) {
      const tabs = getTabs(event);
      if (!tabs.activeTab) {
        return;
      }
      const next = tabs.activeTab.nextElementSibling;
      if (next) {
        next.after(tabs.activeTab);
      }
    }

    function moveTabTowardsStart(event: Event) {
      const tabs = getTabs(event);
      if (!tabs.activeTab) {
        return;
      }
      const previous = tabs.activeTab.previousElementSibling;
      if (previous) {
        previous.before(tabs.activeTab);
      }
    }

    return html` <div class="controls">
        <md-icon-button @click=${addTab}><md-icon>add</md-icon></md-icon-button>
        <md-icon-button @click=${removeTab}
          ><md-icon>remove</md-icon></md-icon-button
        >
        <md-icon-button @click=${moveTabTowardsStart}
          ><md-icon>chevron_left</md-icon></md-icon-button
        >
        <md-icon-button @click=${moveTabTowardsEnd}
          ><md-icon>chevron_right</md-icon></md-icon-button
        >
      </div>
      <md-tabs
        class="scrolling"
        .activeTabIndex=${knobs.activeTabIndex}
        .autoActivate=${knobs.autoActivate}>
        <md-primary-tab .inlineIcon=${inlineIcon}> Tab 1 </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}> Tab 2 </md-primary-tab>
        <md-primary-tab .inlineIcon=${inlineIcon}> Tab 3 </md-primary-tab>
      </md-tabs>`;
  },
};

function getTabContentGenerator(knobs: StoryKnobs) {
  const contentKnob = knobs.content;
  const useIcon = contentKnob !== 'label';
  const useLabel = contentKnob !== 'icon';
  return (icon: string, label: string) => {
    const iconTemplate = html`<md-icon slot="icon">${icon}</md-icon>`;
    return html`
      ${useIcon ? iconTemplate : nothing} ${useLabel ? html`${label}` : nothing}
    `;
  };
}

function setupTabPanels() {
  return ref((instance) => {
    if (!instance) {
      return;
    }

    const tabs = instance as MdTabs;
    let currentPanel: HTMLElement | null = null;
    tabs.addEventListener('change', () => {
      if (currentPanel) {
        currentPanel.hidden = true;
      }

      const panelId = tabs.activeTab?.getAttribute('aria-controls');
      const root = tabs.getRootNode() as Document | ShadowRoot;
      currentPanel = root.querySelector<HTMLElement>(`#${panelId}`);
      if (currentPanel) {
        currentPanel.hidden = false;
      }
    });
  });
}

/** Tabs stories. */
export const stories = [
  primary,
  secondary,
  scrolling,
  custom,
  primaryAndSecondary,
  dynamic,
];
