# Expanse API and Recoil.js Research

This UI is largely built to research how Recoil.js works with basic CRUD functions. 

## File Layout

Files are are organized around discreet modules, each module is self-contained, but can 
reference other modules. Currently, most modules are built around domain models, such as 
`Episodes` or `Spacecraft`, but there are also shared and utility modules, such at `Debug` 
functional programming utilities. 

Each module contains components, if it is front facing, utils, tests and any state management. 
Tests are included for each module (unless these are integration tests, those are included at 
the root directory) and mirror the folder structure of the module itself. 

```
[module-name]
  |-- atoms
  |-- components
  |-- hooks
  |-- selectors
  |-- tests
    |-- components
    |-- selectors
    |-- utils
  |-- utils
```

## Recoil Structure

Each primary domain model consists of two Recoil `atoms`, a dictionary of all model entities 
and a list of IDs for the main display. This allows easy lookup for updating models and allows
for reordering and hiding any given model.

Associated models are also stored in the same dictionary format, but lack the secondary list of
IDs, as these are stored with the parent model. 
