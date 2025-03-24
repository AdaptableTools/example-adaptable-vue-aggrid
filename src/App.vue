<script setup lang="ts">
import {
  AdaptableProvider,
  AdaptableAgGridVue,
  AdaptableUI,
} from '@adaptabletools/adaptable-vue3-aggrid';
import type {
  AdaptableOptions,
  AdaptableButton,
  CustomToolbarButtonContext,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-vue3-aggrid';
import type { GridOptions } from 'ag-grid-enterprise';
import { defaultColDef, columnDefs } from './colDefs';
import type { WebFramework } from './rowData';
import { rowData } from './rowData';
import { agGridModules } from './agGridModules';
import { adaptableLicense } from './config';
import CustomQuickSearch from './CustomQuickSearch.vue';
import CustomSettingsPanel from './CustomSettingsPanel.vue';
import { h, ref } from 'vue';
import type { AdaptableStateFunctionConfig } from '@adaptabletools/adaptable-vue3-aggrid';

const CONFIG_REVISION = 1;

const counter = ref(0);

const gridOptions: GridOptions<WebFramework> = {
  theme: 'legacy',
  defaultColDef,
  columnDefs,
  rowData,
  sideBar: true,
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
      { statusPanel: 'agFilteredRowCountComponent' },
      {
        key: 'Center Panel',
        statusPanel: 'AdaptableStatusPanel',
        align: 'center',
      },
    ],
  },

  suppressMenuHide: true,
  cellSelection: true,
  enableCharts: true,
};

