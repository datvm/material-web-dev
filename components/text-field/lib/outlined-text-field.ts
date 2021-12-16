/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../../field/outlined-field';

import {html, TemplateResult} from 'lit';
import {ClassInfo} from 'lit/directives/class-map';

import {TextField} from './text-field';

/** @soyCompatible */
export class OutlinedTextField extends TextField {
  /** @soyTemplate */
  protected override getRenderClasses(): ClassInfo {
    return {
      ...super.getRenderClasses(),
      'md3-text-field--outlined': true,
    };
  }

  /** @soyTemplate */
  protected override renderField(): TemplateResult {
    return html`
      <md-outlined-field
        .disabled=${this.disabled}
        .error=${this.error}
        .label=${this.label}
        ?populated=${Boolean(this.value)}
        .required=${this.required}
      >
        ${this.renderFieldContent()}
      </md-outlined-field>
    `;
  }
}