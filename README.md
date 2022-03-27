# Retain Run

- [Overview](#overview)
- [Features](#features)
- [How to use](#how-to-use)

## Overview

This extension adds [Retain Run](https://marketplace.visualstudio.com/items?itemName=alexalnaib.retain-run) task to retain the run of a Azure DevOps pipeline.

Extension | Code
:---------|:----
[![Extension](https://vsmarketplacebadge.apphb.com/version/alexalnaib.retain-run.svg)](https://marketplace.visualstudio.com/items?itemName=alexalnaib.retain-run) | [![CodeFactor](https://www.codefactor.io/repository/github/alexalnaib/retainrun/badge)](https://www.codefactor.io/repository/github/alexalnaib/retainrun)

## Features

The **Retain Run** task retains classic or YAML pipeline runs by specifying the number of days to retain.

## How to use

1. Add `Retain Run` task to your pipeline
2. Specify number of days to retain

Parameter | Type | Required | Default Value | Description
:-------- | :--- | :------- | :------------ | :----------
`days`    | `Int`| ✔️      | `0`           | Number of days to retain the run<br /><br />**Note**: specifying 0 retains the run indefinitely

> Example: Retain run indefinitely

```yaml
- task: RetainRun@1
  displayName: Retain Run
  inputs:
    days: 0
```

> Example: Retain run for 20 days

```yaml
- task: RetainRun@1
  displayName: Retain Run
  inputs:
    days: 20
```
