/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../../focus/md-focus-ring.js';
import '../../ripple/ripple.js';

import {html, isServer, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import {
  polyfillElementInternalsAria,
  setupHostAria,
} from '../../internal/aria/aria.js';
import {isActivationClick} from '../../internal/controller/events.js';

import {SingleSelectionController} from './single-selection-controller.js';

const CHECKED = Symbol('checked');
let maskId = 0;

/**
 * A radio component.
 *
 * @fires input Dispatched when the value changes from user interaction.
 * --bubbles
 * @fires change Dispatched when the value changes from user interaction.
 * --bubbles --composed
 */
export class Radio extends LitElement {
  static {
    setupHostAria(Radio);
  }

  /** @nocollapse */
  static readonly formAssociated = true;

  // Unique maskId is required because of a Safari bug that fail to persist
  // reference to the mask. This should be removed once the bug is fixed.
  private readonly maskId = `cutout${++maskId}`;

  /**
   * Whether or not the radio is selected.
   */
  @property({type: Boolean})
  get checked() {
    return this[CHECKED];
  }
  set checked(checked: boolean) {
    const wasChecked = this.checked;
    if (wasChecked === checked) {
      return;
    }

    this[CHECKED] = checked;
    const state = String(checked);
    this.internals.setFormValue(this.checked ? this.value : null, state);
    this.requestUpdate('checked', wasChecked);
    this.selectionController.handleCheckedChange();
  }

  [CHECKED] = false;

  /**
   * Whether or not the radio is disabled.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * The element value to use in form submission when checked.
   */
  @property() value = 'on';

  /**
   * The HTML name to use in form submission.
   */
  get name() {
    return this.getAttribute('name') ?? '';
  }
  set name(name: string) {
    this.setAttribute('name', name);
  }

  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this.internals.form;
  }

  /**
   * The labels this element is associated with.
   */
  get labels() {
    return this.internals.labels;
  }

  private readonly selectionController = new SingleSelectionController(this);
  private readonly internals = polyfillElementInternalsAria(
    this,
    // Cast needed for closure
    (this as HTMLElement).attachInternals(),
  );

  constructor() {
    super();
    this.addController(this.selectionController);
    if (!isServer) {
      this.internals.role = 'radio';
      this.addEventListener('click', this.handleClick.bind(this));
      this.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  protected override render() {
    const classes = {checked: this.checked};
    return html`
      <div class="container ${classMap(classes)}" aria-hidden="true">
        <md-ripple
          part="ripple"
          .control=${this}
          ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring part="focus-ring" .control=${this}></md-focus-ring>
        <svg class="icon" viewBox="0 0 20 20">
          <mask id="${this.maskId}">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="10" cy="10" r="8" fill="black" />
          </mask>
          <circle
            class="outer circle"
            cx="10"
            cy="10"
            r="10"
            mask="url(#${this.maskId})" />
          <circle class="inner circle" cx="10" cy="10" r="5" />
        </svg>

        <input
          id="input"
          type="radio"
          tabindex="-1"
          .checked=${this.checked}
          .value=${this.value}
          ?disabled=${this.disabled} />
      </div>
    `;
  }

  protected override updated() {
    this.internals.ariaChecked = String(this.checked);
  }

  private async handleClick(event: Event) {
    if (this.disabled) {
      return;
    }

    // allow event to propagate to user code after a microtask.
    await 0;
    if (event.defaultPrevented) {
      return;
    }

    if (isActivationClick(event)) {
      this.focus();
    }

    // Per spec, clicking on a radio input always selects it.
    this.checked = true;
    this.dispatchEvent(new Event('change', {bubbles: true}));
    this.dispatchEvent(
      new InputEvent('input', {bubbles: true, composed: true}),
    );
  }

  private async handleKeydown(event: KeyboardEvent) {
    // allow event to propagate to user code after a microtask.
    await 0;
    if (event.key !== ' ' || event.defaultPrevented) {
      return;
    }

    this.click();
  }

  /** @private */
  formResetCallback() {
    // The checked property does not reflect, so the original attribute set by
    // the user is used to determine the default value.
    this.checked = this.hasAttribute('checked');
  }

  /** @private */
  formStateRestoreCallback(state: string) {
    this.checked = state === 'true';
  }
}
