/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {CSSResult} from 'lit';
import {customElement} from 'lit/decorators.js';

import {FilledButton} from './internal/filled-button.js';
import {styles as filledStyles} from './internal/filled-styles.css.js';
import {styles as sharedElevationStyles} from './internal/shared-elevation-styles.css.js';
import {styles as sharedStyles} from './internal/shared-styles.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'md-filled-button': MdFilledButton;
  }
}

/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment.
 *
 * @description
 * __Emphasis:__ High emphasis – For the primary, most important, or most common
 * action on a screen
 *
 * __Rationale:__ The filled button’s contrasting surface color makes it the
 * most prominent button after the FAB. It’s used for final or unblocking
 * actions in a flow.
 *
 * __Example usages:__
 * - Save
 * - Confirm
 * - Done
 *
 * @final
 * @suppress {visibility}
 */
@customElement('md-filled-button')
export class MdFilledButton extends FilledButton {
  static override styles: CSSResult[] = [
    sharedStyles,
    sharedElevationStyles,
    filledStyles,
  ];
}
