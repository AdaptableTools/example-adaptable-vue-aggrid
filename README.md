# AdapTable Vue Example App

This is a fairly basic example of how to get started with AdapTable Vue.

AdapTable Vue is the Vue 3 Framework version of AdapTable - the market-leading, low code AG Grid extension.

For full information on how to use AdapTable Vue see the [AdapTable Documentation](https://www.adaptabletools.com/docs/vue-overview).

> For an absolute barebones example see the [Adaptable Vue Support Template](https://github.com/AdaptableTools/support-template-adaptable-vue-aggrid)

## Versions and Dependencies

The demo is built using these key packages:

- [Vue 3](https://github.com/vuejs)
- [AdapTable](https://www.adaptabletools.com) version 21
- [AG Grid](https://www.ag-grid.com) version 34

## AdapTable Vue Custom Components

The main benefit of using AdapTable Vue is that it allows you to supply [custom components](https://www.adaptabletools.com/docs/vue-custom-components) in AdapTable in a Vue-friendly way.

> For full information on how to install and use AdapTable Vue see the [AdapTable Documentation](https://www.adaptabletools.com/docs/vue-overview).

This demo showcases 3 Vue-specific features of AdapTable:

### Settings Panel

The demo illustrates how to pass custom Vue components to the [Settings Panel](https://www.adaptabletools.com/docs/ui-settings-panel):

```ts
const adaptableOptions: AdaptableOptions = {
  // ...
  settingsPanelOptions: {
    customSettingsPanels: [
      {
        // CUSTOM SETTINGS PANEL COMPONENT
        frameworkComponent: ({ adaptableApi }) =>
          h(CustomSettingsPanel, { adaptableApi }),
        name: "Custom Settings",
      },
    ],
  },
  // ...
};
```

### Tool Panel

The demo illustrates how to pass custom Vue components to the [Tool Panel](https://www.adaptabletools.com/docs/ui-tool-panel):

```tsx
const adaptableOptions: AdaptableOptions = {
  // ...
  toolPanelOptions: {
    toolPanelOrder: ["adaptable", "columns", "filters"],
    customToolPanels: [
      {
        // CUSTOM TOOLPANEL COMPONENT
        // wraps a reusable Vue component (same component is used in a custom toolbar)
        name: "CustomQuickSearch",
        title: "Custom Quick Search",
        frameworkComponent: ({ adaptableApi }) => {
          return h(CustomQuickSearch, {
            onChange: (searchText: string) => {
              adaptableApi.quickSearchApi.runQuickSearch(searchText);
            },
          });
        },
      },
    ],
  },
  // ...
};
```

### Custom Toolbar

The demo illustrates how to pass custom Vue components to the [Dashboard Toolbar](https://www.adaptabletools.com/docs/ui-dashboard):

```tsx
const adaptableOptions: AdaptableOptions = {
  // ...
  dashboardOptions: {
    customToolbars: [
      {
        // CUSTOM TOOLBAR COMPONENT
        // wraps a reusable Vue component (same component is used in a custom tool panel)
        name: "CustomQuickSearch",
        title: "Custom Quick Search",
        frameworkComponent: ({ adaptableApi }) => {
          return h(CustomQuickSearch, {
            onChange: (searchText: string) => {
              adaptableApi.quickSearchApi.runQuickSearch(searchText);
            },
          });
        },
      },
    ],
  },
  // ...
};
```

> For more information on how to use Vue Components in AdapTable see the [AdapTable Documentation](https://www.adaptabletools.com/docs/vue-custom-components).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```


## Licences

An [AdapTable Licence](https://www.adaptabletools.com/buy/buying-adaptable-licensing) provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team, for an organisation or for integration into software for onward sale.

We can make a Trial Licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) or read the [Licence Documentation](https://www.adaptabletools.com/buy/buying-adaptable-licensing) for more information.

## Help

Developers can learn how to access AdapTable Vue programmatically at [AdapTable Documentation](https://www.adaptabletools.com/docs).

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com)

## Support

For all support enquiries please [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
