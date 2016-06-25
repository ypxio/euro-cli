# euro-cli

> CLI commands to show latest update from Euro 2016

![euro2016](https://s1.kkday.com/images/product/7556/20160426074006_bnWjp.jpg)


## Features

- Show country stats
- Show current country group with classement table and match results table


## Install

```
$ git clone
$ npm install
```


## Usage

```
$ ./app.js Iceland
```

```js
Iceland Match Results
-----------------------------
(1-1) Portugal vs Iceland
(1-1) Iceland vs Hungary
(2-1) Iceland vs Austria
(null-null) England vs Iceland


[GROUP F] Classement
┌────────────────────┬─────┬─────┬─────┬─────┬──────────┐
│ Country            │ P   │ F   │ A   │ D   │ Point    │
├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
│ Hungary            │ 3   │ 6   │ 4   │ 2   │ 5        │
├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
│ Iceland            │ 3   │ 4   │ 3   │ 1   │ 5        │
├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
│ Portugal           │ 3   │ 4   │ 4   │ 0   │ 3        │
├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
│ Austria            │ 3   │ 1   │ 4   │ -3  │ 1        │
└────────────────────┴─────┴─────┴─────┴─────┴──────────┘
```


## License

MIT