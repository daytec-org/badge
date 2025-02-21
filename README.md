## Badge service

A pet project that provide ability to get variety of svg badges.

<div align="center">

  [![deploy](https://github.com/daytec-org/badge/actions/workflows/deploy.yml/badge.svg)](https://badge-service.deno.dev/)
  [![visits](https://counter.daytec.ru/badge-service/?title=Visits)](https://counter.daytec.ru/)

  [![deno](https://badge-service.deno.dev/plain/?title=Deno&icon=deno&value=2.1)](#)
  [![oak](https://badge-service.deno.dev/plain/?title=Oak&icon=squirrel&value=17.1)](#)

</div>

### Installation:

- `curl -fsSL https://deno.land/install.sh | sh`
  ([docs.deno.com](https://docs.deno.com/runtime/))
- `deno install`

### Usage:

`deno task dev`

`http://localhost:3000/<badge name>/?title=Badge example&color=blue`

example: `http://localhost:3000/plain`

## Badges:

- plain [title, color, icon, value]
- skill [size, title, color, icon, value]
- stack skill;skill...
  Example: `/stack/?title=HTML5&value=75&icon=html;title=CSS,SCSS&value=35&icon=css`