const adaptableOptions: AdaptableOptions = {
  licenseKey: adaptableLicense?.trim?.(),
  primaryKey: 'id',
  userName: 'Test User',
  adaptableId: 'Adaptable Vue Demo',
  adaptableStateKey: 'adaptable_react_demo',
  settingsPanelOptions: {
    customSettingsPanels: [
      {
        // CUSTOM SETTINGS PANEL COMPONENT
        frameworkComponent: ({ adaptableApi }) =>
          h(CustomSettingsPanel, { adaptableApi }),
        name: 'Custom Settings',
      },
    ],
  },
  dashboardOptions: {
    customToolbars: [
      {
        name: 'GithubRepo',
        title: 'Github Repo',
        toolbarActions: ['close'],
        toolbarButtons: [
          {
            label: 'See Source Code',
            buttonStyle: {
              variant: 'raised',
              tone: 'info',
            },
            icon: {
              src: 'https://www.pngkey.com/png/full/178-1787243_github-icon-png-github-icon-white-png.png',
              style: {
                width: 24,
                height: 24,
              },
            },
            onClick: () => {
              (window as any)
                ?.open(
                  'https://github.com/AdaptableTools/example-adaptable-vue-aggrid',
                  '_blank'
                )
                .focus();
            },
          },
        ],
      },
      {
        name: 'CustomSettingsPanel',
        title: 'Custom Settings Panel',
        toolbarActions: ['close'],
        toolbarButtons: [
          {
            label: 'Open Custom Settings Panel',
            buttonStyle: {
              variant: 'raised',
              tone: 'accent',
            },
            onClick: (
              _button: AdaptableButton<CustomToolbarButtonContext>,
              context: CustomToolbarButtonContext
            ) => {
              context.adaptableApi.settingsPanelApi.openCustomSettingsPanel(
                'Custom Settings'
              );
            },
          },
        ],
      },
      {
        // CUSTOM TOOLBAR COMPONENT
        // wraps a reusable React component (same component is used in a custom tool panel)
        name: 'CustomQuickSearch',
        title: 'Custom Quick Search',
        frameworkComponent: ({ adaptableApi }) => {
          return h(CustomQuickSearch, {
            counter: counter,
            onChange: (searchText: string) => {
              adaptableApi.quickSearchApi.runQuickSearch(searchText);
            },
          });
        },
      },
    ],
  },
  toolPanelOptions: {
    customToolPanels: [
      {
        // CUSTOM TOOLPANEL COMPONENT
        // wraps a reusable React component (same component is used in a custom toolbar)
        name: 'CustomQuickSearch',
        title: 'Custom Quick Search',
        frameworkComponent: ({ adaptableApi }) => {
          return h(CustomQuickSearch, {
            counter: counter,
            onChange: (searchText: string) => {
              adaptableApi.quickSearchApi.runQuickSearch(searchText);
            },
          });
        },
      },
      {
        // CUSTOM TOOLPANEL COMPONENT
        // wraps a AdaptableButton component
        name: 'CustomToolPanelButton',
        buttons: [
          {
            label: 'AlertButton',
            buttonStyle: {
              variant: 'raised',
              tone: 'accent',
            },
            onClick: (
              _button: AdaptableButton<CustomToolPanelButtonContext>,
              context: CustomToolPanelButtonContext
            ) => {
              context.adaptableApi.alertApi.showAlertInfo(
                'CustomToolPanelButton',
                'Styled button & icon'
              );
            },
          },
        ],
      },
    ],
    // CUSTOM TOOLPANEL COMPONENT
    // rendered as a Button in the heading of the tool panel section
    customButtons: [
      {
        label: 'Grid Filter Popup',
        icon: {
          src: 'https://img.icons8.com/glyph-neue/64/000000/zoom-in.png',
        },
        buttonStyle: {
          variant: 'outlined',
          // tone: 'accent',
        },
        onClick: (
          _button: AdaptableButton<ToolPanelButtonContext>,
          context: ToolPanelButtonContext
        ) => {
          context.adaptableApi.filterApi.gridFilterApi.openUIEditorForGridFilter(
            'CONTAINS([language],"type")'
          );
        },
      },
    ],
  },
  // Typically you will store State remotely; here we simply leverage local storage for convenience
  stateOptions: {
    persistState: (state, adaptableStateFunctionConfig) => {
      localStorage.setItem(
        adaptableStateFunctionConfig.adaptableStateKey,
        JSON.stringify(state)
      );
      return Promise.resolve(true);
    },
    loadState: (config: AdaptableStateFunctionConfig) => {
      return new Promise((resolve) => {
        let state = {};
        try {
          state =
            JSON.parse(localStorage.getItem(config.adaptableStateKey) ?? '') ||
            {};
        } catch (err) {
          console.log('Error loading state', err);
        }
        resolve(state);
      });
    },
  },
  initialState: {
    Dashboard: {
      Revision: CONFIG_REVISION,
      Tabs: [
        {
          Name: 'Welcome',
          Toolbars: ['GithubRepo', 'CustomSettingsPanel', 'CustomQuickSearch'],
        },
      ],
    },
    StatusBar: {
      Revision: CONFIG_REVISION,
      StatusBars: [
        {
          Key: 'Center Panel',
          StatusBarPanels: ['Theme', 'Layout'],
        },
      ],
    },
    Layout: {
      CurrentLayout: 'Basic',
      Layouts: [
        {
          Name: 'Basic',
          TableColumns: [
            'name',
            'language',
            'github_stars',
            'license',
            'week_issue_change',
            'created_at',
            'has_wiki',
            'updated_at',
            'pushed_at',
            'github_watchers',
            'description',
            'open_issues_count',
            'closed_issues_count',
            'open_pr_count',
            'closed_pr_count',
          ],
        },
        {
          Name: 'Sorted',
          TableColumns: [
            'name',
            'language',
            'github_stars',
            'license',
            'open_issues_count',
            'closed_issues_count',
            'open_pr_count',
            'closed_pr_count',
          ],
          ColumnSorts: [
            {
              ColumnId: 'license',
              SortOrder: 'Asc',
            },
            {
              ColumnId: 'language',
              SortOrder: 'Desc',
            },
          ],
        },
        {
          Name: 'Row Grouped',
          TableColumns: [
            'name',
            'github_stars',
            'open_issues_count',
            'closed_issues_count',
            'open_pr_count',
            'closed_pr_count',
            'open_issues_count',
            'closed_issues_count',
          ],
          RowGroupedColumns: ['license', 'language'],
        },
        {
          Name: 'Pivot',
          PivotColumns: ['language'],
          PivotGroupedColumns: ['license'],
          PivotAggregationColumns: [
            {
              ColumnId: 'github_stars',
              AggFunc: 'sum',
            },
          ],
        },
      ],
    },
  },
};
</script>

<template>
  <div style="margin-bottom: 20px">
    <button @click="counter++">increment</button>
    <button @click="counter--">decrement</button>
    <b style="margin-left: 10px">{{ counter }}</b>
  </div>
  <AdaptableProvider
    :gridOptions="gridOptions"
    :adaptableOptions="adaptableOptions"
    :modules="agGridModules"
    @onAdaptableReady="() => console.log('Adaptable Ready')"
  >
    <div
      style="display: flex; flex-direction: column; height: calc(100vh - 50px)"
    >
      <AdaptableUI />
      <AdaptableAgGridVue style="flex: 1" class="ag-theme-alpine" />
    </div>
  </AdaptableProvider>
</template>

<style scoped></style>
