# Digm

## 0.2.4

### Affected Packages

- `@cphayim-digm/vue`
- `@cphayim-digm/react`

### Features:

- `useDigmReady` add `pressing` option, when `pressing: true`, the callback will be triggered earlier in the `RenderStatus.RENDER_MODEL` stage ([#84](https://github.com/Cphayim/digm/pull/84))

## 0.2.3

### Dependencies:

Update dependencies

## 0.2.2

### Dependencies:

Update dependencies

## 0.2.1

### Affected Packages

- `@cphayim-digm/core`

### Fixes:

Fill in the missing event types

## 0.2.0

### Affected packages:

- `@cphayim-digm/core`
- `@cphayim-digm/vue`
- `@cphayim-digm/react`

### Features:

- provides an extra option `transformer` for the `StartEngineOptions` ([#61](https://github.com/Cphayim/digm/pull/61))

```ts
{
  /**
    * Convert rendering address
    *
    * If `true` or `RenderUrlTransformer` is passed,
    * it will convert the rendering URL returned by the rendering server
    *
    * For example, in the scenario where the front end forwards through the request
    * gateway 10.1.1.1 (nginx) -> 192.168.0.100 (rendering server),
    * At this point, the rendering server will return a rendering address such as
    * http://192.168.0.100:8891/{render-token}, which will cause the subsequent
    * rendering process to fail
    *
    * When passing `true`:
    * This option parses `url` and uses its `protocol` and `hostname` to convert
    * the render address to `http://10.1.1.1:8891/{render-token}`
    *
    * You can also pass in `RenderUrlTransformer` to customize the transformation logic
    */
  transformer?: boolean | RenderUrlTransformer
}
```

### Breaking Changes:

Deprecated `onDigmReady` life cycle function from `@cphayim-digm/vue`

Now the `useDigm()` hook will no longer return the `onDigmReady()` lifecycle function, Please replace it with `useDigmReady()` hook, see ([#52](https://github.com/Cphayim/digm/pull/52))

This will maintain consistency with the `@cphayim-digm/react` package

### Dependencies:

Update dependencies ([#55](https://github.com/Cphayim/digm/pull/55),[#56](https://github.com/Cphayim/digm/pull/56),[#57](https://github.com/Cphayim/digm/pull/57),[#58](https://github.com/Cphayim/digm/pull/58),[#59](https://github.com/Cphayim/digm/pull/59),[#60](https://github.com/Cphayim/digm/pull/60))

## 0.1.8

### Affected packages:

- `@cphayim-digm/vue`
- `@cphayim-digm/react`

### Features:

- add `useDigmReady` hook ([#52](https://github.com/Cphayim/digm/pull/52))

```ts
// callback executed when digm rendering is complete
useDigmReady((digm) => {
  console.log('DIGM is ready')
})
```

## 0.1.6

### Affected packages:

- `@cphayim-digm/core`
- `@cphayim-digm/react`
- `@cphayim-digm/vue`

### Features:

- `@cphayim-digm/core` add some features
  - auto calc `width` and `height` of renderer ([#35](https://github.com/Cphayim/digm/pull/35))
  - implement Widget features ([#47](https://github.com/Cphayim/digm/pull/47))
  - implements CoverSelec and CoverMove and CoverWindow methods and events ([#44](https://github.com/Cphayim/digm/pull/44))
  - implements TDText methods and events ([#43](https://github.com/Cphayim/digm/pull/43))
  - implement scene-effect methods and events ([#42](https://github.com/Cphayim/digm/pull/42))
  - implements coordcalc methods ([#41](https://github.com/Cphayim/digm/pull/41))
  - implement HighlightArea ([#40](https://github.com/Cphayim/digm/pull/40))
  - implements SceneGeoConverter methods and events ([#38](https://github.com/Cphayim/digm/pull/38))
  - implements chinamap methods and events ([#39](https://github.com/Cphayim/digm/pull/39))
  - implement POI features ([#33](https://github.com/Cphayim/digm/pull/33))
  - implements viewshep methods and events ([#32](https://github.com/Cphayim/digm/pull/32))
  - implement surplus covering ([#30](https://github.com/Cphayim/digm/pull/30))
  - implements strategy_map functions and events ([#29](https://github.com/Cphayim/digm/pull/29))
  - implement particle-effect features ([#26](https://github.com/Cphayim/digm/pull/26))
  - implement light features ([#25](https://github.com/Cphayim/digm/pull/25))
  - implement range features and events ([#24](https://github.com/Cphayim/digm/pull/24))
- add `@cphayim-digm/react` package, provides hooks and components that are consistent with `@cphayim-digm/vue` ([#46](https://github.com/Cphayim/digm/pull/46))

### Fixes:

- fix named typo ([#45](https://github.com/Cphayim/digm/pull/45))
- fix type ([#31](https://github.com/Cphayim/digm/pull/31))

### Dependencies:

Update dependencies ([#27](https://github.com/Cphayim/digm/pull/27))
