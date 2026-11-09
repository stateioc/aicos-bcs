/*
 * SPACE-AICOS is pleased to support the open source community by making
 * SPACE-AICOS available.
 * Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
 * All rights reserved.
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
import Vue from 'vue';

import bkAlert from './bk-alert.js';
import bkBigTree from './bk-big-tree.js';
import bkButton from './bk-button.js';
import bkCheckbox from './bk-checkbox.js';
import bkCollapse from './bk-collapse';
import bkCollapseItem from './bk-collapse-item';
import bkDatePicker from './bk-date-picker.js';
import bkDialog from './bk-dialog';
import bkDropdownMenu from './bk-dropdown-menu.js';
import bkException from './bk-exception.js';
import bkForm from './bk-form.js';
import bkFormItem from './bk-form-item.js';
import bkInfo from './bk-info.js';
import bkInput from './bk-input.js';
import bkOption from './bk-option.js';
import bkPagination from './bk-pagination.js';
import bkPaging from './bk-paging.js';
import bkPopover from './bk-popover.js';
import bkRadio from './bk-radio.js';
import bkRadioButton from './bk-radio-button.js';
import bkRadioGroup from './bk-radio-group.js';
import bkSelect from './bk-select.js';
import bkSideslider from './bk-sideslider';
import bkSwitcher from './bk-switcher.js';
import bkTab from './bk-tab.js';
import bkTabpanel from './bk-tab-panel.js';
import bkTable from './bk-table.js';
import bkTableColumn from './bk-table-column.js';
import bkTableSettingContent from './bk-table-setting-content.js';
import bkTag from './bk-tag.js';
import bkTooltip from './bk-tooltip.js';
import bkTree from './bk-tree.js';
import bkVirtualScroll from './bk-virtual-scroll.js';

const components = [
  bkButton,
  bkOption,
  bkSelect,
  bkDropdownMenu,
  bkSwitcher,
  bkSideslider,
  bkCollapse,
  bkCollapseItem,
  bkCheckbox,
  bkInput,
  bkPagination,
  bkTable,
  bkTableColumn,
  bkTableSettingContent,
  bkTab,
  bkTabpanel,
  bkDialog,
  bkTooltip,
  bkRadio,
  bkRadioButton,
  bkRadioGroup,
  bkTag,
  bkDatePicker,
  bkTree,
  bkPaging,
  bkInfo,
  bkException,
  bkForm,
  bkFormItem,
  bkAlert,
  bkPopover,
  bkBigTree,
  bkVirtualScroll,
];

function install() {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
};
