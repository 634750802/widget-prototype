# Widgets 1.0 RFC

## Concepts

- [Datasource](#datasource)
- [Visualization](#visualization)
- [Parameters definition](#parameters-definition)

## Components

- [Renderer](#renderer)
- [Composer](#composer)
- [Toolchain](#toolchain)
- [Creator](#creator) (Future)

### Datasource

Datasource should define:

- How to fetch data
- How to parse data to visualization input format (e.g. parse json then extract by json path)
- What parameters the datasource fetcher will use.

### Visualization

Visualization should define:

- Which type of visualization the widget use
- **Platform independent** and **framework independent** javascript code to transform input to proper render config.

The widget 1.0 initial version will support visualization types below:

- `echarts`
- `chartjs`
- `repo-card`
- `repo-card-list`
- `user-card`
- `user-card-list`

### Parameters definition

All widget could define some parameters to provide flexibility. All defined parameters should be provided during
rendering.

Both `client side` and `server side` should validate user provided parameters.

The widgets 1.0 initial version will support several basic types:

- `date`
- `datetime`
- `time`
- `integer`
- `floating`
- `text`

and also some ossinsight specified types:

- `repo-id`
- `user-id`
- `collection-id`

When use a widget in README or other places, user must provide the parameter value in URL.

## Renderer

A widget renderer should contain:

- Input Fetcher
- Visualizer

All above components should be implemented on both `server side` and `client side` environments.

### Input Fetcher

#### Client side

> Client device could not connect to database directly, so
> all SQL based widget should expose an api to visit database.

Use `fetch` to get data from public api server. Parameters usually provided by URL query params.

#### Serverside

Use `fetch` or SQL client to get data from public or private server. Parameters usually provided by HTTP request URL
query params.

### Visualizer

Visualizer should directly call compiled js codes to get visualization config.

#### ECharts and ChartJS

These lib requires only config to render data to canvas or svg. On serverside, we could
use https://www.npmjs.com/package/@napi-rs/canvas to render canvas to PNG.

#### User & Repo card and list

We should provide different codes for each environment.

- client side: react component
- server side: svg string

## Composer

Widget composer is used to create shared widget page and url. It will display a widget preview and a form for user to
input parameters fields

## Code organization

Each widget should provide a single npm package. Folder structure:

- `package.json`
- `visualize.[jt]s`: Visualization code
- `params.json` (Optional): Parameter definition
- `datasource.json`: Datasource

### package.json

Required fields:

- `name`
- `version`
- `description`
- `author`

Optional fields:

- `keywords`

Other fields will be ignored by widget renderer and composer.

All dependencies should be added to `dependencies` instead of `devDependencies`.

### visualize.[jt]s

The visualize code should be esm module and export visualization function as default export.

The function takes two parameters: `input` and `ctx`:

- `input`: the data provided by datasource
- `ctx`: render context, which is provided by widget renderer
- `ctx.theme`: contains common styles provided by project
- `ctx.env`: shows the env
- `ctx.colorScheme`: Color scheme provided by browser (ssr
  see https://wicg.github.io/user-preference-media-features-headers/)
- `ctx.parameters`: parameters user provided

The file should also export the `type` as visualize type for renderer to identify which type of visualization library to
use.

### params.json

### datasource.json

## Toolchain

### `@ossinsight/widgets-nextjs`

next plugin for next to automatically load widgets.

### `@ossinsight/widgets-cli`

cli for develop a ossinsight widget

Commands:

- `dev`: run a widget using a simple next server using `@ossinsight/widgets-nextjs`
- `validate`: validate a dir is a valid widget folder
- `render`: render a widget to image. Should be useful for prerender scripts

### `@ossinsight/widgets-types`

TypeScript Definition for widgets visualization code.

## Creator

A component to create widget dynamically. Will introduce in future version.
